// src/app/pages/articles/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useArticleStore } from '../../../store/articleStore';
import { userById } from '../../../lib/userIndex';
import { BackLink } from '../../../components/ui/BackLink';
import { ArticleMeta } from '../../../components/articles/ArticleMeta';
import { ArticleBody } from '../../../components/articles/ArticleBody';

export default function ArticleDetailPage() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const article = useArticleStore(s => s.articles.find(a => String(a.id) === String(id)));

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 py-8 px-4">
                <div className="max-w-3xl mx-auto">
                    <h1 className="text-2xl font-semibold">Article introuvable</h1>
                    <p className="text-gray-500 mt-2">Cet article n’existe pas ou a été supprimé.</p>
                    <div className="mt-4"><button onClick={() => router.back()} className="text-blue-600">← Retour</button></div>
                </div>
            </div>
        );
    }

    const authorName = userById[article.authorId] ?? 'Inconnu';

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <BackLink href="/pages/articles" label="Retour aux articles" />
                <div className="mt-4">
                    <ArticleBody title={article.title} content={article.content} />
                    <div className="mt-2 px-8">
                        <ArticleMeta createdAt={article.createdAt} authorName={authorName} />
                    </div>
                </div>
            </div>
        </div>
    );
}
