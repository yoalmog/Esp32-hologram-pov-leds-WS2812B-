import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- REAL BACKEND ENDPOINTS (Proxying or Handling) ---
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  app.get("/status", async (req, res) => {
    // In a real production proxy, this would attempt to reach the ESP32
    // For now, we return empty to signify no hardware linked to this cloud runner
    res.status(503).json({ error: "No physical hardware linked to cloud session. Connect via BLE/Direct WiFi." });
  });

  app.post("/control", (req, res) => {
    // Return error to signify no direct hardware link from cloud
    res.status(503).json({ error: "Hardware not reachable from cloud runner." });
  });

  app.post("/config", (req, res) => {
    res.status(503).json({ error: "Hardware not reachable from cloud runner." });
  });

  app.get("/scan", (req, res) => {
    // Return empty results from cloud
    res.json([]);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer().catch(err => {
  console.error("Critical server startup failure:", err);
  process.exit(1);
});
