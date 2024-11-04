import { PlayerSilhouette } from "./PlayersPage";
import { PlayerProps } from "./PlayersPage";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";

interface PlayerCardProps {
  player: PlayerProps;
  deletePlayer: (id: string) => void;
  onEdit?: (player: PlayerProps) => void; // Added onEdit prop
}

export const PlayerCard = ({
  player,
  deletePlayer,
  onEdit,
}: PlayerCardProps) => {
  const [isCopied, setIsCopied] = useState(false); // Flag to track copy state

  const handleCopyClick = (steamId: string) => {
    navigator.clipboard.writeText(steamId);
    setIsCopied(true); // Set copied flag to true
    setTimeout(() => {
      setIsCopied(false); // Reset copied flag after timeout
    }, 1250);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(player); // Call onEdit prop function if provided
    }
  };

  return (
    <div className="relative flex h-36 w-full bg-background2 px-4 py-2">
      <div className="flex w-full flex-col">
        <img
          className="absolute bottom-0 right-0 h-full"
          src={player.avatar ? player.avatar : PlayerSilhouette}
          alt="Player Avatar"
        ></img>
        <h4>{player.alias}</h4>
        {player.real_name && (
          <p className="text-text-secondary">{player.real_name}</p>
        )}
        {player.team && <h6>{player.team}</h6>}
        <div className="flex justify-between gap-2">
          <button
            onClick={() => handleCopyClick(player.steam_id)}
            className="inline-flex min-w-[115px] items-center justify-center rounded bg-primary px-2 py-1 text-sm font-semibold text-text transition-colors hover:bg-primary-dark"
          >
            {!isCopied && player.steam_id}
            {isCopied && "Copied!"}
          </button>
          <div className="inline-flex">
            <button
              className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-sky-400/50 bg-background p-2 px-4 py-1 text-sky-400 transition-colors hover:border-sky-600/50 hover:text-sky-600"
              onClick={() => handleEditClick()}
            >
              <EditIcon />
            </button>
            <button
              className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-sky-400/50 bg-background p-2 px-4 py-1 text-sky-400 transition-colors hover:border-sky-600/50 hover:text-sky-600"
              onClick={() => deletePlayer(player.id)}
            >
              <Delete />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
