import Caracteristica from "@/components/Caracteristica";

export default function Page() {
  const caracteristicas = [
    "JSX, sintaxe que mistura HTML e JS.",
    "Componentes, funções que retornam JSX.",
    "Componentes Reutilizáveis e Modulares.",
    "Roteamento Automático e APIs.",
    "Hooks: useState, useEffect e useSWR.",
    "Renderização Rápida e SEO Friendly.",
    "TypeScript Seguro e Escalável.",
    "Comunidade Ativa e Popularidade.",
  ];

  return (
    <>
      <h2 className="text-3xl font-bold mb-4">
        Características do React e Next.js
      </h2>

      <ul>
        {caracteristicas.map((c, i) => (
          <Caracteristica key={i} caracteristica={c} />
        ))}
      </ul>
    </>
  );
}