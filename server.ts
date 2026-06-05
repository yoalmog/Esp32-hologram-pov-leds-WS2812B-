import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // --- REAL BACKEND ENDPOINTS (Proxying or Handling) ---
  app.get("/api/health", (req, res) => res.json({ status: "ok" }));

  let mockStatus = "ready";
  let mockRpm = 100;

  app.get("/status", (req, res) => {
    res.json({ rpm: mockRpm, status: mockStatus });
  });

  app.post("/calibrate", (req, res) => {
    mockStatus = "calibrating";
    mockRpm = 240;
    setTimeout(() => {
      mockStatus = "ready";
      mockRpm = 125;
    }, 4000);
    res.json({ status: "calibrating" });
  });

  app.post("/control", (req, res) => {
    res.json({ status: "success" });
  });

  app.post("/config", (req, res) => {
    res.json({ status: "success" });
  });

  app.post("/upload", express.raw({ type: "*/*", limit: "50mb" }), (req, res) => {
    console.log(`[Server] Received binary upload: ${req.body.length} bytes`);
    res.json({ status: "success", received: req.body.length });
  });

  app.get("/scan", (req, res) => {
    res.json([
      { ssid: "HoloSpin_WiFi_AP", rssi: -45, secure: false },
      { ssid: "Home_WiFi_2.4G", rssi: -68, secure: true }
    ]);
  });

  app.get("/diagnostic", (req, res) => {
    res.json({
      heap: 124500,
      uptime: process.uptime(),
      tasks: 8,
      wifi_rssi: -42,
      temp: 45.2
    });
  });

  app.get("/logs", (req, res) => {
    res.send("[SYS] Boot complete\n[WIFI] Connected\n[POV] Frame buffer ready\n[HTTP] Server started on port 80");
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
