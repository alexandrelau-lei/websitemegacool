"use client";

import { useState } from "react";

export default function InputPage() {
  const [texto, setTexto] = useState("");

  const tecnologias = ["React", "Next.js", "TypeScript", "Tailwind", "Node.js"];
  const [tecnologiaSelecionada, setTecnologiaSelecionada] = useState(
    tecnologias[0]
  );

  interface Tarefa {
    id: number;
    texto: string;
  }

  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>([]);
  const [tarefaAEditarId, setTarefaAEditarId] = useState<number | null>(null);
  const [textoEdicao, setTextoEdicao] = useState("");

  function adicionarTarefa() {
    const textoLimpo = novaTarefa.trim();
    if (!textoLimpo) return;

    const nova: Tarefa = {
      id: Date.now(),
      texto: textoLimpo,
    };

    setTarefas((prev) => [...prev, nova]);
    setNovaTarefa("");
  }

  function apagarTarefa(id: number) {
    setTarefas((prev) => prev.filter((t) => t.id !== id));
    if (tarefaAEditarId === id) {
      setTarefaAEditarId(null);
      setTextoEdicao("");
    }
  }

  function iniciarEdicao(tarefa: Tarefa) {
    setTarefaAEditarId(tarefa.id);
    setTextoEdicao(tarefa.texto);
  }

  function guardarEdicao(id: number) {
    const novoTexto = textoEdicao.trim();
    if (!novoTexto) return;

    setTarefas((prev) =>
      prev.map((t) => (t.id === id ? { ...t, texto: novoTexto } : t))
    );
    setTarefaAEditarId(null);
    setTextoEdicao("");
  }

  function cancelarEdicao() {
    setTarefaAEditarId(null);
    setTextoEdicao("");
  }

  return (
    <main className="flex flex-col gap-10 w-full max-w-2xl">
      <h1 className="text-3xl font-bold">Página Input</h1>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Input de texto</h2>

        <input
          type="text"
          className="border rounded px-3 py-2 text-slate-900"
          placeholder="Escreve alguma coisa..."
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
        />

        <p className="mt-1">
          <span className="font-semibold">Texto digitado:</span> {texto}
        </p>
      </section>

      <section className="flex flex-col gap-3">
        <h2 className="text-xl font-semibold">Seletor de tecnologias</h2>

        <select
          className="border rounded px-3 py-2 text-slate-900"
          value={tecnologiaSelecionada}
          onChange={(e) => setTecnologiaSelecionada(e.target.value)}
        >
          {tecnologias.map((tec) => (
            <option key={tec} value={tec}>
              {tec}
            </option>
          ))}
        </select>

        <p className="mt-1">
          <span className="font-semibold">Tecnologia escolhida:</span>{" "}
          {tecnologiaSelecionada}
        </p>
      </section>

      <section className="flex flex-col gap-4">
        <h2 className="text-xl font-semibold">Lista de tarefas</h2>

        <div className="flex gap-2">
          <input
            type="text"
            className="flex-1 border rounded px-3 py-2 text-slate-900"
            placeholder="Nova tarefa..."
            value={novaTarefa}
            onChange={(e) => setNovaTarefa(e.target.value)}
          />
          <button
            onClick={adicionarTarefa}
            className="px-4 py-2 rounded bg-slate-800 text-white"
          >
            Inserir
          </button>
        </div>

        {tarefas.length === 0 ? (
          <p className="text-sm text-slate-500">Ainda não há tarefas.</p>
        ) : (
          <ul className="flex flex-col gap-2">
            {tarefas.map((tarefa) => (
              <li
                key={tarefa.id}
                className="flex items-center gap-2 border rounded px-3 py-2 bg-slate-100"
              >
                {tarefaAEditarId === tarefa.id ? (
                  <>
                    <input
                      type="text"
                      className="flex-1 border rounded px-2 py-1 text-slate-900"
                      value={textoEdicao}
                      onChange={(e) => setTextoEdicao(e.target.value)}
                    />
                    <button
                      className="px-2 py-1 text-sm rounded bg-green-600 text-white"
                      onClick={() => guardarEdicao(tarefa.id)}
                    >
                      Guardar
                    </button>
                    <button
                      className="px-2 py-1 text-sm rounded bg-slate-500 text-white"
                      onClick={cancelarEdicao}
                    >
                      Cancelar
                    </button>
                  </>
                ) : (
                  <>
                    <span className="flex-1">{tarefa.texto}</span>
                    <button
                      className="px-2 py-1 text-sm rounded bg-blue-600 text-white"
                      onClick={() => iniciarEdicao(tarefa)}
                    >
                      Editar
                    </button>
                    <button
                      className="px-2 py-1 text-sm rounded bg-red-600 text-white"
                      onClick={() => apagarTarefa(tarefa.id)}
                    >
                      Apagar
                    </button>
                  </>
                )}
              </li>
            ))}
          </ul>
        )}
      </section>
    </main>
  );
}