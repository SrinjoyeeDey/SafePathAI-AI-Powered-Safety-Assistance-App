import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Signup = () => {
  const { login } = useAuth();
  const [exiting, setExiting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [validations, setValidations] = useState({
    passwordMatch: true,
    passwordLength: false
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    confirmPassword: false
  });
  const [agreements, setAgreements] = useState({
    terms: false
  });

  useEffect(() => {
    setValidations({
      passwordMatch: formData.password === formData.confirmPassword,
      passwordLength: formData.password.length >= 8
    });
  }, [formData.password, formData.confirmPassword]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validations.passwordMatch || !validations.passwordLength) {
      alert("Please check password requirements");
      return;
    }

    try {
      const res = await api.post("/auth/signup", {
        name: formData.name,
        email: formData.email,
        password: formData.password
      });
      login(res.data.user);
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      const message = err.response?.data?.message || 'Signup failed. Please try again.';
      alert(message);
    }
  };

  const navigate = useNavigate();

  const goToLogin = (e?: React.MouseEvent<HTMLButtonElement>) => {
    e?.preventDefault();
    if (exiting) return;
    setExiting(true);
    setTimeout(() => navigate('/login'), 300);
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 bg-gradient-to-r from-white/50 to-white dark:from-black dark:via-[#071026] dark:to-[#071026]">
      <div className="absolute left-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" />
      <div className="absolute right-0 top-0 h-full w-1/4 bg-gradient-to-b from-white/70 to-transparent dark:from-transparent dark:to-transparent opacity-30 pointer-events-none" />

      <div className={`w-full max-w-sm rounded-2xl shadow-soft border p-6 sm:p-8 my-auto bg-[rgba(255,255,255,0.65)] dark:bg-[rgba(12,18,24,0.78)] select-none transition-all ${exiting ? 'opacity-0 translate-y-6 scale-95' : 'opacity-100 translate-y-0 scale-100'}`} style={{ backdropFilter: 'blur(10px)', WebkitBackdropFilter: 'blur(10px)' , borderColor: 'rgba(255,255,255,0.08)'}}>
        <h2 className="text-2xl sm:text-3xl font-extrabold text-center mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary">
          Create Account
        </h2>

        <form onSubmit={handleSignup} className="space-y-6">
          <div>
            <input
              type="text"
              name="name"
              required
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
            />
          </div>

          <div>
            <input
              type="email"
              name="email"
              required
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
            />
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword.password ? "text" : "password"}
                name="password"
                required
                placeholder="Create a password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/80 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
              </button>
            </div>
            {formData.password && (
              <p className={`mt-1 text-sm flex items-center gap-1 ${validations.passwordLength ? 'text-green-500' : 'text-red-500'}`}>
                {validations.passwordLength ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )} 
                Password must be at least 8 characters
              </p>
            )}
          </div>

          <div>
            <div className="relative">
              <input
                type={showPassword.confirmPassword ? "text" : "password"}
                name="confirmPassword"
                required
                placeholder="Re-enter your password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className="w-full px-3 sm:px-4 py-3 rounded-lg bg-white/5 placeholder-gray-500 text-gray-900 dark:text-gray-100 dark:bg-[#25303a] border border-transparent focus:border-primary/60 focus:ring-2 focus:ring-primary/30 text-sm sm:text-base transition-all"
              />
              <button
                type="button"
                onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
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
              </button>
            </div>
            {formData.confirmPassword && (
              <p className={`mt-1 text-sm flex items-center gap-1 ${validations.passwordMatch ? 'text-green-500' : 'text-red-500'}`}>
                {validations.passwordMatch ? (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                ) : (
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                )} 
                {validations.passwordMatch ? 'Passwords match' : 'Passwords do not match'}
              </p>
            )}
          </div>

          <div className="mt-6 border-t pt-6 dark:border-gray-700">
            <label className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
              <input
                type="checkbox"
                checked={agreements.terms}
                onChange={(e) => setAgreements({ terms: e.target.checked })}
                className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-sm">
                By continuing, I agree to the <a href="#" className="text-green-600 hover:text-green-500">terms of use</a> & <a href="#" className="text-green-600 hover:text-green-500">privacy policy</a>
              </span>
            </label>
          </div>

          <button
            type="submit"
            disabled={!agreements.terms}
            className={`w-full py-3 rounded-lg text-white font-semibold bg-gradient-to-r from-primary to-secondary transform transition-all ${
              agreements.terms 
                ? 'hover:from-primary/90 hover:to-secondary/90 hover:scale-[1.02]' 
                : 'opacity-50 cursor-not-allowed'
            } focus:ring-2 focus:ring-offset-2 focus:ring-primary/30`}
          >
            Sign Up
          </button>
        </form>

          <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
          Already have an account?{' '}
          <button type="button" onClick={(e) => goToLogin(e)} disabled={exiting} className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors">
            Login here
          </button>
        </p>
      </div>
    </div>
  );
};

export default Signup;
// import { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { useAuth } from "../context/AuthContext";
// import api from "../services/api";

