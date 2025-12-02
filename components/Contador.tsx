"use client";

import { useEffect, useState } from "react";

export default function Contador() {
  const [valor, setValor] = useState(0);
  const [historico, setHistorico] = useState<number[]>([]);

  useEffect(() => {
    if (typeof window === "undefined") return;

    const valorGuardado = window.localStorage.getItem("contador-valor");
    const historicoGuardado = window.localStorage.getItem("contador-historico");

    if (valorGuardado !== null) {
      setValor(Number(valorGuardado));
    }

    if (historicoGuardado !== null) {
      try {
        setHistorico(JSON.parse(historicoGuardado));
      } catch {
        setHistorico([]);
      }
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;

    window.localStorage.setItem("contador-valor", String(valor));
    window.localStorage.setItem("contador-historico", JSON.stringify(historico));
  }, [valor, historico]);

  function registarNovoValor(novoValor: number) {
    setValor(novoValor);
    setHistorico((prev) => [...prev, novoValor]);
  }

  function incrementar() {
    if (valor < 10) {
      registarNovoValor(valor + 1);
    }
  }

  function decrementar() {
    if (valor > 0) {
      registarNovoValor(valor - 1);
    }
  }

  function reset() {
    registarNovoValor(0);
  }

  function corValor() {
    if (valor >= 0 && valor <= 3) return "bg-red-500 text-white";
    if (valor >= 4 && valor <= 7) return "bg-yellow-400 text-black";
    return "bg-green-500 text-white"; // 8–10
  }

  return (
    <main className="flex flex-col items-center gap-6">
      <h1 className="text-3xl font-bold">Contador</h1>

      <div className={`text-4xl font-bold px-6 py-3 rounded-full ${corValor()}`}>
        {valor}
      </div>

      <div className="flex gap-4">
        <button
          onClick={decrementar}
          disabled={valor === 0}
          className="px-4 py-2 rounded bg-slate-700 text-white disabled:opacity-40"
        >
          -1
        </button>

        <button
          onClick={reset}
          className="px-4 py-2 rounded bg-slate-500 text-white"
        >
          Reset
        </button>

        <button
          onClick={incrementar}
          disabled={valor === 10}
          className="px-4 py-2 rounded bg-slate-700 text-white disabled:opacity-40"
        >
          +1
        </button>
      </div>

      <section className="w-full max-w-md">
        <h2 className="text-xl font-semibold mb-2">
          Valores pelos quais o contador passou
        </h2>
        {historico.length === 0 ? (
          <p className="text-sm text-slate-500">Ainda não há valores registados.</p>
        ) : (
          <ul className="list-disc list-inside bg-slate-100 rounded p-3 text-slate-800">
            {historico.map((v, i) => (
              <li key={i}>{v}</li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}