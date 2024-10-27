import { Player } from "csgogsi";
import { Bomb as BombIcon } from "../assets/Icons";

interface BombProps {
  player: Player;
}

export const Bomb = ({ player }: BombProps) => {
  if (Object.values(player.weapons).every((weapon) => weapon.type !== "C4")) {
    return null;
  }
  return (
    <div className={`armor_indicator`}>
      <BombIcon />
    </div>
  );
};