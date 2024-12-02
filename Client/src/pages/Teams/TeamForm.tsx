import React, { useEffect, useState } from "react";
import { Team } from "../../api/interfaces";
import { ButtonContained, TextInput } from "../Components";
import { Dialog } from "../Components/Dialog";

interface TeamsFormProps {
  team?: Team;
  createTeam?: (team: Team) => void;
  updateTeam?: (team: Team) => void;
  isEditing?: boolean;
  onCancel?: () => void;
  open: boolean;
  setOpen: (open: boolean) => void;
}

export const TeamsForm = ({
  team,
  createTeam,
  updateTeam,
  isEditing,
  onCancel,
  open,
  setOpen,
}: TeamsFormProps) => {
  const [teamName, setTeamName] = useState("");
  const [shortName, setShortName] = useState("");
  const [country, setCountry] = useState("");
  const [logo, setLogo] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    if (isEditing && team) {
      console.log(team._id);
      // Update form fields when player prop changes
      setTeamName(team.name || "");
      setShortName(team.shortName || "");
      setCountry(team.country || "");
      setLogo(team.logo || "");
    }
  }, [isEditing, team]);

  const validateForm = () => {
    let isValid = true;
    setErrorMessage(""); // Clear any previous error message

    if (!teamName || !logo) {
      setErrorMessage("Team name and Logo required!"); // Set error message
      isValid = false;
    }

    return isValid;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setIsSubmitting(true);
    const newTeam: Team = {
      _id: team?._id || "",
      name: teamName,
      logo,
      shortName: shortName || "",
      country: country || "",
      extra: team?.extra || {},
    };

    if (isEditing && updateTeam) {
      await updateTeam(newTeam);
    } else if (createTeam) {
      await createTeam(newTeam);
    }

    setIsSubmitting(false);
    setOpen(false);
    handleReset();
  };

  const handleCancel = () => {
    setOpen(false);
    handleReset(); // Reset form fields
    if (onCancel) {
      onCancel(); // Call onCancel prop function if provided
    }
  };

  const handleReset = () => {
    setTeamName("");
    setShortName("");
    setCountry("");
    setLogo("");
    setErrorMessage(""); // Clear any previous error message
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <div className="flex flex-1 border-b border-zinc-800">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing ? `Updating: ${teamName}` : "Create Team"}
        </h3>
      </div>
      <div className="flex-1 p-6">
        <div className="my-2 flex flex-col gap-3">
          <TextInput
            label={"Team Name"}
            value={teamName}
            required
            onChange={(e) => setTeamName(e.target.value)}
            error={!!errorMessage}
            errorMessage={errorMessage}
          />
          <TextInput
            label="Short Name"
            value={shortName}
            onChange={(e) => setShortName(e.target.value)}
          />
          <TextInput
            label="Country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
          />
          <TextInput
            label="Logo URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
        </div>
      </div>
      <div className="flex w-full justify-end gap-2 border-t border-zinc-800 p-2">
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
          {isEditing && (
            <ButtonContained color="secondary" onClick={handleCancel}>
              Cancel
            </ButtonContained>
          )}
        </div>
      </div>
    </Dialog>
  );
};
