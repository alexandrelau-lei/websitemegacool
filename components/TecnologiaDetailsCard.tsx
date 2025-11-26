type TecnologiaDetailsCardProps = {
  title: string;
  image: string;
  description: string;
  rating: number;
};

export default function TecnologiaDetailsCard({
  title,
  image,
  description,
  rating,
}: TecnologiaDetailsCardProps) {
  return (
    <div className="bg-slate-900 text-white p-6 rounded-xl w-full max-w-md text-center shadow-lg">
      <img
        src={`/tecnologias/${image}`} // ficheiros estão em public/tecnologias
        alt={title}
        className="w-24 h-24 object-contain mx-auto mb-4"
      />

      <h1 className="text-2xl font-bold mb-2">{title}</h1>

      <p className="text-sm mb-4">{description}</p>

      <p className="font-semibold">
        Rating: {rating}/5 ⭐
      </p>
    </div>
  );
}