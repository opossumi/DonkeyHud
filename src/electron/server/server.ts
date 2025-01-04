import express, { Express } from "express";
import cors from "cors";
import http from "http";
import { initializeSocket } from "./sockets/socket.js";
import { readGameData } from "./sockets/GSI.js";
import { playerRoutes, teamRoutes, matchRoutes } from "./routes/index.js";
import { BrowserWindow } from "electron";
import { ipcWebContentsSend } from "../util.js";
import { getHudPath } from "../pathResolver.js";
import path from "path";

const port = process.env.PORT || "1349";

export const startServer = (mainWindow: BrowserWindow) => {
  const app: Express = express();
  const server = http.createServer(app);
  initializeSocket(server);

  app.use(cors());
  app.use(express.json());
  app.use(express.static(getHudPath()));

  /* Game Data */
  app.post("/gsi", readGameData);

  /* Hud */
  app.get("/hud", (_req, res) => {
    res.sendFile(path.join(getHudPath(), "index.html"));
  });

  /* Routes */
  app.use(playerRoutes);
  app.use(teamRoutes);
  app.use(matchRoutes);

  server.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });

  ipcWebContentsSend(
    "startServer",
    mainWindow.webContents,
    "Server started on port"
  );

  return server;
};

export function shutDown(server: http.Server) {
  console.log("Received kill server signal, shutting down gracefully");
  server.close(() => {
    console.log("Closed out remaining connections");
    process.exit(0);
  });
}
