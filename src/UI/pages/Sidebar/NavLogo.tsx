import Logo from "../../assets/Logo.png";
import { NavLink } from "react-router-dom";

export const NavLogo = () => {
  return (
    <NavLink
      id="HomeLogo"
      to="/"
      className="relative flex h-28 w-full shrink-0 items-center justify-center gap-2 border-b border-border transition-colors"
    >
      <img
        src={Logo}
        alt="Logo"
        className="noDrag relative flex size-28 p-0.5"
      />
    </NavLink>
  );
};

export { Logo };
