import { useState } from "react";
import {
  MdSettings,
  MdDarkMode,
  MdLightMode,
  MdOutlineColorLens,
  MdLogout,
} from "react-icons/md";
import { Dialog } from "../../components";
import { useThemes } from "../../hooks/useThemes";
import { Settings } from "../Settings";

export const AccountToggle = () => {
  const [open, setOpen] = useState(false);
  const { theme, toggleTheme } = useThemes();

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Settings />
      </Dialog>
      <div className="flex items-center justify-between rounded-lg bg-background-primary p-2 text-text">
        <div className="flex gap-1">
          <button
            onClick={() => setOpen(true)}
            className="relative flex items-center rounded p-1 transition-colors hover:bg-border"
          >
            <MdSettings className="size-5 shrink-0 rounded-full" />
          </button>
          <button
            className="relative flex items-center rounded p-1 transition-colors hover:bg-border"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <MdDarkMode className="size-5 shrink-0 rounded-full" />
            ) : theme === "light" ? (
              <MdLightMode className="size-5 shrink-0 rounded-full" />
            ) : (
              <MdOutlineColorLens className="size-5 shrink-0 rounded-full" />
            )}
          </button>
        </div>
        <div className="relative flex items-center justify-center rounded-lg p-1 transition-colors hover:bg-red-400">
          <button>
            <MdLogout className="size-5 shrink-0 rounded-full" />
          </button>
        </div>
      </div>
    </>
  );
};
