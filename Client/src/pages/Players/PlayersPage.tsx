import { useEffect, useState } from "react";
import { PlayerCard } from "./PlayerCard";
import PlayerSilhouette from "../../assets/player_silhouette.webp";
import { PlayerForm } from "./PlayersForm";
import axios from "axios";
import { ButtonContained, Container } from "../Components";
import { apiUrl } from "../../api/api";
import { Player } from "../../api/interfaces";

export const getPlayers = async () => {
  const players = await axios.get(`${apiUrl}/players`);
  if (axios.isAxiosError(players)) {
    console.log("Error fetching players data");
    return [];
  }
  if (!players) {
    return [];
  }
  return players.data;
};

export const PlayersPage = () => {
  const [players, setPlayers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  // const [isLoading, setIsLoading] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null); // Store selected player for editing
  const [open, setOpen] = useState(false);

  useEffect(() => {
    // Fetch players data when the component mounts
    getPlayers().then((data) => {
      setPlayers(data);
    });
  }, []);

  const handleCreatePlayer = async (player: Player) => {
    // Handle create or update player logic
    // setIsLoading(true);
    await axios.post(`${apiUrl}/players`, player);
    await getPlayers().then((data) => {
      setPlayers(data);
    });
    // setIsLoading(false);
  };

  const handleEditPlayer = (player: Player) => {
    // Handle edit player logic
    setIsEditing(true);
    setOpen(true);
    setSelectedPlayer(player); // Set selected player for editing
  };

  const handleUpdatePlayer = async (player: Player) => {
    // Handle update player logic
    // setIsLoading(true);
    await axios.put(`${apiUrl}/players/${player._id}`, player);
    await getPlayers().then((data) => {
      setPlayers(data);
    });
    // setIsLoading(false);
  };

  const handleDeletePlayer = async (id: string) => {
    // Handle delete player logic
    // setIsLoading(true);
    await axios.delete(`${apiUrl}/players/${id}`);
    setPlayers(players.filter((player: Player) => player._id !== id));
    // setIsLoading(false);
  };

  return (
    <div className="relative flex size-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Players</h1>
        <ButtonContained onClick={() => setOpen(true)}>
          Create Player
        </ButtonContained>
      </div>
      {isEditing && selectedPlayer ? (
        <PlayerForm
          player={selectedPlayer}
          updatePlayer={handleUpdatePlayer}
          isEditing={isEditing}
          onCancel={() => setIsEditing(false)}
          open={open}
          setOpen={setOpen}
        />
      ) : (
        <PlayerForm
          createPlayer={handleCreatePlayer}
          open={open}
          setOpen={setOpen}
        />
      )}
      <Container>
        <div className="grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
          {players.length === 0 && (
            <h6 className="font-semibold">No Players created</h6>
          )}
          {players.map((player: Player, index) => (
            <PlayerCard
              key={index}
              player={player}
              deletePlayer={handleDeletePlayer}
              onEdit={handleEditPlayer}
            />
          ))}
        </div>
      </Container>
    </div>
  );
};

export { PlayerSilhouette };
