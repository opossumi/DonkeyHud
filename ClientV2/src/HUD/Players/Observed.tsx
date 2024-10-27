import React, { useState } from 'react'
import './observed.scss'
import { Player } from 'csgogsi-socket';
import { WeaponImage } from '../Weapons/Weapon';
import { ArmorHelmet, ArmorFull, HealthFull, Bullets, KillIcon, Skull, AssistIcon } from '../assets/Icons';
import { RoundKills } from '../Helpers';
import { Avatar } from '../Helpers'
import { TeamLogo } from '../Matchbar/TeamLogo';
import { getCountry } from '../countries';

interface PlayerProps {
    player: Player | null;
}

export const Observed = ({player}: PlayerProps) => {
    const [ showCam, setShowCam ] = useState(true);
    if (!player) return null;
    // console.log(player);
    const country = player.country || player.team.country;
    const weapons = Object.values(player.weapons).map(weapon => ({ ...weapon, name: weapon.name.replace("weapon_", "") }));
    const currentWeapon = weapons.filter(weapon => weapon.state === "active")[0];
    const grenades = weapons.filter(weapon => weapon.type === "Grenade");
    const { stats } = player;
    const ratio = stats.deaths === 0 ? stats.kills : stats.kills / stats.deaths;
	const countryName = country ? getCountry(country) : null;

    const getHealthBarWidth = (health: number, min: number, max: number) => {
		if (health > min && health <= max) {
			return health + "%";
		}
		if (health <= min) {
			return "0%";
		}
		if (health > max) {
			return "100%";
		}
		return "0%";
	}


    return (
        <div className={`observed ${player.team.side}`}>
			<div className="main_row">
				<Avatar teamId={player.team.id} steamid={player.steamid} height={140} width={140} showCam={showCam} slot={player.observer_slot} />
				<TeamLogo team={player.team} height={35} width={35} />
				<div className="username_container">
					<div className="username">{player.name}</div>
					<div className="real_name">{player.realName}</div>
				</div>
				{/* <div className="flag">{countryName ? <img src={`${apiUrl}files/img/flags/${countryName.replace(/ /g, "-")}.png`} alt={countryName} /> : ''}</div> */}
				<div className="grenade_container">
					{grenades.map(grenade => <React.Fragment key={`${player.steamid}_${grenade.name}_${grenade.ammo_reserve || 1}`}>
						<WeaponImage weapon={grenade.name} active={grenade.state === "active"} isGrenade />
						{
							grenade.ammo_reserve === 2 ? <WeaponImage weapon={grenade.name} active={grenade.state === "active"} isGrenade /> : null}
					</React.Fragment>)}
				</div>
			</div>
			<div className="stats_row">
				<div className="health_armor_container">
					<div className="health-icon icon">
						<HealthFull />
					</div>
					<div className="health text">{player.state.health}</div>
					<div className="armor-icon icon">
						{player.state.helmet ? <ArmorHelmet /> : <ArmorFull />}
					</div>
					<div className="health text">{player.state.armor}</div>
				</div>
				<div className="statistics">
					<Statistic label={"K"} value={stats.kills} />
					<Statistic label={"A"} value={stats.assists} />
					<Statistic label={"D"} value={stats.deaths} />
					<Statistic label={"K/D"} value={ratio.toFixed(2)} />
				</div>
				<div className="ammo">
					<div className="ammo_icon_container">
						<Bullets />
					</div>
					<div className="ammo_counter">
						<div className="ammo_clip">{(currentWeapon && currentWeapon.ammo_clip) || "-"}</div>
						<div className="ammo_reserve">/{(currentWeapon && currentWeapon.ammo_reserve) || "-"}</div>
					</div>
				</div>
			</div>
		</div>
    );
}


const Statistic = ({label, value}: {label: string | React.ReactNode, value: string | number}) => {
    return (
        <div className="stat">
            <div className="label">{label}</div>
            <div className="value">{value}</div>
        </div>
    );
};