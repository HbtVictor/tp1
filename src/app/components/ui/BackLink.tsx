// src/app/components/ui/BackLink.tsx
import Link from 'next/link';
export function BackLink({ href, label }:{ href:string; label?:string }) {
    return <Link href={href} className="text-blue-600 hover:underline">← {label ?? 'Retour'}</Link>;
}
