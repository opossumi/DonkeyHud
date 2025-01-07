import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import { apiUrl } from "../api/api";

interface TeamsContextProps {
  teams: Team[];
  filteredTeams: Team[];
  isLoading: boolean;
  setFilteredTeams: React.Dispatch<React.SetStateAction<Team[]>>;
  fetchTeams: () => Promise<void>;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
}

const TeamsContext = createContext<TeamsContextProps | undefined>(undefined);

export const TeamsProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [teams, setTeams] = useState<Team[]>([]);
  const [filteredTeams, setFilteredTeams] = useState<Team[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const fetchTeams = async () => {
    try {
      const response = await axios.get(`${apiUrl}/teams`);
      if (response.data) {
        setTeams(response.data);
        setFilteredTeams(response.data);
      }
    } catch (error) {
      console.error("Error fetching teams:", error);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <TeamsContext.Provider
      value={{
        teams,
        filteredTeams,
        isLoading,
        setFilteredTeams,
        fetchTeams,
        setIsLoading,
      }}
    >
      {children}
    </TeamsContext.Provider>
  );
};

export const useTeamsContext = () => {
  const context = useContext(TeamsContext);
  if (!context) {
    throw new Error("useTeamsContext must be used within a TeamsProvider");
  }
  return context;
};
