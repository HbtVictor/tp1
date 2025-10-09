// src/app/components/articles/detail/ArticleBody.tsx
export function ArticleBody({ title, content }:{ title:string; content:string }) {
    return (
        <article className="bg-white rounded-lg shadow p-8">
            <h1 className="text-2xl font-semibold mb-3">{title}</h1>
            <div className="text-gray-700 leading-relaxed whitespace-pre-line">{content}</div>
        </article>
    );
}
