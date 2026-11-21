import CardFilme from "./CardFilme";

export default function ListaFilmes({ filmes }) {
  if (!filmes.length) {
    return <p className="empty-message">Nenhum filme encontrado.</p>;
  }

  return (
    <div className="movie-grid">
      {filmes.map((filme) => (
        <CardFilme key={filme.imdbID} filme={filme} />
      ))}
    </div>
  );
}