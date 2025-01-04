import { createRoot } from "react-dom/client";
import "./index.css";
import { Routes, Route, Navigate, MemoryRouter } from "react-router-dom";
import { AdminPanel } from "./pages/AdminPanel/AdminPanel";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { MatchesPage } from "./pages/Matches/MatchPage";
import { PlayersPage } from "./pages/Players/PlayersPage";
import { TeamsPage } from "./pages/Teams/TeamsPage";

createRoot(document.getElementById("root")!).render(
  <MemoryRouter>
    <Routes>
      <Route path="/" element={<AdminPanel />}>
        <Route index element={<MatchesPage />} />
        <Route path="matches" element={<Navigate to="/" />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  </MemoryRouter>
);
