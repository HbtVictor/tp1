// src/app/components/articles/EmptyArticles.tsx
import Link from 'next/link';

export function EmptyArticles() {
    return (
        <div className="bg-white rounded-lg shadow p-12 text-center">
            <p className="text-gray-500 text-lg">Aucun article pour le moment.</p>
            <Link href="/pages/articles/create" className="text-blue-600 hover:underline mt-2 inline-block">
                Créer votre premier article →
            </Link>
        </div>
    );
}
