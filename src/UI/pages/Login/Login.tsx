import { useState } from "react";
import { ButtonContained, Loading } from "../../components";
import { useNavigate } from "react-router-dom";
import { useUser } from "../../hooks";
import { AppFrame } from "../MainPanel";

export const Login = () => {
  const [email, setEmail] = useState(import.meta.env.VITE_EMAIL || "");
  const [password, setPassword] = useState(import.meta.env.VITE_PASSWORD || "");

  const navigate = useNavigate();

  const { loginUser, isLoading, loginAnonymously, error } = useUser();

  const onFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      await loginUser(email, password);
    } catch (err: unknown) {
      console.error(err);
    }
  };

  return (
    <div className="flex h-screen w-screen flex-col">
      <AppFrame />
      <div className="dark flex size-full items-center justify-center border-t border-border text-text">
        <form
          onSubmit={onFormSubmit}
          className="flex flex-col gap-8 rounded-lg bg-background-primary px-20 py-14"
        >
          <h1 className="mb-4 text-center font-semibold">Login</h1>
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
            <a
              onClick={() => navigate("/forgotpassword")}
              className="flex text-xs text-gray-500 hover:cursor-pointer hover:text-primary-light"
            >
              Forgot password?
            </a>
          </div>
          <div className="flex flex-col justify-center gap-4">
            {isLoading && (
              <div className="flex w-full items-center justify-center">
                <Loading />
              </div>
            )}
            <ButtonContained
              className={`w-full ${isLoading && "text-gray-400 hover:cursor-default hover:bg-primary"}`}
              disabled={isLoading}
              onClick={() => {
                loginUser(email, password);
              }}
            >
              {isLoading ? "Submitting" : "Login"}
            </ButtonContained>
            <div className="flex w-full justify-center gap-2 text-sm text-gray-300">
              <p>Don't have an account?</p>
              <a
                onClick={() => navigate("/signup")}
                className="text-primary-light hover:cursor-pointer hover:text-primary"
              >
                Sign up now
              </a>
            </div>
          </div>
          <p className="text-center font-semibold text-gray-300">OR</p>
          <ButtonContained
            className="w-full bg-border"
            onClick={loginAnonymously}
          >
            Countinue as guest
          </ButtonContained>
        </form>
      </div>
    </div>
  );
};
