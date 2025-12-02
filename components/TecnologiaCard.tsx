interface TecnologiaCardProps {
  title: string;
  image: string;
}

import ContadorPersonalizado from "@/components/ContadorPersonalizado";

export default function TecnologiaCard({ title, image }: TecnologiaCardProps) {
  return (
    <div
      className="
        w-40 h-48
        flex flex-col items-center justify-center
        bg-white dark:bg-neutral-900
        rounded-xl shadow-md
        p-4 m-2
        hover:shadow-lg hover:scale-105 transition
      "
    >
      <img
        src={`/tecnologias/${image}`}
        alt={title}
        className="w-16 h-16 object-contain mb-3"
      />

      <h3 className="text-center text-sm font-semibold">{title}</h3>

      <ContadorPersonalizado title={title} />
    </div>
  );
}