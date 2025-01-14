import { useUserContext } from "../context";
import { supabase } from "../api/supabase";
import { useState } from "react";

export const useUser = () => {
  const { user, isLoading, setIsLoading, setUser, profile, fetchProfile } =
    useUserContext();
  const [error, setError] = useState("");

  const logoutUser = async () => {
    setIsLoading(true);
    await supabase.auth.signOut();
    setUser(undefined);
    setIsLoading(false);
  };

  const loginUser = async (email: string, password: string) => {
    setIsLoading(true);
    const { error } = await supabase.auth.signInWithPassword({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    }
    setIsLoading(false);
  };

  const loginAnonymously = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.auth.signInAnonymously();
    if (error) {
      console.warn(error);
    } else if (data.user) {
      setUser(data.user);
      fetchProfile(data.user.id);
    }
    setIsLoading(false);
  };

  return {
    user,
    profile,
    fetchProfile,
    loginUser,
    loginAnonymously,
    logoutUser,
    isLoading,
    setIsLoading,
    error,
  };
};
