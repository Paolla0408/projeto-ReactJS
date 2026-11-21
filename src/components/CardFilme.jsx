import { Link } from "react-router-dom";

export default function CardFilme({ filme }) {
  const posterValido = filme.Poster && filme.Poster !== "N/A";

  return (
    <article className="movie-card">
      <Link to={`/filme/${filme.imdbID}`} className="poster-link">
        {posterValido ? (
          <img src={filme.Poster} alt={`Pôster de ${filme.Title}`} />
        ) : (
          <div className="poster-placeholder">🎬</div>
        )}
      </Link>

      <div className="movie-info">
        <h3>{filme.Title}</h3>
        <div className="movie-meta">
          <span>{filme.Year}</span>
          {filme.imdbRating && filme.imdbRating !== "N/A" && (
            <span>⭐ {filme.imdbRating}</span>
          )}
        </div>
        <Link className="details-link" to={`/filme/${filme.imdbID}`}>
          Ver detalhes →
        </Link>
      </div>
    </article>
  );
}