import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { motion, AnimatePresence } from "framer-motion";

const Signup = () => {
  const { login } = useAuth();
  const [exiting, setExiting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [validations, setValidations] = useState({
    passwordMatch: true,
    passwordLength: false,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false,
  });
  const [agreements, setAgreements] = useState({ terms: false });
  const navigate = useNavigate();

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
    if (!validations.passwordMatch || !validations.passwordLength) {
      alert("Please check password requirements");
      return;
    }
    try {
      const res = await api.post("/auth/signup", {
        name: form.name,
        email: form.email,
        password: form.password,
      });
      login(res.data.user, res.data.accessToken);
      navigate("/dashboard");
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      alert(message);
    }
  };

  const goToLogin = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate('/login'), 300);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 bg-gradient-to-r from-white/50 to-white dark:from-black dark:via-[#071026] dark:to-[#071026]"
    >
      <motion.div 
        initial={{ x: -100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" 
      />
      <motion.div 
        initial={{ x: 100, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" 
      />
      <div className="w-full max-w-sm my-auto px-4 sm:px-6">
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
            className="rounded-2xl shadow-soft border p-6 sm:p-8 bg-[rgba(255,255,255,0.65)] dark:bg-[rgba(12,18,24,0.78)] select-none"
            style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)', borderColor: 'rgba(255,255,255,0.08)' }}
          >
            <motion.h2 
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="text-2xl sm:text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary"
            >
              Create Account
            </motion.h2>
            <motion.form 
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              onSubmit={handleSignup} 
              className="space-y-6"
            >
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.4 }}
              >
                <motion.input
                  type="text"
                  name="name"
                  required
                  placeholder="Enter your full name"
                  value={form.name}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.4 }}
              >
                <motion.input
                  type="email"
                  name="email"
                  required
                  placeholder="Enter your email"
                  value={form.email}
                  onChange={handleChange}
                  className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
                />
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.4 }}
              >
                <div className="relative">
                  <motion.input
                    type={showPassword.password ? "text" : "password"}
                    name="password"
                    required
                    placeholder="Create a password"
                    value={form.password}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
                  />
                  <motion.button

                    type="button"
                    onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <motion.div
                    >
                      {showPassword.password ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </motion.div>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {form.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-1 text-sm flex items-center gap-1 ${validations.passwordLength ? 'text-green-500' : 'text-red-500'}`}
                    >
                      <motion.div
                        animate={{ scale: validations.passwordLength ? [1, 1.2, 1] : 1 }}
                        transition={{ duration: 0.3 }}
                      >
                        {validations.passwordLength ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </motion.div>
                      Password must be at least 8 characters
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8, duration: 0.4 }}
              >
                <div className="relative">
                  <motion.input
                    type={showPassword.confirmPassword ? "text" : "password"}
                    name="confirmPassword"
                    required
                    placeholder="Re-enter your password"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
                  />
                  <motion.button
                    type="button"
                    onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors"
                  >
                    <motion.div
                    >
                      {showPassword.confirmPassword ? (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      ) : (
                        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                        </svg>
                      )}
                    </motion.div>
                  </motion.button>
                </div>
                <AnimatePresence>
                  {form.confirmPassword && (
                    <motion.p 
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className={`mt-1 text-sm flex items-center gap-1 ${validations.passwordMatch ? 'text-green-500' : 'text-red-500'}`}
                    >
                      <motion.div
                      >
                        {validations.passwordMatch ? (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                          </svg>
                        ) : (
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        )}
                      </motion.div>
                      {validations.passwordMatch ? 'Passwords match' : 'Passwords do not match'}
                    </motion.p>
                  )}
                </AnimatePresence>
              </motion.div>
              <motion.div 
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.9, duration: 0.4 }}
                className="mt-6 border-t pt-6 dark:border-gray-700"
              >
                <motion.label 
                  className="flex items-center space-x-3 text-gray-700 dark:text-gray-300 cursor-pointer"
                >
                  <motion.input
                    type="checkbox"
                    checked={agreements.terms}
                    onChange={(e) => setAgreements({ terms: e.target.checked })}
                    className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500 transition-all"
                  />
                  <span className="text-sm">
                    By continuing, I agree to the <a href="#" className="text-green-600 hover:text-green-500 transition-colors">terms of use</a> & <a href="#" className="text-green-600 hover:text-green-500 transition-colors">privacy policy</a>
                  </span>
                </motion.label>
              </motion.div>
              <motion.button
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.2 }}
                whileTap={{ scale: 0.99, transition: { duration: 0.05, ease: "easeOut" } }}
                type="submit"
                disabled={!agreements.terms}
                className={`w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary transform transition-all relative overflow-hidden ${
                  agreements.terms 
                    ? 'hover:from-primary/90 hover:to-secondary/90' 
                    : 'opacity-50 cursor-not-allowed'
                } focus:ring-2 focus:ring-offset-2 focus:ring-primary/30`}
              >
                <motion.span
                  className="relative z-10"
                  animate={{ opacity: agreements.terms ? 1 : 0.7 }}
                >
                  Sign Up
                </motion.span>
                {agreements.terms && (
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  />
                )}
              </motion.button>
            </motion.form>
            <motion.p 
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 1.1, duration: 0.4 }}
              className="mt-8 text-center text-gray-600 dark:text-gray-400"
            >
              Already have an account?{' '}
              <motion.button 
                type="button" 
                whileHover={{ scale: 1.03, transition: { duration: 0.08, ease: "easeOut" } }}
                whileTap={{ scale: 0.97, transition: { duration: 0.05, ease: "easeOut" } }}
                onClick={(e) => goToLogin(e)} 
                disabled={exiting} 
                className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
              >
                Login here
              </motion.button>
            </motion.p>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Signup;
