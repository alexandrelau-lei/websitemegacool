import produtos from "../../data/produtos";

export default function ProdutoDetalhe({ params }: { params: { id: string } }) {
  const produto = produtos.find(p => p.id === Number(params.id));

  if (!produto) {
    return <p className="p-6">Produto não encontrado.</p>;
  }

  return (
    <main className="p-6 max-w-xl mx-auto">
      <img
        src={produto.image}
        alt={produto.title}
        className="h-64 object-contain mx-auto mb-6"
      />

      <h1 className="text-2xl font-bold mb-2">{produto.title}</h1>

      <p className="text-lg font-semibold text-green-500 mb-2">
        €{produto.price}
      </p>

      <p className="text-sm mb-4">{produto.description}</p>

      <p className="text-sm">
        <strong>Categoria:</strong> {produto.category}
      </p>

      <p className="mt-2">
        ⭐ {produto.rating.rate} ({produto.rating.count} avaliações)
      </p>
    </main>
  );
}