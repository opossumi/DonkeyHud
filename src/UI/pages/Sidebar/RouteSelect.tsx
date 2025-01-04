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
  target?: string;
}

const routes: RouteProps[] = [
  { Icon: MdOutlinePerson, title: "Players" },
  { Icon: MdGroups, title: "Teams" },
  { Icon: MdDashboard, title: "Dashboard" },
];

export const RouteSelect = () => {
  return (
    <div className="w-full">
      <div className="py-4">
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            `mb-1 flex w-[90%] items-center justify-start gap-4 rounded-r-lg border-l-2 px-6 py-3 transition-[box-shadow,_background-color,_color] ${isActive ? "border-primary bg-gray-800 text-text shadow" : "border-transparent text-stone-300 shadow-none hover:bg-gray-800"}`
          }
        >
          {<MdAddCircle className="size-5" />}
          <p className="font-semibold">Matches</p>
        </NavLink>
        {routes.map((route, index) => (
          <NavRoutes key={index} {...route} />
        ))}
        <div className="size-full flex justify-center items-center border-t border-border p-4 mt-4">
          <ButtonContained onClick={() => window.electron.startOverlay()}>
            <MdPlayArrow className="size-5 mr-2" />
            Overlay
          </ButtonContained>
        </div>
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
        `mb-1 flex w-[90%] items-center justify-start gap-4 rounded-r-lg border-l-2 px-6 py-3 transition-[box-shadow,_background-color,_color] ${isActive ? "border-primary bg-gray-800 text-text shadow" : "border-transparent text-stone-300 shadow-none hover:bg-gray-800"}`
      }
    >
      {<Icon className="size-5" />}
      <p className="font-semibold">{title}</p>
    </NavLink>
  );
};
