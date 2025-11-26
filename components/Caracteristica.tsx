import Link from "next/link";

export interface CaracteristicaProps {
  caracteristica: string;
}

export default function Caracteristica({ caracteristica }: CaracteristicaProps) {
  return (
    <Link
      href={`/caracteristicas/${encodeURIComponent(caracteristica)}`}
      className="block"
    >
      <li className="bg-slate-800 text-white px-4 py-2 rounded-lg shadow mb-2 hover:bg-slate-700 transition cursor-pointer">
        {caracteristica}
      </li>
    </Link>
  );
}