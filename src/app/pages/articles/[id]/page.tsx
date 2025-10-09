'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticleStore } from '../../../store/articleStore';
import { mockUsers } from '../../../lib/mockData'; // <-- ajout

export default function ArticleDetail() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { articles } = useArticleStore();

    const article = articles.find(a => String(a.id) === String(id));
    const author = mockUsers.find(u => u.id === article?.authorId); // <-- username

    if (!article) {
        return (
            <div className="container-pro text-center">
                <h1>Article introuvable</h1>
                <p className="muted mt-2">Cet article n’existe pas ou a été supprimé.</p>
                <button onClick={() => router.back()} className="btn btn-ghost mt-4">Retour</button>
            </div>
        );
    }

    return (
        <div className="container-pro">
            <article className="card p-8">
                <h1 className="text-2xl font-semibold mb-3">{article.title}</h1>
                <p className="muted mb-4">
                    📅 {new Date(article.createdAt).toLocaleDateString('fr-FR')} · ✍️ Auteur : {author?.username ?? 'Inconnu'}
                </p>
                <p className="text-gray-700 leading-relaxed whitespace-pre-line">{article.content}</p>
            </article>
            <div className="mt-6">
                <Link href="/pages/articles" className="btn btn-ghost">← Retour à la liste</Link>
            </div>
        </div>
    );
}
