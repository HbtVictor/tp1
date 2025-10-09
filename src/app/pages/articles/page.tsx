// src/app/pages/articles/page.tsx
'use client';

import { useArticleStore } from '../../store/articleStore';
import { ArticlesHeader } from '../../components/articles/ArticlesHeader';
import { ArticleCard } from '../../components/articles/ArticleCard';
import { EmptyArticles } from '../../components/articles/EmptyArticles';
import { userById } from '../../lib/userIndex';

export default function ArticlesPage() {
    const articles = useArticleStore(s => s.articles);
    const remove = useArticleStore(s => s.remove);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <ArticlesHeader count={articles.length} />

                {articles.length === 0 ? (
                    <EmptyArticles />
                ) : (
                    <div className="space-y-4">
                        {articles.map(a => (
                            <ArticleCard
                                key={a.id}
                                id={a.id}
                                title={a.title}
                                content={a.content}
                                createdAt={a.createdAt}
                                authorName={userById[a.authorId] ?? 'Inconnu'}
                                onDelete={() => {
                                    if (confirm(`Supprimer "${a.title}" ?`)) remove(a.id);
                                }}
                            />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
