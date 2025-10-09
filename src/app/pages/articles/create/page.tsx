// src/app/pages/articles/create/page.tsx
// 📝 Formulaire de création d'article

'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useArticleStore } from '../../../store/articleStore';
import Link from 'next/link';

export default function CreateArticlePage() {
    const router = useRouter();
    const add = useArticleStore((s) => s.add);

    // 🎣 State local pour les champs du formulaire
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    // 🎯 Explication des useState :
    // - title et setTitle : gère la valeur du champ "titre"
    // - content et setContent : gère le contenu de l'article
    // - isSubmitting : indique si le formulaire est en cours de soumission

    // 📤 Fonction appelée lors de la soumission du formulaire
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault(); // ⚠️ Empêche le rechargement de la page

        // ✅ Validation basique
        if (!title.trim() || !content.trim()) {
            alert('❌ Le titre et le contenu sont obligatoires !');
            return;
        }

        setIsSubmitting(true);

        // 🎭 Simule un délai d'API (comme si on envoyait à un serveur)
        await new Promise(resolve => setTimeout(resolve, 500));

        // ➕ Ajoute l'article au store
        add({
            title: title.trim(),
            content: content.trim(),
            authorId: 'user1',
        });

        // ✅ Feedback utilisateur
        alert('✅ Article créé avec succès !');

        // 🔄 Redirection vers la liste
        router.push('/pages/articles');
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8 px-4">
            <div className="max-w-3xl mx-auto">

                {/* 🔙 Bouton retour */}
                <Link
                    href="/pages/articles"
                    className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center"
                >
                    ← Retour aux articles
                </Link>

                {/* 📋 En-tête */}
                <div className="bg-white rounded-lg shadow p-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-6">
                        ✍️ Créer un nouvel article
                    </h1>

                    {/* 📝 Formulaire */}
                    <form onSubmit={handleSubmit} className="space-y-6">

                        {/* 🏷️ Champ Titre */}
                        <div>
                            <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Titre de l'article
                            </label>
                            <input
                                id="title"
                                type="text"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Ex: Les bases de React"
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition"
                                disabled={isSubmitting}
                            />
                            {/*
                🎯 onChange={(e) => setTitle(e.target.value)}
                Chaque fois que l'utilisateur tape, on met à jour 'title'
              */}
                        </div>

                        {/* 📄 Champ Contenu */}
                        <div>
                            <label
                                htmlFor="content"
                                className="block text-sm font-medium text-gray-700 mb-2"
                            >
                                Contenu
                            </label>
                            <textarea
                                id="content"
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                                placeholder="Écrivez votre article ici..."
                                rows={12}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition resize-none"
                                disabled={isSubmitting}
                            />

                            {/* 📊 Compteur de caractères */}
                            <p className="text-sm text-gray-500 mt-2">
                                {content.length} caractères
                            </p>
                        </div>

                        {/* 🎛️ Boutons d'action */}
                        <div className="flex gap-4">
                            <button
                                type="submit"
                                disabled={isSubmitting || !title.trim() || !content.trim()}
                                className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                            >
                                {isSubmitting ? '⏳ Création...' : '✅ Créer l\'article'}
                            </button>

                            <Link
                                href="/pages/articles"
                                className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition text-gray-700 font-medium text-center"
                            >
                                Annuler
                            </Link>
                        </div>
                    </form>

                    {/* 💡 Info */}
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm text-blue-800">
                            💡 <strong>Astuce :</strong> Cet article sera sauvegardé localement
                            dans le navigateur. Il persistera même après un refresh !
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

// 🎓 CONCEPTS CLÉS :
//
// 1. useState() : Crée une variable d'état qui déclenche un re-render quand elle change
// 2. onChange : Événement déclenché à chaque frappe clavier
// 3. e.preventDefault() : Empêche le comportement par défaut (reload de page)
// 4. disabled={condition} : Désactive un élément selon une condition
// 5. router.push() : Navigation programmatique (après soumission)