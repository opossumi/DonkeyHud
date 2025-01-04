import { PlayerSilhouette } from "./PlayersPage";
import { MdEdit, MdDelete } from "react-icons/md";
import { useState } from "react";
import { Player } from "../../api/types";

interface PlayerCardProps {
  player: Player;
  deletePlayer: (id: string) => void;
  onEdit?: (player: Player) => void;
}

export const PlayerCard = ({
  player,
  deletePlayer,
  onEdit,
}: PlayerCardProps) => {
  const [isCopied, setIsCopied] = useState(false);
  // const [avatar, setAvatar] = useState<File | null>();

  // useEffect(() => {
  //   const fetchAvatar = async () => {
  //     const res = await axios.get(
  //       "http://localhost:1349/players/pictures/76561198153580036.jpg"
  //     );
  //     setAvatar(res.data[0]);
  //     console.log(res);
  //   };
  //   fetchAvatar();
  // }, []);

  const handleCopyClick = (steamId: string) => {
    navigator.clipboard.writeText(steamId);
    setIsCopied(true);
    setTimeout(() => {
      setIsCopied(false);
    }, 1250);
  };

  const handleEditClick = () => {
    if (onEdit) {
      onEdit(player);
    }
  };

  return (
    <div className="flex w-full flex-col divide-y divide-border rounded-lg bg-background2 px-2">
      <div className="relative flex w-full justify-between px-2 pt-2">
        <div>
          <h4 className="font-semibold">{player.username}</h4>
          <div className="flex">
            <p className="text-text-secondary">
              {player.firstName} {player.lastName}
            </p>
          </div>
          {player.team && <h5>{player.team}</h5>}
        </div>
        <img
          className="size-32"
          src={player.avatar ? player.avatar : PlayerSilhouette}
          alt="Player Avatar"
        ></img>
      </div>
      <div className="flex justify-between gap-2 p-2">
        <button
          onClick={() => handleCopyClick(player.steamid)}
          className="flex w-full items-center justify-center rounded bg-primary px-2 py-1 text-sm font-semibold text-text transition-colors hover:bg-primary-dark"
        >
          {!isCopied && player.steamid}
          {isCopied && "Copied!"}
        </button>
        <div className="inline-flex">
          <button
            className="relative inline-flex min-w-[40px] items-center justify-center rounded-l border border-r-0 border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            onClick={() => handleEditClick()}
          >
            <MdEdit className="size-5" />
          </button>
          <button
            className="relative inline-flex min-w-[40px] items-center justify-center rounded-r border border-primary/50 p-2 px-4 py-1 text-primary transition-colors hover:bg-primary/10"
            onClick={() => deletePlayer(player._id)}
          >
            <MdDelete className="size-5" />
          </button>
        </div>
      </div>
    </div>
  );
};
