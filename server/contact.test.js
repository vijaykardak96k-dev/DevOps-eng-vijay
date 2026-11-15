import test from "node:test";
import assert from "node:assert/strict";
import { createApp } from "./index.js";

const good = { name: "Asha", email: "asha@example.com", subject: "Hello", message: "I'd like to talk about a role." };
const env = { RESEND_API_KEY: "k", CONTACT_TO_EMAIL: "me@example.com", CONTACT_FROM_EMAIL: "Site <s@example.com>" };

async function run(app, fn) {
  const server = app.listen(0);
  const base = `http://127.0.0.1:${server.address().port}`;
  try { return await fn((body) => fetch(`${base}/api/contact`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(body) }), base); }
  finally { server.close(); }
}

test("rejects invalid input with field errors", async () => {
  await run(createApp({ env }), async (post) => {
    const r = await post({ ...good, email: "nope", message: "short" });
    assert.equal(r.status, 400);
    const j = await r.json();
    assert.ok(j.errors.email && j.errors.message);
  });
});

test("returns 503 (not fake success) when email is not configured", async () => {
  await run(createApp({ env: {} }), async (post) => assert.equal((await post(good)).status, 503));
});

test("sends via provider and escapes HTML", async () => {
  let sent;
  const fetchImpl = async (_url, init) => { sent = JSON.parse(init.body); return { ok: true, status: 200 }; };
  await run(createApp({ env, fetchImpl }), async (post) => {
    const r = await post({ ...good, message: "<script>alert(1)</script> hello there" });
    assert.equal(r.status, 201);
    assert.ok(!sent.html.includes("<script>"));
    assert.equal(sent.reply_to, good.email);
  });
});

test("provider failure returns 502", async () => {
  await run(createApp({ env, fetchImpl: async () => ({ ok: false, status: 500 }) }), async (post) => assert.equal((await post(good)).status, 502));
});

test("honeypot is dropped without sending", async () => {
  let called = false;
  await run(createApp({ env, fetchImpl: async () => { called = true; return { ok: true }; } }), async (post) => {
    assert.equal((await post({ ...good, website: "spam.example" })).status, 201);
    assert.equal(called, false);
  });
});

test("rate limits repeated submissions", async () => {
  await run(createApp({ env: {}, rateLimit: { windowMs: 60000, max: 2 } }), async (post) => {
    await post(good); await post(good);
    assert.equal((await post(good)).status, 429);
  });
});

test("health endpoint", async () => {
  await run(createApp({ env }), async (_p, base) => assert.equal((await fetch(`${base}/api/health`)).status, 200));
});
