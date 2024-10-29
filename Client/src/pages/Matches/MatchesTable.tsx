import { Delete } from '@mui/icons-material';
import { Match } from '../../api/interfaces';
import { Typography, Button, TableCell, TableRow, TableHead, Table, TableBody, ButtonGroup } from '@mui/material';
import { Edit } from '@mui/icons-material';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import CancelIcon from '@mui/icons-material/Cancel';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { socket } from '../../App';

interface MatchTableProps {
    matches: Match[];
    deleteMatch: (id: string) => void;
    onEdit: (match: Match) => void;
    refreshMatches: () => void;
  }

export const MatchesTable = ({matches, deleteMatch, onEdit, refreshMatches}: MatchTableProps) => {

  useEffect(() => {
    socket.on('match-update', (data) => {
      refreshMatches();
    });
  }, []);
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell align='left'>Match</TableCell>
          <TableCell align='center'>Scores</TableCell>
          <TableCell align='right'>Actions</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {matches.map((match: Match, index) => (
          <MatchRow
            key={index}
            match={match}
            onEdit={onEdit}
            deleteMatch={deleteMatch}
            refreshMatches={refreshMatches}
          />
        ))}
      </TableBody>
    </Table>
  )
}

interface MatchRowProps {
    match: Match;
    onEdit: (match: Match) => void;
    deleteMatch: (id: string) => void;
    refreshMatches: () => void;
  }

const MatchRow = ({match, onEdit, deleteMatch, refreshMatches}: MatchRowProps) => {
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
        onEdit(match);
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

    return (
        <TableRow>
          <TableCell align='left'>
            <Typography variant="h6">{teamOneName} vs {teamTwoName} {match.current ? <Typography color='secondary'>LIVE</Typography> : ""}</Typography>
          </TableCell>
          <TableCell align='center'>
            <Typography variant="h6" sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2}}><img src={teamOneLogo} alt='Team One Logo'/> {match.left.wins} - {match.right.wins} <img src={teamTwoLogo} alt='Team Two Logo'/></Typography>
          </TableCell>
          <TableCell align='right'>
            {match.current ? (
              <ButtonGroup>
                <Button onClick={handleStopMatch} color='secondary'><CancelIcon/></Button>
              </ButtonGroup>
              ) : (
              <ButtonGroup>
                <Button onClick={handleStartMatch}><PlayArrowIcon/></Button>
                <Button onClick={() => handleEditClick()}><Edit /></Button>
                <Button onClick={() => deleteMatch(match.id)}><Delete /></Button>
              </ButtonGroup>
            )}
          </TableCell>
        </TableRow>
    )

}