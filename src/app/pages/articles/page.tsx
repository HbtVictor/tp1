// src/app/pages/articles/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useArticleStore } from '../../store/articleStore';
import { ArticlesHeader } from '../../components/articles/ArticlesHeader';
import { ArticleCard } from '../../components/articles/ArticleCard';
import { EmptyArticles } from '../../components/articles/EmptyArticles';
import { userById } from '../../lib/userIndex';
import { ArticlesFilters, SortOrder } from '../../components/articles/ArticlesFilters';
import { useDebounce } from '../../lib/useDebounce';
import { useUserStore } from '../../store/userStore';

export default function ArticlesPage() {
    const articles = useArticleStore(s => s.articles);
    const remove = useArticleStore(s => s.remove);
    const currentUserId = useUserStore(s => s.currentUserId);
    const [mineOnly, setMineOnly] = useState(false);

    const [query, setQuery] = useState('');
    const [order, setOrder] = useState<SortOrder>('desc');
    const q = useDebounce(query, 250);

    const filtered = useMemo(() => {
        const byTitle = q.trim().toLowerCase();

        let list = byTitle
            ? articles.filter(a => a.title.toLowerCase().includes(byTitle))
            : articles.slice();

        if (mineOnly) list = list.filter(a => a.authorId === currentUserId); // <- ajout

        list.sort((a, b) => {
            const da = +new Date(a.createdAt);
            const db = +new Date(b.createdAt);
            return order === 'desc' ? db - da : da - db;
        });
        return list;
    }, [articles, q, order, mineOnly, currentUserId]);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-4xl mx-auto">
                <ArticlesHeader count={filtered.length} />
                <ArticlesFilters
                    query={query}
                    onQuery={setQuery}
                    order={order}
                    onOrder={setOrder}
                    mineOnly={mineOnly}
                    onMineOnly={setMineOnly}
                />


                {filtered.length === 0 ? (
                    <EmptyArticles />
                ) : (
                    <div className="space-y-4">
                        {filtered.map(a => (
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
