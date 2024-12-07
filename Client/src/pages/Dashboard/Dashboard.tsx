import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container } from "../Components";
import { CSGO, GSISocket, CSGORaw } from "csgogsi-socket";
import { Tile } from "./Tile";

interface DashboardProps {
  gameData: CSGO | null;
}

export const Dashboard = ({ gameData }: DashboardProps) => {
  return (
    <div className="relative flex size-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="font-bold">Dashboard</h1>
      </div>
      <Container>
        {gameData ? (
          <div className="grid grid-cols-3 grid-rows-3">
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
