import { PlayerSilhouette } from "./PlayersPage";
import { PlayerProps } from "./PlayersPage";
import Box from "@mui/material/Box";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import { useState } from "react";
import { ButtonContained } from "../Components";

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
    <div className="relative flex h-36 w-full min-w-[275px] max-w-[350px] bg-background2">
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
        }}
      >
        <CardContent>
          <img
            className="absolute bottom-0 right-0 h-full"
            src={player.avatar ? player.avatar : PlayerSilhouette}
            alt="Player Avatar"
          ></img>
          <Typography component="div" variant="h5">
            {player.alias}
          </Typography>
          <Typography
            variant="subtitle2"
            component="div"
            sx={{ color: "text.secondary" }}
          >
            {player.real_name}
          </Typography>
          {player.team && (
            <Typography variant="subtitle1" component="div">
              {player.team}
            </Typography>
          )}
          <div className="flex justify-between gap-2">
            <ButtonContained
              color={isCopied ? "success" : "primary"} // Change color based on copied flag
              onClick={() => handleCopyClick(player.steam_id)}
            >
              {!isCopied && player.steam_id}
              {isCopied && "Copied!"}
            </ButtonContained>
            <div className="inline-flex">
              <button
                className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-secondary/50 bg-background p-2 px-4 py-1 text-secondary hover:border-primary/50 hover:text-primary-light"
                onClick={() => handleEditClick()}
              >
                <EditIcon />
              </button>
              <button
                className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-secondary/50 bg-background p-2 px-4 py-1 text-secondary transition-colors hover:border-primary/50 hover:text-primary-light"
                onClick={() => deletePlayer(player.id)}
              >
                <Delete />
              </button>
            </div>
          </div>
        </CardContent>
      </Box>
    </div>
  );
};
