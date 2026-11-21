import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { buscarDetalhes } from "../services/api";

export default function Detalhes() {
  const { id } = useParams();
  const [filme, setFilme] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        setErro("");
        const data = await buscarDetalhes(id);
        setFilme(data);
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, [id]);

  if (carregando) {
    return <div className="loading large">Carregando detalhes...</div>;
  }

  if (erro) {
    return (
      <section className="section">
        <div className="error-box">{erro}</div>
        <Link to="/filmes" className="secondary-button">Voltar ao catálogo</Link>
      </section>
    );
  }

  const poster = filme.Poster && filme.Poster !== "N/A" ? filme.Poster : null;

  return (
    <section className="section details-page">
      <Link to="/filmes" className="back-link">← Voltar para o catálogo</Link>

      <div className="details">
        <div className="details-poster">
          {poster ? (
            <img src={poster} alt={`Pôster de ${filme.Title}`} />
          ) : (
            <div className="poster-placeholder big">🎬</div>
          )}
        </div>

        <div className="details-content">
          <span className="section-label">DETALHES DO FILME</span>
          <h1>{filme.Title}</h1>

          <div className="details-rating">
            ⭐ {filme.imdbRating !== "N/A" ? filme.imdbRating : "N/A"}
            <small>/ 10 IMDb</small>
          </div>

          <div className="chips">
            <span>{filme.Year}</span>
            <span>{filme.Runtime}</span>
            <span>{filme.Rated}</span>
          </div>

          <p className="plot">
            {filme.Plot !== "N/A" ? filme.Plot : "Sinopse não disponível."}
          </p>

          <div className="details-list">
            <p><strong>🎭 Gênero:</strong> {filme.Genre}</p>
            <p><strong>🎬 Diretor:</strong> {filme.Director}</p>
            <p><strong>👥 Elenco:</strong> {filme.Actors}</p>
            <p><strong>📅 Lançamento:</strong> {filme.Released}</p>
            <p><strong>🌎 País:</strong> {filme.Country}</p>
            <p><strong>⭐ Avaliações:</strong> {filme.imdbVotes}</p>
          </div>

          <a
            className="imdb-button"
            href={`https://www.imdb.com/title/${filme.imdbID}/`}
            target="_blank"
            rel="noreferrer"
          >
            Ver no IMDb ↗
          </a>
        </div>
      </div>
    </section>
  );
}