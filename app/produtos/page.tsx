"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import type { Product } from "@/models/interfaces";
import { ProductCard } from "@/components/ProdutoCard";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";

const API_URL = "https://deisishop.pythonanywhere.com/products/";

const fetcher = async (url: string): Promise<Product[]> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao carregar produtos: ${res.status} ${res.statusText}`);
  return res.json();
};

export default function ProdutosPage() {
  const { data, error, isLoading } = useSWR<Product[]>(API_URL, fetcher);

  const [search, setSearch] = useState("");
  const [order, setOrder] = useState("nome-asc");
  const [filteredData, setFilteredData] = useState<Product[]>([]);
  const [cart, setCart] = useState<Product[]>([]);
  const [isStudent, setIsStudent] = useState(false);
  const [coupon, setCoupon] = useState("");
  const [purchaseResponse, setPurchaseResponse] = useState<any | null>(null);
  const [isBuying, setIsBuying] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem("cart");
    if (stored) {
      try {
        setCart(JSON.parse(stored));
      } catch {}
    }
  }, []);

  useEffect(() => {
    window.localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    if (!data) return;

    const query = search.toLowerCase();
    let result = data.filter((product) =>
      product.title.toLowerCase().includes(query)
    );

    result = [...result].sort((a, b) => {
      const priceA = typeof a.price === "number" ? a.price : parseFloat(a.price);
      const priceB = typeof b.price === "number" ? b.price : parseFloat(b.price);

      switch (order) {
        case "nome-asc":
          return a.title.localeCompare(b.title);
        case "nome-desc":
          return b.title.localeCompare(a.title);
        case "preco-asc":
          return priceA - priceB;
        case "preco-desc":
          return priceB - priceA;
      }
      return 0;
    });

    setFilteredData(result);
  }, [data, search, order]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      if (prev.some((p) => p.id === product.id)) return prev;
      return [...prev, product];
    });
  };

  const handleRemoveFromCart = (id: number) => {
    setCart((prev) => prev.filter((p) => p.id !== id));
  };

  const total = cart.reduce((sum, p) => {
    const price = typeof p.price === "number" ? p.price : parseFloat(p.price);
    return sum + (isNaN(price) ? 0 : price);
  }, 0);

  const buy = async () => {
    if (cart.length === 0) return;

    setIsBuying(true);
    setPurchaseResponse(null);

    try {
      const response = await fetch(
        "https://deisishop.pythonanywhere.com/buy/",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            products: cart.map((product) => product.id),
            name: "",
            student: isStudent,
            coupon: coupon,
          }),
        }
      );

      if (!response.ok) {
        const text = await response.text();
        throw new Error(text || response.statusText);
      }

      const data = await response.json();
      setPurchaseResponse(data);
      setCart([]);
    } catch (e) {
      setPurchaseResponse({ error: "Erro ao comprar", detail: String(e) });
    } finally {
      setIsBuying(false);
    }
  };

  if (error) {
    return (
      <main className="p-6 flex flex-col items-center gap-4">
        <h1 className="text-3xl font-bold">Produtos DEISishop</h1>
        <p className="text-red-600">Ocorreu um erro ao carregar os produtos.</p>
      </main>
    );
  }

  if (isLoading || !data) {
    return (
      <main className="p-6 flex flex-col items-center justify-center min-h-[300px] gap-4">
        <h1 className="text-3xl font-bold">Produtos DEISishop</h1>
        <Spinner className="w-10 h-10" />
        <p className="text-sm text-muted-foreground">A carregar produtos...</p>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-10">
      <section>
        <h1 className="text-3xl font-bold mb-6 text-center">Produtos DEISishop</h1>

        <div className="max-w-md mx-auto mb-6 flex flex-col gap-4">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Procurar produtos pelo nome..."
            className="w-full rounded-md border border-slate-300 bg-slate-900/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          />

          <select
            value={order}
            onChange={(e) => setOrder(e.target.value)}
            className="w-full rounded-md border border-slate-300 bg-slate-900/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
          >
            <option value="nome-asc">Nome (A → Z)</option>
            <option value="nome-desc">Nome (Z → A)</option>
            <option value="preco-asc">Preço (mais barato → mais caro)</option>
            <option value="preco-desc">Preço (mais caro → mais barato)</option>
          </select>
        </div>

        <section className="grid gap-6 grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {filteredData.map((product) => (
            <Link key={product.id} href={`/produtos/${product.id}`} className="block">
              <ProductCard
                product={product}
                onAddToCart={() => handleAddToCart(product)}
              />
            </Link>
          ))}
        </section>
      </section>

      <section>
        <h2 className="text-2xl font-bold mb-4">Carrinho</h2>

        {cart.length === 0 ? (
          <p className="text-sm text-muted-foreground">O carrinho está vazio.</p>
        ) : (
          <>
            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mb-6">
              {cart.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onRemoveFromCart={() => handleRemoveFromCart(product.id)}
                />
              ))}
            </div>

            <p className="mt-2 mb-4 text-right text-lg font-semibold">
              Total: €{total.toFixed(2)}
            </p>

            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-4">
              <label className="flex items-center gap-2 text-sm">
                <input
                  type="checkbox"
                  checked={isStudent}
                  onChange={(e) => setIsStudent(e.target.checked)}
                />
                Estudante DEISI
              </label>

              <input
                type="text"
                value={coupon}
                onChange={(e) => setCoupon(e.target.value)}
                placeholder="Cupão de desconto"
                className="w-full md:w-64 rounded-md border border-slate-300 bg-slate-900/20 px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500"
              />

              <button
                onClick={buy}
                disabled={isBuying}
                className="rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold text-white hover:bg-emerald-700 disabled:opacity-60"
              >
                {isBuying ? "A comprar..." : "Comprar"}
              </button>
            </div>

            {purchaseResponse && (
              <div className="mt-4 rounded-md border border-slate-700 bg-slate-900/40 p-4 text-sm">
                <h3 className="font-semibold mb-2">Resposta da compra</h3>
                <pre className="whitespace-pre-wrap break-all text-xs">
                  {JSON.stringify(purchaseResponse, null, 2)}
                </pre>
              </div>
            )}
          </>
        )}
      </section>
    </main>
  );
}