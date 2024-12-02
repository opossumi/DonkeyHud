import React, { useEffect, useState } from "react";
import { Veto } from "../../api/interfaces";
import { maps } from "./MatchPage";

interface VetoCardProps {
  index: number;
  veto: Veto;
  leftTeamId: string | null;
  rightTeamId: string | null;
  onVetoChange: (index: number, key: keyof Veto, value: any) => void;
}

export const VetoCard = ({
  index,
  veto,
  leftTeamId,
  rightTeamId,
  onVetoChange,
}: VetoCardProps) => {
  const [teamID, setTeamID] = useState<string | null>(
    veto.type === "decider" ? "decider" : veto.teamId || "",
  );

  useEffect(() => {
    setTeamID(veto.type === "decider" ? "decider" : veto.teamId || "");
  }, [veto.type, veto.teamId, veto.mapName]);

  const handleTeamSelect = (id: string) => {
    setTeamID(id);
    onVetoChange(index, "teamId", id);
  };

  return (
    <div className="flex flex-col gap-1 p-1">
      <h6>Veto {index + 1}</h6>
      <div className="flex gap-2">
        <form className="w-full">
          <label htmlFor={`type-${index}`}>Type</label>
          <select
            id={`type-${index}`}
            value={veto.type}
            onChange={(e) => onVetoChange(index, "type", e.target.value)}
            name="Type"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="ban">Ban</option>
            <option value="pick">Pick</option>
            <option value="decider">Decider</option>
          </select>
        </form>

        <form className="w-full">
          <label htmlFor={`team-${index}`}>
            {veto.type === "decider" ? "Decider" : "Team"}
          </label>
          <select
            id={`team-${index}`}
            disabled={veto.type === "decider"}
            value={veto.type === "decider" ? "decider" : (teamID ?? "")}
            onChange={(e) => handleTeamSelect(e.target.value)}
            name={veto.type === "decider" ? "Decider" : "Team"}
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="" disabled>
              Select Team
            </option>
            {veto.type === "decider" && (
              <option value="decider">Decider</option>
            )}
            {leftTeamId && <option value={leftTeamId}>{leftTeamId}</option>}
            {rightTeamId && <option value={rightTeamId}>{rightTeamId}</option>}
          </select>
        </form>

        <form className="w-full">
          <label htmlFor={`map-${index}`}>Map</label>
          <select
            id={`map-${index}`}
            value={veto.mapName}
            onChange={(e) => onVetoChange(index, "mapName", e.target.value)}
            name="Map"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="" disabled>
              Select Map
            </option>
            {maps.map((map) => (
              <option key={map} value={map}>
                {map.substring(3)}
              </option>
            ))}
          </select>
        </form>

        <form className="w-full">
          <label htmlFor={`side-${index}`}>Side</label>
          <select
            id={`side-${index}`}
            value={veto.side}
            onChange={(e) => onVetoChange(index, "side", e.target.value)}
            name="Side"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value="NO">No Side</option>
            <option value="CT">CT</option>
            <option value="T">T</option>
          </select>
        </form>

        <form className="flex w-full flex-col items-center justify-center">
          <label htmlFor={`reverseSide-${index}`}>Reverse Side</label>
          <input
            id={`reverseSide-${index}`}
            type="checkbox"
            checked={!!veto.reverseSide}
            onChange={(e) =>
              onVetoChange(index, "reverseSide", e.target.checked)
            }
          />
        </form>
      </div>
    </div>
  );
};
