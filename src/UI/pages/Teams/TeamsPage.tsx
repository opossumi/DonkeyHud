import { useState } from "react";
import { TeamsTable } from "./TeamsTable";
import { TeamsForm } from "./TeamForm";
import { Topbar } from "../MainPanel/Topbar";

export const TeamsPage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState<Team | null>(null);
  const [open, setOpen] = useState(false);

  const handleEditTeam = (team: Team) => {
    // Handle edit player logic
    setIsEditing(true);
    setSelectedTeam(team); // Set selected player for editing
    setOpen(true);
  };

  return (
    <div className="relative flex size-full flex-col gap-4">
      <Topbar header="Teams" buttonText="Team" openForm={setOpen} />
      {isEditing && selectedTeam ? (
        <TeamsForm
          team={selectedTeam}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <TeamsForm open={open} setOpen={setOpen} />
      )}
      <TeamsTable onEdit={handleEditTeam} />
    </div>
  );
};
