import { useEffect, useState } from "react";
import { Dialog } from "../Components/Dialog";
import { ButtonContained, Container, TextInput } from "../Components";
import { countries } from "../../api/countries";
import { Player } from "../../api/interfaces";

interface PlayerFormProps {
  player?: Player;
  createPlayer?: (player: Player) => void;
  updatePlayer?: (player: Player) => void;
  isEditing?: boolean;
  onCancel?: () => void;
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
  const [country, setCountry] = useState(player?.country || "");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isEditing && player) {
      // Update form fields when player prop changes
      setUsername(player.username);
      setAvatar(player.avatar || "");
      setFirstName(player.firstName || "");
      setLastName(player.lastName || "");
      setSteamId(player.steamid);
      setTeam(player.team || "");
      setCountry(player.country || "");
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
    const newPlayer: Player = {
      _id: player?._id || "",
      username,
      avatar,
      firstName: firstName,
      lastName: lastName,
      steamid: steamId,
      team,
      country: country,
      extra: player?.extra || {},
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
    setCountry("");
    setErrorMessage(""); // Clear any previous error message
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <div className="flex flex-1 border-b border-zinc-800">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing ? `Updating: ${username}` : "Create Player"}
        </h3>
      </div>
      <Container>
        <div className="grid w-full flex-1 grid-cols-2 gap-4 overflow-y-scroll p-6">
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
            label="Avatar URL"
            value={avatar}
            onChange={(e) => setAvatar(e.target.value)}
          />
          <TextInput
            label="Team"
            value={team}
            onChange={(e) => setTeam(e.target.value)}
          />
          <form className="mb-4">
            <label className="mb-2 block font-medium text-text">Country</label>
            <select
              value={country}
              onChange={(e) => setCountry(e.target.value)}
              className={`h-14 w-full rounded-md border border-gray-500 bg-background2 px-3 py-2 placeholder:text-text-secondary focus:border-0 focus:outline-none focus:ring-2 focus:ring-primary`}
            >
              <option
                value=""
                className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
              >
                Country
              </option>
              {Object.entries(countries).map(([key, value]) => (
                <option
                  key={key}
                  value={key}
                  className="w-full rounded-md border border-zinc-800 bg-zinc-950 p-4"
                >
                  {value as string}
                </option>
              ))}
            </select>
          </form>
        </div>
      </Container>
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
