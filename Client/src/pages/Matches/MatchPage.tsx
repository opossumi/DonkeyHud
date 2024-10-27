import React, { useEffect, useState } from 'react';
import { Match} from '../../api/interfaces';
import { MatchCard } from './MatchCard';
import { MatchForm } from './MatchForm';
import { TeamProps } from '../Teams';
import { getTeams } from '../Teams';
import axios from 'axios';
import {  Box, Typography, Container} from '@mui/material';
import Grid from '@mui/material/Grid2';

export const MatchTypes = ['bo1', 'bo2', 'bo3', 'bo5'];
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
  "de_anubis"
] 


export const getMatches = async () => {
  const matches = await axios.get('http://localhost:4000/matches');
  if (axios.isAxiosError(matches)) {
    console.log('Error fetching matches data')
    return []
  }
  if (!matches) {
    return []
  }
  // console.log('Matches data:', matches.data)
  return matches.data;
};

export const MatchesPage = () => {
  const [matches, setMatches] = useState<Match[]>([]);
  const [teams, setTeams] = useState<TeamProps[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedMatch, setSelectedMatch] = useState<Match | null>(null); // Store selected player for editing

  // Fetch teams data when the component mounts
  useEffect(() => {
    getTeams().then((data) => {
      setTeams(data);
    });

    getMatches().then((data) => {
      setMatches(data);
    });
  }, []);

  const fetchMatches = async () => {
    const data = await getMatches();
    setMatches(data);
  };

  const handleCreateMatch = async (match: Match) => {
    setIsLoading(true);
    console.log(match)
    await axios.post('http://localhost:4000/matches', match);
    await getMatches().then((data) => {
      setMatches(data);
    });
    setIsLoading(false);
  };

  const handleUpdateMatch = async (match: Match) => {
    setIsLoading(true);
    await axios.put(`http://localhost:4000/matches/${match.id}`, match);
    await getMatches().then((data) => {
      setMatches(data);
    });
    setIsLoading(false);
  };

  const handleEditMatch = (match: Match) => {
    setIsEditing(true);
    setSelectedMatch(match);
    console.log('Selected match:', match)
    console.log(isEditing)
  };

  const handleDeleteMatch = async (id: string) => {
    setIsLoading(true);
    await axios.delete(`http://localhost:4000/matches/${id}`);
    await getMatches().then((data) => {
      setMatches(data);
    });
    setIsLoading(false);
  };


  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: "column", lg: "row" }, width: '100%', height: '100%', gap: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
              Match form
        </Typography>
        {isEditing && selectedMatch ? ( 
          <MatchForm teams={teams} match={selectedMatch} updateMatch={handleUpdateMatch} isEditing={isEditing} onCancel={() => setIsEditing(false)} />
        )
        : 
        (<MatchForm teams={teams} createMatch={handleCreateMatch} />
        )}
      </Container>
      <Container sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%', height: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Matches List
        </Typography>
        <Grid container spacing={2} columns={2}>
          {matches.length === 0 && <Typography variant="h6">No matches created</Typography>}
          {matches.map((match: Match, index) => (
            <Grid key={index} size={1}>
              <MatchCard key={match.id} match={match} deleteMatch={handleDeleteMatch} onEdit={handleEditMatch} refreshMatches={fetchMatches} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};
