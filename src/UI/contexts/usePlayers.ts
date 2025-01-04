import { useEffect, useState } from "react";

export function usePlayers() {
  const [players, setPlayers] = useState<Player[]>();

  useEffect(() => {
    window.electron.getPlayers().then(setPlayers);
  }, []);

  return players;
}
