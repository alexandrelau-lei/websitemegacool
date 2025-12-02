"use client";

import { useEffect, useState } from "react";

export default function Relogio() {
  const [agora, setAgora] = useState(new Date());

  useEffect(() => {
    const id = setInterval(() => {
      setAgora(new Date());
    }, 1000);

    return () => clearInterval(id);
  }, []);

  return (
    <div className="text-sm text-slate-500">
      Hora atual:{" "}
      <span className="font-mono">
        {agora.toLocaleTimeString("pt-PT", { hour12: false })}
      </span>
    </div>
  );
}