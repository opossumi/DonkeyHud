import { usePlayersContext } from "../context";
import { apiUrl } from "../api/api";
import axios from "axios";

export const usePlayers = () => {
  const {
    players,
    filteredPlayers,
    isLoading,
    setFilteredPlayers,
    fetchPlayers,
    setIsLoading,
  } = usePlayersContext();

  const searchPlayers = (searchValue: string) => {
    const filtered = players.filter((player) =>
      player.username.toLowerCase().includes(searchValue.toLowerCase()),
    );
    if (searchValue === "") {
      setFilteredPlayers(players);
    } else {
      setFilteredPlayers(filtered);
    }
  };

  const createPlayer = async (player: Player) => {
    // Handle create or update player logic
    setIsLoading(true);
    await axios.post(`${apiUrl}/players`, player);
    fetchPlayers();
    setIsLoading(false);
  };

  const updatePlayer = async (player: Player) => {
    // Handle update player logic
    setIsLoading(true);
    await axios.put(`${apiUrl}/players/${player._id}`, player);
    fetchPlayers();
    setIsLoading(false);
  };

  const deletePlayer = async (id: string) => {
    // Handle delete player logic
    setIsLoading(true);
    await axios.delete(`${apiUrl}/players/${id}`);
    fetchPlayers();
    setIsLoading(false);
  };

  return {
    players,
    filteredPlayers,
    isLoading,
    setFilteredPlayers,
    fetchPlayers,
    createPlayer,
    updatePlayer,
    deletePlayer,
    searchPlayers,
  };
};
