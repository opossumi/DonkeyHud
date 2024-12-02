import React, { useState } from "react";
import { CSGO, Team } from "csgogsi-socket";
import { Observed } from "../Players/Observed";
import { Matchbar } from "../Matchbar/Matchbar";
import MapSeries from "../MapSeries/MapSeries";
import { TeamBox } from "../Players/TeamBox";
import { Match } from "../../api/interfaces";
import { SeriesBox } from "../Matchbar/SeriesBox";
import RadarMaps from "../Radar/RadarMaps";
import Money from "../SideBoxes/Money";
import Pause from "../PauseTimeout/Pause";
import Timeout from "../PauseTimeout/Timeout";
import UtilityLevel from "../SideBoxes/UtilityLevel";
import SideBox from "../SideBoxes/SideBox";

interface LayoutProps {
  game: CSGO;
  match?: Match | null;
}

export const Layout = ({ game, match }: LayoutProps) => {
  const [forceHide, setForceHide] = useState(false);

  const left =
    game.map.team_ct.orientation === "left"
      ? game.map.team_ct
      : game.map.team_t;
  const right =
    game.map.team_ct.orientation === "left"
      ? game.map.team_t
      : game.map.team_ct;
  // console.log(left);
  // console.log(right);

  const leftPlayers = game.players.filter(
    (player) => player.team.side === left.side,
  );
  const rightPlayers = game.players.filter(
    (player) => player.team.side === right.side,
  );
  const isFreezetime =
    (game.round && game.round.phase === "freezetime") ||
    game.phase_countdowns.phase === "freezetime";

  return (
    <div className="layout">
      <div className={`players_alive`}>
        <div className="title_container">Players alive</div>
        <div className="counter_container">
          <div className={`team_counter ${left.side}`}>
            {leftPlayers.filter((player) => player.state.health > 0).length}
          </div>
          <div className={`vs_counter`}>VS</div>
          <div className={`team_counter ${right.side}`}>
            {rightPlayers.filter((player) => player.state.health > 0).length}
          </div>
        </div>
      </div>
      {/* <Killfeed /> */}
      {/* <Overview match={match} map={game.map} players={game.players || []} /> */}
      <RadarMaps match={match ? match : null} map={game.map} game={game} />
      <Matchbar
        map={game.map}
        match={match ? match : null}
        phase={game.phase_countdowns}
        bomb={game.bomb}
      />
      <Pause phase={game.phase_countdowns} />
      <Timeout map={game.map} phase={game.phase_countdowns} />
      <SeriesBox map={game.map} match={match ? match : null} />

      {/* <Tournament /> */}

      <Observed player={game.player} />

      <TeamBox
        team={left}
        players={leftPlayers}
        side="left"
        current={game.player}
      />
      <TeamBox
        team={right}
        players={rightPlayers}
        side="right"
        current={game.player}
      />

      {/* <Trivia /> */}
      <MapSeries
        teams={[left, right]}
        match={match ? match : null}
        isFreezetime={isFreezetime}
        map={game.map}
      />
      <div className={"boxes left"}>
        <UtilityLevel
          side={left.side}
          players={game.players}
          show={isFreezetime && !forceHide}
        />
        <SideBox side="left" hide={forceHide} />
        <Money
          team={left.side}
          side="left"
          loss={Math.min(left.consecutive_round_losses * 500 + 1400, 3400)}
          equipment={leftPlayers
            .map((player) => player.state.equip_value)
            .reduce((pre, now) => pre + now, 0)}
          money={leftPlayers
            .map((player) => player.state.money)
            .reduce((pre, now) => pre + now, 0)}
          show={isFreezetime && !forceHide}
        />
      </div>
      <div className={"boxes right"}>
        <UtilityLevel
          side={right.side}
          players={game.players}
          show={isFreezetime && !forceHide}
        />
        <SideBox side="right" hide={forceHide} />
        <Money
          team={right.side}
          side="right"
          loss={Math.min(right.consecutive_round_losses * 500 + 1400, 3400)}
          equipment={rightPlayers
            .map((player) => player.state.equip_value)
            .reduce((pre, now) => pre + now, 0)}
          money={rightPlayers
            .map((player) => player.state.money)
            .reduce((pre, now) => pre + now, 0)}
          show={isFreezetime && !forceHide}
        />
      </div>
    </div>
  );
};
