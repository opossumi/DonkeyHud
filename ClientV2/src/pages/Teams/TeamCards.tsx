import React from 'react'
import { TeamProps } from './TeamsPage';
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

interface TeamCardProps {
    team: TeamProps;
    deleteTeam: (id: string) => void;
    onEdit?: (team: TeamProps) => void; // Added onEdit prop
  }

export const TeamCards = ({team, deleteTeam, onEdit }: TeamCardProps) => {
    const [isCopied, setIsCopied] = useState(false); // Flag to track copy state

    const handleCopyClick = (id: string) => {
        navigator.clipboard.writeText(id);
        setIsCopied(true); // Set copied flag to true
        setTimeout(() => {
        setIsCopied(false); // Reset copied flag after timeout
        }, 1250);
    };

    const handleEditClick = () => {
        if (onEdit) {
          onEdit(team); // Call onEdit prop function if provided
        }
      };


    return (
        <Card sx={{ display: "flex", position: "relative", width: {xs: "100%"}, height: "150px"  }}>
          <Box sx={{ display: "flex", flexDirection: "column", width: { xs: "100%", xl: "50%" } }}>
            <CardContent sx={{ flex: "1 0 auto", display: "flex", flexDirection: "column", justifyContent: "space-evenly" }}>
              <Typography component="div" variant="h5">
                {team.name}
              </Typography>
              <Typography variant="subtitle2" component="div" sx={{ color: "text.secondary" }}>
                {team.shortName}
              </Typography>
                <Button
                    variant="contained" // Change variant based on copied flag
                    color={isCopied ? "success" : "primary"} // Change color based on copied flag
                    sx={{ width: "100%", fontSize: "12px" }}
                    onClick={() => handleCopyClick(team.id)}
                >
                    {!isCopied && team.id}
                    {isCopied && "Copied!"}
                </Button>
            </CardContent>
          </Box>
            <CardMedia
                component="img"
                sx={{ width: 151 }}
                image={team.logo}
                alt={team.name}
            />
          <Box sx={{ position: "absolute", display: "flex", flexDirection: "column", alignItems: 'end', top: 0, right: 0, width: "50%", fontSize: "12px", borderRadius: "6px", color: "text.primary" }}>
            <IconButton aria-label="edit" sx={{ color: "text.primary", p: "4px" }} onClick={() => handleEditClick()}>
              <EditIcon />
            </IconButton>
            <IconButton aria-label="delete" onClick={() => deleteTeam(team.id)} sx={{ color: "text.primary", p: "4px" }}>
              <Delete />
            </IconButton>
          </Box>
        </Card>
      );
}
