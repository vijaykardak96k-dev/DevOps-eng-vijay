import express from "express";
import cors from "cors";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { validateContact } from "../shared/validate.js";

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, "..", "dist");

/** Escape user text before putting it in the HTML email body. */
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]);

export function createApp({ env = process.env, fetchImpl = fetch, rateLimit = { windowMs: 60_000, max: 5 } } = {}) {
  const app = express();
  app.set("trust proxy", 1); // Render sits behind a proxy; needed for the real client IP
  app.disable("x-powered-by");

  const origins = (env.CLIENT_ORIGIN || "").split(",").map((s) => s.trim()).filter(Boolean);
  // Same-origin requests (the Render setup) need no CORS; only listed origins get CORS headers.
  app.use("/api", cors({ origin: origins.length ? origins : false, methods: ["GET", "POST"] }));
  app.use(express.json({ limit: "10kb" }));

  const hits = new Map();
  const limiter = (req, res, next) => {
    const now = Date.now();
    const rec = hits.get(req.ip);
    if (!rec || now - rec.start > rateLimit.windowMs) hits.set(req.ip, { start: now, count: 1 });
    else if (++rec.count > rateLimit.max) return res.status(429).json({ error: "Too many requests. Please try again in a minute." });
    next();
  };

  app.get("/api/health", (_req, res) => res.json({ status: "ok" }));

  app.post("/api/contact", limiter, async (req, res) => {
    const body = req.body && typeof req.body === "object" ? req.body : {};
    if (body.website) return res.status(201).json({ ok: true }); // honeypot: silently drop bots
    const errors = validateContact(body);
    if (Object.keys(errors).length) return res.status(400).json({ error: "Please fix the highlighted fields.", errors });

    const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = env;
    if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
      console.error("[contact] email delivery is not configured (RESEND_API_KEY / CONTACT_TO_EMAIL / CONTACT_FROM_EMAIL)");
      return res.status(503).json({ error: "The contact form is temporarily unavailable. Please email me directly." });
    }
    const { name, email, subject, message } = Object.fromEntries(Object.entries(body).map(([k, v]) => [k, String(v).trim()]));
    try {
      const r = await fetchImpl("https://api.resend.com/emails", {
        method: "POST",
        headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
        body: JSON.stringify({
          from: CONTACT_FROM_EMAIL,
          to: [CONTACT_TO_EMAIL],
          reply_to: email,
          subject: `[Portfolio] ${subject}`.slice(0, 200),
          html: `<p><strong>From:</strong> ${esc(name)} &lt;${esc(email)}&gt;</p><p>${esc(message).replace(/\n/g, "<br>")}</p>`,
          text: `From: ${name} <${email}>\n\n${message}`,
        }),
      });
      if (!r.ok) {
        console.error("[contact] provider error", r.status);
        return res.status(502).json({ error: "Your message could not be sent. Please try again or email me directly." });
      }
      return res.status(201).json({ ok: true });
    } catch (err) {
      console.error("[contact] send failed", err?.message);
      return res.status(502).json({ error: "Your message could not be sent. Please try again or email me directly." });
    }
  });

  app.use("/api", (_req, res) => res.status(404).json({ error: "Not found." }));

  // Serve the built SPA (Render runs one web service for both).
  app.use(express.static(dist, { maxAge: "1h", index: false }));
  app.use((req, res, next) => {
    if (req.method !== "GET") return next();
    res.sendFile(path.join(dist, "index.html"), (err) => err && res.status(404).send("Build the frontend first: npm run build"));
  });
  return app;
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  try { process.loadEnvFile(); } catch { /* .env is optional; Render injects real env vars */ }
  const port = process.env.PORT || 4000;
  createApp().listen(port, () => console.log(`Portfolio listening on :${port}`));
}