// const Signup = () => {
//   const { login } = useAuth();
//   const [formData, setFormData] = useState({
//     name: "",
//     email: "",
//     password: "",
//     confirmPassword: ""
//   });
//   const [validations, setValidations] = useState({
//     passwordMatch: true,
//     passwordLength: false
//   });
//   const [showPassword, setShowPassword] = useState({
//     password: false,
//     confirmPassword: false
//   });
//   const [agreements, setAgreements] = useState({
//     terms: false
//   });

//   useEffect(() => {
//     setValidations({
//       passwordMatch: formData.password === formData.confirmPassword,
//       passwordLength: formData.password.length >= 8
//     });
//   }, [formData.password, formData.confirmPassword]);

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setFormData({
//       ...formData,
//       [e.target.name]: e.target.value
//     });
//   };

//   const handleSignup = async (e: React.FormEvent) => {
//     e.preventDefault();
//     if (!validations.passwordMatch || !validations.passwordLength) {
//       alert("Please check password requirements");
//       return;
//     }

//     try {
//       const res = await api.post("/auth/signup", {
//         name: formData.name,
//         email: formData.email,
//         password: formData.password
//       });
//       login(res.data.user);
//     } catch (err: any) {
//       console.error(err.response?.data || err.message);
//       alert("Signup failed. Please try again.");
//     }
//   };

//   return (
//     <div className="flex items-center justify-center min-h-[calc(100vh-4rem)] py-8 px-4 bg-gradient-to-br from-green-50 to-blue-50 dark:from-gray-900 dark:to-gray-800">
//       <div className="w-full max-w-md backdrop-blur-lg bg-white/80 dark:bg-gray-800/80 rounded-2xl shadow-xl p-8 my-auto">
//         <h2 className="text-3xl font-bold text-center mb-8 bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
//           Create Account
//         </h2>

//         <form onSubmit={handleSignup} className="space-y-6">
//           <div>
//             <input
//               type="text"
//               name="name"
//               required
//               placeholder="Enter your full name"
//               value={formData.name}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
//             />
//           </div>

//           <div>
//             <input
//               type="email"
//               name="email"
//               required
//               placeholder="Enter your email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
//             />
//           </div>

//           <div>
//             <div className="relative">
//               <input
//                 type={showPassword.password ? "text" : "password"}
//                 name="password"
//                 required
//                 placeholder="Create a password"
//                 value={formData.password}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//               >
//                 {showPassword.password ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             {formData.password && (
//               <p className={`mt-1 text-sm flex items-center gap-1 ${validations.passwordLength ? 'text-green-500' : 'text-red-500'}`}>
//                 {validations.passwordLength ? (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 )} 
//                 Password must be at least 8 characters
//               </p>
//             )}
//           </div>

//           <div>
//             <div className="relative">
//               <input
//                 type={showPassword.confirmPassword ? "text" : "password"}
//                 name="confirmPassword"
//                 required
//                 placeholder="Re-enter your password"
//                 value={formData.confirmPassword}
//                 onChange={handleChange}
//                 className="w-full px-4 py-3 rounded-lg bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 focus:border-green-500 focus:ring-2 focus:ring-green-500 dark:text-white transition-all"
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(prev => ({ ...prev, confirmPassword: !prev.confirmPassword }))}
//                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200"
//               >
//                 {showPassword.confirmPassword ? (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
//                   </svg>
//                 ) : (
//                   <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
//                   </svg>
//                 )}
//               </button>
//             </div>
//             {formData.confirmPassword && (
//               <p className={`mt-1 text-sm flex items-center gap-1 ${validations.passwordMatch ? 'text-green-500' : 'text-red-500'}`}>
//                 {validations.passwordMatch ? (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
//                   </svg>
//                 ) : (
//                   <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
//                     <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
//                   </svg>
//                 )} 
//                 {validations.passwordMatch ? 'Passwords match' : 'Passwords do not match'}
//               </p>
//             )}
//           </div>

//           <div className="mt-6 border-t pt-6 dark:border-gray-700">
//             <label className="flex items-center space-x-3 text-gray-700 dark:text-gray-300">
//               <input
//                 type="checkbox"
//                 checked={agreements.terms}
//                 onChange={(e) => setAgreements({ terms: e.target.checked })}
//                 className="w-4 h-4 rounded border-gray-300 text-green-600 focus:ring-green-500"
//               />
//               <span className="text-sm">
//                 By continuing, I agree to the <a href="#" className="text-green-600 hover:text-green-500">terms of use</a> & <a href="#" className="text-green-600 hover:text-green-500">privacy policy</a>
//               </span>
//             </label>
//           </div>

//           <button
//             type="submit"
//             disabled={!agreements.terms}
//             className={`w-full py-3 rounded-lg bg-gradient-to-r from-green-500 to-blue-500 text-white font-semibold transform transition-all ${
//               agreements.terms 
//                 ? 'hover:from-green-600 hover:to-blue-600 hover:scale-[1.02]' 
//                 : 'opacity-50 cursor-not-allowed'
//             } focus:ring-2 focus:ring-offset-2 focus:ring-green-500`}
//           >
//             Sign Up
//           </button>
//         </form>

//         <p className="mt-8 text-center text-gray-600 dark:text-gray-400">
//           Already have an account?{' '}
//           <Link
//             to="/login"
//             className="font-medium text-green-600 hover:text-green-500 dark:text-green-400 dark:hover:text-green-300 transition-colors"
//           >
//             Login here
//           </Link>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Signup;