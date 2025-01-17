import { Routes, Route, Navigate, MemoryRouter } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard/Dashboard";
import { MatchesPage } from "./pages/Matches/MatchPage";
import { PlayersPage } from "./pages/Players/PlayersPage";
import { TeamsPage } from "./pages/Teams/TeamsPage";
import { AdminPanel } from "./pages/AdminPanel";
import { AppProviders } from "./context/AppProviders";
<<<<<<< Updated upstream
import { UpdateUser } from "./pages/Account/UpdateUser";
// import { ForgotPassword, SignUp } from "./pages/Login";
// import { Login } from "./pages/Login";
// import { useUser } from "./hooks";
// import { ThemesProvider } from "./context";
=======
import { ForgotPassword, SignUp } from "./pages/Login";
import { Login } from "./pages/Login";
import { useUser } from "./hooks";
import { UpdateUser } from "./pages/Account/UpdateUser";
import { ThemesProvider } from "./context";
>>>>>>> Stashed changes

const AuthenticatedRoutes = () => (
  <AppProviders>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<AdminPanel />}>
          <Route index element={<MatchesPage />} />
          <Route path="matches" element={<Navigate to="/" />} />
          <Route path="players" element={<PlayersPage />} />
          <Route path="teams" element={<TeamsPage />} />
          <Route path="dashboard" element={<Dashboard />} />
        </Route>
        <Route path="/update" element={<UpdateUser />} />
      </Routes>
    </MemoryRouter>
  </AppProviders>
);

<<<<<<< Updated upstream
// const UnauthenticatedRoutes = () => (
//   <ThemesProvider>
//     <MemoryRouter>
//       <Routes>
//         <Route path="/" element={<Login />} />
//         <Route path="/login" element={<Navigate to="/" />} />
//         <Route path="/signup" element={<SignUp />} />
//         <Route path="/forgotpassword" element={<ForgotPassword />} />
//       </Routes>
//     </MemoryRouter>
//   </ThemesProvider>
// );

export const App = () => {
  // const { user } = useUser();
  // return user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
  return <AuthenticatedRoutes />;
=======
const UnauthenticatedRoutes = () => (
  <ThemesProvider>
    <MemoryRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Navigate to="/" />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgotpassword" element={<ForgotPassword />} />
      </Routes>
    </MemoryRouter>
  </ThemesProvider>
);

export const App = () => {
  const { user } = useUser();
  return user ? <AuthenticatedRoutes /> : <UnauthenticatedRoutes />;
>>>>>>> Stashed changes
};
