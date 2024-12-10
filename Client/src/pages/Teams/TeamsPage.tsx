import React, { useEffect, useState } from "react";
import { TeamsTable } from "./TeamsTable";
import { TeamsForm } from "./TeamForm";
import axios from "axios";
import { ButtonContained, Container } from "../Components";
import { Team } from "../../api/interfaces";
import { PORT, HOST } from "../../App";

export const getTeams = async () => {
  const teams = await axios.get(`${HOST}:${PORT}/teams`);
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
  const team = await axios.get(`${HOST}:${PORT}/teams/${id}`);
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
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null); // Store selected player for editing
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch players data when the component mounts
    getTeams().then((data) => {
      setTeams(data);
    });
  }, []);

  const handleCreateTeam = async (team: Team) => {
    // Handle create or update player logic
    setIsLoading(true);
    await axios.post(`${HOST}:${PORT}/teams`, team);
    await getTeams().then((data) => {
      setTeams(data);
    });
    setIsLoading(false);
  };

  const handleEditTeam = (team: Team) => {
    // Handle edit player logic
    setIsEditing(true);
    setSelectedTeam(team); // Set selected player for editing
    setOpen(true);
  };

  const handleUpdateTeam = async (team: Team) => {
    // Handle update player logic
    console.log(team);
    setIsLoading(true);
    await axios.put(`${HOST}:${PORT}/teams/${team._id}`, team);
    await getTeams().then((data) => {
      setTeams(data);
    });
    setIsLoading(false);
  };

  const handleDeleteTeam = async (id: string) => {
    // Handle delete player logic
    setIsLoading(true);
    await axios.delete(`${HOST}:${PORT}/teams/${id}`);
    setTeams(teams.filter((team: Team) => team._id !== id));
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
