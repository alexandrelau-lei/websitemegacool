"use client";

import Image from "next/image";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import type { Product } from "@/models/interfaces";
import React, {useEffect, useState} from "react";
import { Flavors } from "next/font/google";

interface ProdutoCardProps {
  product: Product;
  indice: number;
  onAddToCart?: () => void;
  onRemoveFromCart?: () => void;
}

export function ProductCard({ product, indice, onAddToCart, onRemoveFromCart }: ProdutoCardProps) {
  const numericPrice =
    typeof product.price === "number"
      ? product.price
      : parseFloat(product.price);

  const imageSrc = product.image.startsWith("http")
    ? product.image
    : `https://deisishop.pythonanywhere.com${product.image}`;

  // alteracao loja ---------------------------------
  const [favorito, setFavorito] = useState<boolean>(false);

  useEffect(() => {
    const fav = JSON.parse(localStorage.getItem("favorito") || "[]")
  ;

  setFavorito(fav.includes(indice));}, [indice]);


  function toggleFavorito(e: React.MouseEvent){
    e.preventDefault();
    e.stopPropagation();

    const fav = JSON.parse(localStorage.getItem("favoritos") || "[]")
    let novo;

    if(fav.includes(indice)){
      novo = fav.filter((i: number) => i !== indice);
      setFavorito(false);
    } else {
      novo = [...fav, indice];
      setFavorito(true);
    }
    localStorage.setItem("Favoritos", JSON.stringify(novo))
  }
  //---------------------------------
  
  return (
    <Card className="flex flex-col h-full justify-between">
      <CardHeader className="items-center pb-2">
        <CardTitle className="text-center text-base md:text-lg line-clamp-2">
          {product.title}
        </CardTitle>

        <button onClick = {toggleFavorito} className="text-xl">
          {favorito ? "❤️" : "🤍"}
        </button>
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