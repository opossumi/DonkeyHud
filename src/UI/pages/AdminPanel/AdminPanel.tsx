import { Sidebar } from "../Sidebar";
import { MainPanel } from "../MainPanel";
export const AdminPanel = () => {
  return (
    <div id="AdminPanel" className="dark flex h-screen w-screen text-text">
      <Sidebar />
      <MainPanel />
    </div>
  );
};
