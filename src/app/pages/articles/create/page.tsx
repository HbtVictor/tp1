// src/app/pages/articles/create/page.tsx
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useArticleStore } from '../../../store/articleStore';
import { BackLink } from '../../../components/ui/BackLink';
import { ArticleForm } from '../../../components/articles/ArticleForm';

export default function CreateArticlePage() {
    const router = useRouter();
    const add = useArticleStore((s) => s.add);
    const [loading, setLoading] = useState(false);

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">
                <BackLink href="/pages/articles">Retour aux articles</BackLink>

                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">✍️ Créer un nouvel article</h1>

                    <ArticleForm
                        loading={loading}
                        onSubmit={async ({ title, content }) => {
                            setLoading(true);
                            await new Promise((r) => setTimeout(r, 500)); // simule API
                            add({ title, content, authorId: '1' });       // adapte l'id auteur si besoin
                            setLoading(false);
                            router.push('/pages/articles');
                        }}
                    />

                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            💡 Cet article est sauvegardé localement et persiste après refresh.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
