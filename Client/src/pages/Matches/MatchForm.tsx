import React, { useEffect, useState } from "react";
import { Match, Veto } from "../../api/interfaces";
import { MatchTypes, maps } from "./MatchPage";
import { TeamProps } from "../Teams";
import { VetoCard } from "./VetoCard";
import Button from "@mui/material/Button";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  Paper,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
} from "@mui/material";

interface MatchFormProps {
  teams: TeamProps[];
  match?: Match;
  createMatch?: (match: Match) => void;
  updateMatch?: (match: Match) => void;
  isEditing?: boolean;
  onCancel?: () => void; // Optional prop with default behavior (e.g., handleReset)
  open: boolean;
  setOpen: (open: boolean) => void;
}

/* 
  TODO: Need to fix the editing functionality
  */

export const MatchForm = ({
  teams,
  match,
  createMatch,
  updateMatch,
  onCancel,
  open,
  setOpen,
  isEditing,
}: MatchFormProps) => {
  const [matchType, setMatchType] = useState<"bo1" | "bo2" | "bo3" | "bo5">(
    "bo1",
  );
  const [leftTeamId, setLeftTeamId] = useState<string | null>(null);
  const [leftTeamWins, setLeftTeamWins] = useState<number>(0);
  const [rightTeamId, setRightTeamId] = useState<string | null>(null);
  const [rightTeamWins, setRightTeamWins] = useState<number>(0);
  const [currentMatch, setCurrentMatch] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added for error message
  const [vetos, setVetos] = useState<Veto[]>(
    Array(9)
      .fill(null)
      .map(() => ({
        teamId: "",
        mapName: maps[0],
        side: "NO",
        type: "ban",
        mapEnd: false,
      })),
  );

  useEffect(() => {
    if (isEditing && match) {
      setLeftTeamId(match.left.id);
      console.log("Left team id:", match.left.id);
      setRightTeamId(match.right.id);
      setMatchType(match.matchType);
      setCurrentMatch(match.current);
      setVetos(match.vetos);
    }
  }, [isEditing, match]);

  const validateForm = () => {
    let isValid = true;
    setErrorMessage(""); // Clear any previous error message

    if (!leftTeamId || !rightTeamId) {
      setErrorMessage("Please select both teams."); // Set error message
      isValid = false;
    }
    return isValid;
  };

  const handleVetoChange = (index: number, key: keyof Veto, value: any) => {
    const updatedVetos = [...vetos];
    updatedVetos[index] = { ...updatedVetos[index], [key]: value };
    setVetos(updatedVetos);
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Early return if validation fails

    setIsSubmitting(true);
    const newMatch: Match = {
      id: match?.id || "",
      left: { id: leftTeamId, wins: leftTeamWins },
      right: { id: rightTeamId, wins: rightTeamWins },
      matchType: matchType as "bo1" | "bo2" | "bo3" | "bo5",
      current: currentMatch,
      vetos: vetos,
    };

    if (isEditing && updateMatch) {
      await updateMatch(newMatch);
    } else if (createMatch) {
      await createMatch(newMatch);
    }

    setIsSubmitting(false);
    setOpen(false);
    handleReset();
  };

  const handleCancel = () => {
    setOpen(false);
    handleReset(); // Reset form fields
    if (onCancel) {
      onCancel(); // Call onCancel prop function if provided
    }
  };

  const handleReset = () => {
    setLeftTeamId(null);
    setRightTeamId(null);
    setCurrentMatch(false);
    setMatchType("bo1");
    setErrorMessage("");
  };

  return (
    <Dialog onClose={handleCancel} open={open} maxWidth="lg" fullWidth>
      <DialogTitle>
        {isEditing
          ? `Updating: ${leftTeamId} vs ${rightTeamId}`
          : "Create Match"}
      </DialogTitle>
      <DialogContent>
        <Box marginY={2} sx={{ display: "flex", gap: 3 }}>
          <FormControl fullWidth>
            <InputLabel>Team one</InputLabel>
            <Select
              value={leftTeamId || ""}
              onChange={(e) => setLeftTeamId(e.target.value)}
              label="Team one"
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography variant="h3">vs</Typography>

          <FormControl fullWidth>
            <InputLabel>Team two</InputLabel>
            <Select
              value={rightTeamId || ""}
              onChange={(e) => setRightTeamId(e.target.value)}
              label="Team two"
            >
              {teams.map((team) => (
                <MenuItem key={team.id} value={team.id}>
                  {team.name}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <FormControl fullWidth sx={{ marginBottom: 2 }}>
          <InputLabel>Match Type</InputLabel>
          <Select
            value={matchType}
            onChange={(e) =>
              setMatchType(e.target.value as "bo1" | "bo2" | "bo3" | "bo5")
            }
            label="Match Type"
          >
            {MatchTypes.map((type) => (
              <MenuItem key={type} value={type}>
                {type}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <Typography variant="h6">Set Vetos:</Typography>
        {match
          ? match.vetos.map((veto, index) => (
              <VetoCard
                key={index}
                index={index}
                veto={veto}
                leftTeamId={leftTeamId}
                rightTeamId={rightTeamId}
                onVetoChange={handleVetoChange}
              />
            ))
          : vetos.map((veto, index) => (
              <VetoCard
                key={index}
                index={index}
                veto={veto}
                leftTeamId={leftTeamId}
                rightTeamId={rightTeamId}
                onVetoChange={handleVetoChange}
              />
            ))}
      </DialogContent>
      <DialogActions>
        {isSubmitting ? (
          <Button variant="contained" disabled>
            Submitting...
          </Button>
        ) : (
          <Button variant="contained" onClick={handleSubmit}>
            Submit
          </Button>
        )}
        <Button variant="contained" onClick={handleReset}>
          Reset
        </Button>
        {isEditing && ( // Conditionally render Cancel button if onCancel prop is provided
          <Button variant="outlined" color="secondary" onClick={handleCancel}>
            Cancel
          </Button>
        )}
        {errorMessage && (
          <Typography variant="body2" color="error" sx={{ my: 1 }}>
            {errorMessage}
          </Typography>
        )}
      </DialogActions>
    </Dialog>
  );
};
