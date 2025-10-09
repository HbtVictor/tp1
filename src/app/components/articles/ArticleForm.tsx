// src/app/components/articles/ArticleForm.tsx
"use client";

import { useState } from "react";

export type ArticleFormValues = { title: string; content: string };
export function ArticleForm({
  initial = { title: "", content: "" },
  loading = false,
  onSubmit,
}: {
  initial?: ArticleFormValues;
  loading?: boolean;
  onSubmit: (values: ArticleFormValues) => Promise<void> | void;
}) {
  const [title, setTitle] = useState(initial.title);
  const [content, setContent] = useState(initial.content);
  const disabled = loading || !title.trim() || !content.trim();

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        if (disabled) return;
        await onSubmit({ title: title.trim(), content: content.trim() });
      }}
      className="space-y-6"
    >
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
          disabled={loading}
        />
      </div>

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
          disabled={loading}
        />
        <p className="text-sm text-gray-500 mt-2">
          {content.length} caractères
        </p>
      </div>

      <div className="flex gap-4">
        <button
          type="submit"
          disabled={disabled}
          className="flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 transition font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {loading ? "⏳ Création..." : "✅ Créer l'article"}
        </button>
      </div>
    </form>
  );
}
