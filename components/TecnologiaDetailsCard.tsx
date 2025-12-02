type TecnologiaDetailsCardProps = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

import ContadorPersonalizado from "@/components/ContadorPersonalizado";

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl w-full max-w-md text-center shadow-lg">
      <img
        src={`/tecnologias/${image}`}
        alt={title}
        className="w-24 h-24 object-contain mx-auto mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{title}</h1>

      <p className="text-sm mb-4">{description}</p>

      <p className="font-semibold mb-4">
        Rating: {rating}/5 ⭐
      </p>

      <ContadorPersonalizado title={title} />
    </div>
  );
}