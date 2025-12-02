"use client";

import { useEffect, useState } from "react";

interface ContadorPersonalizadoProps {
  title: string;
}

export default function ContadorPersonalizado({ title }: ContadorPersonalizadoProps) {
  const storageKey = `likes-${title.trim().toLowerCase()}`;

  const [likes, setLikes] = useState<number>(() => {
    if (typeof window === "undefined") return 0;

    try {
      const guardado = window.localStorage.getItem(storageKey);
      return guardado ? Number(guardado) : 0;
    } catch {
      return 0;
    }
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    try {
      window.localStorage.setItem(storageKey, String(likes));
    } catch {
    }
  }, [likes, storageKey]);

  function handleClick() {
    setLikes((prev) => prev + 1);
  }

  return (
    <button
      onClick={handleClick}
      className="mt-2 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-sm hover:bg-pink-100"
    >
      <span>❤️</span>
      <span>{likes} like{likes === 1 ? "" : "s"}</span>
    </button>
  );
}