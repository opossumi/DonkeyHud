import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { ButtonContained } from "../../components";
import { AppFrame } from "../MainPanel";

export const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleForgotPassword = async () => {
    const { error } = await supabase.auth.resetPasswordForEmail(email);

    if (error) {
      setError(error.message);
      setMessage("");
    } else {
      setMessage("Password reset email sent. Please check your inbox.");
      setError("");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <AppFrame />
      <div className="dark flex size-full items-center justify-center border-t border-border text-text">
        <div className="flex flex-col gap-8 rounded-lg bg-background-primary px-20 py-14">
          <h1 className="mb-4 text-center font-semibold">Forgot Password</h1>
          {error && <p className="text-red-500">{error}</p>}
          {message && <p className="text-green-500">{message}</p>}
          <div className="flex flex-col gap-2">
            <input
              placeholder="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex justify-end gap-2">
              <ButtonContained
                className="w-full"
                onClick={handleForgotPassword}
              >
                Submit
              </ButtonContained>
            </div>
            <div className="flex w-full justify-center gap-2 text-sm text-gray-300">
              <p>Remembered your password?</p>
              <a
                onClick={() => navigate("/login")}
                className="text-primary-light hover:cursor-pointer hover:text-primary"
              >
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
