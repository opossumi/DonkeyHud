import React, { useEffect, useState } from 'react';
import { CSGO } from 'csgogsi-socket';
import { Layout } from './Layout/Layout';
import './hud.scss';
import { Match, Veto } from '../api/interfaces';
import { socket } from '../App';
import axios from 'axios';
import api, { port } from '../api/api';
import { GSI } from '../App';
import { getTeams } from '../pages/Teams';

interface HUDProps {
    gameData?: CSGO | null;
}

export const getCurrentMatch = async () => {
    const match = await axios.get('http://localhost:4000/current_match');
    const currentMatch: Match = match.data;
    return currentMatch;
};

export const HUD = ({ gameData }: HUDProps) => {
    const [currentMatch, setMatchCurrent] = useState<Match | null>(null);
    
    useEffect(() => {
        const loadMatch = async () => {
            const matchData = await getCurrentMatch();
            if (!matchData) {
                setMatchCurrent(null);
                return;
            };
            setMatchCurrent(matchData);
            if (matchData.left.id) {
                await api.teams.getOne(matchData.left.id).then(left => {
                    const gsiTeamData = { id: matchData.left.id || '', name: left.name, country: left.country, logo: left.logo, map_score: matchData.left.wins, extra: left.extra };
                    GSI.teams.left = gsiTeamData;
                });
            }
            if (matchData.right.id) {
                await api.teams.getOne(matchData.right.id).then(right => {
                    console.log('Right:', right.logo);
                    const gsiTeamData = { id: matchData.right.id || '', name: right.name, country: right.country, logo: right.logo, map_score: matchData.right.wins, extra: right.extra };
                    GSI.teams.right = gsiTeamData;
                });
            }
        };
        loadMatch();

        socket.on('match-update', (data) => {
            console.log('Match update:', data);
            loadMatch();
        });
        return () => {
            socket.off('match-update', loadMatch);
        };
    }, []);


    if (!gameData) return <div className='flex size-full justify-center items-center'>
        <h1 className='text-5xl'>Waiting for game data...</h1>
    </div>;

    return (
        <div className='hud'>
            <Layout game={gameData} match={currentMatch} />
        </div>
    );
};
