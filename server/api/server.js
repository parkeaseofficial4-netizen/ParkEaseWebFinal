// server/api/server.js


import cors from "cors";
import express from "express";
// Use explicit dotenv path or rely on Vercel env vars
// import "dotenv/config";  // optional for local; on Vercel use dashboard envs

const app = express();

// CORS: use full URLs and include previews if you’ll call from them
const allowedOrigins = [
  "http://localhost:3000",
  "https://www.parkease.dev",
  "https://parkease.dev",
];

app.use(
  cors({
    origin: (origin, cb) => {
      if (!origin) return cb(null, true);
      if (
        allowedOrigins.includes(origin) ||
        /^https?:\/\/.*\.vercel\.app$/.test(origin)
      )
        return cb(null, true);
      cb(new Error("Not allowed by CORS"));
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);

app.use(express.json());

app.get("/", (_req, res) => {
  res.json({ message: "Hello, it's working..." });
});

// IMPORTANT: avoid double /api unless you intend it.
// If you keep this:
import apiRoutes from "../routes/api.js";
app.use("/api", apiRoutes); // -> external URLs will be /api/...

// Only listen locally; export app for Vercel
if (!process.env.VERCEL) {
  const PORT = process.env.PORT || 5000;
  app.listen(PORT, () => console.log(`Local: http://localhost:${PORT}`));
}

export default app;
