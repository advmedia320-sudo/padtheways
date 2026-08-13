"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    const ADMIN_USERNAME = "padtheway_admin";
    const ADMIN_PASSWORD = "PTW@Admin2025";
    if (username === ADMIN_USERNAME && password === ADMIN_PASSWORD) {
      sessionStorage.setItem("adminSession", JSON.stringify({ loggedIn: true, timestamp: new Date().getTime() }));
      router.push("/admin/dashboard");
    } else {
      setError("Invalid username or password");
      setPassword("");
    }
  };

  return (
    <div className="min-h-screen bg-teal-900 flex items-center justify-center px-4">
      <div className="bg-white rounded-2xl shadow-xl p-8 max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-teal-900 mb-1">Pad The Way</h1>
          <p className="text-gray-500 text-sm">Admin Portal — Authorised Access Only</p>
          <div className="w-12 h-1 bg-orange-500 mx-auto mt-4 rounded-full" />
        </div>
        <form onSubmit={handleLogin} className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
            <input type="text" value={username} onChange={(e) => { setUsername(e.target.value); setError(""); }} placeholder="Enter username" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
            <input type="password" value={password} onChange={(e) => { setPassword(e.target.value); setError(""); }} placeholder="Enter password" className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-teal-500 text-sm" />
          </div>
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm">
              {error}
            </div>
          )}
          <button type="submit" className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-4 rounded-full transition-colors duration-200">Sign In</button>
        </form>
        <p className="text-center text-xs text-gray-400 mt-6">Protected area. Unauthorised access is prohibited.</p>
      </div>
    </div>
  );
}
