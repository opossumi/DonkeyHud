import { NavLogo } from "./NavLogo";
import { RouteSelect } from "./RouteSelect";
import "./sidebar.css";
import { AccountToggle } from "./AccountControls";
import { useUser } from "../../hooks";
import { Plan } from "./Plan";

export const Sidebar = () => {
  const { user } = useUser();
  return (
    <section
      id="Sidebar"
      className="relative hidden h-full w-[210px] shrink-0 flex-col justify-between gap-2 bg-background-secondary px-4 pb-4 lg:flex"
    >
      <NavLogo />
      <RouteSelect />
      {user && user.is_anonymous ? <Plan /> : <AccountToggle />}
    </section>
  );
};
