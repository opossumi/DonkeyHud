import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "../api/supabase";

export interface Profile {
  username: string;
  fullName: string;
}

interface UserContextProps {
  user: User | undefined;
  profile: Profile | undefined;
  isLoading: boolean;
  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUser: (user: User | undefined) => void;
  fetchProfile: (userId: string) => Promise<void>;
}

const UserContext = createContext<UserContextProps | undefined>(undefined);

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | undefined>(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [profile, setProfile] = useState<Profile | undefined>(undefined);

  useEffect(() => {
    supabase.auth.onAuthStateChange((_, session) => {
      setIsLoading(true);
      if (session && session.user) {
        setUser(session.user);
        fetchProfile(session.user.id);
      } else {
        setUser(undefined);
        setProfile(undefined);
      }
      setIsLoading(false);
    });
  }, []);

  const fetchProfile = async (userId: string) => {
    setIsLoading(true);
    const { data, error } = await supabase
      .from("profiles")
      .select(`username, full_name`)
      .eq("id", userId)
      .single();

    if (error) {
      console.warn(error);
    } else if (data) {
      setProfile({
        username: data.username,
        fullName: data.full_name,
      });
    }
    setIsLoading(false);
  };

  return (
    <UserContext.Provider
      value={{
        user,
        profile,
        isLoading,
        setIsLoading,
        setUser,
        fetchProfile,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUserContext = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUserContext must be used within a UserProvider");
  }
  return context;
};
