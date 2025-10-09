import "./globals.css";
import { Navbar } from "@/app/components/layout/Navbar";
import { Footer } from "@/app/components/layout/Footer";

export const metadata = {
  title: "TP1 - Gestion de Contenu",
  description:
    "Application de gestion de contenu avec Next.js, Zustand et Tailwind",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="flex flex-col min-h-screen bg-gray-50 text-gray-900">
        {/* Navbar fixée en haut */}
        <Navbar />

        {/* Contenu principal prend tout l’espace restant */}
        <main className="flex-grow pt-20 px-4">
          {children}
        </main>

        {/* Footer toujours en bas */}
        <Footer />
      </body>
    </html>
  );
}
