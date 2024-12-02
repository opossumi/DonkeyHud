import React, { useEffect, useState } from "react";
import "./radar.scss";
import { Match, Veto } from "../../api/interfaces";
import { Map, CSGO, Team } from "csgogsi-socket";
// import { actions } from './../../App';
import Radar from "./Radar";
import { TeamLogo } from "../Matchbar/TeamLogo";

interface Props {
  match: Match | null;
  map: Map;
  game: CSGO;
}

const RadarMaps = ({ match, map, game }: Props) => {
  const [showRadar, setShowRadar] = useState(true);
  const [radarSize, setRadarSize] = useState(350);
  const [showBig, setShowBig] = useState(false);

  useEffect(() => {
    // actions.on('radarBigger', () => radarChangeSize(20));
    // actions.on('radarSmaller', () => radarChangeSize(-20));
    // actions.on('toggleRadar', () => { setShowRadar(prev => !prev) });

    // actions.on("toggleRadarView", () => {
    //     setShowBig(prev => !prev);
    // });

    // Cleanup function to remove event listeners if needed
    return () => {
      // actions.off('radarBigger');
      // actions.off('radarSmaller');
      // actions.off('toggleRadar');
      // actions.off("toggleRadarView");
    };
  }, []);

  const radarChangeSize = (delta: number) => {
    setRadarSize((prevSize) => Math.max(prevSize + delta, 0));
  };

  const size = showBig ? 600 : radarSize;

  return (
    <div
      id={`radar_maps_container`}
      className={`${!showRadar ? "hide" : ""} ${showBig ? "preview" : ""}`}
    >
      <div
        className="radar-component-container"
        style={{ width: `${size}px`, height: `${size}px` }}
      >
        <Radar radarSize={size} game={game} />
      </div>
      {match ? <MapsBar match={match} map={map} game={game} /> : null}
    </div>
  );
};

interface MapsBarProps {
  match: Match;
  map: Map;
  game: CSGO;
}

const MapsBar = ({ match, map }: MapsBarProps) => {
  if (!match || !match.vetos.length) return null;
  const picks = match.vetos.filter(
    (veto) => veto.type !== "ban" && veto.mapName,
  );
  if (picks.length > 3) {
    const current = picks.find((veto) => map.name.includes(veto.mapName));
    if (!current) return null;
    return (
      <div id="maps_container">
        {
          <MapEntry
            veto={current}
            map={map}
            team={
              current.type === "decider"
                ? null
                : map.team_ct.id === current.teamId
                  ? map.team_ct
                  : map.team_t
            }
          />
        }
      </div>
    );
  }
  // console.log(map);
  // console.log(
  //   match.vetos
  //     .filter((veto) => veto.type !== "ban")
  //     .filter((veto) => veto.teamId || veto.type === "decider")
  //     .map((veto) => (
  //       <MapEntry
  //         key={veto.mapName}
  //         veto={veto}
  //         map={map}
  //         team={
  //           veto.type === "decider"
  //             ? null
  //             : map.team_ct.id === veto.teamId
  //               ? map.team_ct
  //               : map.team_t
  //         }
  //       />
  //     )),
  // );
  return (
    <div id="maps_container">
      {match.vetos
        .filter((veto) => veto.type !== "ban")
        .filter((veto) => veto.teamId || veto.type === "decider")
        .map((veto) => (
          <MapEntry
            key={veto.mapName}
            veto={veto}
            map={map}
            team={
              veto.type === "decider"
                ? null
                : map.team_ct.id === veto.teamId
                  ? map.team_ct
                  : map.team_t
            }
          />
        ))}
    </div>
  );
};

interface MapEntryProps {
  veto: Veto;
  map: Map;
  team: Team | null;
}

const MapEntry = ({ veto, map, team }: MapEntryProps) => {
  // console.log(team);
  return (
    <div className="veto_entry">
      <div className="team_logo">{team ? <TeamLogo team={team} /> : null}</div>
      <div
        className={`map_name ${map.name.includes(veto.mapName) ? "active" : ""}`}
      >
        {veto.mapName}
      </div>
    </div>
  );
};

export default RadarMaps;
