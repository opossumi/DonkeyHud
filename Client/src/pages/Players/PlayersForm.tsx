import React, { useEffect, useState } from "react";
import { PlayerProps } from "./PlayersPage";
import { Dialog } from "../Components/Dialog";
import { ButtonContained, TextInput } from "../Components";

interface PlayerFormProps {
  player?: PlayerProps;
  createPlayer?: (player: PlayerProps) => void;
  updatePlayer?: (player: PlayerProps) => void;
  isEditing?: boolean;
  onCancel?: () => void; // Optional prop with default behavior (e.g., handleReset)
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const PlayerForm = ({
  player,
  createPlayer,
  updatePlayer,
  isEditing,
  onCancel,
  open,
  setOpen,
}: PlayerFormProps) => {
  const [username, setUsername] = useState(player?.username || "");
  const [avatar, setAvatar] = useState(player?.avatar || "");
  const [firstName, setFirstName] = useState(player?.firstName || "");
  const [lastName, setLastName] = useState(player?.lastName || "");
  const [steamId, setSteamId] = useState(player?.steamid || "");
  const [team, setTeam] = useState(player?.team || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // Added for error message

  useEffect(() => {
    if (isEditing && player) {
      // Update form fields when player prop changes
      setUsername(player.username);
      setAvatar(player.avatar || "");
      setFirstName(player.firstName || "");
      setLastName(player.lastName || "");
      setSteamId(player.steamid);
      setTeam(player.team || "");
    }
  }, [isEditing, player]); // Update form fields when player prop changes

  const validateForm = () => {
    let isValid = true;
    setErrorMessage(""); // Clear any previous error message

    if (!username || !steamId) {
      setErrorMessage("Alias and SteamID64 are required"); // Set error message
      isValid = false;
    }

    if (steamId && !/^\d{17}$/.test(steamId)) {
      setErrorMessage("SteamID64 must be 17 digits long"); // Set error message
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return; // Early return if validation fails

    setIsSubmitting(true);
    const newPlayer: PlayerProps = {
      id: player?.id || "",
      username,
      avatar,
      firstName: firstName,
      lastName: lastName,
      steamid: steamId,
      team,
    };

    if (isEditing && updatePlayer) {
      await updatePlayer(newPlayer);
    } else if (createPlayer) {
      await createPlayer(newPlayer);
    }

    setIsSubmitting(false);
    setOpen(false);
    handleReset();
  };

  const handleCancel = () => {
    handleReset(); // Reset form fields
    setOpen(false);
    if (onCancel) {
      onCancel(); // Call onCancel prop function if provided
    }
  };

  const handleReset = () => {
    setUsername("");
    setAvatar("");
    setFirstName("");
    setLastName("");
    setSteamId("");
    setTeam("");
    setErrorMessage(""); // Clear any previous error message
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <div className="flex flex-1 border-b border-zinc-800">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing ? `Updating: ${username}` : "Create Player"}
        </h3>
      </div>
      <div className="flex flex-1 flex-col overflow-y-scroll p-6">
        <div className="my-2 flex flex-col gap-3">
          <TextInput
            label="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
          <TextInput
            label="SteamID64"
            value={steamId}
            onChange={(e) => setSteamId(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
          <TextInput
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <TextInput
            label="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
          />
          <TextInput
            label="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
          />
          <TextInput
            label="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
        </div>
      </div>
      <div className="inline-flex w-full justify-end gap-2 border-t border-zinc-800 p-2">
        {errorMessage && (
          <p className="my-1 text-end text-red-500">{errorMessage}</p>
        )}
        <div className="mt-1 flex justify-end gap-1">
          {isSubmitting ? (
            <ButtonContained disabled>Submitting...</ButtonContained>
          ) : (
            <ButtonContained onClick={handleSubmit}>Submit</ButtonContained>
          )}
          <ButtonContained onClick={handleReset}>Reset</ButtonContained>
          {isEditing && ( // Conditionally render Cancel button if onCancel prop is provided
            <ButtonContained color="secondary" onClick={handleCancel}>
              Cancel
            </ButtonContained>
          )}
        </div>
      </div>
    </Dialog>
  );
};
