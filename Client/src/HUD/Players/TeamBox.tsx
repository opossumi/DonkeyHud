import React from 'react'
import { AllPlayers } from '../Players/Player'
import * as I from 'csgogsi-socket'

interface TeamBoxProps {
  players: I.Player[];
  team: I.Team;
  side: 'right' | 'left';
  current: I.Player | null;
}

export const TeamBox = ({players, team, side, current}: TeamBoxProps) => {
  return (
    <div className={`teambox ${team.side} ${side}`}>
        {players.map(player => <AllPlayers
          key={player.steamid}
          player={player}
          isObserved={!!(current && current.steamid === player.steamid)}
        />)}
      </div>
  )
}
