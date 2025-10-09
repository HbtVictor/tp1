// src/app/components/auth/ProtectedRoute.tsx
"use client";

import { ReactNode, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { useAuthStore } from "@/app/store/authStore";

const PUBLIC_ROUTES = ["/pages/auth/login", "/pages/auth/register"];

export default function ProtectedRoute({ children }: { children: ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const user = useAuthStore((state) => state.user);

  useEffect(() => {
    // ⚠️ On n’applique pas la protection sur les pages publiques
    if (PUBLIC_ROUTES.includes(pathname)) return;

    // 🚫 Si pas connecté → redirection
    if (!user) {
      router.replace("/pages/auth/login");
    }
  }, [user, pathname, router]);

  // 🕓 Pendant que Zustand charge le localStorage, on évite un flicker
  if (!user && !PUBLIC_ROUTES.includes(pathname)) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-600 dark:text-gray-300">
        Chargement...
      </div>
    );
  }

  return <>{children}</>;
}
