import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner";
import ListaFilmes from "../components/ListaFilmes";
import { carregarFilmesIniciais, buscarDetalhes } from "../services/api";

export default function Home() {
  const [filmes, setFilmes] = useState([]);
  const [destaque, setDestaque] = useState(null);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  useEffect(() => {
    async function carregar() {
      try {
        setCarregando(true);
        const lista = await carregarFilmesIniciais();
        setFilmes(lista);

        if (lista[0]) {
          try {
            const detalhes = await buscarDetalhes(lista[0].imdbID);
            setDestaque(detalhes);
          } catch {
            setDestaque(lista[0]);
          }
        }
      } catch (error) {
        setErro(error.message);
      } finally {
        setCarregando(false);
      }
    }

    carregar();
  }, []);

  return (
    <>
      {carregando ? (
        <div className="loading large">Carregando o Cineflix...</div>
      ) : erro ? (
        <div className="error-box">{erro}</div>
      ) : (
        <>
          <Banner filme={destaque} />

          <section className="intro section">
            <div>
              <span className="section-label">BEM-VINDO AO CINEFLIX</span>
              <h2>Seu próximo filme favorito está aqui.</h2>
            </div>
            <p>
              Explore filmes, descubra novas histórias e consulte informações
              como gênero, elenco, diretor e avaliação do IMDb.
            </p>
            <Link to="/filmes" className="secondary-button">
              Explorar catálogo
            </Link>
          </section>

          <section className="section">
            <div className="section-heading">
              <div>
                <span className="section-label">RECOMENDADOS</span>
                <h2>🍿 Filmes em destaque</h2>
              </div>
              <Link to="/filmes">Ver catálogo →</Link>
            </div>

            <ListaFilmes filmes={filmes} />
          </section>
        </>
      )}
    </>
  );
}