import produtos from "../data/produtos";
import Link from "next/link";

export default function CategoriasPage() {
  const categorias = Array.from(new Set(produtos.map(p => p.category)));

  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Categorias</h1>

      <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
        {categorias.map((cat) => (
          <li key={cat} className="p-4 border rounded shadow text-center">
            <h2 className="font-semibold">{cat}</h2>

            <Link
              href={`/categorias/${encodeURIComponent(cat)}`}
              className="text-blue-500 hover:underline block mt-2"
            >
              Ver produtos
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}