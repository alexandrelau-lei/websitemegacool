import Link from "next/link";
import TecnologiaCard from "@/components/TecnologiaCard";
import tecnologias from "../data/tecnologias.json";

export default function TecnologiasPage() {
  return (
    <main className="px-6 py-8">
      <h1 className="text-3xl font-bold mb-6">Tecnologias Exploradas</h1>

      <section className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {tecnologias.map((tec, index) => (
          <Link key={index} href={`/tecnologias/${index}`}>
            <TecnologiaCard title={tec.title} image={tec.image} />
          </Link>
        ))}
      </section>
    </main>
  );
}