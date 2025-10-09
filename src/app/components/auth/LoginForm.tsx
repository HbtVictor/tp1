"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

export const LoginForm = () => {
  const router = useRouter();
  const login = useAuthStore((state) => state.login);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const success = login(email, password);
    if (success) router.push("/pages/articles");
    else setError("Email ou mot de passe incorrect");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Connexion
      </h2>

      {error && (
        <div className="bg-red-100 text-red-700 text-sm p-2 rounded mb-3 text-center">
          {error}
        </div>
      )}

      <div className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Mot de passe"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 transition-all shadow-md"
      >
        Se connecter
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        Pas encore de compte ?{" "}
        <Link href="/pages/auth/register" className="text-blue-600 hover:underline">
          Créer un compte
        </Link>
      </p>
    </form>
  );
};
