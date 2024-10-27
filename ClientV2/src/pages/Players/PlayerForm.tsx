import { Typography, TextField, Button, Paper, Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { PlayerProps } from './PlayersPage';

interface PlayerFormProps {
  player?: PlayerProps;
  createPlayer?: (player: PlayerProps) => void;
  updatePlayer?: (player: PlayerProps) => void;
  isEditing?: boolean;
  onCancel?: () => void; // Optional prop with default behavior (e.g., handleReset)
}

export const PlayerForm = ({ player, createPlayer, updatePlayer, isEditing, onCancel }: PlayerFormProps) => {
  const [alias, setAlias] = useState(player?.alias || '');
  const [avatar, setAvatar] = useState(player?.avatar || '');
  const [realName, setRealName] = useState(player?.real_name || '');
  const [steamId, setSteamId] = useState(player?.steam_id || '');
  const [team, setTeam] = useState(player?.team || '');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Added for error message

  useEffect(() => {
    if (isEditing && player) {
      // Update form fields when player prop changes
      setAlias(player.alias);
      setAvatar(player.avatar || '');
      setRealName(player.real_name || '');
      setSteamId(player.steam_id);
      setTeam(player.team || '');
    }
  }, [isEditing, player]); // Update form fields when player prop changes

  const handleCancel = () => {
    if (onCancel) {
      onCancel(); // Call onCancel prop function if provided
    }
    handleReset(); // Reset form fields
  };

  const validateForm = () => {
    let isValid = true;
    setErrorMessage(''); // Clear any previous error message

    if (!alias || !steamId) {
        setErrorMessage('Alias and SteamID64 are required'); // Set error message
        isValid = false;
    }

    if (steamId && !/^\d{17}$/.test(steamId)) {
        setErrorMessage('SteamID64 must be 17 digits long'); // Set error message
        isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Early return if validation fails

    setIsSubmitting(true);
    const newPlayer: PlayerProps = {
      id: player?.id || "",
      alias,
      avatar,
      real_name: realName,
      steam_id: steamId,
      team,
    };

    if (isEditing && updatePlayer) {
      await updatePlayer(newPlayer);
    } else if (createPlayer) {
      await createPlayer(newPlayer);
    }

    setIsSubmitting(false);
    handleReset();
  };

  const handleReset = () => {
    setAlias('');
    setAvatar('');
    setRealName('');
    setSteamId('');
    setTeam('');
    setErrorMessage(''); // Clear any previous error message
  };

  return (
    <Paper sx={{ p: 2 }}>
      <Typography variant="h6" gutterBottom>
        {isEditing ? `Updating: ${player?.alias} (${player?.steam_id})` : 'Create Player'}
      </Typography>
      <TextField
        label="Alias"
        value={alias}
        onChange={(e) => setAlias(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorMessage} // Set error state based on errorMessage
        helperText={errorMessage} // Show error message below field
      />
      <TextField
        label="SteamID64"
        value={steamId}
        onChange={(e) => setSteamId(e.target.value)}
        fullWidth
        margin="normal"
        required
        error={!!errorMessage} // Set error state based on errorMessage
        helperText={errorMessage} // Show error message below field
      />
      <TextField
        label="Avatar URL"
        value={avatar}
        onChange={(e) => setAvatar(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Real Name"
        value={realName}
        onChange={(e) => setRealName(e.target.value)}
        fullWidth
        margin="normal"
      />
      <TextField
        label="Team"
        value={team}
        onChange={(e) => setTeam(e.target.value)}
        fullWidth
        margin="normal"
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