"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Film, Lock, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    setLoading(true);
    setError("");

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.message || "Invalid login");
        return;
      }

      router.push("/AdminDashboard");
      router.refresh();

    } catch (error) {
      console.error(error);
      setError("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-950 flex items-center justify-center px-4">

      <div className="w-full max-w-md">

        <div className="bg-gray-900 border border-gray-800 rounded-2xl p-8 shadow-2xl">

          <div className="flex justify-center mb-6">
            <div className="bg-red-500 p-4 rounded-full">
              <Film className="w-8 h-8 text-white" />
            </div>
          </div>

          <h1 className="text-3xl font-bold text-white text-center">
            Admin Login
          </h1>

          <p className="text-gray-400 text-center mt-2 mb-8">
            Sign in to manage your movies
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500 text-red-400 p-3 rounded-lg mb-5">
              {error}
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">

            <div>
              <label className="text-gray-300 block mb-2">
                Username
              </label>

              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                <input
                  type="text"
                  value={username}
                  onChange={(e) =>
                    setUsername(e.target.value)
                  }
                  required
                  className="w-full bg-gray-800 text-white rounded-lg pl-11 pr-4 py-3 outline-none border border-gray-700 focus:border-red-500"
                  placeholder="Admin username"
                />
              </div>
            </div>


            <div>
              <label className="text-gray-300 block mb-2">
                Password
              </label>

              <div className="relative">

                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500 w-5 h-5" />

                <input
                  type="password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  required
                  className="w-full bg-gray-800 text-white rounded-lg pl-11 pr-4 py-3 outline-none border border-gray-700 focus:border-red-500"
                  placeholder="Admin password"
                />

              </div>
            </div>


            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-500 hover:bg-red-600 disabled:bg-gray-700 text-white font-bold py-3 rounded-lg transition"
            >
              {loading ? "Signing in..." : "Login"}
            </button>

          </form>

        </div>

      </div>

    </main>
  );
}