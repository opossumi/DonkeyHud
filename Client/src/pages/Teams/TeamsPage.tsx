import React, { useEffect, useState } from 'react';
import {  Container, Typography, Box} from '@mui/material';
import Grid from '@mui/material/Grid2';
import { TeamsForm } from './TeamForm';
import { TeamCards } from './TeamCards';
import axios from 'axios';

export interface TeamProps {
  id: string;
  name: string;
  shortName?: string;
  country?: string;
  logo: string;
}

export const getTeams = async () => {
    const teams = await axios.get('http://localhost:4000/teams');
    if (axios.isAxiosError(teams)) {
      console.log('Error fetching teams data')
      return []
    }
    if (!teams) {
      return []
    }
    return teams.data;
}

export const getTeamsById = async (id: string) => {
  const team = await axios.get(`http://localhost:4000/teams/${id}`);
  if (axios.isAxiosError(team)) {
    console.log('Error fetching team data')
    return []
  }
  if (!team) {
    return null
  }
  return team.data;
};

export const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<TeamProps | null>(null); // Store selected player for editing

  useEffect(() => {
    // Fetch players data when the component mounts
    getTeams().then((data) => {
      setTeams(data);
    });
  }, []);


  const handleCreateTeam = async (team: TeamProps) => {
    // Handle create or update player logic
    setIsLoading(true);
    await axios.post('http://localhost:4000/teams', team)
    await getTeams().then((data) => {
      setTeams(data);
    });
    setIsLoading(false);
  };

  const handleEditTeam = (team: TeamProps) => {
    // Handle edit player logic
    setIsEditing(true);
    setSelectedTeam(team); // Set selected player for editing
  };

  const handleUpdateTeam = async (team: TeamProps) => {
    // Handle update player logic
    setIsLoading(true);
    await axios.put(`http://localhost:4000/teams/${team.id}`, team)
    await getTeams().then((data) => {
      setTeams(data);
    });
    setIsLoading(false);
  }

  const handleDeleteTeam = async (id: string) => {
    // Handle delete player logic
    setIsLoading(true);
    await axios.delete(`http://localhost:4000/teams/${id}`)
    setTeams(teams.filter((team: TeamProps) => team.id !== id));
    setIsLoading(false);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: "column", lg: "row" }, width: '100%', height: '100%', gap: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
              Team Form
        </Typography>
        {isEditing && selectedTeam ? ( // Conditionally render TeamsForm for editing
          <TeamsForm team={selectedTeam} updateTeam={handleUpdateTeam} isEditing={isEditing} onCancel={() => setIsEditing(false)}/>
        )
        : 
        (<TeamsForm createTeam={handleCreateTeam} />
        )}
      </Container>
      <Container sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%', height: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Teams List
        </Typography>
        <Grid container spacing={2} columns={2}>
          {teams.length === 0 && <Typography variant="h6">No teams created</Typography>}
          {teams.map((team: TeamProps, index) => (
            <Grid key={index} size={1}>
              <TeamCards team={team} deleteTeam={handleDeleteTeam} onEdit={handleEditTeam} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
