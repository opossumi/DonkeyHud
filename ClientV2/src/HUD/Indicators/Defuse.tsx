import { Player } from 'csgogsi';
import {Defuse as DefuseIcon} from '../assets/Icons';

interface DefuseProps {
    player: Player;
}

export const Defuse = ({ player }: DefuseProps) => {
        if(!player.state.health || !player.state.defusekit) return null;
        return (
            <div className={`defuse_indicator`}>
                <DefuseIcon />
            </div>
        );
}