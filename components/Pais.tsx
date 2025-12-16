type Country = {
  name: {common: string};
  area: number;
  population: number;
};

export default function Pais({pais}: {pais: Country}) {
  return(
    <div className="border rounded p-4 flex items-center justify-between">
      <div>
        <p className="font-semibold">{pais.name.common}</p>
        <p className="text-sm opacity-80">Área: {pais.area}</p>
        <p className="text-sm opacity-80">População: {pais.population}</p>
      </div>
    </div>
  );
}