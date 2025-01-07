import React from "react";
import { PlayersProvider } from "./PlayersContext";
import { TeamsProvider } from "./TeamsContext";
import { MatchesProvider } from "./MatchesContext";

export const AppProviders: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return (
    <MatchesProvider>
      <PlayersProvider>
        <TeamsProvider>{children}</TeamsProvider>
      </PlayersProvider>
    </MatchesProvider>
  );
};
