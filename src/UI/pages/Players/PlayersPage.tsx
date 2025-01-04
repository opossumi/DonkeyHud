import { useEffect, useState } from "react";
import { PlayerCard } from "./PlayerCard";
import PlayerSilhouette from "../../assets/player_silhouette.webp";
import { PlayerForm } from "./PlayersForm";
import axios from "axios";
import { ButtonContained, Container } from "../../components";
import { apiUrl } from "../../api/api";
import { Player } from "../../api/types";
import { MdClose, MdSearch } from "react-icons/md";

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
  const [searchValue, setSearchValue] = useState<string>("");
  const [filteredSearch, setFilteredSearch] = useState<Player[]>([]);
  const [players, setPlayers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null); // Store selected player for editing
  const [open, setOpen] = useState(false);

  async function fetchPlayers() {
    const players = await getPlayers();
    setPlayers(players);
    setFilteredSearch(players);
  }

  useEffect(() => {
    // Fetch players data when the component mounts
    fetchPlayers();
  }, []);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    const searchWord: string = event.target.value;
    setSearchValue(searchWord);
    const newFilter: Player[] = players.filter((player: Player) => {
      return player.username.toLowerCase().includes(searchWord.toLowerCase());
    });
    if (searchWord === "") {
      setFilteredSearch(players);
    } else {
      setFilteredSearch(newFilter);
    }
  };

  const clearSearchInput = () => {
    setFilteredSearch(players);
    setSearchValue("");
  };

  const handleCreatePlayer = async (player: Player) => {
    // Handle create or update player logic
    await axios.post(`${apiUrl}/players`, player);
    fetchPlayers();
  };

  const handleEditPlayer = (player: Player) => {
    // Handle edit player logic
    setIsEditing(true);
    setOpen(true);
    setSelectedPlayer(player); // Set selected player for editing
  };

  const handleUpdatePlayer = async (player: Player) => {
    // Handle update player logic
    await axios.put(`${apiUrl}/players/${player._id}`, player);
    fetchPlayers();
  };

  const handleDeletePlayer = async (id: string) => {
    // Handle delete player logic
    await axios.delete(`${apiUrl}/players/${id}`);
    fetchPlayers();
  };

  return (
    <section className="relative flex size-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Players</h1>
        <div className="flex flex-col gap-2">
          <div className="relative flex size-full items-center justify-center gap-2 rounded  px-2 text-sm text-textcolor bg-background2">
            <MdSearch className="size-6" />
            <input
              type="text"
              placeholder="Search players"
              className="w-full bg-transparent border-none focus:outline-none focus:ring-0"
              onChange={handleSearch}
              value={searchValue}
            />
            {searchValue.length === 0 ? null : (
              <MdClose className="cursor-pointer" onClick={clearSearchInput} />
            )}
          </div>
        </div>
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
        <div
          className={
            players.length === 0
              ? "flex justify-center items-center"
              : "grid grid-cols-1 justify-items-center gap-2 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4"
          }
        >
          {players.length === 0 && (
            <h6 className="font-semibold text-center">No Players created</h6>
          )}

          {filteredSearch.map((player: Player, index) => {
            return (
              <PlayerCard
                key={index}
                player={player}
                deletePlayer={handleDeletePlayer}
                onEdit={handleEditPlayer}
              />
            );
          })}
        </div>
      </Container>
    </section>
  );
};

export { PlayerSilhouette };
