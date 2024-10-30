import React, { useEffect, useState } from "react";
import { Button, Dialog } from "@mui/material";
import { TeamProps } from "./TeamsPage";
import { ButtonContained, TextInput } from "../Components";

interface TeamsFormProps {
  team?: TeamProps;
  createTeam?: (team: TeamProps) => void;
  updateTeam?: (team: TeamProps) => void;
  isEditing?: boolean;
  onCancel?: () => void; // Optional prop with default behavior (e.g., handleReset)
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
  const [errorMessage, setErrorMessage] = useState(""); // Added for error message

  useEffect(() => {
    if (isEditing && team) {
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
    <Dialog onClose={handleCancel} open={open} maxWidth="lg" fullWidth>
      <h5 className="px-6 py-4 font-semibold">
        {isEditing ? `Updating: ${teamName}` : "Create Team"}
      </h5>
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
      <div className="flex w-full justify-end gap-2 p-2">
        {/* Added error message display */}
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
