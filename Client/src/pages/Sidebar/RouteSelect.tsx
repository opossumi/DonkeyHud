import { SvgIconComponent } from "@mui/icons-material";
import { NavLink } from "react-router-dom";
import PersonIcon from "@mui/icons-material/Person";
import GroupsIcon from "@mui/icons-material/Groups";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";

interface RouteProps {
  Icon: SvgIconComponent;
  title: string;
  target?: string;
}

const routes: RouteProps[] = [
  { Icon: AddCircleIcon, title: "Matches" },
  { Icon: PersonIcon, title: "Players" },
  { Icon: GroupsIcon, title: "Teams" },
  { Icon: DashboardIcon, title: "Dashboard" },
];

export const RouteSelect = () => {
  return (
    <div className="w-full">
      <div className="border-b border-gray-800 py-4">
        {routes.map((route, index) => (
          <NavRoutes key={index} {...route} />
        ))}
      </div>
      <div className="mt-4 flex w-full items-center justify-center">
        <NavLink
          to={`/hud`}
          target="_blank"
          className={({ isActive }) =>
            `flex w-3/4 items-center justify-center gap-4 rounded bg-sky-700 p-2 text-textcolor shadow-none transition-[box-shadow,_background-color,_color] hover:bg-sky-900`
          }
        >
          <PlayArrowIcon />
          Hud
        </NavLink>
      </div>
    </div>
  );
};

const NavRoutes = ({ Icon, title, target }: RouteProps) => {
  return (
    <NavLink
      to={`${title.toLowerCase()}`}
      target={target}
      className={({ isActive }) =>
        `flex w-full items-center justify-start gap-4 px-6 py-3 transition-[box-shadow,_background-color,_color] ${isActive ? "bg-primary text-textcolor shadow" : "bg-transparent text-stone-300 shadow-none hover:bg-gray-800"}`
      }
    >
      {<Icon />}
      {title}
    </NavLink>
  );
};
