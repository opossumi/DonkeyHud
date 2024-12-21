import { Request, Response } from "express";
import { CSGO, CSGOGSI, CSGORaw, RoundOutcome, Score } from "csgogsi";
import { io } from "..";
import { getCurrentMatch, updateCurrentMatch } from "../database/matches";
import { Match, RoundData } from "../types/types";

export const GSI = new CSGOGSI();

let matchEnded = false;

export const readGameData = async (req: Request, res: Response) => {
  let data: CSGORaw = req.body;
  fixGSIData(data);
  GSI.digest(data);
  io.emit("update", data);
  res.sendStatus(200);
};

const fixGSIData = (data: CSGORaw) => {
  if (data.player) {
    data.player.observer_slot =
      data.player.observer_slot !== undefined && data.player.observer_slot === 9
        ? 0
        : (data.player.observer_slot || 0) + 1;
  }

  if (data.allplayers) {
    for (const playerId in data.allplayers) {
      if (data.allplayers.hasOwnProperty(playerId)) {
        if (data.allplayers[playerId]) {
          data.allplayers[playerId].observer_slot =
            data.allplayers[playerId].observer_slot === 9
              ? 0
              : (data.allplayers[playerId].observer_slot || 0) + 1;
        }
      }
    }
  }
};
export const updateRound = async (game: CSGO) => {
  const getWinType = (round_win: RoundOutcome) => {
    switch (round_win) {
      case "ct_win_defuse":
        return "defuse";
      case "ct_win_elimination":
      case "t_win_elimination":
        return "elimination";
      case "ct_win_time":
        return "time";
      case "t_win_bomb":
        return "bomb";
      default:
        return "time";
    }
  };
  if (!game || !game.map || game.map.phase !== "live") return;

  let round = game.map.round;

  if (game.round && game.round.phase !== "over") {
    round++;
  }

  const roundData: RoundData = {
    round,
    players: {},
    winner: null,
    win_type: null,
  };

  if (
    game.round &&
    game.round.win_team &&
    game.map.round_wins &&
    game.map.round_wins[round]
  ) {
    roundData.winner = game.round.win_team;
    roundData.win_type = getWinType(game.map.round_wins[round]);
  }
  for (const player of game.players) {
    roundData.players[player.steamid] = {
      kills: player.state.round_kills,
      killshs: player.state.round_killhs,
      damage: player.state.round_totaldmg,
    };
  }

  const current: any = await getCurrentMatch();
  const match: Match = current;

  if (!match) return;

  const mapName = game.map.name.substring(game.map.name.lastIndexOf("/") + 1);
  const veto = match.vetos.find(
    (veto) => veto.mapName === mapName && !veto.mapEnd
  );

  if (!veto || veto.mapEnd) return;
  if (
    veto.rounds &&
    veto.rounds[roundData.round - 1] &&
    JSON.stringify(veto.rounds[roundData.round - 1]) ===
      JSON.stringify(roundData)
  )
    return;

  match.vetos = match.vetos.map((veto) => {
    if (veto.mapName !== mapName) return veto;
    if (!veto.rounds) veto.rounds = [];
    veto.rounds[roundData.round - 1] = roundData;
    veto.rounds = veto.rounds.splice(0, roundData.round);
    return veto;
  });

  return updateCurrentMatch(match);
};

const onRoundEnd = async (score: Score) => {
  if (score.loser && score.loser.logo) {
    // @ts-ignore
    delete score.loser.logo;
  }
  if (score.winner && score.winner.logo) {
    // @ts-ignore
    delete score.winner.logo;
  }
  const current: any = await getCurrentMatch();
  const match: Match = current;
  if (!match) return;
  const { vetos } = match;
  const mapName = score.map.name.substring(score.map.name.lastIndexOf("/") + 1);
  vetos.map((veto) => {
    if (
      veto.mapName !== mapName ||
      !score.map.team_ct.id ||
      !score.map.team_t.id ||
      veto.mapEnd
    ) {
      return veto;
    }
    if (!veto.score) {
      veto.score = {};
    }
    veto.score[score.map.team_ct.id] = score.map.team_ct.score;
    veto.score[score.map.team_t.id] = score.map.team_t.score;
    if (veto.reverseSide) {
      veto.score[score.map.team_t.id] = score.map.team_ct.score;
      veto.score[score.map.team_ct.id] = score.map.team_t.score;
    }
    return veto;
  });
  match.vetos = vetos;
  await updateCurrentMatch(match);

  io.emit("match", true);
};

