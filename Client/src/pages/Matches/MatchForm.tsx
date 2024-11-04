import React, { useEffect, useState } from "react";
import { Match, Veto } from "../../api/interfaces";
import { MatchTypes, maps } from "./MatchPage";
import { TeamProps } from "../Teams";
import { VetoCard } from "./VetoCard";
import { Dialog } from "../Components/Dialog";
import { ButtonContained } from "../Components";

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
    <Dialog onClose={handleCancel} open={open}>
      <div className="flex flex-1 border-b border-zinc-800">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing
            ? `Updating: ${leftTeamId} vs ${rightTeamId}`
            : "Create Match"}
        </h3>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll p-6">
        <div className="my-2 flex items-center justify-center gap-3">
          <form className="w-full flex-col bg-background">
            <label htmlFor="Team One" className="text-text">
              Team One
            </label>
            <select
              value={leftTeamId || ""}
              onChange={(e) => setLeftTeamId(e.target.value)}
              name="Team One"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
              defaultValue={"Team One"}
            >
              <option selected>Team One</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id} className="p-4 text-text">
                  {team.name}
                </option>
              ))}
            </select>
          </form>
          <h2 className="font-semibold">VS</h2>

          <form className="w-full flex-col bg-background">
            <label htmlFor="" className="text-text">
              Team Two
            </label>
            <select
              value={rightTeamId || ""}
              onChange={(e) => setRightTeamId(e.target.value)}
              name="Team Two"
              className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
              defaultValue={"Team Two"}
            >
              <option selected>Team Two</option>
              {teams.map((team) => (
                <option key={team.id} value={team.id} className="p-4 text-text">
                  {team.name}
                </option>
              ))}
            </select>
          </form>
        </div>

        <form className="w-full flex-col bg-background">
          <label htmlFor="Match Type" className="text-text">
            Match Type
          </label>
          <select
            value={matchType}
            onChange={(e) =>
              setMatchType(e.target.value as "bo1" | "bo2" | "bo3" | "bo5")
            }
            name="Match Type"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            {MatchTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
        </form>

        <h5 className="mt-4">Set Vetos:</h5>
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
      </div>
      <div className="inline-flex w-full justify-end gap-2 border-t border-zinc-800 p-2">
        {errorMessage && (
          <p className="my-1 text-end text-red-500">{errorMessage}</p>
        )}
        <div className="mt-1 flex justify-end gap-1">
          {isSubmitting ? (
            <ButtonContained disabled>Submitting...</ButtonContained>
          ) : (
            <ButtonContained onClick={handleSubmit}>Submit</ButtonContained>
          )}
          <ButtonContained onClick={handleReset}>Reset</ButtonContained>
          {isEditing && (
            <ButtonContained color="secondary" onClick={handleCancel}>
              Cancel
            </ButtonContained>
          )}
        </div>
      </div>
    </Dialog>
  );
};
