import { useState } from "react";

export default function Pesquisa({ onPesquisar, valorInicial = "" }) {
  const [termo, setTermo] = useState(valorInicial);

  function enviar(event) {
    event.preventDefault();
    const valor = termo.trim();
    if (valor) onPesquisar(valor);
  }

  return (
    <form className="search-form" onSubmit={enviar}>
      <input
        type="search"
        value={termo}
        onChange={(event) => setTermo(event.target.value)}
        placeholder="Digite o nome de um filme..."
        aria-label="Pesquisar filmes"
      />
      <button type="submit">Pesquisar</button>
    </form>
  );
}