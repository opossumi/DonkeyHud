import React, { useEffect, useState } from 'react';
import {  Typography,  TextField,  Button, Paper, Box } from '@mui/material';
import { TeamProps } from './TeamsPage';

interface TeamsFormProps {
    team?: TeamProps;
  createTeam?: (team: TeamProps) => void;
  updateTeam?: (team: TeamProps) => void;
  isEditing?: boolean;
  onCancel?: () => void; // Optional prop with default behavior (e.g., handleReset)
}

export const TeamsForm = ({team, createTeam, updateTeam, isEditing, onCancel}: TeamsFormProps) => {
  const [teamName, setTeamName] = useState('');
  const [shortName, setShortName] = useState('');
  const [country, setCountry] = useState('');
  const [logo, setLogo] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Added for error message

  useEffect(() => {
    if (isEditing && team) {
      // Update form fields when player prop changes
        setTeamName(team.name || '');
        setShortName(team.shortName || '');
        setCountry(team.country || '');
        setLogo(team.logo || '');
    }
  }, [isEditing, team]);

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Call onCancel prop function if provided
    }
    handleReset(); // Reset form fields
  };

  const validateForm = () => {
    let isValid = true;
    setErrorMessage(''); // Clear any previous error message

    if (!teamName || !logo) {
        setErrorMessage('Team name and Logo required!'); // Set error message
        isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Early return if validation fails

    setIsSubmitting(true);
    const newTeam: TeamProps = {
      id: team?.id || "",
      name: teamName,
      logo,
      shortName: shortName || "",
      country: country || "",
    };

    if (isEditing && updateTeam) {
      await updateTeam(newTeam);
    } else if (createTeam) {
      await createTeam(newTeam);
    }

    setIsSubmitting(false);
    handleReset();
  };
  
  const handleReset = () => {
    setTeamName('');
    setShortName('');
    setCountry('');
    setLogo('');
    setErrorMessage(''); // Clear any previous error message
  };


  return (
      <Paper sx={{p: 2}}>
        <Typography variant="h6" gutterBottom>
        {isEditing ? `Updating: ${teamName} (${team?.id})` : 'Create Team'}
        </Typography>
        <TextField
        label="Team Name"
        value={teamName}
        onChange={(e) => setTeamName(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorMessage} // Set error state based on errorMessage
        helperText={errorMessage} // Show error message below field
        />
        <TextField
        label="Short Name"
        value={shortName}
        onChange={(e) => setShortName(e.target.value)}
        fullWidth
        margin="normal"
        />
        <TextField
        label="Country"
        value={country}
        onChange={(e) => setCountry(e.target.value)}
        fullWidth
        margin="normal"
        />
        <TextField
        label="Logo URL"
        value={logo}
        onChange={(e) => setLogo(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorMessage} // Set error state based on errorMessage
        helperText={errorMessage} // Show error message below field
        />
        <Box sx={{ display: 'flex', justifyContent: 'start', gap: 1, mt: 1 }}>
            {isSubmitting ? (
            <Button variant="contained" disabled>
                Submitting...
            </Button>
            ) : (
            <Button variant="contained" onClick={handleSubmit}>
                Submit
            </Button>
            )}
            <Button variant="contained" onClick={handleReset}>
            Reset
            </Button>
            {isEditing && ( // Conditionally render Cancel button if onCancel prop is provided
            <Button variant="outlined" color="secondary" onClick={handleCancel}>
                Cancel
            </Button>
            )}
        </Box>
        {/* Added error message display */}
        {errorMessage && <Typography variant="body2" color="error" sx={{my: 1}}>{errorMessage}</Typography>}
      </Paper>
  );
};

