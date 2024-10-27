import React, { useState, useEffect } from 'react';
import { Skull, playerCT, playerT } from '../assets/Icons';
import axios from 'axios';

interface AvatarProps {
  steamid: string;
  teamId?: string | null;
  slot?: number;
  height?: number;
  width?: number;
  showSkull?: boolean;
  showCam?: boolean;
  sidePlayer?: boolean;
  teamSide?: string;
  flashed?: number | undefined;
}

const getAvatar = async (steam_id: string) => {
  try {
    const player = await axios.get(`http://localhost:4000/players/${steam_id}`);
    if (player.data.avatar) {
      return player.data.avatar;
    }
    return null;
  } catch (error) {
    console.error('Error fetching avatar:', error);
    // Implement fallback logic (e.g., return default avatar URL)
  }
};

export const Avatar = ({ steamid, teamId, slot, height, width, showSkull, showCam, sidePlayer, teamSide, flashed }: AvatarProps) => {
  const flashValue = flashed ? (flashed < 100 ? 100 : flashed * 2) : 100;
  const defaultPic = teamSide === "CT" ? playerCT : playerT;
  const [avatar, setAvatar] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchAvatar = async () => {
      setIsLoading(true);
      try {
        const avatarUrl = await getAvatar(steamid);
        setAvatar(avatarUrl);
      } finally {
        setIsLoading(false);
      }
    };
    fetchAvatar();
  }, [steamid]);

  return (
    <div className={'avatar'}>
      {isLoading ? (
        <div>Loading...</div> // Replace with your desired loading indicator
      ) : (
        <img
          src={avatar || defaultPic}
          height={height}
          width={width}
          alt={"Avatar"}
          style={{ filter: `brightness(${flashValue}%)` }}
        />
      )}
    </div>
  );
};