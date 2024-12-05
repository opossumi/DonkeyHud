import React, { useState } from "react";
import { MatchProvider, useMatchContext } from "./MatchContext";
import { Match } from "../../api/interfaces";
import { MatchesPage } from "./MatchPage";

export const MatchPage2 = () => {
  return (
    <MatchProvider>
      <MatchesPage />
    </MatchProvider>
  );
};
