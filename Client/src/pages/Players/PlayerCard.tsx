import { PlayerSilhouette } from "./PlayersPage";
import { PlayerProps } from './PlayersPage';
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import EditIcon from "@mui/icons-material/Edit";
import Delete from "@mui/icons-material/Delete";
import Button from "@mui/material/Button";
import { useState } from "react";

interface PlayerCardProps {
  player: PlayerProps;
  deletePlayer: (id: string) => void;
  onEdit?: (player: PlayerProps) => void; // Added onEdit prop
}

export const PlayerCard = ({ player, deletePlayer, onEdit }: PlayerCardProps) => {
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
    <Card sx={{ display: "flex", position: "relative", width: {xs: "100%"}, maxWidth: '400px', height: "150px"}}>
      <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", xl: "50%" } }}>
        <CardContent sx={{ flex: "1 0 auto" }}>
          <Typography component="div" variant="h5">
            {player.alias}
          </Typography>
          <Typography variant="subtitle2" component="div" sx={{ color: "text.secondary" }}>
            {player.real_name}
          </Typography>
          {player.team && <Typography variant="subtitle1" component="div">{player.team}</Typography>}
          <Button
            variant="contained" // Change variant based on copied flag
            color={isCopied ? "success" : "primary"} // Change color based on copied flag
            sx={{ width: "100%", fontSize: "12px" }}
            onClick={() => handleCopyClick(player.steam_id)}
          >
            {!isCopied && player.steam_id}
            {isCopied && "Copied!"}
          </Button>
        </CardContent>
      </Box>
      <Box
        sx={{
          position: "relative",
          display: { xs: "none", xl: "flex" },
          width: { xs: "0%", xl: "50%" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CardMedia
          component="img"
          sx={{ width: "100%", height: "100%", objectFit: "contain", borderRadius: "6px" }}
          image={player.avatar ? player.avatar : PlayerSilhouette}
          alt={player.avatar ? player.alias : "Player"}
        />
      </Box>
      <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: 'end', top: 0, right: 0, width: "50%", fontSize: "12px", borderRadius: "6px", color: "text.primary" }}>
        <IconButton aria-label="edit" sx={{ color: "text.primary", p: "4px" }} onClick={() => handleEditClick()}>
          <EditIcon />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deletePlayer(player.id)} sx={{ color: "text.primary", p: "4px" }}>
          <Delete />
        </IconButton>
      </Box>
    </Card>
  );
};