import React, { useEffect, useState } from 'react';
import { Veto } from '../../api/interfaces';
import { maps} from './MatchPage';
import {  Box, FormControl,  InputLabel,  MenuItem,  Select,  Typography,  Paper } from '@mui/material';

interface VetoCardProps {
    index: number;
    veto: Veto;
    leftTeamId: string | null;
    rightTeamId: string | null;
    onVetoChange: (index: number, key: keyof Veto, value: any) => void;
}


export const VetoCard = ({index, veto, leftTeamId, rightTeamId, onVetoChange}: VetoCardProps) => {
    return (
        <Paper key={index} elevation={3} sx={{p: 1, display: 'flex', flexDirection: 'column', gap: 1}} className='!bg-background2/30'>
            <Typography variant="subtitle1" gutterBottom>Veto {(index + 1)}</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', gap: 2 }}>
            <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                value={veto.type}
                onChange={(e) => onVetoChange(index, 'type', e.target.value)}
                label="Type"
                >
                <MenuItem value="ban">Ban</MenuItem>
                <MenuItem value="pick">Pick</MenuItem>
                <MenuItem value="decider">Decider</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>{veto.type === 'decider' ? "Decider" : "Team" }</InputLabel>
                <Select
                disabled={veto.type === 'decider'}
                value={veto.type === 'decider' ? 'decider' : veto.teamId}
                onChange={(e) => onVetoChange(index, 'teamId', e.target.value)}
                label={veto.type === 'decider' ? "Decider" : "Team"}
                >
                    <MenuItem value={leftTeamId ? leftTeamId : ""}>{leftTeamId ? leftTeamId : ""}</MenuItem>
                    <MenuItem value={rightTeamId ? rightTeamId : ""}>{rightTeamId ? rightTeamId : ""}</MenuItem>
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Map</InputLabel>
                <Select
                value={veto.mapName}
                onChange={(e) => onVetoChange(index, 'mapName', e.target.value)}
                label="Map"
                >
                {maps.map((map) => (
                    <MenuItem key={map} value={map}>{map}</MenuItem>
                ))}
                </Select>
            </FormControl>

            <FormControl fullWidth>
                <InputLabel>Side</InputLabel>
                <Select
                value={veto.side}
                onChange={(e) => onVetoChange(index, 'side', e.target.value)}
                label="Side"
                >
                <MenuItem value="NO">No Side</MenuItem>
                <MenuItem value="CT">CT</MenuItem>
                <MenuItem value="T">T</MenuItem>
                </Select>
            </FormControl>
            </Box>
        </Paper>
    );
};