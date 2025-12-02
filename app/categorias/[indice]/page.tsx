import produtos from "../../data/produtos";

export default function CategoriaProdutos({ params }: { params: { categoria: string } }) {
  const categoriaDecodificada = decodeURIComponent(params.categoria);

  const filtrados = produtos.filter(
    p => p.category.toLowerCase() === categoriaDecodificada.toLowerCase()
  );

  return (
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Produtos em: {categoriaDecodificada}
      </h1>

      {filtrados.length === 0 ? (
        <p>Não há produtos nesta categoria.</p>
      ) : (
        <ul className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {filtrados.map((p) => (
            <li key={p.id} className="border p-4 rounded shadow text-center">
              <img
                src={p.image}
                alt={p.title}
                className="h-32 object-contain mx-auto mb-3"
              />
              <h2 className="text-sm font-semibold">{p.title}</h2>
              <p className="font-bold text-green-600">€{p.price}</p>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}