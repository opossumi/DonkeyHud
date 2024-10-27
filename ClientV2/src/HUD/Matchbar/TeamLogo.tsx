import React from 'react';
import { Team } from 'csgogsi-socket';
import * as I from '../../api/interfaces';
import {apiUrl} from '../../api/api';

interface TeamLogoProps {
    team?: Team | I.Team | null;
    height?: number;
    width?: number;
};


export const TeamLogo = ({team, height = 50, width = 50}: TeamLogoProps) => {
    if(!team) return null;
    let id = '';
    const { logo } = team;
    if('_id' in team){
      id = team._id;
    } else if('id' in team && team.id){
      id = team.id;
    }
    // ${apiUrl}/teams/${id}/logo - Old way of getting the logo
    return (
      <div className={`logo`}>
          { logo && id ? <img src={`${logo}`} width={width} height={height} alt={'Team logo'} /> : ''}
      </div>
    );
}