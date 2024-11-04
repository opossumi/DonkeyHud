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
  return (
    <div className="flex flex-col gap-1 p-1" key={index}>
      <h6>Veto {index + 1}</h6>
      <div className="flex gap-2">
        <form className="w-full">
          <label>Type</label>
          <select
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
          <label>{veto.type === "decider" ? "Decider" : "Team"}</label>
          <select
            disabled={veto.type === "decider"}
            value={veto.type === "decider" ? "decider" : veto.teamId}
            onChange={(e) => onVetoChange(index, "teamId", e.target.value)}
            name={veto.type === "decider" ? "Decider" : "Team"}
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            <option value={leftTeamId ? leftTeamId : ""}>
              {leftTeamId ? leftTeamId : ""}
            </option>
            <option value={rightTeamId ? rightTeamId : ""}>
              {rightTeamId ? rightTeamId : ""}
            </option>
          </select>
        </form>

        <form className="w-full">
          <label>Map</label>
          <select
            value={veto.mapName}
            onChange={(e) => onVetoChange(index, "mapName", e.target.value)}
            name="Map"
            className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
          >
            {maps.map((map) => (
              <option key={map} value={map}>
                {map.substring(3)}
              </option>
            ))}
          </select>
        </form>

        <form className="w-full">
          <label>Side</label>
          <select
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
      </div>
    </div>
  );
};
