import { useState, type SetStateAction } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { loginRequest } from "../services/requests/LoginRequest";
import { ApiError } from "../sharedTypes/ApiError";

/**
 * Login component renders a centered authentication modal for users to sign in
 * with their email and password before accessing the application.
 */

type LoginProps = {
  setLoggedIn: React.Dispatch<SetStateAction<boolean>>;
};
export const Login = ({ setLoggedIn }: LoginProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorDetail, setErrorDetail] = useState("");
  const controller = new AbortController();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Later call your .NET login API here
    console.log(email, password);

    // Call this ONLY when API login succeeds
    try {
      const response = await loginRequest({
        request: { email, password },
        signal: controller.signal,
      });
      console.log(response);
      setErrorDetail("");
      setLoggedIn(true);
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Login request cancelled");
        return;
      }
      if (error instanceof ApiError) {
        console.error("Status:", error.status);
        console.error("Title:", error.title);
        console.error("Detail:", error.detail);
        setErrorDetail(error.detail);
        return;
      }
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md">
      <div className="w-full max-w-md rounded-2xl border border-white/30 bg-white/80 p-8 shadow-2xl backdrop-blur-xl">
        <div className="mb-8 text-center">
          <p className="mt-2 text-sm text-slate-500">Sign in to your account</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Email
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
              <CiMail className="text-xl text-slate-500" />

              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>
          </div>

          {/* Password */}
          <div>
            <label
              htmlFor="password"
              className="mb-2 block text-sm font-medium text-slate-700"
            >
              Password
            </label>

            <div className="flex items-center gap-3 rounded-lg border border-slate-300 bg-white px-3">
              <CiLock className="text-xl text-slate-500" />

              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                required
                className="w-full bg-transparent py-3 text-sm outline-none"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full rounded-lg bg-sky-600 py-3 font-medium text-white transition hover:bg-sky-700"
          >
            Login
          </button>
          {errorDetail && (
            <h6 className="text-center text-red-700">{errorDetail}</h6>
          )}
        </form>
      </div>
    </div>
  );
};
