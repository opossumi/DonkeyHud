import { useState } from "react";
import { Topbar } from "../MainPanel/Topbar";
import { ButtonContained, TextInput } from "../../components";
import api from "../../api/api";
import { FaceitPlayer, FaceitTeam, Team } from "../../api/types";
import { usePlayers, useTeams } from "../../hooks";

export const ImportPage = () => {
  const [importLog, setImportLog] = useState("");
  const [matchroomURL, setMatchroomURL] = useState("");
  const [matchroomURLError, setMatchroomURLError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    createTeam,
    updateTeam
  } = useTeams();

  const {
    createPlayer,
    updatePlayer
  } = usePlayers();

  const validateForm = () => {
    let isValid = true;
    setMatchroomURLError("");

    if (!matchroomURL) {
      setMatchroomURLError("Matchroom URL is required");
      isValid = false;
    }

    if (!/^https:\/\/www.faceit.com\/en\/cs2\/room\/1-.*$/.test(matchroomURL)
      && !/^1-.{8}-.{4}-.{4}-.{4}-.{12}$/.test(matchroomURL)) {
      setMatchroomURLError("Not a valid matchroom");
    }

    return isValid;
  };

  const log = (message: string) => {
    setImportLog((prev) => prev + message + "\n");
  }

  const fetchMatch = async (matchID: string) => {
    return await api.faceit.getMatch(matchID);
  }

  const importPlayer = async (players: Player[], team: Team, playerData: FaceitPlayer) => {
    const foundPlayer = players.find(p => p.steamid === playerData.gameId);

    const formData = new FormData();
    formData.append("username", playerData.nickname);
    formData.append("steamid", playerData.gameId);
    formData.append("team", team._id);

    if (playerData.avatar) {
      const avatarFilename = playerData.avatar.split("/").pop() || "";
      const avatarBlob = await api.faceit.getCdnImage(playerData.avatar);
      const avatar = new File([avatarBlob], avatarFilename, { type: "image/jpeg" });
      formData.append("avatar", avatar);
    }

    if (!foundPlayer) {
      // Create player
      await createPlayer(formData);
      log(`Created player ${playerData.nickname}`);
    } else {
      // Update player info
      formData.append("_id", foundPlayer._id);
      await updatePlayer(foundPlayer._id, formData);
      log(`Updated player ${playerData.nickname}`);
    }
  };

  const importTeam = async (teams: Team[], players: Player[], teamData: FaceitTeam) => {
    let team = teams.find(t => t.name === teamData.name);

    const formData = new FormData();
    formData.append("name", teamData.name);

    const avatarFilename = teamData.avatar.split("/").pop() || "";
    const logoBlob = await api.faceit.getCdnImage(teamData.avatar);
    const logo = new File([logoBlob], avatarFilename, { type: "image/jpeg" });
    formData.append("logo", logo);

    if (!team) {
      // Create team
      team = await createTeam(formData);
      log(`Created team ${teamData.name}`);
    } else {
      // Update team info
      formData.append("_id", team._id);
      await updateTeam(team._id, formData);
      log(`Updated team ${teamData.name}`);
    }

    const playersData = teamData.roster.concat(teamData.substitutes);
    for (const playerData of playersData) {
      await importPlayer(players, team, playerData);
    }
  }

  const importMatch = async (matchID: string) => {
    const matchData = await fetchMatch(matchID);
    if (matchData.code !== "OPERATION-OK") {
      setMatchroomURLError(`Error fetching match: ${matchData.message}`);
      return;
    }

    const data = matchData.payload;
    const teams = await api.teams.getAll();
    const players = await api.players.getAll();
    
    await importTeam(teams, players, data.teams.faction1);
    await importTeam(teams, players, data.teams.faction2);
  }

  const handleSubmit = async () => {
    if (!validateForm()) return; // Early return if validation fails

    setIsSubmitting(true);

    let matchroomID = "";

    // https://www.faceit.com/en/cs2/room/1-xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    // https://www.faceit.com/api/match/v2/match/1-xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    let match = matchroomURL.match(/^https:\/\/www.faceit.com\/en\/cs2\/room\/(1-.*)$/)
    if (match && match[1]) {
      matchroomID = match[1];
    } else {
      match = matchroomURL.match(/^(1-.{8}-.{4}-.{4}-.{4}-.{12})$/)
      if (match && match[1]) {
        matchroomID = match[1];
      } else {
        setMatchroomURLError("Not a valid matchroom");
        setIsSubmitting(false);
        return;
      }
    }

    await importMatch(matchroomID);

    setIsSubmitting(false);
  }

  return (
    <section id="MatchPage" className="relative flex size-full flex-col gap-1">
      <Topbar header="Faceit Import" />
      <TextInput
        label="Matchroom URL"
        placeholder="https://www.faceit.com/en/cs2/room/1-xxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx"
        value={matchroomURL}
        onChange={(e) => setMatchroomURL(e.target.value)}
        required
        error={!!matchroomURLError} // Set error state based on matchroomURLError
        errorMessage={matchroomURLError} // Show error message below field
      />
      <div className="inline-flex w-full justify-end gap-2 border-t border-border p-2">
        <div className="mt-1 flex justify-end gap-1">
        {isSubmitting ? (
          <ButtonContained disabled>Submitting...</ButtonContained>
        ) : (
          <ButtonContained onClick={handleSubmit}>Submit</ButtonContained>
        )}
        </div>
      </div>
      {importLog && (
        <div className="mt-2 w-full overflow-y-auto rounded border border-border bg-background p-2">
          <pre className="whitespace-pre-wrap break-words text-sm text-text">{importLog}</pre>
        </div>
      )}
    </section>
  );
};
