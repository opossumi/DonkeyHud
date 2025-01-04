import { useEffect, useState } from "react";
import { Container } from "../../components";
import { CSGO } from "csgogsi";
import { GSI } from "../../api/socket";
import { Tile } from "./Tile";

export const Dashboard = () => {
  const [gameData, setGameData] = useState<CSGO | null>(null);
  useEffect(() => {
    GSI.on("data", (data: CSGO) => {
      setGameData(data);
    });
  }, []);
  return (
    <div className="relative flex size-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Dashboard</h1>
      </div>
      <Container>
        {gameData ? (
          <div className="grid grid-cols-3">
            <Tile
              title="Players Connected"
              body={
                <>
                  {gameData.players.map((player) => (
                    <p className="place-self-center" key={player.steamid}>
                      {player.name}
                    </p>
                  ))}
                </>
              }
            />
          </div>
        ) : (
          <h1>Not connected to a server</h1>
        )}
      </Container>
    </div>
  );
};
