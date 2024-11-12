import React, { useEffect, useState } from "react";
import { TeamsTable } from "./TeamsTable";
import { TeamsForm } from "./TeamForm";
import axios from "axios";
import { ButtonContained } from "../Components";

export interface TeamProps {
  id: string;
  name: string;
  shortName?: string;
  country?: string;
  logo: string;
}

export const getTeams = async () => {
  const teams = await axios.get("http://localhost:4000/teams");
  if (axios.isAxiosError(teams)) {
    console.log("Error fetching teams data");
    return [];
  }
  if (!teams) {
    return [];
  }
  return teams.data;
};

export const getTeamsById = async (id: string) => {
  const team = await axios.get(`http://localhost:4000/teams/${id}`);
  if (axios.isAxiosError(team)) {
    console.log("Error fetching team data");
    return [];
  }
  if (!team) {
    return null;
  }
  return team.data;
};

export const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamProps | null>(null); // Store selected player for editing
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch players data when the component mounts
    getTeams().then((data) => {
      setTeams(data);
    });
  }, []);

  const handleCreateTeam = async (team: TeamProps) => {
    // Handle create or update player logic
    setIsLoading(true);
    await axios.post("http://localhost:4000/teams", team);
    await getTeams().then((data) => {
      setTeams(data);
    });
    setIsLoading(false);
  };

  const handleEditTeam = (team: TeamProps) => {
    // Handle edit player logic
    setIsEditing(true);
    setSelectedTeam(team); // Set selected player for editing
    setOpen(true);
  };

  const handleUpdateTeam = async (team: TeamProps) => {
    // Handle update player logic
    setIsLoading(true);
    await axios.put(`http://localhost:4000/teams/${team.id}`, team);
    await getTeams().then((data) => {
      setTeams(data);
    });
    setIsLoading(false);
  };

  const handleDeleteTeam = async (id: string) => {
    // Handle delete player logic
    setIsLoading(true);
    await axios.delete(`http://localhost:4000/teams/${id}`);
    setTeams(teams.filter((team: TeamProps) => team.id !== id));
    setIsLoading(false);
  };

  return (
    <div className="relative flex size-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Teams</h1>
        <ButtonContained onClick={() => setOpen(true)}>
          Create Team
        </ButtonContained>
      </div>
      {isEditing && selectedTeam ? (
        <TeamsForm
          team={selectedTeam}
          updateTeam={handleUpdateTeam}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <TeamsForm
          createTeam={handleCreateTeam}
          open={open}
          setOpen={setOpen}
        />
      )}
      <TeamsTable
        teams={teams}
        deleteTeam={handleDeleteTeam}
        onEdit={handleEditTeam}
        refreshTeams={getTeams}
      />
    </div>
  );
};
