import { Delete } from "@mui/icons-material";
import { Match } from "../../api/interfaces";
import { Edit } from "@mui/icons-material";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import CancelIcon from "@mui/icons-material/Cancel";
import { useEffect, useState } from "react";
import axios from "axios";
import { socket } from "../../App";

interface MatchTableProps {
  matches: Match[];
  deleteMatch: (id: string) => void;
  onEdit: (match: Match) => void;
  refreshMatches: () => void;
}

export const MatchesTable = ({
  matches,
  deleteMatch,
  onEdit,
  refreshMatches,
}: MatchTableProps) => {
  useEffect(() => {
    socket.on("match", (data) => {
      refreshMatches();
    });
  }, []);
  return (
    <table className="table-fixed bg-background2">
      <thead className="border-b border-border">
        <tr className="p-2">
          <th className="p-4 text-sm" align="left">
            Match
          </th>
          <th className="p-4 text-sm" align="center">
            Score
          </th>
          <th className="p-4 text-sm" align="right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {matches.map((match: Match, index) => (
          <MatchRow
            key={index}
            match={match}
            onEdit={onEdit}
            deleteMatch={deleteMatch}
            refreshMatches={refreshMatches}
          />
        ))}
      </tbody>
    </table>
  );
};

interface MatchRowProps {
  match: Match;
  onEdit: (match: Match) => void;
  deleteMatch: (id: string) => void;
  refreshMatches: () => void;
}

const MatchRow = ({
  match,
  onEdit,
  deleteMatch,
  refreshMatches,
}: MatchRowProps) => {
  const [teamOneName, setTeamOneName] = useState("");
  const [teamOneLogo, setTeamOneLogo] = useState("");
  const [teamTwoName, setTeamTwoName] = useState("");
  const [teamTwoLogo, setTeamTwoLogo] = useState("");

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
      } catch (error) {
        console.error("Error fetching team names:", error);
      }
    };

    fetchTeamNames();
  }, []);

  const handleEditClick = () => {
    onEdit(match);
  };

  const handleStartMatch = async () => {
    try {
      await axios.put(`http://localhost:4000/matches/${match.id}/current`, {
        current: true,
      });

      refreshMatches();
    } catch (error) {
      console.error("Error updating match:", error);
    }
  };

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

  return (
    <tr className="relative border-b border-border">
      <td className="p-4 text-xl font-semibold md:text-2xl" align="left">
        <span className="mr-4">
          {teamOneName} vs {teamTwoName}
        </span>
        {match.current ? (
          <span className="font-semibold text-secondary">LIVE</span>
        ) : (
          ""
        )}
      </td>
      <td className="p-4 text-lg font-semibold" align="center">
        <h6 className="flex items-center justify-center gap-2">
          <img
            src={teamOneLogo}
            className="hidden md:block"
            alt="Team One Logo"
          />{" "}
          {match.left.wins} - {match.right.wins}{" "}
          <img
            className="hidden md:block"
            src={teamTwoLogo}
            alt="Team Two Logo"
          />
        </h6>
      </td>
      <td className="p-4" align="right">
        {match.current ? (
          <div className="inline-flex">
            <button
              onClick={handleStopMatch}
              className="relative inline-flex min-w-[40px] items-center justify-center rounded border border-secondary/50 p-2 px-4 py-1 text-secondary transition-colors hover:bg-secondary/10"
            >
              <CancelIcon />
            </button>
          </div>
        ) : (
          <div className="inline-flex">
            <button
              onClick={handleStartMatch}
              className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            >
              <PlayArrowIcon />
            </button>
            <button
              className="relative inline-flex min-w-[40px] items-center justify-center border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
              onClick={() => handleEditClick()}
            >
              <Edit />
            </button>

            <button
              className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
              onClick={() => deleteMatch(match.id)}
            >
              <Delete />
            </button>
          </div>
        )}
      </td>
    </tr>
  );
};
