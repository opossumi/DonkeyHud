import { Outlet } from "react-router-dom";

export const PageContainer = () => {
  return (
    <div
      id="PageContainer"
      className="relative flex size-full items-center justify-center overflow-y-auto rounded-tl-lg bg-background px-4"
    >
      <Outlet />
    </div>
  );
};
