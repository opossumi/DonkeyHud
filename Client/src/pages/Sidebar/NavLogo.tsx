import React from "react";
import Logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";

export const NavLogo = () => {
  return (
    <NavLink
      to="/"
      className="relative flex w-full items-center gap-2 border-b border-border transition-colors"
    >
      <div className="flex size-full justify-center">
        <img src={Logo} alt="Logo" className="relative flex w-1/2 p-0.5" />
      </div>
    </NavLink>
  );
};

export { Logo };
