import React, { useState } from "react";
import { Sidebar } from "../Sidebar";
import { MainPanel } from "../MainPanel";
import { Outlet, useLocation } from "react-router-dom";

export const AdminPanel = () => {
  const location = useLocation();
  return location.pathname === "/hud" ? (
    <Outlet />
  ) : (
    <div
      id="AdminPanel"
      className="dark min-h-full grid-cols-[210px,_1fr] bg-background lg:grid"
    >
      <Sidebar />
      <MainPanel />
    </div>
  );
};
