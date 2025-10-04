import { useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";

const Signup = () => {
  const { login } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: any) => {
    e.preventDefault();
    try {
      const res = await api.post("/auth/signup", { name, email, password });
      login(res.data.user); // auto login after signup
    } catch (err: any) {
      console.error(err.response?.data || err.message);
      alert("Signup failed. Please try again.");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleSignup}
        className="bg-white dark:bg-gray-800 shadow-lg p-8 rounded-xl w-96"
      >
        <h2 className="text-2xl font-bold mb-6">Signup</h2>
        
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full mb-4 p-2 border rounded-md"
        />

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

        <button className="w-full p-2 bg-green-600 text-white rounded-md">
          Signup
        </button>
      </form>
    </div>
  );
};

export default Signup;