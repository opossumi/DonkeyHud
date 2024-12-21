import { useEffect, useState } from "react";
import { Team } from "../../api/interfaces";
import { ButtonContained, Container, TextInput } from "../Components";
import { Dialog } from "../Components/Dialog";
import { countries } from "../../api/countries";

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
      setTeamName(team.name || "");
      setShortName(team.shortName || "");
      setCountry(team.country || "");
      setLogo(team.logo || "");
    }
  }, [isEditing, team]);

  const validateForm = () => {
    let isValid = true;
    setErrorMessage("");

    if (!teamName || !logo) {
      setErrorMessage("Team name and Logo required!");
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
    handleReset();
    if (onCancel) {
      onCancel();
    }
  };

  const handleReset = () => {
    setTeamName("");
    setShortName("");
    setCountry("");
    setLogo("");
    setErrorMessage("");
  };

  return (
    <Dialog onClose={handleCancel} open={open}>
      <div className="flex flex-1 border-b border-zinc-800">
        <h3 className="px-6 py-4 font-semibold">
          {isEditing ? `Updating: ${teamName}` : "Create Team"}
        </h3>
      </div>
      <Container>
        <div className="my-2 flex w-full flex-col gap-3">
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
          <TextInput
            label="Logo URL"
            value={logo}
            onChange={(e) => setLogo(e.target.value)}
            required
            error={!!errorMessage} // Set error state based on errorMessage
            errorMessage={errorMessage} // Show error message below field
          />
        </div>
      </Container>
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
