import { Delete } from '@mui/icons-material';
import { Match } from '../../api/interfaces';
import {  Box, IconButton, Typography, Card, Button } from '@mui/material';
import { Edit } from '@mui/icons-material';
import ToggleButton from '@mui/material/ToggleButton';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import { useEffect, useState } from 'react';
import axios from 'axios';


interface MatchCardProps {
    match: Match;
    deleteMatch: (id: string) => void;
    onEdit?: (match: Match) => void; // Added onEdit prop
    refreshMatches: () => void;
  }
  
  export const MatchCard = ({ match, deleteMatch, onEdit, refreshMatches }: MatchCardProps) => {
  const [displayVeto, setDisplayVeto] = useState(false);
  const [teamOneName, setTeamOneName] = useState('');
  const [teamOneLogo, setTeamOneLogo] = useState('');
  const [teamTwoName, setTeamTwoName] = useState('');
  const [teamTwoLogo, setTeamTwoLogo] = useState('');

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const teamOne = await axios.get(`http://localhost:4000/teams/${match.left.id}`);
        const teamTwo = await axios.get(`http://localhost:4000/teams/${match.right.id}`);
        setTeamOneName(teamOne.data.name);
        setTeamOneLogo(teamOne.data.logo);
        setTeamTwoName(teamTwo.data.name);
        setTeamTwoLogo(teamTwo.data.logo);

      } catch (error) {
        console.error('Error fetching team names:', error);
      }
    };

    fetchTeamNames();
  }, []);

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(match);
    }
  };

  const handleStartMatch = async () => {
    try {
      await axios.put(`http://localhost:4000/matches/${match.id}/current`, {
        current: true,
      });

      refreshMatches();
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  const handleStopMatch = async () => {
    try {
      await axios.put(`http://localhost:4000/matches/${match.id}/current`, {
        current: false,
      });
      refreshMatches();
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  const handleChangeScore = async (team: 'left' | 'right', action: 'add' | 'subtract') => {
    try {
      await axios.put(`http://localhost:4000/matches/${match.id}/${team}`, {
        action,
      });
      refreshMatches();
    } catch (error) {
      console.error('Error updating match:', error);
    }
  };

  return (
    <Card key={match.id} sx={{ marginBottom: 2, padding: 2, position: 'relative', maxWidth: '400px', }}>
      <Box sx={{display: 'flex', gap: 2}}>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex' }}>
          {teamOneName}
        </Typography>
        <Typography variant="h5">vs</Typography>
        <Typography variant="h5" sx={{ fontWeight: 'bold', display: 'flex' }}>
          {teamTwoName}
        </Typography>
      </Box>
      {match.current && <Typography variant="h6" sx={{ color: 'secondary.main' }}>MATCH IS LIVE</Typography>}
      <Typography variant="h6">{match.matchType}</Typography>
      <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
        <img src={teamOneLogo} alt="team1" width="50" />
        <Box sx={{display: 'flex', gap: '4px', alignItems: 'center'}}>
        <Typography variant="h6">{match.left.wins}</Typography>
        -
        <Typography variant="h6">{match.right.wins}</Typography>
        </Box>
        <img src={teamTwoLogo} alt="team2" width="50" />
      </Box>
      <Box sx={{display: 'flex', justifyContent: 'space-between'}}>
        <Box sx={{display: 'flex', gap: 4}}>
          <Box sx={{display: 'flex', gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton onClick={() => handleChangeScore("left", "add")} color='primary' aria-label="add" size='small'>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => handleChangeScore("left", "subtract")} color='primary' aria-label="subtract" size='small'>
              <RemoveIcon />
            </IconButton>
          </Box>
          <Box sx={{display: 'flex', gap: '2px', justifyContent: 'center', alignItems: 'center'}}>
            <IconButton onClick={() => handleChangeScore("right", "add")} color='primary' aria-label="add" size='small'>
              <AddIcon />
            </IconButton>
            <IconButton onClick={() => handleChangeScore("right", "subtract")} color='primary' aria-label="subtract" size='small'>
              <RemoveIcon />
            </IconButton>
          </Box>
        </Box>
        <Button variant='contained' color={displayVeto ? 'secondary' : 'primary'} onClick={() => setDisplayVeto((displayVeto) => !displayVeto)}>
          {displayVeto ? 'Hide Vetos' : 'Show Vetos'}
        </Button>
      </Box>
      <Box sx={{ display: `${displayVeto ? 'block' : 'none'}` }}>
          {Object.values(match.vetos).map((veto, index) => (
            <li key={index}>
              <strong>{veto.teamId} {veto.type}</strong> {veto.mapName}, <strong>Side:</strong> {veto.side}
            </li>
          ))}
        </Box>
      <Box sx={{ position: 'absolute', display: 'flex', flexDirection: 'column', alignItems: 'end', top: 0, right: 0, width: '50%', fontSize: '12px', borderRadius: '6px', color: 'text.primary' }}>
        <IconButton aria-label="edit" sx={{ color: 'text.primary', p: '4px' }} onClick={handleEditClick}>
          <Edit />
        </IconButton>
        <IconButton aria-label="delete" onClick={() => deleteMatch(match.id)} sx={{ color: 'text.primary', p: '4px' }}>
          <Delete />
        </IconButton>
        {match.current ? (
          <IconButton aria-label="cancel" onClick={handleStopMatch} sx={{ p: '4px' }}>
            <CancelIcon color='error' />
          </IconButton>
        ) : (
          <IconButton aria-label="confirm" onClick={handleStartMatch} sx={{ p: '4px' }}>
            <PlayArrowIcon  color='info' />
          </IconButton>
        )}
      </Box>
    </Card>
  );
};