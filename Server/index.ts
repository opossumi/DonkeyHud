import express, { Express } from "express";
import dotenv from "dotenv";
import cors from "cors";
import http from "http";
import path from "path";
import { initializeSocket } from "./sockets/socket";
import { readGameData } from "./sockets/GSI";
import {
  createPlayerController,
  deletePlayerController,
  getPlayerBySteamIdController,
  getPlayersController,
  updatePlayerController,
} from "./database/players/index";
import {
  createTeamController,
  deleteTeamController,
  getTeamByIdController,
  getTeamsController,
  updateTeamController,
} from "./database/teams/index";
import {
  createMatchController,
  deleteMatchController,
  getCurrentMatchController,
  getMatchByIdController,
  getMatchesController,
  setCurrentMatchController,
  updateCurrentMatchController,
  updateMatchController,
} from "./database/matches/index";

dotenv.config();

const app: Express = express();
const server = http.createServer(app);
const port = process.env.PORT || "1349";
const host = process.env.HOST || "localhost";
export const io = initializeSocket(server);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "build")));

/* Game Data */
app.post("/gsi", readGameData);

/* Hud */
app.get("/hud", (req, res) => {
  res.sendFile(path.join(__dirname, "build", "index.html"));
});

/* Players */
app.get("/players", getPlayersController);
app.get("/players/:steamid", getPlayerBySteamIdController);
app.post("/players", createPlayerController);
app.delete("/players/:id", deletePlayerController);
app.put("/players/:id", updatePlayerController);

/* Teams */
app.get("/teams", getTeamsController);
app.get("/teams/:id", getTeamByIdController);
app.post("/teams", createTeamController);
app.delete("/teams/:id", deleteTeamController);
app.put("/teams/:id", updateTeamController);

/* Matches */
app.get("/matches", getMatchesController);
app.get("/current_match", getCurrentMatchController);
app.get("/matches/:id", getMatchByIdController);
app.post("/matches", createMatchController);
app.delete("/matches/:id", deleteMatchController);
app.put("/matches/:id", updateMatchController);
app.put("/matches/:id/current", setCurrentMatchController);
app.put("/matches/current/update", updateCurrentMatchController);

server.listen(port, () =>
  console.log(`Server running on port ${host}:${port}`)
);
