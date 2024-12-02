import React, { useEffect, useState } from "react";
import { CSGO } from "csgogsi-socket";
import { Layout } from "./Layout/Layout";
import "./hud.scss";
import { Match } from "../api/interfaces";
import { socket } from "../App";
import axios from "axios";
import api, { port } from "../api/api";
import { GSI } from "../App";
import { ONGSI } from "../api/contexts/actions";

interface HUDProps {
  gameData?: CSGO | null;
}

export const getCurrentMatch = async () => {
  const match = await axios.get("http://localhost:4000/current_match");
  const currentMatch: Match = match.data;
  return currentMatch;
};

export const HUD = ({ gameData }: HUDProps) => {
  const [game, setGame] = useState<CSGO | null>(null);
  const [currentMatch, setCurrentMatch] = useState<Match | null>(null);

  useEffect(() => {
    const onMatchPing = () => {
      api.match
        .getCurrent()
        .then((match) => {
          if (!match) {
            GSI.teams.left = null;
            GSI.teams.right = null;
            setCurrentMatch(null);
            return;
          }
          setCurrentMatch(match);
          let isReversed = false;
          if (GSI.last) {
            const mapName = GSI.last.map.name.substring(
              GSI.last.map.name.lastIndexOf("/") + 1,
            );
            const current = match.vetos.filter(
              (veto) => veto.mapName === mapName,
            )[0];
            if (current && current.reverseSide) {
              isReversed = true;
            }
          }
          if (match.left.id) {
            api.teams.getOne(match.left.id).then((left) => {
              const gsiTeamData = {
                id: left._id,
                name: left.name,
                country: left.country,
                logo: left.logo,
                map_score: match.left.wins,
                extra: left.extra,
              };

              if (!isReversed) {
                GSI.teams.left = gsiTeamData;
              } else GSI.teams.right = gsiTeamData;
            });
          }
          if (match.right.id) {
            api.teams.getOne(match.right.id).then((right) => {
              const gsiTeamData = {
                id: right._id,
                name: right.name,
                country: right.country,
                logo: right.logo,
                map_score: match.right.wins,
                extra: right.extra,
              };
              console.log(gsiTeamData);
              if (!isReversed) GSI.teams.right = gsiTeamData;
              else GSI.teams.left = gsiTeamData;
            });
          }
        })
        .catch(() => {
          GSI.teams.left = null;
          GSI.teams.right = null;
          setCurrentMatch(null);
        });
    };
    socket.on("match", onMatchPing);
    onMatchPing();

    return () => {
      socket.off("match", onMatchPing);
    };
  }, []);

  ONGSI(
    "data",
    (game) => {
      setGame(game);
    },
    [],
  );

  // useEffect(() => {
  //   const loadMatch = async () => {
  //     const matchData = await getCurrentMatch();
  //     if (!matchData) {
  //       setCurrentMatch(null);
  //       return;
  //     }
  //     setCurrentMatch(matchData);
  //     console.log(matchData);
  //     let isReversed = false;
  //     if (GSI.last) {
  //       const mapName = GSI.last.map.name.substring(
  //         GSI.last.map.name.lastIndexOf("/") + 1,
  //       );
  //       const current = matchData.vetos.filter(
  //         (veto) => veto.mapName === mapName,
  //       )[0];
  //       if (current && current.reverseSide) {
  //         isReversed = true;
  //       }
  //     }
  //     if (matchData.left.id) {
  //       await api.teams.getOne(matchData.left.id).then((left) => {
  //         const gsiTeamData = {
  //           id: matchData.left.id || "",
  //           name: left.name,
  //           country: left.country,
  //           logo: left.logo,
  //           map_score: matchData.left.wins,
  //           extra: left.extra,
  //         };
  //         if (!isReversed) {
  //           GSI.teams.left = gsiTeamData;
  //         } else GSI.teams.right = gsiTeamData;
  //       });
  //     }
  //     if (matchData.right.id) {
  //       await api.teams.getOne(matchData.right.id).then((right) => {
  //         const gsiTeamData = {
  //           id: matchData.right.id || "",
  //           name: right.name,
  //           country: right.country,
  //           logo: right.logo,
  //           map_score: matchData.right.wins,
  //           extra: right.extra,
  //         };
  //         console.log(gsiTeamData);
  //         if (!isReversed) GSI.teams.right = gsiTeamData;
  //         else GSI.teams.left = gsiTeamData;
  //       });
  //     }
  //   };
  //   loadMatch();

  //   socket.on("match", (data) => {
  //     console.log("Match update:", data);
  //     loadMatch();
  //   });
  //   socket.on("swap-teams", (swapTeams) => {
  //     loadMatch();
  //     console.log("Teams swapped", swapTeams);
  //   });
  //   return () => {
  //     socket.off("match", loadMatch);
  //     socket.off("swap-sides");
  //   };
  // }, []);

  if (!gameData)
    return (
      <div id="HUD" className="flex size-full items-center justify-center">
        <h1 className="text-5xl">Waiting for game data...</h1>
      </div>
    );

  return (
    <div id="HUD" className="hud">
      <Layout game={gameData} match={currentMatch} />
    </div>
  );
};
