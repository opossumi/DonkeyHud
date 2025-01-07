import { ButtonContained, Searchbar } from "../../components";
import { useLocation } from "react-router-dom";
import { usePlayers, useTeams } from "../../hooks";

interface TopBarProps {
  header: string;
  buttonText?: string;
  openForm?: (open: boolean) => void;
}

export const Topbar = ({ header, buttonText, openForm }: TopBarProps) => {
  const location = useLocation();
  const { searchPlayers } = usePlayers();
  const { searchTeams } = useTeams();

  return (
    <div
      id="TopBar"
      className="relative flex items-center justify-between border-b border-border p-4"
    >
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-4">
          <h2 className="font-bold capitalize">{header}</h2>
          {location.pathname === "/players" && (
            <Searchbar dataSearch={searchPlayers} />
          )}
          {location.pathname === "/teams" && (
            <Searchbar dataSearch={searchTeams} />
          )}
        </div>
        {openForm && (
          <ButtonContained onClick={() => openForm(true)}>
            Create {buttonText}
          </ButtonContained>
        )}
      </div>
    </div>
  );
};
