import { useState } from "react";
import { CiLock, CiMail } from "react-icons/ci";
import { loginRequest } from "../services/requests/LoginRequest";

/**
 * Login component renders a centered authentication modal for users to sign in
 * with their email and password before accessing the application.
 */
export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    } catch (error) {
      if (error instanceof DOMException && error.name === "AbortError") {
        console.log("Login request cancelled");
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
        </form>
      </div>
    </div>
  );
};
