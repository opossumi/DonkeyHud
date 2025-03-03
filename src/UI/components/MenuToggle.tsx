import { MdMenu } from "react-icons/md";
import { useDrawer } from "../hooks";

export const MenuToggle = () => {
  const { toggleDrawer } = useDrawer();
  return (
    <div className="flex w-full items-center pl-3">
      <button
        className="noDrag flex items-center rounded-full p-1 hover:bg-background-light"
        onClick={toggleDrawer}
      >
        <MdMenu className="noDrag size-7" />
      </button>
    </div>
  );
};
