"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useUserStore } from "@/app/store/userStore";
import { useAuthStore } from "@/app/store/authStore";

export const RegisterForm = () => {
  const router = useRouter();
  const addUser = useUserStore((state) => state.addUser);

  // 🔒 Redirige si l'utilisateur est déjà connecté
  useEffect(() => {
    const { user } = useAuthStore.getState();
    if (user) router.push("/pages/articles");
  }, [router]);

  // 🧠 Données du formulaire
  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const { username, email, password } = form;
    if (!username || !email || !password) {
      alert("Merci de remplir tous les champs !");
      return;
    }

    // ➕ Ajout avec rôle par défaut "user"
    addUser({
      username,
      email,
      password,
    });

    alert("Inscription réussie !");
    router.push("/pages/auth/login");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white/90 backdrop-blur-md shadow-2xl rounded-2xl p-8 w-full max-w-md border border-gray-200"
    >
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Inscription
      </h2>

      <div className="space-y-4">
        <input
          name="username"
          placeholder="Nom d'utilisateur"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.username}
          onChange={handleChange}
        />

        <input
          name="email"
          type="email"
          placeholder="Email"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.email}
          onChange={handleChange}
        />

        <input
          name="password"
          type="password"
          placeholder="Mot de passe"
          className="w-full border border-gray-300 rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          value={form.password}
          onChange={handleChange}
        />
      </div>

      <button
        type="submit"
        className="mt-6 w-full py-3 text-white font-semibold rounded-lg bg-gradient-to-r from-green-600 to-green-500 hover:from-green-700 hover:to-green-600 transition-all shadow-md"
      >
        Créer un compte
      </button>

      <p className="text-center text-sm mt-4 text-gray-600">
        Déjà un compte ?{" "}
        <Link href="/pages/auth/login" className="text-blue-600 hover:underline">
          Se connecter
        </Link>
      </p>
    </form>
  );
};
