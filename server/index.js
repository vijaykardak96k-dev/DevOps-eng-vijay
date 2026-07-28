import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const app = express();
const PORT = process.env.PORT || 4000;
const ORIGIN = process.env.CLIENT_ORIGIN || "http://localhost:5173";

app.use(cors({ origin: ORIGIN }));
app.use(express.json({ limit: "10kb" }));

// simple in-memory rate limit per IP for the contact endpoint
const submissions = new Map();
const WINDOW_MS = 60_000;
const MAX_PER_WINDOW = 5;

function rateLimit(req, res, next) {
  const ip = req.ip;
  const now = Date.now();
  const record = submissions.get(ip) || { count: 0, windowStart: now };

  if (now - record.windowStart > WINDOW_MS) {
    record.count = 0;
    record.windowStart = now;
  }

  record.count += 1;
  submissions.set(ip, record);

  if (record.count > MAX_PER_WINDOW) {
    return res.status(429).json({ error: "Too many requests. Please try again in a minute." });
  }
  next();
}

app.get("/api/health", (_req, res) => {
  res.json({ status: "ok", timestamp: new Date().toISOString() });
});

app.post("/api/contact", rateLimit, (req, res) => {
  const { name, email, message } = req.body || {};

  if (!name || !email || !message) {
    return res.status(400).json({ error: "name, email, and message are all required." });
  }
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailPattern.test(email)) {
    return res.status(400).json({ error: "That email address doesn't look valid." });
  }
  if (message.length > 5000) {
    return res.status(400).json({ error: "Message is too long." });
  }

  const entry = {
    name: String(name).slice(0, 200),
    email: String(email).slice(0, 200),
    message: String(message).slice(0, 5000),
    receivedAt: new Date().toISOString(),
  };

  // Persist to a local JSON log. Swap this for an email provider (e.g. Resend, Nodemailer + SMTP)
  // or a database write once you're ready to go beyond a file-based store.
  const logPath = path.join(__dirname, "contact-submissions.json");
  let existing = [];
  try {
    if (fs.existsSync(logPath)) {
      existing = JSON.parse(fs.readFileSync(logPath, "utf-8"));
    }
  } catch {
    existing = [];
  }
  existing.push(entry);
  fs.writeFileSync(logPath, JSON.stringify(existing, null, 2));

  console.log(`[contact] New message from ${entry.name} <${entry.email}>`);
  res.status(201).json({ success: true, message: "Message received. Thanks for reaching out!" });
});

app.use((_req, res) => {
  res.status(404).json({ error: "Not found." });
});

app.listen(PORT, () => {
  console.log(`DevOps portfolio API listening on http://localhost:${PORT}`);
});
