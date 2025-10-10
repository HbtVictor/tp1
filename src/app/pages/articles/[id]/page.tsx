// src/app/pages/articles/[id]/page.tsx
'use client';

import { ArticleDetailHeader } from '@/app/components/articles/ArticleDetailHeader';
import ExportButton from '@/app/components/ExportButton';
import CommentForm from '@/app/components/comments/CommentForm';
import CommentList from '@/app/components/comments/CommentList';
import {
    useArticleDetail,
    ArticleReadingBadge,
    ArticleBody,
    ArticleFooter,
    ArticleNotFound,
} from '@/app/components/articles/detail';

export default function ArticleDetail() {
    const { article, author, wordCount, readingTime } = useArticleDetail();

    if (!article) return <ArticleNotFound />;

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
            <ArticleDetailHeader
                article={article}
                authorName={author?.username ?? 'Inconnu'}
                readingTime={readingTime}
                right={<ExportButton articles={article} variant="ghost" size="sm" label="Exporter" />}
            />

            <div className="py-12 px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        <ArticleReadingBadge readingTime={readingTime} wordCount={wordCount} />
                        <ArticleBody content={article.content} />
                        <ArticleFooter authorId={author?.id} authorName={author?.username ?? 'Inconnu'} />
                    </article>

                    <section className="space-y-6">
                        <h2 className="flex items-center gap-3 text-2xl font-bold text-gray-900 dark:text-white">
                            Commentaires
                        </h2>
                        <CommentForm articleId={article.id} />
                        <CommentList articleId={article.id} />
                    </section>
                </div>
            </div>
        </div>
    );
}
