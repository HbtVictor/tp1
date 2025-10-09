// src/app/components/articles/detail/ArticleMeta.tsx
export function ArticleMeta({ createdAt, authorName }:{ createdAt:string; authorName:string }) {
    return (
        <p className="text-gray-500 mt-2">
            📅 {new Date(createdAt).toLocaleDateString('fr-FR')} · ✍️ {authorName}
        </p>
    );
}
