// src/app/components/articles/ArticleMeta.tsx
export function ArticleMeta({ createdAt, authorName }:{
    createdAt: string; authorName: string;
}) {
    return (
        <p className="text-gray-500 mb-4">
            📅 {new Date(createdAt).toLocaleDateString('fr-FR')} · ✍️ {authorName}
        </p>
    );
}
