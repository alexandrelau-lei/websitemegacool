"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [hora, setHora] = useState<string | null>(null);

  useEffect(() => {
    const atualizar = () => {
      setHora(
        new Date().toLocaleTimeString("pt-PT", {
          hour12: false,
        })
      );
    };

    atualizar();
    const id = setInterval(atualizar, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-sm text-slate-500">
      Hora atual:{" "}
      <span className="font-mono">
        {hora ?? "--:--:--"}
      </span>
    </div>
  );
}