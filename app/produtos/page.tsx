import produtos from "../data/produtos";
import Link from "next/link";

export default function ProdutosPage() {
  return (
    <main className="p-6">
      <h1 className="text-3xl font-bold mb-6">Produtos DEISshop</h1>

      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {produtos.map((p) => (
          <li key={p.id} className="border p-4 rounded shadow">
            <img
              src={p.image}
              alt={p.title}
              className="h-40 object-contain mx-auto mb-3"
            />

            <h2 className="font-semibold text-center text-sm mb-1">{p.title}</h2>

            <p className="text-center font-bold text-green-600">
              €{p.price}
            </p>

            <Link
              href={`/produtos/${p.id}`}
              className="block text-blue-500 hover:underline mt-2 text-center"
            >
              Ver detalhes
            </Link>
          </li>
        ))}
      </ul>
    </main>
  );
}
