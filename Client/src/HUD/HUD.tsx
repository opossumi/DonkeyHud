import React, { useEffect, useState } from 'react';
import { CSGO } from 'csgogsi-socket';
import { Layout } from './Layout/Layout';
import './hud.scss';
import { Match, Veto } from '../api/interfaces';
import { socket } from '../App';
import axios from 'axios';
import api, { port } from '../api/api';
import { GSI } from '../App';

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
        const fetchCurrentMatch = async () => {
            const matchData = await getCurrentMatch();
            setMatchCurrent(matchData);
        };

        fetchCurrentMatch();
    }, []);
    // useEffect(() => {
    //     const loadMatch = async () => {
    //         const matchData = await getCurrentMatch();
    //         if (!matchData) setMatchCurrent(null);
    //         if (matchData.left.id) {
    //             api.teams.getOne(matchData.left.id).then(left => {
    //                 console.log('Left:', left.name);
    //                 const gsiTeamData = { id: matchData.left.id || '', name: left.name, country: left.country, logo: left.logo, map_score: matchData.left.wins, extra: left.extra };
    //                 GSI.teams.left = gsiTeamData;
    //             })
    //         }


    //         setMatchCurrent(matchData);
    //     };

    //     loadMatch();
    // }, []);

    useEffect(() => {
        const handleMatchUpdate = async (id: string) => {
            const matchData = await getCurrentMatch();
            if (!matchData) setMatchCurrent(null);
            setMatchCurrent(matchData);
        };

        socket.on('match-update', (data) => {
            console.log('Match update:', data);
            handleMatchUpdate(data);
        });
        return () => {
            socket.off('match-update', handleMatchUpdate);
        };
    }, []); 

    if (!gameData) return <div></div>;

    return (
        <div className='hud'>
            <Layout game={gameData} match={currentMatch} />
        </div>
    );
};
