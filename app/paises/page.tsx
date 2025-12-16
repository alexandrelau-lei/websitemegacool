"use client";

import {useMemo, useState} from "react";
import paises from "../data/paises.json";
import Pais from "@/components/Pais";

type Country = {
  name: {common: string};
  area: number;
  population: number;
};

export default function PaisesPage(){
  const [filtro, setFiltro] = useState("");
  const [ordem, setOrdem] = useState("desc");

  const lista = useMemo(() => {
    const filtrados = (paises as Country[]).filter((p) =>
      p.name.common.toLowerCase().includes(filtro.toLowerCase())
    );

    filtrados.sort((a, b) =>
      ordem === "asc" ? a.population - b.population : b.population - a.population
    );

    return filtrados;
  }, [filtro, ordem]);

  return(
    <main className="p-6">
      <h1 className="text-2xl font-bold mb-4">Países</h1>

      <div className="flex gap-3 mb-6">
        <input
          value={filtro}
          onChange={(e) => setFiltro(e.target.value)}
          placeholder="Filtrar por nome"
          className="border rounded p-2 w-full"
        />

        <select
          value={ordem}
          onChange={(e) => setOrdem(e.target.value)}
          className="border rounded p-2"
        >
          <option value="desc">População mais alta</option>
          <option value="asc">População mais baixa</option>
        </select>
      </div>

      <div className="grid gap-3">
        {lista.map((pais, indice) => (
          <Pais key={indice} pais={pais} />
        ))}
      </div>
    </main>
  );
}