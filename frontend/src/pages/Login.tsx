import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Login = () => {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e: any) => {
    e.preventDefault();
    const res = await api.post("/auth/login", { email, password });
    login(res.data.user);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleLogin}
        className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />
        <button className="w-full p-2 bg-blue-600 text-white rounded-md">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;