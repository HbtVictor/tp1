// src/app/components/articles/ArticlesFilters.tsx
'use client';
export type SortOrder = 'desc' | 'asc';

export function ArticlesFilters({ query, onQuery, order, onOrder, mineOnly, onMineOnly }:{
    query:string; onQuery:(v:string)=>void;
    order:'asc'|'desc'; onOrder:(v:'asc'|'desc')=>void;
    mineOnly:boolean; onMineOnly:(v:boolean)=>void;
}) {
    return (
        <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <input
                value={query}
                onChange={(e) => onQuery(e.target.value)}
                placeholder="Rechercher par titre…"
                className="w-full sm:w-2/3 px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
            />
            <div className="flex items-center gap-2">
                <label className="text-sm text-gray-600">Tri date</label>
                <select
                    value={order}
                    onChange={(e) => onOrder(e.target.value as SortOrder)}
                    className="px-3 py-2 border border-gray-300 rounded-lg"
                >
                    <option value="desc">Décroissant (récent d’abord)</option>
                    <option value="asc">Croissant (ancien d’abord)</option>
                </select>
                <label className="flex items-center gap-2 text-sm text-gray-600">
                    <input type="checkbox" checked={mineOnly} onChange={e=>onMineOnly(e.target.checked)} />
                    Mes articles
                </label>
            </div>
        </div>
    );
}
