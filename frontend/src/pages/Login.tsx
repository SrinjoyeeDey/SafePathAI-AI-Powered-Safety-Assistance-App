import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocation } from "../context/LocationContext";
import api from "../services/api";

const Login = () => {

   useEffect(() => {
      document.title = "Login | SafePathAI";
    }, []);

  const { login } = useAuth();
  const { setShowLocationModal } = useLocation();
  const navigate = useNavigate();

  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<{ identifier?: string; password?: string; server?: string }>({});
  const [loading, setLoading] = useState(false);
  const [exiting, setExiting] = useState(false);

  const validate = () => {
    const e: typeof errors = {};
    if (!identifier.trim()) {
      e.identifier = "Please enter your email.";
    } else {
      // basic email check - backend expects email
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(identifier.trim())) {
        e.identifier = "Please enter a valid email address.";
      }
    }
    if (!password) e.password = "Please enter your password.";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    if (!validate()) return;

    try {
      setLoading(true);

      const res = await api.post("/auth/login", {
        email: identifier,
        password,
      });

      // backend response: { user: {...}, accessToken: "..." }
      const { user: userData, accessToken } = res.data;

      if (!userData || !accessToken) {
        throw new Error("Invalid response from server.");
      }

      login(userData, accessToken);
      navigate("/dashboard");
      // Location modal will be shown automatically by LocationProvider after successful login
    } catch (err: any) {
      const msg = err.response?.data?.message || "Unable to login. Please check your credentials.";
      setErrors({ server: msg });
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate("/signup"), 300);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 bg-gradient-to-r from-white/40 to-white/20 dark:from-black dark:via-[#071026] dark:to-[#071026] select-none relative">
      {/* subtle translucent overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.45),rgba(2,6,23,0.55))] pointer-events-none" />

      <div className="hidden md:block absolute left-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" />
      <div className="hidden md:block absolute right-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" />

      {/* Decorative soft glow */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-72 h-72 bg-gradient-to-tr from-primary/25 via-transparent to-secondary/10 rounded-full blur-3xl opacity-70 dark:opacity-40" />
      </div>

      <div className="relative z-10 w-full max-w-sm mx-auto my-auto px-4 sm:px-6">
        <div
          className={`group relative rounded-2xl shadow-2xl border p-6 sm:p-8 transform-gpu transition-all duration-300 bg-[rgba(255,255,255,0.06)] dark:bg-[rgba(6,10,15,0.24)] hover:scale-[1.02] hover:shadow-2xl shadow-inner ${
            exiting ? "opacity-0 translate-y-6 scale-95" : "opacity-100 translate-y-0 scale-100"
          }`}
          style={{
            backdropFilter: "blur(22px)",
            WebkitBackdropFilter: "blur(22px)",
            borderColor: "rgba(255,255,255,0.04)",
          }}
        >
          <header className="text-center mb-6">
            <div className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md transform transition-transform duration-300 group-hover:scale-105">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-white" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 0a12 12 0 100 24A12 12 0 0012 0zm0 3.6a2.4 2.4 0 11-.001 4.801A2.4 2.4 0 0112 3.6zM6 19.2a6 6 0 0112 0H6z" />
              </svg>
            </div>
            <h1 className="mt-3 text-xl sm:text-2xl font-extrabold text-text dark:text-white">
              Sign in to SafePathAI
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
              Enter your credentials to continue
            </p>
          </header>

          <form onSubmit={handleLogin} className="space-y-5 md:space-y-6">
            <div>
              <label className="sr-only">Email</label>
              <input
                aria-label="email"
                value={identifier}
                onChange={(e) => setIdentifier(e.target.value)}
                placeholder="Enter your email"
                className={`w-full px-3 sm:px-4 py-3 rounded-lg border transition-shadow duration-150 outline-none bg-[rgba(255,255,255,0.08)] placeholder-gray-400 text-gray-900 dark:text-gray-100 dark:bg-[rgba(255,255,255,0.02)] select-text hover:shadow-sm text-sm sm:text-base ${
                  errors.identifier
                    ? "border-red-400 ring-1 ring-red-200"
                    : "border-transparent focus:ring-2 focus:ring-primary/60"
                }`}
              />
              {errors.identifier && <p className="mt-1 text-sm text-red-500">{errors.identifier}</p>}
            </div>

            <div>
              <label className="sr-only">Password</label>
              <input
                aria-label="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter your password"
                className={`w-full px-3 sm:px-4 py-3 rounded-lg border transition-shadow duration-150 outline-none bg-[rgba(255,255,255,0.08)] placeholder-gray-400 text-gray-900 dark:text-gray-100 dark:bg-[rgba(255,255,255,0.02)] select-text hover:shadow-sm text-sm sm:text-base ${
                  errors.password
                    ? "border-red-400 ring-1 ring-red-200"
                    : "border-transparent focus:ring-2 focus:ring-primary/60"
                }`}
              />
              {errors.password && <p className="mt-1 text-sm text-red-500">{errors.password}</p>}
            </div>

            {errors.server && <p className="text-sm text-red-500 text-center">{errors.server}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 md:py-4 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition-all disabled:opacity-60 text-sm sm:text-base"
            >
              {loading ? "Signing in..." : "Sign in"}
            </button>
          </form>

          <div className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300">
            Don't have an account?{" "}
            <button
              type="button"
              onClick={goToSignup}
              disabled={exiting}
              className="text-violet-600 hover:underline dark:text-violet-400 font-medium"
            >
              Sign up here
            </button>
          </div>
        </div>

        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </p>
      </div>
    </div>
  );
};

export default Login;
