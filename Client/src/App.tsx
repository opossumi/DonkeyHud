import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import React, { useEffect, useState } from "react";
import { CSGO, GSISocket, CSGORaw } from "csgogsi-socket";
import { AdminPanel } from "./pages/AdminPanel";
import { Dashboard } from "./pages/Dashboard";
import { MatchesPage } from "./pages/Matches/MatchPage";
import { PlayersPage } from "./pages/Players/PlayersPage";
import { TeamsPage } from "./pages/Teams";
import { Hud } from "./pages/HUD/Hud";

export const PORT = 1349;
export const HOST = `http://localhost`;
export const { GSI, socket } = GSISocket(`${HOST}:${PORT}`, "update");

GSI.on("matchEnd", (score) => {
  console.log(score);
});

GSI.on("intermissionEnd", () => {
  console.log("switching sides");
});

/*
  TODO:
  - Start Supporting uploading local files for team logos and player pictures.
  - Rework server to use typescript and csgogsi better
  - useMem and useContext hooks for cacheing so we don't have to make an api call every action.
  - Work on an Electron App.
  - Local file uploads for players pictures and teams logo.
  - Avatars (players without pictures) not swapping when teams switch sides 
  - Set players teams by id, and use the players id to check if teams need to be reversed
  - Use the GSI event "matchEnd" (or whatever the end of game event is) to make the server set the score of the map.
*/

export const App = () => {
  const [gameData, setGameData] = useState<CSGO | null>(null);

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AdminPanel />}>
        <Route index element={<MatchesPage />} />
        <Route path="matches" element={<Navigate to="/" />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="dashboard" element={<Dashboard gameData={gameData} />} />
        <Route path="hud" element={<Hud />} />
      </Route>,
    ),
  );

  useEffect(() => {
    socket.on("update", (data: CSGORaw) => {
      const digestData = GSI.digest(data);
      setGameData(digestData);
    });

    return () => {
      socket.off("update");
    };
  }, []);

  return (
    <div className={`App size-full`}>
      <RouterProvider router={router} />
    </div>
  );
};
