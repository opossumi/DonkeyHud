import { useState } from "react";
import { PageContainer } from "./PageContainer";
import { NavLogo } from "../Sidebar/NavLogo";
import { RouteSelect } from "../Sidebar/RouteSelect";
import { Drawer } from "../../components/Drawer";
import { AppFrame } from "./AppFrame";
import { AccountToggle } from "../Sidebar/AccountControls";

export const MainPanel = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerContent = (
    <div
      className="relative flex size-full flex-col justify-between bg-background-secondary"
      onClick={() => setDrawerOpen(false)}
      onKeyDown={() => setDrawerOpen(false)}
    >
      <div>
        <NavLogo />
        <RouteSelect />
      </div>
      <AccountToggle />
    </div>
  );

  return (
    <main
      id="MainPanel"
      className="text-textcolor relative flex h-full w-full shrink-0 flex-col overflow-hidden bg-background-secondary lg:w-[calc(100%-210px)]"
    >
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
      <AppFrame toggleDrawer={setDrawerOpen} />
      <div className="size-full lg:pb-4 lg:pr-4">
        <PageContainer />
      </div>
    </main>
  );
};
