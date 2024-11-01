import React, { useState } from "react";
import { AccountToggle } from "./AccountToggle";
import { RouteSelect } from "./RouteSelect";
import { Plan } from "./Plan";

export const Sidebar: React.FC = () => {
  return (
    <nav
      id="sidebar"
      className="hidden divide-y divide-border border-r border-border bg-background2 lg:block"
    >
      <div className="fixed h-[calc(100vh-32px-48px)] w-[210px] divide-y divide-border">
        <AccountToggle />
        <RouteSelect />
      </div>
      <Plan />
    </nav>
  );
};
