// src/app/components/articles/detail/ArticleActions.tsx
import Link from 'next/link';
export function ArticleActions() {
    return (
        <div className="mt-4">
            <Link href="/pages/articles" className="text-blue-600 hover:underline">← Retour aux articles</Link>
        </div>
    );
}
