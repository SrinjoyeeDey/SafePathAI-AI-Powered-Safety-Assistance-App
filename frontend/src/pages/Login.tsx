import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.user);
    } catch (error) {
      console.error("Login failed:", error);
      // You can add user-facing error handling here
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-50 dark:bg-gray-900">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">
          Login
        </h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md bg-gray-50 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
        />
        <button className="w-full p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;