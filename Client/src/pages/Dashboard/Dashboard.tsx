import React from "react";

// Dummy data (replace with real data)
const serverInfo = {
  ip: "192.168.0.1",
  port: 27015,
  status: "Connected",
};

const matchInfo = {
  round: 5,
  roundTime: "1:20",
  roundState: "Live",
  bestOfType: "Best of 3",
};

const team1 = {
  name: "Team Alpha",
  score: 7,
  economy: 12000,
  players: [
    { name: "Player1", kills: 10, deaths: 3, adr: 95 },
    { name: "Player2", kills: 8, deaths: 5, adr: 80 },
    // Add more players
  ],
};

const team2 = {
  name: "Team Bravo",
  score: 5,
  economy: 8000,
  players: [
    { name: "PlayerA", kills: 6, deaths: 7, adr: 75 },
    { name: "PlayerB", kills: 9, deaths: 6, adr: 85 },
    // Add more players
  ],
};

export const Dashboard = () => {
  return (
    <div className="relative flex h-full flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center justify-center gap-5">
          <h1 className="text-2xl font-bold">Dashboard -</h1>
          <h2 className="text-gray-400">Work in Progress (dummy data)</h2>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {/* Server Connect Info */}
        <div className="rounded-lg bg-background2 p-4 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Server Connect Info</h3>
          <p className="text-gray-400">IP: {serverInfo.ip}</p>
          <p className="text-gray-400">Port: {serverInfo.port}</p>
          <p className="text-gray-400">Status: {serverInfo.status}</p>
        </div>

        {/* Current Players */}
        <div className="rounded-lg bg-background2 p-4 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Current Players</h3>
          {/* Replace with actual player data */}
          <p className="text-gray-400">Player 1, Player 2, Player 3...</p>
        </div>

        {/* Match Information */}
        <div className="rounded-lg bg-background2 p-4 shadow-md">
          <h3 className="mb-2 text-xl font-bold">Match Information</h3>
          <p className="text-gray-400">Round: {matchInfo.round}</p>
          <p className="text-gray-400">Round Time: {matchInfo.roundTime}</p>
          <p className="text-gray-400">Round State: {matchInfo.roundState}</p>
          <p className="text-gray-400">Best of Type: {matchInfo.bestOfType}</p>
        </div>

        {/* Team 1 Panel */}
        <div className="rounded-lg bg-background2 p-4 shadow-md">
          <h3 className="mb-2 text-xl font-bold">
            {team1.name} - Score: {team1.score}
          </h3>
          <p className="text-gray-400">Team Economy: ${team1.economy}</p>
          <h4 className="mb-2 font-bold text-gray-400">Player Stats:</h4>
          <ul>
            {team1.players.map((player, index) => (
              <li key={index} className="text-gray-400">
                {player.name}: {player.kills}K / {player.deaths}D, ADR:{" "}
                {player.adr}
              </li>
            ))}
          </ul>
        </div>

        {/* Team 2 Panel */}
        <div className="rounded-lg bg-background2 p-4 shadow-md">
          <h3 className="mb-2 text-xl font-bold">
            {team2.name} - Score: {team2.score}
          </h3>
          <p className="text-gray-400">Team Economy: ${team2.economy}</p>
          <h4 className="mb-2 font-bold text-gray-400">Player Stats:</h4>
          <ul>
            {team2.players.map((player, index) => (
              <li key={index} className="text-gray-400">
                {player.name}: {player.kills}K / {player.deaths}D, ADR:{" "}
                {player.adr}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
