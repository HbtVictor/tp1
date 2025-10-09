// src/app/components/articles/ArticleCard.tsx
import Link from 'next/link';

type Props = {
    id: string;
    title: string;
    content: string;
    createdAt: string;
    authorName: string;
    onDelete: () => void;
};

export function ArticleCard({ id, title, content, createdAt, authorName, onDelete }: Props) {
    return (
        <div className="bg-white rounded-lg shadow hover:shadow-md transition p-6">
            <div className="flex justify-between items-start">
                <div className="flex-1">
                    <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
                    <p className="text-gray-600 mb-4 line-clamp-2">{content}</p>
                    <div className="flex items-center text-sm text-gray-500">
                        <span>📅 {new Date(createdAt).toLocaleDateString('fr-FR')}</span>
                        <span className="mx-2">•</span>
                        <span>✍️ Auteur : {authorName}</span>
                    </div>
                </div>

                <div className="flex gap-2 ml-4">
                    <Link
                        href={`/pages/articles/${id}`}
                        className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition"
                    >
                        👁️ Voir
                    </Link>
                    <button
                        onClick={onDelete}
                        className="text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition"
                    >
                        🗑️ Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}