const onHalfEnd = async (mapName: string) => {
  const current: any = await getCurrentMatch();
  const match: Match = current;
  if (match) {
    const { vetos } = match;
    const updatedVetos = vetos.map((veto) =>
      veto.mapName === mapName
        ? { ...veto, reverseSide: !veto.reverseSide }
        : veto
    );
    match.vetos = updatedVetos;
    await updateCurrentMatch(match);
    io.emit("match", true);
  }
};

const onMatchEnd = async (score: Score) => {
  if (matchEnded) {
    return;
  }
  const current: any = await getCurrentMatch();
  const match: Match = current;
  const mapName = score.map.name.substring(score.map.name.lastIndexOf("/") + 1);
  if (match) {
    const { vetos } = match;
    const isReversed = vetos.filter(
      (veto) => veto.mapName === mapName && veto.reverseSide
    )[0];
    vetos.map((veto) => {
      if (
        veto.mapName !== mapName ||
        !score.map.team_ct.id ||
        !score.map.team_t.id
      ) {
        return veto;
      }
      veto.winner =
        score.map.team_ct.score > score.map.team_t.score
          ? score.map.team_ct.id
          : score.map.team_t.id;
      if (isReversed) {
        veto.winner =
          score.map.team_ct.score > score.map.team_t.score
            ? score.map.team_t.id
            : score.map.team_ct.id;
      }
      // if (veto.score && veto.score[veto.winner]) {
      //   veto.score[veto.winner]++;
      // }
      veto.mapEnd = true;
      return veto;
    });
    if (match.left.id === score.winner.id) {
      if (isReversed) {
        match.right.wins++;
      } else {
        match.left.wins++;
      }
    } else if (match.right.id === score.winner.id) {
      if (isReversed) {
        match.left.wins++;
      } else {
        match.right.wins++;
      }
    }
    match.vetos = vetos;
    await updateCurrentMatch(match);
    io.emit("match", true);
  }
};
let last: CSGO;

GSI.on("data", async (data: CSGO) => {
  await updateRound(data);
  let round: Score | undefined;

  if (
    (last?.map.team_ct.score !== data.map.team_ct.score) !==
    (last?.map.team_t.score !== data.map.team_t.score)
  ) {
    if (last?.map.team_ct.score !== data.map.team_ct.score) {
      round = {
        winner: data.map.team_ct,
        loser: data.map.team_t,
        map: data.map,
        mapEnd: false,
      };
    } else {
      round = {
        winner: data.map.team_t,
        loser: data.map.team_ct,
        map: data.map,
        mapEnd: false,
      };
    }
  }

  if (round) {
    await onRoundEnd(round);
  }

  if (
    data.map.phase === "intermission" &&
    data.phase_countdowns.phase_ends_in === 0.0
  ) {
    // console.log("Half time - switching sides");
    onHalfEnd(data.map.name);
  }

  if (data.map.phase === "gameover") {
    const winner =
      data.map.team_ct.score > data.map.team_t.score
        ? data.map.team_ct
        : data.map.team_t;
    const loser =
      data.map.team_ct.score > data.map.team_t.score
        ? data.map.team_t
        : data.map.team_ct;
    const final = {
      winner,
      loser,
      map: data.map,
      mapEnd: true,
    };
    await onMatchEnd(final);
    matchEnded = true;
  } else {
    matchEnded = false;
  }
  if (GSI.last) {
    last = GSI.last;
  }
});
