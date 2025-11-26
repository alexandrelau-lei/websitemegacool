import Projeto from "./Projeto";

export default function DescricaoProjetos() {
  return (
    <section>
      <h2 className="text-2xl font-bold mb-3">Os meus projetos</h2>

      <p className="mb-4">
        Ao longo do meu percurso desenvolvi vários projetos em diferentes áreas.
        Em baixo pode encontrar alguns exemplos e, na minha página do GitHub
        Pages, a lista completa.
      </p>

      <div className="space-y-3">
        <Projeto
          nome="Projeto da Loja"
          url="https://alexandrelau-lei.github.io/lab7/index.html"
        />
        <Projeto
          nome="Site com JS Interativo"
          url="https://alexandrelau-lei.github.io/lab5/index.html"
        />
      </div>

      <a
        href="https://alexandrelau-lei.github.io"
        target="_blank"
        className="text-blue-600 underline mt-5 inline-block"
      >
        Ver todos os projetos no GitHub Pages
      </a>
    </section>
  );
}