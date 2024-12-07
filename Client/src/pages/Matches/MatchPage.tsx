import React, { useEffect, useState } from "react";
import { Match } from "../../api/interfaces";
import { MatchCard } from "./MatchCard";
import { Team } from "../../api/interfaces";
import { getTeams } from "../Teams";
import { MatchesTable } from "./MatchesTable";
import { MatchForm } from "./MatchForm";
// import { getCurrentMatch } from "../../HUD/HUD";
import axios from "axios";
import { socket } from "../../App";
import { ButtonContained } from "../Components";
import { PORT, HOST } from "../../App";

export const getCurrentMatch = async () => {
  const match = await axios.get(`${HOST}:${PORT}/current_match`);
  const currentMatch: Match = match.data;
  return currentMatch;
};

export const MatchTypes = ["bo1", "bo2", "bo3", "bo5"];
export const maps = [
  "de_mirage",
  "de_cache",
  "de_inferno",
  "de_dust2",
  "de_train",
  "de_overpass",
  "de_nuke",
  "de_vertigo",
  "de_ancient",
  "de_anubis",
];

export const getMatches = async () => {
  const matches = await axios.get(`${HOST}:${PORT}/matches`);
  if (axios.isAxiosError(matches)) {
    console.log("Error fetching matches data");
    return [];
  }
  if (!matches) {
    return [];
  }
  // console.log('Matches data:', matches.data)
  return matches.data;
};

export const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null); // Store selected player for editing
  const [open, setOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  // Fetch teams data when the component mounts
  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);
    });

    getMatches().then((data) => {
      setMatches(data);
    });

    const loadMatch = async () => {
      const matchData = await getCurrentMatch();
      if (!matchData) {
        setCurrentMatch(null);
        return;
      }
      setCurrentMatch(matchData);
    };

    loadMatch();

    socket.on("match", (data) => {
      loadMatch();
    });
  }, []);

  const fetchMatches = async () => {
    const data = await getMatches();
    setMatches(data);
  };

  const handleCreateMatch = async (match: Match) => {
    setIsLoading(true);
    console.log(match);
    await axios.post(`${HOST}:${PORT}/matches`, match);
    await getMatches().then((data) => {
      setMatches(data);
    });
    setIsLoading(false);
  };

  const handleUpdateMatch = async (match: Match) => {
    setIsLoading(true);
    await axios.put(`${HOST}:${PORT}/matches/${match.id}`, match);
    await getMatches().then((data) => {
      setMatches(data);
    });
    setIsLoading(false);
  };

  const handleEditMatch = (match: Match) => {
    setOpen(true);
    setIsEditing(true);
    setSelectedMatch(match);
    console.log(isEditing);
  };

  const handleDeleteMatch = async (id: string) => {
    setIsLoading(true);
    await axios.delete(`${HOST}:${PORT}/matches/${id}`);
    await getMatches().then((data) => {
      setMatches(data);
    });
    setIsLoading(false);
  };

  return (
    <div className="relative flex size-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Matches</h1>
        <ButtonContained onClick={() => setOpen(true)}>
          Create Match
        </ButtonContained>
      </div>
      {currentMatch && (
        <MatchCard match={currentMatch} refreshMatches={getMatches} />
      )}
      <MatchesTable
        matches={matches}
        deleteMatch={handleDeleteMatch}
        onEdit={handleEditMatch}
        refreshMatches={fetchMatches}
      />
      {isEditing && selectedMatch ? (
        <MatchForm
          teams={teams}
          match={selectedMatch}
          updateMatch={handleUpdateMatch}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          setOpen={setOpen}
          open={open}
          refreshMatches={fetchMatches}
        />
      ) : (
        <MatchForm
          teams={teams}
          createMatch={handleCreateMatch}
          setOpen={setOpen}
          open={open}
          refreshMatches={fetchMatches}
        />
      )}
    </div>
  );
};
