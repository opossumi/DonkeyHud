import { Sidebar } from "../Sidebar";
import { MainPanel } from "../MainPanel";
import { useThemes } from "../../hooks";
export const AdminPanel = () => {
  const { theme } = useThemes();
  return (
    <div
      id="AdminPanel"
      className={`${theme} flex h-screen w-screen bg-background-secondary text-text`}
    >
      <Sidebar />
      <MainPanel />
    </div>
  );
};
