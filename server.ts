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

  app.get("/scan", (req, res) => {
    res.json([
      { ssid: "HoloSpin_WiFi_AP", rssi: -45, secure: false },
      { ssid: "Home_WiFi_2.4G", rssi: -68, secure: true }
    ]);
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
