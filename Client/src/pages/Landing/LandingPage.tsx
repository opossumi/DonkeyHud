import { NavLink, Outlet, useLocation } from "react-router-dom";
import { Logo } from "../Sidebar/NavLogo";

export const LandingPage = () => {
  const location = useLocation();
  return (
    <div
      className={`LandingPage size-full ${location.pathname === "/hud" ? "" : "dark bg-stone-100 text-stone-950"}`}
    >
      <Outlet />
    </div>
  );
};
