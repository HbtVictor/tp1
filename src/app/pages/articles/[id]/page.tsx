// src/app/pages/articles/[id]/page.tsx
'use client';

import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { useArticleStore } from '../../../store/articleStore';
import { mockUsers } from '../../../lib/mockData';
import { Calendar, User, Clock, ArrowLeft, BookOpen, AlertCircle, MessageSquare } from 'lucide-react';
import CommentForm from '../../../components/comments/CommentForm';
import CommentList from '../../../components/comments/CommentList';



export default function ArticleDetail() {
    const { id } = useParams<{ id: string }>();
    const router = useRouter();
    const { articles } = useArticleStore();

    const article = articles.find(a => String(a.id) === String(id));
    const author = mockUsers.find(u => u.id === article?.authorId);

    // Calcul du temps de lecture
    const wordCount = article ? article.content.trim().split(/\s+/).filter(Boolean).length : 0;
    const readingTime = Math.ceil(wordCount / 200);

    if (!article) {
        return (
            <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-12 px-4 transition-colors">
                <div className="max-w-3xl mx-auto">
                    <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-12 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 mb-4">
                            <AlertCircle className="w-8 h-8 text-red-600 dark:text-red-400" />
                        </div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                            Article introuvable
                        </h1>
                        <p className="text-gray-600 dark:text-gray-400 mb-6">
                            Cet article n'existe pas ou a été supprimé.
                        </p>
                        <button
                            onClick={() => router.back()}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 text-gray-900 dark:text-white rounded-xl transition-colors font-medium"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Retour
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 transition-colors">
            {/* Header avec gradient */}
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-700 dark:to-purple-700 py-12 px-4">
                <div className="max-w-4xl mx-auto">
                    <Link
                        href="/pages/articles"
                        className="inline-flex items-center gap-2 text-white/90 hover:text-white transition-colors group mb-8"
                    >
                        <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        <span className="font-medium">Retour aux articles</span>
                    </Link>

                    {/* Meta informations */}
                    <div className="flex flex-wrap items-center gap-4 text-white/80 text-sm mb-6">
                        <div className="flex items-center gap-2">
                            <Calendar className="w-4 h-4" />
                            <span>{new Date(article.createdAt).toLocaleDateString('fr-FR', {
                                day: 'numeric',
                                month: 'long',
                                year: 'numeric'
                            })}</span>
                        </div>
                        <span className="text-white/50">•</span>
                        <div className="flex items-center gap-2">
                            <User className="w-4 h-4" />
                            <span>{author?.username ?? 'Inconnu'}</span>
                        </div>
                        <span className="text-white/50">•</span>
                        <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" />
                            <span>{readingTime} min de lecture</span>
                        </div>
                    </div>

                    {/* Titre */}
                    <h1 className="text-4xl md:text-5xl font-bold text-white leading-tight">
                        {article.title}
                    </h1>
                </div>
            </div>

            {/* Contenu de l'article */}
            <div className="py-12 px-4">
                <div className="max-w-4xl mx-auto space-y-8">
                    {/* Article principal */}
                    <article className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
                        {/* Badge lecture */}
                        <div className="bg-gradient-to-r from-blue-50 to-purple-50 dark:from-blue-900/20 dark:to-purple-900/20 px-8 py-4 border-b border-gray-200 dark:border-gray-700">
                            <div className="flex items-center gap-2 text-sm text-gray-700 dark:text-gray-300">
                                <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                <span className="font-medium">
                                    Temps de lecture estimé : {readingTime} minute{readingTime > 1 ? 's' : ''}
                                </span>
                                <span className="text-gray-400 dark:text-gray-500">•</span>
                                <span>{wordCount} mots</span>
                            </div>
                        </div>

                        {/* Contenu principal */}
                        <div className="px-8 md:px-12 py-10">
                            <div className="prose prose-lg dark:prose-invert max-w-none">
                                <div className="text-gray-800 dark:text-gray-200 leading-relaxed whitespace-pre-line text-lg">
                                    {article.content}
                                </div>
                            </div>
                        </div>

                        {/* Footer de l'article */}
                        <div className="bg-gray-50 dark:bg-gray-700/50 px-8 md:px-12 py-6 border-t border-gray-200 dark:border-gray-700">
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                        {(author?.username ?? 'I')[0].toUpperCase()}
                                    </div>
                                    <div>
                                        <p className="font-semibold text-gray-900 dark:text-white">
                                            {author?.username ?? 'Inconnu'}
                                        </p>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Auteur
                                        </p>
                                    </div>
                                </div>

                                <Link
                                    href="/pages/articles"
                                    className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 dark:bg-blue-500 dark:hover:bg-blue-600 text-white rounded-xl transition-colors font-medium shadow-sm hover:shadow-md"
                                >
                                    Voir tous les articles
                                </Link>
                            </div>
                        </div>
                    </article>

                    {/* Section Commentaires */}
                    <div className="space-y-6">
                        {/* Header de la section commentaires */}
                        <div className="flex items-center gap-3">
                            <MessageSquare className="w-6 h-6 text-blue-600 dark:text-blue-400" />
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Commentaires
                            </h2>
                        </div>

                        {/* Formulaire d'ajout de commentaire */}
                        <CommentForm articleId={article.id} />

                        {/* Liste des commentaires */}
                        <CommentList articleId={article.id} />
                    </div>
                </div>
            </div>
        </div>
    );
}