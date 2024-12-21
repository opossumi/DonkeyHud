import { NavLogo } from "./NavLogo";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar = () => {
  return (
    <nav
      id="sidebar"
      className="hidden border-r border-border bg-background2 lg:block"
    >
      <div className="fixed h-[calc(100vh-32px-48px)] w-[210px]">
        <NavLogo />
        <RouteSelect />
      </div>
      <Plan />
    </nav>
  );
};
