import { useEffect, useState } from "react";
import { ButtonContained } from "../Components";
import { Match } from "../../api/interfaces";
import AddIcon from "@mui/icons-material/Add";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import RemoveIcon from "@mui/icons-material/Remove";
import axios from "axios";
import knifeImage from "../../assets/knifeRound.png";
import { socket } from "../../App";

interface MatchCardProps {
  match: Match;
  refreshMatches: () => void;
}

export const MatchCard = ({ match, refreshMatches }: MatchCardProps) => {
  const [teamOneName, setTeamOneName] = useState("");
  const [teamOneLogo, setTeamOneLogo] = useState("");
  const [teamTwoName, setTeamTwoName] = useState("");
  const [teamTwoLogo, setTeamTwoLogo] = useState("");
  const [teamOneId, setTeamOneId] = useState("");
  const [teamTwoId, setTeamTwoId] = useState("");
  const [swapTeams, setSwapTeams] = useState(true);

  useEffect(() => {
    const fetchTeamNames = async () => {
      try {
        const teamOne = await axios.get(
          `http://localhost:4000/teams/${match.left.id}`,
        );
        const teamTwo = await axios.get(
          `http://localhost:4000/teams/${match.right.id}`,
        );
        setTeamOneName(teamOne.data.name);
        setTeamOneLogo(teamOne.data.logo);
        setTeamTwoName(teamTwo.data.name);
        setTeamTwoLogo(teamTwo.data.logo);
        setTeamOneId(teamOne.data.id);
        setTeamTwoId(teamTwo.data.id);
      } catch (error) {
        console.error("Error fetching team names:", error);
      }
    };

    fetchTeamNames();
  }, []);

  const handleStopMatch = async () => {
    try {
      await axios.put(`http://localhost:4000/matches/${match.id}/current`, {
        current: false,
      });
      refreshMatches();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  const handleChangeScore = async (
    team: "left" | "right",
    action: "add" | "subtract",
  ) => {
    try {
      await axios.put(`http://localhost:4000/matches/${match.id}/${team}`, {
        action,
      });
      refreshMatches();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

  const handleSwapTeams = () => {
    setSwapTeams(!swapTeams);
    socket.emit("swap-teams", swapTeams);
    console.log("Swapping teams", swapTeams);
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
                <img src={teamOneLogo} alt="team1" width="50" />
                <div className="inline-flex">
                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("left", "add")}
                  >
                    <AddIcon />
                  </button>

                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("left", "subtract")}
                  >
                    <RemoveIcon />
                  </button>
                </div>
              </div>
              <div className="flex items-center justify-center">
                <button
                  className="rounded-lg bg-primary px-4 py-2"
                  onClick={handleSwapTeams}
                >
                  <SwapHorizIcon />
                </button>
              </div>
              <div
                id="TeamTwo"
                className="flex flex-col items-center justify-center gap-1"
              >
                <h1 className="text-6xl font-bold">{match.right.wins}</h1>
                <img src={teamTwoLogo} alt="team2" width="50" />
                <div className="inline-flex">
                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("right", "add")}
                  >
                    <AddIcon />
                  </button>

                  <button
                    className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
                    onClick={() => handleChangeScore("right", "subtract")}
                  >
                    <RemoveIcon />
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
            <th className="p-1 text-sm" align="left">
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
            <th className="p-1 text-sm" align="right">
              Winner
            </th>
          </tr>
        </thead>
        <tbody>
          {Object.values(match.vetos)
            .filter((veto) => veto.teamId || veto.type === "decider")
            .map((veto, index) => (
              <tr key={index} className="border-b border-border">
                <td className="p-2 text-lg font-semibold" align="left">
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
                <td className="p-2 text-lg font-semibold" align="right">
                  {veto.winner}
                </td>
              </tr>
            ))}
        </tbody>
      </table>
    </div>
  );
};
