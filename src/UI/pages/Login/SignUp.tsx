import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../../api/supabase";
import { ButtonContained } from "../../components";
import { useThemes } from "../../hooks";
import { AppFrame } from "../MainPanel";

export const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const { theme } = useThemes();

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    const { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      setError(error.message);
    } else {
      console.log(data);
      navigate("/login");
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <AppFrame />
      <div
        className={`${theme} flex size-full items-center justify-center border-t border-border text-text`}
      >
        <div className="flex flex-col gap-8 rounded-lg bg-background-primary px-20 py-14">
          <h1 className="mb-4 text-center font-semibold">Signup</h1>
          {error && <p className="text-red-500">{error}</p>}
          <div className="flex flex-col gap-2">
            <input
              placeholder="Email"
              value={email}
              type="email"
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Confirm Password"
              value={confirmPassword}
              type="password"
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="flex flex-col justify-center gap-4">
            <div className="flex justify-end gap-2">
              <ButtonContained className="w-full" onClick={handleSignUp}>
                Submit
              </ButtonContained>
            </div>
            <div className="flex w-full justify-center gap-2 text-sm text-gray-300">
              <p>Already have an account?</p>
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
