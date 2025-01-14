import { NavLink } from "react-router-dom";
import { IconType } from "react-icons";
import {
  MdOutlinePerson,
  MdGroups,
  MdDashboard,
  MdAddCircle,
  MdPlayArrow,
} from "react-icons/md";
import { ButtonContained } from "../../components";

interface RouteProps {
  Icon: IconType;
  title: string;
  to: string;
  target?: string;
}

const routes: RouteProps[] = [
  /* Matches redirect to home (/) */
  { Icon: MdAddCircle, title: "Matches", to: "" },
  { Icon: MdOutlinePerson, title: "Players", to: "players" },
  { Icon: MdGroups, title: "Teams", to: "teams" },
  { Icon: MdDashboard, title: "Dashboard", to: "dashboard" },
];

export const RouteSelect = () => {
  return (
    <div className="h-full w-full overflow-y-auto">
      <div className="py-4">
        {routes.map((route, index) => (
          <NavRoutes key={index} {...route} />
        ))}
        <div className="mt-4 flex size-full justify-center border-t border-border pt-4">
          <ButtonContained onClick={() => window.electron.startOverlay()}>
            <MdPlayArrow className="mr-2 size-5" />
            Overlay
          </ButtonContained>
        </div>
      </div>
    </div>
  );
};

const NavRoutes = ({ Icon, title, target, to }: RouteProps) => {
  return (
    <NavLink
      to={to}
      target={target}
      className={({ isActive }) =>
        `mb-1 flex w-[100%] items-center justify-start gap-4 rounded-lg px-6 py-2 transition-[box-shadow,_background-color,_color] ${isActive ? "bg-background-hover text-text shadow" : "text-text-secondary shadow-none hover:bg-background-hover"}`
      }
    >
      {({ isActive }) => (
        <>
          <Icon
            className={`size-7 ${isActive ? "text-primary-light" : "text-gray-400"}`}
          />
          <p
            className={`font-semibold ${isActive ? "text-text" : "text-gray-400"}`}
          >
            {title}
          </p>
        </>
      )}
    </NavLink>
  );
};
