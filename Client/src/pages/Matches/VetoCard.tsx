import React, { useEffect, useState } from "react";
import { Veto } from "../../api/interfaces";
import { maps } from "./MatchPage";
import { Team } from "../../api/interfaces";

interface VetoCardProps {
  index: number;
  veto: Veto;
  leftTeamId: string | null;
  rightTeamId: string | null;
  teams: Team[];
  onVetoChange: (index: number, key: keyof Veto, value: any) => void;
}

export const VetoCard: React.FC<VetoCardProps> = ({
  index,
  veto,
  leftTeamId,
  rightTeamId,
  teams,
  onVetoChange,
}) => {
  const [teamID, setTeamID] = useState<string | null>(
    veto.type === "decider" ? "decider" : veto.teamId || ""
  );
  const [leftTeam, setLeftTeam] = useState<Team | undefined>(undefined);
  const [rightTeam, setRightTeam] = useState<Team | undefined>(undefined);
  const [type, setType] = useState<"ban" | "pick" | "decider">(
    veto?.type || "ban"
  );
  const [mapName, setMapName] = useState<string | null>(veto?.mapName || null);
  const [side, setSide] = useState<"CT" | "T" | "NO">(veto.side);
  const [reverseSide, setReverseSide] = useState<boolean | null>(
    veto?.reverseSide || false
  );

  useEffect(() => {
    setLeftTeam(teams.find((team) => team._id === leftTeamId));
    setRightTeam(teams.find((team) => team._id === rightTeamId));
    setTeamID(veto.teamId);
    setMapName(veto.mapName);
    setReverseSide(veto.reverseSide ?? false);
    setSide(veto.side);
  }, [veto, teams, leftTeamId, rightTeamId]);

  const handleTeamSelect = (id: string) => {
    setTeamID(id);
    onVetoChange(index, "teamId", id);
  };

  return (
    <div
      className="flex flex-col items-center justify-center gap-4 p-1"
      key={index}
    >
      <h3 className="border-b border-zinc-500 font-semibold">
        Veto {index + 1}
      </h3>
      <div className="grid grid-cols-2 gap-2">
        <form className="w-full">
          <label>Type</label>
          <select
            value={type}
            onChange={(e) => {
              const newType = e.target.value as "ban" | "pick" | "decider";
              setType(newType);
              onVetoChange(index, "type", newType);
            }}
            name="Type"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="ban">Ban</option>
            <option value="pick">Pick</option>
            <option value="decider">Decider</option>
          </select>
        </form>

        <form className="w-full">
          <label>{type === "decider" ? "Decider" : "Team"}</label>
          <select
            disabled={type === "decider"}
            value={type === "decider" ? "decider" : teamID || ""}
            onChange={(e) => handleTeamSelect(e.target.value)}
            name={type === "decider" ? "Decider" : "Team"}
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="" disabled>
              Team
            </option>
            {type === "decider" && <option value="decider">Decider</option>}
            {leftTeamId && leftTeam && (
              <option value={leftTeamId}>{leftTeam.name}</option>
            )}
            {rightTeamId && rightTeam && (
              <option value={rightTeamId}>{rightTeam.name}</option>
            )}
          </select>
        </form>

        <form className="w-full">
          <label>Map</label>
          <select
            value={mapName || ""}
            onChange={(e) => {
              const newMapName = e.target.value;
              setMapName(newMapName);
              onVetoChange(index, "mapName", newMapName);
            }}
            name="Map"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="" disabled>
              Map
            </option>
            {maps.map((map) => (
              <option key={map} value={map}>
                {map}
              </option>
            ))}
          </select>
        </form>

        <form className="w-full">
          <label>Side</label>
          <select
            value={side}
            onChange={(e) => {
              const newSide = e.target.value as "CT" | "T" | "NO";
              setSide(newSide);
              onVetoChange(index, "side", newSide);
            }}
            name="Side"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="NO">No Side</option>
            <option value="CT">CT</option>
            <option value="T">T</option>
          </select>
        </form>

        <form className="col-span-2 flex w-full flex-col items-center justify-center">
          <label htmlFor={`reverseSide-${index}`}>Reverse Side</label>
          <input
            type="checkbox"
            id={`reverseSide-${index}`}
            checked={reverseSide === true}
            onChange={(e) => {
              const newReverseSide = e.target.checked;
              setReverseSide(newReverseSide);
              onVetoChange(index, "reverseSide", newReverseSide);
            }}
          />
        </form>
      </div>
    </div>
  );
};
