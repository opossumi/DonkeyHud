import React from 'react';
import { Grid, Paper, Typography, Box } from '@mui/material';

// Dummy data (replace with real data)
const serverInfo = {
  ip: '192.168.0.1',
  port: 27015,
  status: 'Connected'
};

const matchInfo = {
  round: 5,
  roundTime: '1:20',
  roundState: 'Live',
  bestOfType: 'Best of 3'
};

const team1 = {
  name: 'Team Alpha',
  score: 7,
  economy: 12000,
  players: [
    { name: 'Player1', kills: 10, deaths: 3, adr: 95 },
    { name: 'Player2', kills: 8, deaths: 5, adr: 80 },
    // Add more players
  ]
};

const team2 = {
  name: 'Team Bravo',
  score: 5,
  economy: 8000,
  players: [
    { name: 'PlayerA', kills: 6, deaths: 7, adr: 75 },
    { name: 'PlayerB', kills: 9, deaths: 6, adr: 85 },
    // Add more players
  ]
};

export const Dashboard = () => {
  return (
    <Box sx={{ padding: 4 }}>
      <Grid container spacing={3}>
        {/* Server Connect Info */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Server Connect Info
            </Typography>
            <Typography>IP: {serverInfo.ip}</Typography>
            <Typography>Port: {serverInfo.port}</Typography>
            <Typography>Status: {serverInfo.status}</Typography>
          </Paper>
        </Grid>

        {/* Current Players */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Current Players
            </Typography>
            {/* Replace with actual player data */}
            <Typography>Player 1, Player 2, Player 3...</Typography>
          </Paper>
        </Grid>

        {/* Match Information */}
        <Grid item xs={12} md={4}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              Match Information
            </Typography>
            <Typography>Round: {matchInfo.round}</Typography>
            <Typography>Round Time: {matchInfo.roundTime}</Typography>
            <Typography>Round State: {matchInfo.roundState}</Typography>
            <Typography>Best of Type: {matchInfo.bestOfType}</Typography>
          </Paper>
        </Grid>

        {/* Team 1 Panel */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {team1.name} - Score: {team1.score}
            </Typography>
            <Typography>Team Economy: ${team1.economy}</Typography>
            <Typography variant="subtitle1" gutterBottom>
              Player Stats:
            </Typography>
            {team1.players.map((player, index) => (
              <Typography key={index}>
                {player.name}: {player.kills}K / {player.deaths}D, ADR: {player.adr}
              </Typography>
            ))}
          </Paper>
        </Grid>

        {/* Team 2 Panel */}
        <Grid item xs={12} md={6}>
          <Paper elevation={3} sx={{ padding: 2 }}>
            <Typography variant="h6" gutterBottom>
              {team2.name} - Score: {team2.score}
            </Typography>
            <Typography>Team Economy: ${team2.economy}</Typography>
            <Typography variant="subtitle1" gutterBottom>
              Player Stats:
            </Typography>
            {team2.players.map((player, index) => (
              <Typography key={index}>
                {player.name}: {player.kills}K / {player.deaths}D, ADR: {player.adr}
              </Typography>
            ))}
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};
