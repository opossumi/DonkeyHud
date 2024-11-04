import React, { useState } from "react";
import { Topbar } from "./Topbar";
import { PageContainer } from "./PageContainer";
import { NavLogo } from "../Sidebar/NavLogo";
import { RouteSelect } from "../Sidebar/RouteSelect";
import { Drawer } from "../Components/Drawer";
import { Plan } from "../Sidebar/Plan";

export const MainPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerContent = (
    <div
      className="relative flex size-full flex-col justify-between bg-background2"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <div>
        <NavLogo />
        <RouteSelect />
      </div>
      <Plan />
    </div>
  );

  return (
    <main
      id="MainPanel"
      className="relative flex h-full flex-col bg-background text-textcolor shadow"
    >
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>

      <Topbar toggleDrawer={setDrawerOpen} />
      <PageContainer />
    </main>
  );
};
