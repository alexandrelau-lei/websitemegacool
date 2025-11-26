"use client";

import { useParams } from "next/navigation";
import Link from "next/link";

export default function CaracteristicaPage() {
  const params = useParams<{ caracteristica: string }>();

  const texto = decodeURIComponent(params.caracteristica);

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <div className="bg-slate-900 text-white px-6 py-4 rounded-lg shadow w-full max-w-lg text-center">
        <h1 className="text-2xl font-bold mb-2">Característica</h1>
        <p className="text-lg">{texto}</p>
      </div>

      <Link
        href="/caracteristicas"
        className="px-4 py-2 bg-slate-700 text-white rounded-lg hover:bg-slate-600 transition"
      >
        Voltar
      </Link>
    </main>
  );
}