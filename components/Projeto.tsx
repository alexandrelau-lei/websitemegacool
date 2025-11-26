interface ProjetoProps {
  nome: string;
  url: string;
}

export default function Projeto({ nome, url }: ProjetoProps) {
  return (
    <div className="mb-4">
      <p>
        O projeto <strong>{nome}</strong> pode ser consultado através do seguinte link:
      </p>

      <a
        href={url}
        target="_blank"
        className="text-blue-600 underline"
      >
        Abrir {nome}
      </a>
    </div>
  );
}