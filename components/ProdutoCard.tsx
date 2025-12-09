"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/models/interfaces";

interface ProdutoCardProps {
  product: Product;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
}

export function ProductCard({ product, onAddToCart, onRemoveFromCart }: ProdutoCardProps) {
  const numericPrice =
    typeof product.price === "number"
      ? product.price
      : parseFloat(product.price);

  const imageSrc = product.image.startsWith("http")
    ? product.image
    : `https://deisishop.pythonanywhere.com${product.image}`;

  return (
    <Card className="flex flex-col h-full justify-between">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-center text-base md:text-lg line-clamp-2">
          {product.title}
        </CardTitle>
      </CardHeader>

      <CardContent className="flex flex-col items-center gap-2 pt-0">
        <div className="relative w-24 h-24 md:w-28 md:h-28">
          <Image
            src={imageSrc}
            alt={product.title}
            fill
            className="object-contain"
          />
        </div>

        <p className="text-xs text-muted-foreground text-center">
          {product.category}
        </p>

        <p className="text-lg font-semibold text-emerald-600">
          {isNaN(numericPrice)
            ? "Preço indisponível"
            : `€${numericPrice.toFixed(2)}`}
        </p>

        {onAddToCart && (
          <Button
            className="mt-2 w-full"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart();
            }}
          >
            Adicionar ao carrinho
          </Button>
        )}

        {onRemoveFromCart && (
          <Button
            className="mt-2 w-full"
            variant="destructive"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onRemoveFromCart();
            }}
          >
            Remover do carrinho
          </Button>
        )}
      </CardContent>
    </Card>
  );
}