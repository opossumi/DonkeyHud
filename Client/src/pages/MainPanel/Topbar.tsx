import React from "react";
import CalendarMonthIcon from "@mui/icons-material/CalendarMonth";
import { Search } from "./Search";
import MenuIcon from "@mui/icons-material/Menu";
import { NavLink } from "react-router-dom";
import GitHubIcon from "@mui/icons-material/GitHub";

interface TopbarProps {
  toggleDrawer: (
    open: boolean,
  ) => (event: React.KeyboardEvent | React.MouseEvent) => void;
}

export const Topbar = ({ toggleDrawer }: TopbarProps) => {
  return (
    <div
      id="TopBar"
      className="z-[1] border-b border-border bg-background2 p-4 lg:bg-background"
    >
      <div className="flex items-center justify-between p-0.5">
        <div className="flex items-center justify-center gap-2">
          <button
            className="flex items-center justify-center lg:hidden"
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </button>
          <NavLink to="/" className="lg:hidden">
            <span className="text-2xl font-bold text-primary-light">OPEN</span>
            <span className="text-2xl font-bold">HUD</span>
          </NavLink>
        </div>
        <div className="flex h-full items-center justify-center gap-4">
          <Search />
          <a
            href="https://github.com/JohnTimmermann/OpenHud"
            target="_blank"
            className="text-primary-light transition-colors hover:text-secondary"
            rel="noreferrer"
          >
            <GitHubIcon />
          </a>
        </div>
        {/* <button className='flex text-textcolor text-sm items-center gap-2 p-0.5 bg-button hover:bg-border px-3 py-1.5 rounded transition-colors'>
                <CalendarMonthIcon/>
                <span className='text-sm'>Schedule a game</span>
            </button> */}
      </div>
    </div>
  );
};
