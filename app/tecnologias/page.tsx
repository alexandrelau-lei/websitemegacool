import Image from "next/image";
import tecnologias from "@/app/data/tecnologias.json";

type Tecnologia = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

export default function Page() {
  const listaTecnologias: Tecnologia[] = JSON.parse(
    JSON.stringify(tecnologias)
  );

  return (
    <div>
      <h2>Tecnologias Exploradas</h2>

      <ul className="grid gap-4 md:grid-cols-2 mt-4">
        {listaTecnologias.map((tec, i) => (
          <li
            key={i}
            className="bg-white rounded-2xl shadow p-4 flex gap-4 items-center"
          >
            <Image
              src={`/tecnologias/${tec.image}`}
              alt={`Logotipo de ${tec.title}`}
              width={80}
              height={80}
            />

            <div>
              <h3 className="font-bold text-lg">{tec.title}</h3>
              <p>{tec.description}</p>
              <p className="mt-2 text-sm">
                <span className="font-semibold">Rating:</span>{" "}
                {"⭐".repeat(tec.rating)}
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
