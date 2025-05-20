// pages/sales/login.tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const salesReps: Record<string, string> = {
  rep1: "password1",
  rep2: "password2",
  // Add more reps as needed
};

export default function SalesLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    if (username in salesReps && salesReps[username] === password) {
      localStorage.setItem("sales_logged_in", "true");
      localStorage.setItem("sales_username", username);
      router.push("/sales/dashboard");
    } else {
      alert("Incorrect credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-green-50">
      <div className="bg-white p-8 rounded shadow-md w-96">
        <h1 className="text-2xl font-bold mb-4">Sales Rep Login</h1>
        <input
          type="text"
          placeholder="Username"
          className="w-full border p-2 rounded mb-2"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full border p-2 rounded mb-4"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          onClick={handleLogin}
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Login
        </button>
      </div>
    </div>
  );
}
