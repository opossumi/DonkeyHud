import { useState } from "react";
import { PageContainer } from "./PageContainer";
import { NavLogo } from "../Sidebar/NavLogo";
import { RouteSelect } from "../Sidebar/RouteSelect";
import { Drawer } from "../../components/Drawer";
import { Plan } from "../Sidebar/Plan";
import { AppFrame } from "./AppFrame";

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
      className="relative flex h-full w-full flex-col overflow-hidden text-textcolor lg:w-[calc(100%-210px)]"
    >
      <Drawer open={drawerOpen} onClose={() => setDrawerOpen(false)}>
        {drawerContent}
      </Drawer>
      <AppFrame toggleDrawer={setDrawerOpen} />
      <PageContainer />
    </main>
  );
};
