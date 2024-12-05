import React, { createContext, useContext, useState, useEffect } from "react";
import { Match, Team } from "../../api/interfaces";
import api from "../../api/api";
import { socket } from "../../App";
import axios from "axios";
import { PORT, HOST } from "../../App";

interface MatchContextProps {
  matches: Match[];
  teams: Team[];
  currentMatch: Match | null;
  fetchMatches: () => void;
}

const MatchContext = createContext<MatchContextProps | undefined>(undefined);

export const getMatches = async () => {
  const matches = await axios.get(`${HOST}:${PORT}/matches`);
  if (axios.isAxiosError(matches)) {
    console.log("Error fetching matches data");
    return [];
  }
  if (!matches) {
    return [];
  }
  return matches.data;
};

interface MatchProviderProps {
  children: React.ReactNode;
}

export const MatchProvider: React.FC<MatchProviderProps> = ({ children }) => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<Team[]>([]);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  useEffect(() => {
    api.teams.getAll().then((data) => {
      setTeams(data);
    });

    api.match.getAll().then((data) => {
      setMatches(data);
    });

    const loadMatch = async () => {
      const matchData = await api.match.getCurrent();
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

  return (
    <MatchContext.Provider
      value={{ matches, teams, currentMatch, fetchMatches }}
    >
      {children}
    </MatchContext.Provider>
  );
};

export const useMatchContext = () => {
  const context = useContext(MatchContext);
  if (context === undefined) {
    throw new Error("useMatchContext must be used within a MatchProvider");
  }
  return context;
};
