import { NavLogo } from "./NavLogo";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";
import "./sidebar.css";
export const Sidebar = () => {
  return (
    <nav
      id="Sidebar"
      className="relative hidden h-full w-[210px] flex-col justify-between bg-background2 px-3 lg:flex"
    >
      <NavLogo />
      <RouteSelect />
      <Plan />
    </nav>
  );
};
