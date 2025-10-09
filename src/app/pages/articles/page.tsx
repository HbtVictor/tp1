// src/app/pages/articles/page.tsx
// 📄 Page qui affiche la liste de tous les articles

'use client'; // 🔴 IMPORTANT : Nécessaire pour l'interactivité (useState, hooks, etc.)

import { useArticleStore } from '../../store/articleStore';
import Link from 'next/link';

export default function ArticlesPage() {
    // 🎣 Hook Zustand : récupère les articles du store
    const { articles, remove } = useArticleStore();

    // 🎯 Explication :
    // useArticleStore((state) => state.articles)
    // = "Je veux uniquement la partie 'articles' du store"
    // Le composant se re-render automatiquement quand 'articles' change !

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            {/* 📦 Container principal */}
            <div className="max-w-4xl mx-auto">

                {/* 🎨 En-tête avec titre et bouton */}
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900">
                            Mes Articles
                        </h1>
                        <p className="text-gray-600 mt-1">
                            {articles.length} article{articles.length > 1 ? 's' : ''} au total
                        </p>
                    </div>

                    {/* 🔗 Bouton pour créer un article */}
                    <Link
                        href="/pages/articles/create"
                        className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition font-medium"
                    >
                        ➕ Nouvel article
                    </Link>
                </div>

                {/* 📋 Liste des articles */}
                {articles.length === 0 ? (
                    // 🚫 Message si aucun article
                    <div className="bg-white rounded-lg shadow p-12 text-center">
                        <p className="text-gray-500 text-lg">
                            Aucun article pour le moment.
                        </p>
                        <Link
                            href="/pages/articles/create"
                            className="text-blue-600 hover:underline mt-2 inline-block"
                        >
                            Créer votre premier article →
                        </Link>
                    </div>
                ) : (
                    // ✅ Affichage des articles
                    <div className="space-y-4">
                        {articles.map((article) => (
                            // 🗂️ Carte pour chaque article
                            <div
                                key={article.id}
                                className="bg-white rounded-lg shadow hover:shadow-md transition p-6"
                            >
                                {/* 📌 key={article.id} est OBLIGATOIRE pour que React
                     identifie chaque élément de la liste */}

                                <div className="flex justify-between items-start">
                                    <div className="flex-1">
                                        <h2 className="text-xl font-semibold text-gray-900 mb-2">
                                            {article.title}
                                        </h2>

                                        <p className="text-gray-600 mb-4 line-clamp-2">
                                            {/* line-clamp-2 = affiche max 2 lignes avec "..." */}
                                            {article.content}
                                        </p>

                                        <div className="flex items-center text-sm text-gray-500">
                      <span>
                        📅 {new Date(article.createdAt).toLocaleDateString('fr-FR')}
                      </span>
                                            <span className="mx-2">•</span>
                                            <span>
                        ✍️ Auteur : {article.authorId}
                      </span>
            </div>
        </div>

                                    {/* 🎛️ Boutons d'actions */}
                                    <div className="flex gap-2 ml-4">
                                        <Link
                                            href={`/pages/articles/${article.id}`}
                                            className="text-blue-600 hover:text-blue-700 px-3 py-1 rounded hover:bg-blue-50 transition"
                                        >
                                            👁️ Voir
                                        </Link>

                                        <button
                                            onClick={() => {
                                                // ⚠️ Confirmation avant suppression
                                                if (confirm(`Supprimer "${article.title}" ?`)) {
                                                    remove(article.id);
                                                }
                                            }}
                                            className="text-red-600 hover:text-red-700 px-3 py-1 rounded hover:bg-red-50 transition"
                                        >
                                            🗑️ Supprimer
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

// 💡 CONCEPTS CLÉS À RETENIR :
//
// 1. 'use client' : Obligatoire pour les composants interactifs
// 2. useArticleStore() : Hook pour accéder au store Zustand
// 3. map() : Boucle sur un tableau pour afficher chaque élément
// 4. key={id} : Identifiant unique requis par React dans les listes
// 5. Link : Composant Next.js pour la navigation (plus rapide que <a>)