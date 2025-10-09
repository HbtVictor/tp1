// src/app/components/articles/ArticlesHeader.tsx
import Link from 'next/link';

export function ArticlesHeader({ count }: { count: number }) {
    return (
        <div className="flex justify-between items-center mb-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Mes Articles</h1>
                <p className="text-gray-600 mt-1">
                    {count} article{count > 1 ? 's' : ''}
                </p>
            </div>
            <Link
                href="/pages/articles/create"
                className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
            >
                ➕ Nouvel article
            </Link>
        </div>
    );
}
