import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { ButtonContained } from "../../components";

export const UpdateUser = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    if (newPassword !== confirmNewPassword) {
      setError("New passwords do not match");
      return;
    }

    const { error: updateError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    if (updateError) {
      setError(updateError.message);
    } else {
      setMessage("Password updated successfully");
      setError("");
      navigate("/");
    }
  };

  return (
    <div className="dark flex h-screen w-screen items-center justify-center text-text">
      <div className="flex flex-col gap-8 rounded-lg bg-background-primary px-20 py-14">
        <h1 className="mb-4 text-center font-semibold">Update Password</h1>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <div className="flex flex-col gap-2">
          <input
            placeholder="New Password"
            value={newPassword}
            type="password"
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            placeholder="Confirm New Password"
            value={confirmNewPassword}
            type="password"
            onChange={(e) => setConfirmNewPassword(e.target.value)}
          />
        </div>
        <div className="flex flex-col justify-center gap-4">
          <div className="flex justify-end gap-2">
            <ButtonContained className="w-full" onClick={handleUpdatePassword}>
              Update Password
            </ButtonContained>
          </div>
          <div className="flex w-full justify-center gap-2 text-sm text-gray-300">
            <p>Changed your mind?</p>
            <a
              onClick={() => navigate("/")}
              className="text-primary-light hover:cursor-pointer hover:text-primary"
            >
              Cancel
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
