"use client";

import { use as usePromise } from "react";
import useSWR from "swr";
import type { Product } from "@/models/interfaces";
import { ProdutoDetalhe } from "@/components/ProdutoDetalhe";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { Button } from "@/components/ui/button";

const API_BASE = "https://deisishop.pythonanywhere.com/products";

const fetcher = async (url: string): Promise<Product> => {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Erro ao carregar produto: ${res.status} ${res.statusText}`);
  return res.json();
};

interface ProdutoPageProps {
  params: Promise<{ indice: string }>;
}

export default function ProdutoPage({ params }: ProdutoPageProps) {
  const { indice } = usePromise(params);
  const idNumber = Number(indice);

  if (Number.isNaN(idNumber) || idNumber <= 0) {
    return (
      <main className="p-6 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Produto inválido</h1>
        <p className="text-sm text-muted-foreground">
          O índice especificado não é válido.
        </p>
        <Link href="/produtos">
          <Button>Voltar à lista de produtos</Button>
        </Link>
      </main>
    );
  }

  const { data, error, isLoading } = useSWR<Product>(
    `${API_BASE}/${idNumber}`,
    fetcher
  );

  if (error) {
    return (
      <main className="p-6 flex flex-col items-center gap-4">
        <h1 className="text-2xl font-bold">Produto DEISishop</h1>
        <p className="text-red-600">
          Ocorreu um erro ao carregar o produto.
        </p>
        <Link href="/produtos">
          <Button>Voltar à lista de produtos</Button>
        </Link>
      </main>
    );
  }

  if (isLoading || !data) {
    return (
      <main className="p-6 flex flex-col items-center justify-center min-h-[300px] gap-4">
        <h1 className="text-2xl font-bold">Produto DEISishop</h1>
        <Spinner className="w-10 h-10" />
        <p className="text-sm text-muted-foreground">
          A carregar detalhes do produto...
        </p>
        <Link href="/produtos">
          <Button variant="outline">Voltar à lista de produtos</Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="p-6 space-y-6">
      <div className="flex justify-between items-center max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold">Detalhes do Produto</h1>
        <Link href="/produtos">
          <Button variant="outline">Voltar à lista de produtos</Button>
        </Link>
      </div>

      <ProdutoDetalhe product={data} />
    </main>
  );
}