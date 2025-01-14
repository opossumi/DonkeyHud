import { useState, useEffect } from "react";
import { supabase } from "../../api/supabase";
import { useUser } from "../../hooks";
import { Loading } from "../../components";

export function Account() {
  const [username, setUsername] = useState<string>("");
  const [fullName, setFullName] = useState<string>("");
  const { user, logoutUser, setIsLoading, isLoading } = useUser();

  useEffect(() => {
    let ignore = false;
    async function getProfile() {
      setIsLoading(true);

      if (!user) {
        setIsLoading(false);
        return;
      }

      const { data, error } = await supabase
        .from("profiles")
        .select(`username, full_name`)
        .eq("id", user.id)
        .single();

      if (!ignore) {
        if (error) {
          console.warn(error);
        } else if (data) {
          setUsername(data.username);
          setFullName(data.full_name);
        }
      }

      setIsLoading(false);
    }

    getProfile();

    return () => {
      ignore = true;
    };
  }, [user]);

  async function updateProfile(event: React.MouseEvent<HTMLButtonElement>) {
    event.preventDefault();

    setIsLoading(true);

    if (!user) {
      setIsLoading(false);
      return;
    }

    const updates = {
      id: user.id,
      username,
      full_name: fullName,
      updated_at: new Date(),
    };

    const { error } = await supabase.from("profiles").upsert(updates);

    if (error) {
      alert(error.message);
    }
    setIsLoading(false);
  }

  if (!user) return null;

  return (
    <>
      {isLoading && (
        <div className="h-screen w-screen">
          <Loading />
        </div>
      )}
      {!isLoading && (
        <div className="text-textcolor flex w-full flex-col justify-center rounded-md p-6 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Account Settings</h2>
          <div className="mb-4">
            <label htmlFor="email" className="mb-1 block text-sm font-medium">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              disabled
              value={user.email}
              className="text-textcolor w-full rounded-md border border-border bg-background-primary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-button"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="username"
              className="mb-1 block text-sm font-medium"
            >
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={username || ""}
              onChange={(e) => setUsername(e.target.value)}
              className="text-textcolor w-full rounded-md border border-border bg-background-primary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-button"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="fullName"
              className="mb-1 block text-sm font-medium"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={fullName || ""}
              onChange={(e) => setFullName(e.target.value)}
              className="text-textcolor w-full rounded-md border border-border bg-background-primary px-3 py-2 focus:outline-none focus:ring-2 focus:ring-button"
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              onClick={updateProfile}
              className="rounded-md bg-button px-4 py-2 font-medium text-white hover:bg-opacity-90 focus:outline-none focus:ring-2 focus:ring-button focus:ring-offset-2"
            >
              Update
            </button>
            <button
              onClick={logoutUser}
              className="rounded-md bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-600 focus:ring-offset-2"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </>
  );
}
