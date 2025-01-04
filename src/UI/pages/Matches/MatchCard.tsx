import { useEffect, useState } from "react";
import { Match } from "../../api/types";
import { MdRemove, MdAdd } from "react-icons/md";
import axios from "axios";
import knifeImage from "../../assets/knifeRound.png";
import { apiUrl } from "../../api/api";

interface MatchCardProps {
  match: Match;
  refreshMatches: () => void;
}

export const MatchCard = ({ match, refreshMatches }: MatchCardProps) => {
  const [teamOneId, setTeamOneId] = useState(null);
  const [teamOneName, setTeamOneName] = useState("");
  const [teamOneLogo, setTeamOneLogo] = useState("");
  const [teamOneWins, setTeamOneWins] = useState<number>(match.left.wins | 0);

  const [teamTwoId, setTeamTwoId] = useState(null);
  const [teamTwoName, setTeamTwoName] = useState("");
  const [teamTwoLogo, setTeamTwoLogo] = useState("");
  const [teamTwoWins, setTeamTwoWins] = useState<number>(match.right.wins | 0);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const teamOne = await axios.get(`${apiUrl}/teams/${match.left.id}`);
        const teamTwo = await axios.get(`${apiUrl}/teams/${match.right.id}`);
        setTeamOneId(teamOne.data._id);
        setTeamOneName(teamOne.data.name);
        setTeamOneLogo(teamOne.data.logo);

        setTeamTwoId(teamTwo.data._id);
        setTeamTwoName(teamTwo.data.name);
        setTeamTwoLogo(teamTwo.data.logo);
      } catch (error) {
        console.error("Error fetching team names:", error);
      }
    };
    fetchTeamNames();
  }, []);

  const handleStopMatch = async () => {
    try {
      await axios.put(`${apiUrl}/matches/${match.id}/current`, {
        current: false,
      });
      refreshMatches();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  const handleReverseSideChange = async (index: number) => {
    const updatedVetos = [...match.vetos];
    updatedVetos[index].reverseSide = !updatedVetos[index].reverseSide;

    const updatedMatch = {
      ...match,
      vetos: updatedVetos,
    };

    try {
      await axios.put(`${apiUrl}/matches/current/update`, updatedMatch);
      refreshMatches();
    } catch (error) {
      console.error("Error updating veto:", error);
    }
  };

  const handleSetWinner = async (index: number, id?: string) => {
    const updatedVetos = [...match.vetos];
    updatedVetos[index].winner = id ? id : undefined;

    const updatedMatch = {
      ...match,
      vetos: updatedVetos,
    };

    try {
      await axios.put(`${apiUrl}/matches/current/update`, updatedMatch);
      refreshMatches();
    } catch (error) {
      console.error("Error updating veto:", error);
    }
  };

  const handleChangeScore = async (
    team: "left" | "right",
    action: "add" | "subtract"
  ) => {
    let newTeamOneWins = teamOneWins;
    let newTeamTwoWins = teamTwoWins;

    if (team === "left") {
      if (action === "add") {
        newTeamOneWins += 1;
      } else {
        newTeamOneWins -= 1;
      }
      setTeamOneWins(newTeamOneWins);
    } else {
      if (action === "add") {
        newTeamTwoWins += 1;
      } else {
        newTeamTwoWins -= 1;
      }
      setTeamTwoWins(newTeamTwoWins);
    }

    const updatedMatch: Match = {
      ...match,
      left: {
        ...match.left,
        wins: newTeamOneWins,
      },
      right: {
        ...match.right,
        wins: newTeamTwoWins,
      },
    };
    try {
      await axios.put(`${apiUrl}/matches/current/update`, updatedMatch);
    } catch (error) {
      console.error("Error updating score:", error);
    }
  };

  return (
    <div
      key={match.id}
      className="relative flex flex-col bg-background2 p-4 lg:flex-row"
    >
      <div className="flex flex-auto flex-col items-center justify-center gap-2 p-2">
        <div className="flex flex-auto flex-col items-center justify-center rounded-lg bg-background px-14 py-5">
          <h1 className="text-4xl font-bold text-sky-500 md:text-5xl">
            MATCH LIVE
          </h1>
          <h2 className="text-3xl font-semibold md:text-4xl">
            {teamOneName} vs {teamTwoName}
          </h2>
          <h5>{match.matchType}</h5>
          <div id="Score" className="mb-2 flex flex-col p-2">
            <div id="Teams" className="flex gap-2">
              <div
                id="TeamOne"
                className="flex flex-col items-center justify-center gap-1"
              >
                <h1 className="text-6xl font-bold">{match.left.wins}</h1>
                <img src={teamOneLogo} alt="team1" className="size-14" />
                <div className="inline-flex">
                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("left", "add")}
                  >
                    <MdAdd />
                  </button>

                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("left", "subtract")}
                  >
                    <MdRemove />
                  </button>
                </div>
              </div>
              <div
                id="TeamTwo"
                className="flex flex-col items-center justify-center gap-1"
              >
                <h1 className="text-6xl font-bold">{match.right.wins}</h1>
                <img src={teamTwoLogo} alt="team2" className="size-14" />
                <div className="inline-flex">
                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("right", "add")}
                  >
                    <MdAdd />
                  </button>

                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("right", "subtract")}
                  >
                    <MdRemove />
                  </button>
                </div>
              </div>
            </div>
          </div>
          <button
            onClick={handleStopMatch}
            className="rounded bg-secondary px-4 py-2 font-semibold uppercase transition-colors hover:bg-secondary-dark"
          >
            Stop Match
          </button>
        </div>
      </div>
      <table className="flex-auto table-fixed">
        <thead className="border-b border-border">
          <tr className="p-2">
            <th className="p-1 text-sm" align="center">
              Team
            </th>
            <th className="p-1 text-sm" align="center">
              Type
            </th>
            <th className="p-1 text-sm" align="center">
              Map
            </th>
            <th className="p-1 text-sm" align="center">
              Side
            </th>
            <th className="p-1 text-sm" align="center">
              Winner
            </th>
            <th className="p-1 text-sm" align="center">
              ReverseSide
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(match.vetos)
            .filter((veto) => veto.teamId || veto.type === "decider")
            .map((veto, index) => (
              <tr key={index} className="border-b border-border">
                <td className="p-2 text-lg font-semibold" align="center">
                  <img
                    src={
                      veto.teamId === teamOneId
                        ? teamOneLogo
                        : veto.teamId === teamTwoId
                          ? teamTwoLogo
                          : knifeImage
                    }
                    alt="team"
                    className="size-12"
                  />
                </td>
                <td className="p-2 text-lg font-semibold" align="center">
                  {veto.type}
                </td>
                <td className="p-2 text-lg font-semibold" align="center">
                  {veto.mapName.substring(3)}
                </td>
                <td className="p-2 text-lg font-semibold" align="center">
                  {veto.side === "NO" ? "" : veto.side}
                </td>
                <td className="p-2 text-lg font-semibold" align="center">
                  <form>
                    <select
                      className="rounded-md border border-border bg-background p-2"
                      value={veto.winner ? veto.winner : ""}
                      onChange={(e) => handleSetWinner(index, e.target.value)}
                    >
                      <option value="">None</option>
                      {teamOneId && (
                        <option value={teamOneId}>{teamOneName}</option>
                      )}
                      {teamTwoId && (
                        <option value={teamTwoId}>{teamTwoName}</option>
                      )}
                    </select>
                  </form>
                </td>
                <td className="p-2 text-lg font-semibold" align="center">
                  <input
                    type="checkbox"
                    className="flex items-center justify-center"
                    checked={veto.reverseSide === true}
                    onChange={() => handleReverseSideChange(index)}
                  />
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
