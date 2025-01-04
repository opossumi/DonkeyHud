import { useEffect, useState } from "react";
import { MatchCard } from "./MatchCard";
import { Team, Match } from "../../api/types";
import { getTeams } from "../Teams";
import { MatchesTable } from "./MatchesTable";
import { MatchForm } from "./MatchForm";
import axios from "axios";
import { socket } from "../../api/socket";
import { ButtonContained } from "../../components";
import { apiUrl } from "../../api/api";

export const getCurrentMatch = async () => {
  const match = await axios.get(`${apiUrl}/current_match`);
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
  const matches = await axios.get(`${apiUrl}/matches`);
  if (axios.isAxiosError(matches)) {
    console.log("Error fetching matches data");
    return [];
  }
  if (!matches) {
    return [];
  }
  return matches.data;
};

export const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null); // Store selected player for editing
  const [open, setOpen] = useState(false);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  const fetchMatches = async () => {
    const data = await getMatches();
    setMatches(data);
  };
  const fetchTeams = async () => {
    const data = await getTeams();
    setTeams(data);
  };

  useEffect(() => {
    fetchMatches();
    fetchTeams();

    const loadMatch = async () => {
      const matchData = await getCurrentMatch();
      if (!matchData) {
        setCurrentMatch(null);
        return;
      }
      setCurrentMatch(matchData);
    };

    loadMatch();

    socket.on("match", () => {
      loadMatch();
    });
  }, []);

  const handleCreateMatch = async (match: Match) => {
    console.log(match);
    await axios.post(`${apiUrl}/matches`, match);
    fetchMatches();
  };

  const handleUpdateMatch = async (match: Match) => {
    await axios.put(`${apiUrl}/matches/${match.id}`, match);
    fetchMatches();
  };

  const handleEditMatch = (match: Match) => {
    setOpen(true);
    setIsEditing(true);
    setSelectedMatch(match);
  };

  const handleDeleteMatch = async (id: string) => {
    await axios.delete(`${apiUrl}/matches/${id}`);
    fetchMatches();
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
