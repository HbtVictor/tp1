import "./globals.css";
import { Navbar } from "@/app/components/layout/Navbar";

export const metadata = {
  title: "TP1 - Gestion de Contenu",
  description: "Application de gestion de contenu avec Next.js, Zustand et Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="min-h-screen bg-gray-50 text-gray-900">
        <Navbar />
        <main className="">{children}</main>
      </body>
    </html>
  );
}
