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
    <div className="h-full w-full overflow-y-auto">
      <div className="py-4">
        {/* Matches has to be separate because it redirects to homepage */}
        <NavLink
          to={`/`}
          className={({ isActive }) =>
            `mb-1 flex w-[100%] items-center justify-start gap-4 rounded-lg px-6 py-2 transition-[box-shadow,_background-color,_color] ${isActive ? "bg-gray-800 text-text shadow" : "text-stone-300 shadow-none hover:bg-gray-800"}`
          }
        >
          {({ isActive }) => (
            <>
              <MdAddCircle
                className={`size-7 ${isActive ? "text-primary-light" : "text-gray-400"}`}
              />
              <p
                className={`font-semibold ${isActive ? "text-text" : "text-gray-400"}`}
              >
                Matches
              </p>
            </>
          )}
        </NavLink>

        {routes.map((route, index) => (
          <NavRoutes key={index} {...route} />
        ))}
        <div className="mt-4 flex size-full items-center justify-center border-t border-border p-4">
          <ButtonContained onClick={() => window.electron.startOverlay()}>
            <MdPlayArrow className="mr-2 size-5" />
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
        `mb-1 flex w-[100%] items-center justify-start gap-4 rounded-lg px-6 py-2 transition-[box-shadow,_background-color,_color] ${isActive ? "bg-gray-800 text-text shadow" : "text-gray-400 shadow-none hover:bg-gray-800"}`
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
