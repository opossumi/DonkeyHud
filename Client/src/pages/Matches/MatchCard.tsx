import { useEffect, useState } from 'react';
import {  Box, Typography, Card, Button, Container, CardContent, Table, TableHead, TableRow, TableCell, TableBody, ButtonGroup } from '@mui/material';
import { Match } from '../../api/interfaces';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import axios from 'axios';

interface MatchCardProps {
    match: Match;
    refreshMatches: () => void;
  }
  
export const MatchCard = ({ match, refreshMatches }: MatchCardProps) => {
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
    <Container>
      <Card key={match.id} sx={{ position: 'relative'}}>
        <CardContent sx={{display: 'flex', justifyContent: 'center', gap: 6}}>
          <Box sx={{display: 'flex', flexDirection: 'column', p: 2}}>
            <Box sx={{mb: 2}}>
              <Typography variant="h3" color='info' style={{fontWeight: 'bold'}}>MATCH LIVE</Typography>
              <Typography variant="h4">{teamOneName} vs {teamTwoName}</Typography>
              <Typography variant="h6">{match.matchType}</Typography>
            </Box>
            <Box id="Score" sx={{display: 'flex', flexDirection: 'column', bgcolor: 'background.default', p: 2, mb: 2}}>
              <Typography variant="h4" textAlign={'center'}>Score</Typography>
              <Box id="Teams" sx={{display: 'flex', gap: 2}}>
                <Box id="TeamOne" sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                    <Typography variant="h2" fontWeight={'bold'}>{match.left.wins}</Typography>
                    <img src={teamOneLogo} alt="team1" width="50" />
                    <ButtonGroup>
                      <Button onClick={() => handleChangeScore("left", "add")} color='primary'><AddIcon/></Button>
                      <Button onClick={() => handleChangeScore("left", "subtract")} color='primary'><RemoveIcon/></Button>
                    </ButtonGroup>
                  </Box>
                  <Box id="TeamTwo" sx={{display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center', gap: 1}}>
                    <Typography variant="h2" fontWeight={'bold'}>{match.right.wins}</Typography>
                    <img src={teamTwoLogo} alt="team2" width="50" />
                    <ButtonGroup>
                      <Button onClick={() => handleChangeScore("right", "add")} color='primary'><AddIcon/></Button>
                      <Button onClick={() => handleChangeScore("right", "subtract")} color='primary'><RemoveIcon/></Button>
                    </ButtonGroup>
                  </Box>
              </Box>
            </Box>
            <Button onClick={handleStopMatch} variant='contained' color='secondary'>Stop Match</Button>
          </Box>
          <Table sx={{flex: '1'}}>
            <TableHead>
              <TableRow>
                <TableCell>Team</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Map</TableCell>
                <TableCell>Side?</TableCell>
                <TableCell>Winner</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.values(match.vetos).filter(veto => veto.teamId || veto.type === "decider").map((veto, index) => (
                <TableRow key={index}>
                    <TableCell>{veto.teamId} </TableCell>
                    <TableCell>{veto.type}</TableCell>
                    <TableCell>{veto.mapName}</TableCell>
                    <TableCell>{veto.side === "NO" ? "" : veto.side}</TableCell>
                    <TableCell>{veto.winner}</TableCell>
                  </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </Container>
  );
};
