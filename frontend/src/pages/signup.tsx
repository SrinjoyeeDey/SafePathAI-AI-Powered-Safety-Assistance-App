import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Signup = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [validations, setValidations] = useState({
    passwordMatch: true,
    passwordLength: false,
  });
  const [agreements, setAgreements] = useState({ terms: false });

  useEffect(() => {
    setValidations({
      passwordMatch: form.password === form.confirmPassword,
      passwordLength: form.password.length >= 8,
    });
  }, [form.password, form.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreements.terms) {
      alert("Please agree to the Terms and Privacy Policy.");
      return;
    }

    if (!validations.passwordMatch || !validations.passwordLength) {
      alert("Please check your password requirements.");
      return;
    }

    try {
      setLoading(true);
      const res = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });

      const { user: userData, accessToken } = res.data;

      if (!userData || !accessToken) {
        throw new Error("Invalid response from server.");
      }

      login(userData, accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      const msg =
        err.response?.data?.message || "Signup failed. Please try again.";
      alert(msg);
    } finally {
      setLoading(false);
    }
  };


  const [exiting,setExiting]=useState(false)

  // const goToLogin = (e?: React.MouseEvent<HTMLButtonElement>) => {
  //   e?.preventDefault();
  //   if (exiting) return;
  //   setExiting(true);
  //   setTimeout(() => navigate('/login'), 300);
  // };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 bg-gradient-to-r from-white/50 to-white dark:from-black dark:via-[#071026] dark:to-[#071026]">
      <div className="w-full max-w-sm rounded-2xl shadow-soft border p-6 sm:p-8 my-auto bg-[rgba(255,255,255,0.65)] dark:bg-[rgba(12,18,24,0.78)] select-none transition-all">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-5">
          <input
            type="text"
            name="name"
            placeholder="Enter your full name"
            required
            value={form.name}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-[#25303a] text-gray-900 dark:text-gray-100 border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          />

          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            required
            value={form.email}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-[#25303a] text-gray-900 dark:text-gray-100 border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          />

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            required
            value={form.password}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-[#25303a] text-gray-900 dark:text-gray-100 border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          />
          {form.password && (
            <p
              className={`text-sm ${
                validations.passwordLength ? "text-green-500" : "text-red-500"
              }`}
            >
              Password must be at least 8 characters.
            </p>
          )}

          <input
            type="password"
            name="confirmPassword"
            placeholder="Re-enter your password"
            required
            value={form.confirmPassword}
            onChange={handleChange}
            className="w-full px-4 py-3 rounded-lg bg-white/80 dark:bg-[#25303a] text-gray-900 dark:text-gray-100 border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30"
          />
          {form.confirmPassword && (
            <p
              className={`text-sm ${
                validations.passwordMatch ? "text-green-500" : "text-red-500"
              }`}
            >
              {validations.passwordMatch
                ? "Passwords match"
                : "Passwords do not match"}
            </p>
          )}

          <label className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 mt-2">
            <input
              type="checkbox"
              checked={agreements.terms}
              onChange={(e) => setAgreements({ terms: e.target.checked })}
              className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
            />
            <span className="text-sm">
              I agree to the{" "}
              <a href="#" className="text-green-600 hover:text-green-500">
                Terms of Use
              </a>{" "}
              &{" "}
              <a href="#" className="text-green-600 hover:text-green-500">
                Privacy Policy
              </a>
            </span>
          </label>

          <button
            type="submit"
            disabled={!agreements.terms || loading}
            className={`w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary transition-all ${
              agreements.terms
                ? "hover:from-primary/90 hover:to-secondary/90 hover:scale-[1.02]"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            {loading ? "Creating account..." : "Sign Up"}
          </button>
        </form>

        <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{" "}
          <button
            type="button"
            onClick={goToLogin}
            className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
