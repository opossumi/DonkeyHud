import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {Typography, Container, Box } from '@mui/material';
import { PlayerCard } from './PlayerCard';
import Grid from '@mui/material/Grid2';
import { PlayerForm } from './PlayerForm';
import PlayerSilhouette from '../../assets/player_silhouette.webp'


export interface PlayerProps {
  id: string;
  alias: string;
  avatar?: string;
  real_name?: string;
  steam_id: string;
  team?: string;
}

export const getPlayers = async () => { //Async Function Expression
  const players = await axios.get('http://localhost:4000/players')
  if (axios.isAxiosError(players)) {
    console.log('Error fetching players data')
    return []
  }
  if (!players) {
    return []
  }
  return players.data
}

export const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<PlayerProps | null>(null); // Store selected player for editing

  useEffect(() => {
    // Fetch players data when the component mounts
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);


  const handleCreatePlayer = async (player: PlayerProps) => {
    // Handle create or update player logic
    setIsLoading(true);
    await axios.post('http://localhost:4000/players', player)
    await getPlayers().then((data) => {
      setPlayers(data);
    });
    setIsLoading(false);
  };

  const handleEditPlayer = (player: PlayerProps) => {
    // Handle edit player logic
    setIsEditing(true);
    setSelectedPlayer(player); // Set selected player for editing
  };

  const handleUpdatePlayer = async (player: PlayerProps) => {
    // Handle update player logic
    setIsLoading(true);
    await axios.put(`http://localhost:4000/players/${player.id}`, player)
    await getPlayers().then((data) => {
      setPlayers(data);
    });
    setIsLoading(false);
  }

  const handleDeletePlayer = async (id: string) => {
    // Handle delete player logic
    setIsLoading(true);
    await axios.delete(`http://localhost:4000/players/${id}`)
    setPlayers(players.filter((player: PlayerProps) => player.id !== id));
    setIsLoading(false);
  };

  return (
    <Box sx={{ display: 'flex', flexDirection: { xs: "column", lg: "row" }, width: '100%', height: '100%', gap: 4 }}>
      <Container>
        <Typography variant="h4" gutterBottom>
              Player Form
        </Typography>
        {isEditing && selectedPlayer ? ( // Conditionally render PlayerForm for editing
          <PlayerForm player={selectedPlayer} updatePlayer={handleUpdatePlayer} isEditing={isEditing} onCancel={() => setIsEditing(false)}/>
        )
        : 
        (<PlayerForm createPlayer={handleCreatePlayer} />
        )}
      </Container>
      <Container sx={{ display: 'flex', flexDirection: 'column', overflowX: 'hidden', width: '100%', height: '100%' }}>
        <Typography variant="h4" gutterBottom>
          Players List
        </Typography>
        <Grid container spacing={2} columns={2}>
          {players.length === 0 && <Typography variant="h6">No players created</Typography>}
          {players.map((player: PlayerProps, index) => (
            <Grid key={index} size={1}>
              <PlayerCard player={player} deletePlayer={handleDeletePlayer} onEdit={handleEditPlayer} />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export { PlayerSilhouette };