import { categorias } from "../services/api";

export default function Categorias({ selecionada, onSelecionar }) {
  return (
    <div className="categories">
      {categorias.map((categoria) => (
        <button
          key={categoria}
          className={selecionada === categoria ? "active" : ""}
          onClick={() => onSelecionar(categoria)}
        >
          {categoria}
        </button>
      ))}
    </div>
  );
}