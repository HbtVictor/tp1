// src/app/pages/articles/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useArticleStore } from '../../../store/articleStore';
import { userById } from '../../../lib/userIndex';
import { ArticleBody, ArticleMeta, ArticleActions } from '../../../components/articles/detail';

export default function ArticleDetailPage() {
    const { id } = useParams<{ id:string }>();
    const router = useRouter();
    const article = useArticleStore(s => s.articles.find(a => String(a.id) === String(id)));

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-semibold">Article introuvable</h1>
                    <button onClick={() => router.back()} className="text-blue-600 mt-2">← Retour</button>
                </div>
            </div>
        );
    }

    const authorName = userById[article.authorId] ?? 'Inconnu';

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <ArticleBody title={article.title} content={article.content} />
                <ArticleMeta createdAt={article.createdAt} authorName={authorName} />
                <ArticleActions />
            </div>
        </div>
    );
}
