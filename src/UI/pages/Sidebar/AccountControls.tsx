import { useState } from "react";
import {
  MdAccountCircle,
  MdLogout,
  MdSettings,
  MdDarkMode,
  MdLightMode,
  MdOutlineColorLens,
} from "react-icons/md";
import { Dialog } from "../../components";
import { useUser } from "../../hooks";
import { Account } from "../Account";
import { useThemes } from "../../hooks/useThemes";
import { useNavigate } from "react-router-dom";

export const AccountToggle = () => {
  const [open, setOpen] = useState(false);
  const { logoutUser, user } = useUser();
  const { theme, toggleTheme } = useThemes();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/");
  };

  return (
    <>
      <Dialog open={open} onClose={() => setOpen(false)}>
        <Account />
      </Dialog>
      <div className="flex items-center justify-between rounded-lg bg-background-primary p-2 text-text">
        <div className="flex gap-2">
          {!user?.is_anonymous && (
            <button
              onClick={() => setOpen(true)}
              disabled
              className="relative flex items-center gap-2 overflow-hidden rounded p-1 text-stone-600 transition-colors"
            >
              <MdAccountCircle className="size-5 shrink-0 rounded-full" />
            </button>
          )}
          <button
            disabled
            className="relative flex items-center gap-2 overflow-hidden rounded p-1 text-stone-600 transition-colors"
          >
            <MdSettings className="size-5 shrink-0 rounded-full" />
          </button>
          <button
            className="relative flex items-center gap-2 overflow-hidden rounded p-1 transition-colors hover:bg-border"
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
        <button
          onClick={handleLogout}
          disabled
          className="relative flex items-center gap-2 overflow-hidden rounded p-1 text-stone-600 transition-colors"
        >
          <MdLogout className="size-5 shrink-0 rounded-full" />
        </button>
      </div>
    </>
  );
};
