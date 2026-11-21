import { Link } from "react-router-dom";

export default function Banner({ filme }) {
  if (!filme) return null;

  const poster = filme.Poster && filme.Poster !== "N/A" ? filme.Poster : "";

  return (
    <section
      className="hero"
      style={poster ? { backgroundImage: `url(${poster})` } : undefined}
    >
      <div className="hero-overlay">
        <div className="hero-content">
          <span className="eyebrow">DESTAQUE DA SEMANA</span>
          <h1>{filme.Title}</h1>
          <p>
            {filme.Plot && filme.Plot !== "N/A"
              ? filme.Plot
              : "Descubra informações, avaliações e detalhes deste filme no Cineflix."}
          </p>

          <div className="hero-rating">
            ⭐ {filme.imdbRating && filme.imdbRating !== "N/A"
              ? `${filme.imdbRating} / 10 IMDb`
              : "Avaliação IMDb indisponível"}
          </div>

          <Link to={`/filme/${filme.imdbID}`} className="primary-button">
            Ver detalhes →
          </Link>
        </div>
      </div>
    </section>
  );
}