"use client";

import { useParams } from "next/navigation";
import Link from "next/link";
import tecnologias from "@/app/data/tecnologias.json";
import TecnologiaDetailsCard from "@/components/TecnologiaDetailsCard";

export default function TecnologiaPage() {
  const params = useParams<{ indice: string }>();
  const index = Number(params.indice);

  if (Number.isNaN(index) || index < 0 || index >= tecnologias.length) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p>Tecnologia não encontrada.</p>
      </main>
    );
  }

  const tecnologia = tecnologias[index];

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-6">
      <TecnologiaDetailsCard
        title={tecnologia.title}
        image={tecnologia.image}
        description={tecnologia.description}
        rating={tecnologia.rating}
      />

      <Link
        href="/tecnologias"
        className="px-4 py-2 rounded-lg bg-slate-700 text-white hover:bg-slate-600 transition"
      >
        Voltar
      </Link>
    </main>
  );
}