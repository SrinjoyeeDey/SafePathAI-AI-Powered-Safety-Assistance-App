import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const Login = () => {
  const { login } = useAuth();
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
    setLoading(true);
    try {
      const res = await api.post("/auth/login", { email: identifier, password });
      login(res.data.user, res.data.accessToken);
      navigate("/dashboard");
    } catch (error: any) {
      const message = error.response?.data?.message || "Unable to login. Please check your credentials.";
      setErrors({ server: message });
    } finally {
      setLoading(false);
    }
  };

  const goToSignup = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate('/signup'), 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 bg-gradient-to-r from-white/40 to-white/20 dark:from-black dark:via-[#071026] dark:to-[#071026] select-none relative"
    >
      {/* subtle translucent overlay to tint the background */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.03),rgba(255,255,255,0.02))] dark:bg-[linear-gradient(180deg,rgba(2,6,23,0.45),rgba(2,6,23,0.55))] pointer-events-none" 
      />
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden md:block absolute left-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" 
      />
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.3, duration: 0.8 }}
        className="hidden md:block absolute right-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" 
      />
      {/* Decorative soft radial glow behind the card */}
      <motion.div 
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.4, duration: 1 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none"
      >
        <div className="w-72 h-72 bg-gradient-to-tr from-primary/25 via-transparent to-secondary/10 rounded-full blur-3xl opacity-70 dark:opacity-40" />
      </motion.div>
      <div className="relative z-10 w-full max-w-sm mx-auto my-auto px-4 sm:px-6">
        <AnimatePresence mode="wait">
          <motion.div
            key={exiting ? 'exiting' : 'entering'}
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -50, scale: 0.9 }}
            transition={{ 
              type: "spring", 
              stiffness: 300, 
              damping: 30,
              duration: 0.6
            }}
            whileHover={{ scale: 1.005, transition: { duration: 0.08, ease: "easeOut" } }}
            className="group relative rounded-2xl shadow-2xl border p-6 sm:p-8 bg-[rgba(255,255,255,0.06)] dark:bg-[rgba(6,10,15,0.24)] hover:shadow-2xl"
            style={{ backdropFilter: 'blur(22px)', WebkitBackdropFilter: 'blur(22px)', borderColor: 'rgba(255,255,255,0.04)' }}
          >
            <motion.header 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="text-center mb-6"
            >
              <motion.div 
                whileHover={{ scale: 1.05, rotate: 3, transition: { duration: 0.08, ease: "easeOut" } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.05, ease: "easeOut" } }}
                className="mx-auto w-12 h-12 sm:w-14 sm:h-14 rounded-full bg-gradient-to-tr from-primary to-secondary flex items-center justify-center shadow-md"
              >
                <motion.svg 
                  initial={{ rotate: -180 }}
                  animate={{ rotate: 0 }}
                  transition={{ delay: 0.7, duration: 0.5 }}
                  xmlns="http://www.w3.org/2000/svg" 
                  className="w-8 h-8 text-white" 
                  viewBox="0 0 24 24" 
                  fill="currentColor"
                >
                  <path d="M12 0a12 12 0 100 24A12 12 0 0012 0zm0 3.6a2.4 2.4 0 11-.001 4.801A2.4 2.4 0 0112 3.6zM6 19.2a6 6 0 0112 0H6z" />
                </motion.svg>
              </motion.div>
              <motion.h1 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.5 }}
                className="mt-3 text-xl sm:text-2xl font-extrabold text-text dark:text-white"
              >
                Sign in to SafePathAI
              </motion.h1>
              <motion.p 
                initial={{ y: 10, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="text-sm text-gray-600 dark:text-gray-300 mt-1"
              >
                Enter your credentials to continue
              </motion.p>
            </motion.header>
            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.8, duration: 0.6 }}
              onSubmit={handleLogin} 
              className="space-y-5 md:space-y-6"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
              >
                <label className="sr-only">Email</label>
                <motion.input
                  whileFocus={{ scale: 1.01, transition: { duration: 0.08, ease: "easeOut" } }}
                  aria-label="email"
                  value={identifier}
                  onChange={(e) => setIdentifier(e.target.value)}
                  placeholder="Enter your email"
                  className={`w-full px-3 sm:px-4 py-3 rounded-lg border transition-all duration-200 outline-none bg-[rgba(255,255,255,0.08)] placeholder-gray-400 text-gray-900 dark:text-gray-100 dark:bg-[rgba(255,255,255,0.02)] select-text hover:shadow-sm text-sm sm:text-base md:text-base ${errors.identifier ? 'border-red-400 ring-1 ring-red-200' : 'border-transparent focus:ring-2 focus:ring-primary/60'}`}
                />
                <AnimatePresence>
                  {errors.identifier && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.identifier}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 1.0, duration: 0.4 }}
              >
                <label className="sr-only">Password</label>
                <motion.input
                  whileFocus={{ scale: 1.01, transition: { duration: 0.08, ease: "easeOut" } }}
                  aria-label="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter your password"
                  className={`w-full px-3 sm:px-4 py-3 rounded-lg border transition-all duration-200 outline-none bg-[rgba(255,255,255,0.08)] placeholder-gray-400 text-gray-900 dark:text-gray-100 dark:bg-[rgba(255,255,255,0.02)] select-text hover:shadow-sm text-sm sm:text-base md:text-base ${errors.password ? 'border-red-400 ring-1 ring-red-200' : 'border-transparent focus:ring-2 focus:ring-primary/60'}`}
                />
                <AnimatePresence>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="mt-1 text-sm text-red-500"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <AnimatePresence>
                {errors.server && (
                  <motion.p 
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="text-sm text-red-500"
                  >
                    {errors.server}
                  </motion.p>
                )}
              </AnimatePresence>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 1.1, duration: 0.4 }}
                whileHover={{ scale: 1.01, transition: { duration: 0.08, ease: "easeOut" } }}
                whileTap={{ scale: 0.99, transition: { duration: 0.05, ease: "easeOut" } }}
                type="submit"
                disabled={loading}
                className="w-full py-3 md:py-4 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary hover:from-primary/90 hover:to-secondary/90 transform transition-all disabled:opacity-60 text-sm sm:text-base md:text-base relative overflow-hidden"
              >
                <motion.span
                  className="relative z-10"
                  animate={{ opacity: loading ? 0.7 : 1 }}
                >
                  {loading ? 'Signing in...' : 'Sign in'}
                </motion.span>
                {loading && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/50 to-secondary/50"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.button>
            </motion.form>
            <motion.div 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.4 }}
              className="mt-4 text-center text-sm text-gray-600 dark:text-gray-300"
            >
              Don't have an account?{' '}
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.03, transition: { duration: 0.08, ease: "easeOut" } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.05, ease: "easeOut" } }}
                onClick={(e) => goToSignup(e)} 
                disabled={exiting} 
                className="text-violet-600 hover:underline dark:text-violet-400 font-medium"
              >
                Sign up here
              </motion.button>
            </motion.div>
          </motion.div>
        </AnimatePresence>
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.3, duration: 0.6 }}
          className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400"
        >
          By continuing, you agree to our Terms of Service and Privacy Policy.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default Login;
