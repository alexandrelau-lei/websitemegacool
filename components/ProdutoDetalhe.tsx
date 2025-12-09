"use client";

import Image from "next/image";
import type {Product} from "@/models/interfaces";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";

interface ProdutoDetalheProps {
  product: Product;
}

export function ProdutoDetalhe({ product }: ProdutoDetalheProps) {
  const numericPrice =
    typeof product.price === "number"
      ? product.price
      : parseFloat(product.price);

  const imageSrc = product.image.startsWith("http")
    ? product.image
    : `https://deisishop.pythonanywhere.com${product.image}`;

  return (
    <Card className="max-w-3xl mx-auto">
      <CardHeader className="flex flex-col md:flex-row gap-6 items-center">
        <div className="relative w-40 h-40 md:w-56 md:h-56 shrink-0">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-contain rounded-md"
          />
        </div>

        <div className="flex-1">
          <CardTitle className="text-2xl mb-2">{product.title}</CardTitle>
          <p className="text-sm text-muted-foreground mb-1">
            Categoria: {product.category}
          </p>
          <p className="text-xl font-semibold text-emerald-600">
            {isNaN(numericPrice)
              ? "Preço indisponível"
              : `€${numericPrice.toFixed(2)}`}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <section>
          <h2 className="font-semibold mb-1 text-lg">Descrição</h2>
          <p className="text-sm leading-relaxed">{product.description}</p>
        </section>

        <section>
          <h2 className="font-semibold mb-1 text-lg">Rating</h2>
          <p className="text-sm">
            {product.rating?.rate ?? "N/A"} ⭐ (
            {product.rating?.count ?? 0} avaliações)
          </p>
        </section>
      </CardContent>
    </Card>
  );
}