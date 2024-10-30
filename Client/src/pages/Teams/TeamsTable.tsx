import { Delete } from "@mui/icons-material";
import { Edit } from "@mui/icons-material";
import { TeamProps } from "./TeamsPage";

interface TeamsTableProps {
  teams: TeamProps[];
  deleteTeam: (id: string) => void;
  onEdit: (team: TeamProps) => void;
  refreshTeams: () => void;
}

export const TeamsTable = ({
  teams,
  deleteTeam,
  onEdit,
  refreshTeams,
}: TeamsTableProps) => {
  return (
    <table className="bg-background2 table-fixed">
      <thead className="border-border border-b">
        <tr className="p-2">
          <th className="p-4 text-sm" align="left">
            Logo
          </th>
          <th className="p-4 text-sm" align="center">
            Name
          </th>
          <th className="p-4 text-sm" align="center">
            Short Name
          </th>
          <th className="p-4 text-sm" align="center">
            Country
          </th>
          <th className="p-4 text-sm" align="right">
            Actions
          </th>
        </tr>
      </thead>
      <tbody>
        {teams.map((team: TeamProps, index) => (
          <TeamRow
            key={index}
            team={team}
            onEdit={onEdit}
            deleteTeam={deleteTeam}
            refreshTeams={refreshTeams}
          />
        ))}
      </tbody>
    </table>
  );
};

interface TeamRowProps {
  team: TeamProps;
  onEdit: (team: TeamProps) => void;
  deleteTeam: (id: string) => void;
  refreshTeams: () => void;
}

const TeamRow = ({ team, onEdit, deleteTeam, refreshTeams }: TeamRowProps) => {
  const handleEditClick = () => {
    if (onEdit) {
      onEdit(team); // Call onEdit prop function if provided
    }
  };

  return (
    <tr className="border-border border-b">
      <td className="p-4" align="left">
        <img src={team.logo} alt="Team Logo" className="size-12" />
      </td>
      <td className="p-4 text-lg font-semibold" align="center">
        {team.name}
      </td>
      <td className="p-4" align="center">
        {team.shortName}
      </td>
      <td className="p-4 font-semibold" align="center">
        {team.country}
      </td>
      <td className="p-4" align="right">
        <div className="inline-flex">
          <button
            className="border-primary/50 hover:bg-primary/10 text-primary relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 p-2 px-4 py-1 transition-colors"
            onClick={() => handleEditClick()}
          >
            <Edit />
          </button>

          <button
            className="border-primary/50 hover:bg-primary/10 text-primary relative inline-flex min-w-[40px] items-center justify-center rounded-r border p-2 px-4 py-1 transition-colors"
            onClick={() => deleteTeam(team.id)}
          >
            <Delete />
          </button>
        </div>
      </td>
    </tr>
  );
};
