// src/app/components/ui/BackLink.tsx
import Link from 'next/link';

export function BackLink({ href, children }: { href: string; children?: React.ReactNode }) {
    return (
        <Link href={href} className="text-blue-600 hover:text-blue-700 mb-4 inline-flex items-center">
            ← {children ?? 'Retour'}
        </Link>
    );
}
