import * as Weapons from '../assets/Weapons';

interface WeaponProps extends React.SVGProps<SVGSVGElement> {
  weapon: string;
  active: boolean;
  isGrenade?: boolean;
}

export const WeaponImage = ({weapon, active, isGrenade, ...rest}: WeaponProps) => {
		const Weapon = (Weapons as any)[weapon];
		const { className, ...svgProps } = rest;
		if(!Weapon) return null;
		return (
			<Weapon fill="white" className={`${active ? 'active':''} weapon ${isGrenade ? 'grenade' : ''} ${className || ''}`} {...svgProps} />
		);
}
