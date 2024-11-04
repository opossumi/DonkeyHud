import { NavLink, Outlet, useLocation } from "react-router-dom";
import BackgroundVideo from "../../assets/Background.mp4";
import { Logo } from "../Sidebar/NavLogo";

export const LandingPage = () => {
  const location = useLocation();
  return (
    <div
      className={`LandingPage size-full ${location.pathname === "/hud" ? "" : "dark bg-stone-100 text-stone-950"}`}
    >
      {location.pathname === "/" && (
        <>
          {/* <video autoPlay muted loop className='size-full object-cover'>
                <source src={BackgroundVideo} type='video/mp4'/>
            </video> */}
          <div className="absolute left-1/2 top-1/2 flex h-screen w-full -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded bg-background/95 p-4 shadow lg:h-min lg:w-min">
            <img className="w-72" src={Logo} alt="Logo" />
            <div className="flex flex-col items-center justify-center gap-4 md:flex-row">
              <NavLink
                to="/admin/matches"
                className="flex w-80 items-center justify-center rounded bg-primary p-4 text-center text-5xl text-textcolor shadow transition-colors hover:bg-border"
              >
                Admin Panel
              </NavLink>
              <NavLink
                to="/hud"
                className="flex w-80 items-center justify-center rounded bg-primary p-4 text-center text-5xl text-textcolor shadow transition-colors hover:bg-border"
                target="_blank"
              >
                HUD
              </NavLink>
            </div>
          </div>
        </>
      )}
      <Outlet />
    </div>
  );
};
