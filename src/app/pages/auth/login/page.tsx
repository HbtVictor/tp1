"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";
import { LoginForm } from "@/app/components/auth/LoginForm";

export default function LoginPage() {
  const router = useRouter();
  const { user } = useAuthStore();

  // 🔒 Redirige si déjà connecté
  useEffect(() => {
    if (user) router.push("/pages/articles");
  }, [user, router]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-gray-100 to-gray-300 p-4 w-full">
      <LoginForm />
    </div>
  );
}
