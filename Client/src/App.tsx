import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import { AdminPanel } from "./pages/AdminPanel";
import { MatchesPage } from "./pages/Matches";
import { PlayersPage } from "./pages/Players";
import { TeamsPage } from "./pages/Teams";
import { Dashboard } from "./pages/Dashboard";
import { Hud } from "./pages/HUD/Hud";

function App() {
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<AdminPanel />}>
        <Route index element={<MatchesPage />} />
        <Route path="matches" element={<Navigate to="/" />} />
        <Route path="players" element={<PlayersPage />} />
        <Route path="teams" element={<TeamsPage />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="hud" element={<Hud />} />
      </Route>
    )
  );

  return (
    <div className={`App size-full`}>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
