import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Pesquisa from "../components/Pesquisa";
import Categorias from "../components/Categorias";
import ListaFilmes from "../components/ListaFilmes";
import {
  buscarFilmes,
  buscarDetalhes,
  carregarFilmesIniciais,
  correspondeCategoria
} from "../services/api";

async function adicionarDetalhes(lista) {
  const resultados = await Promise.all(
    lista.map(async (filme) => {
      try {
        return await buscarDetalhes(filme.imdbID);
      } catch {
        return filme;
      }
    })
  );

  return resultados;
}

export default function Catalogo() {
  const [searchParams, setSearchParams] = useSearchParams();
  const buscaInicial = searchParams.get("q") || "";

  const [filmes, setFilmes] = useState([]);
  const [categoria, setCategoria] = useState("Todos");
  const [pagina, setPagina] = useState(1);
  const [totalResultados, setTotalResultados] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState("");

  async function carregarCatalogo(termo = buscaInicial, page = 1) {
    try {
      setCarregando(true);
      setErro("");

      if (!termo) {
        const lista = await carregarFilmesIniciais();
        const listaComDetalhes = await adicionarDetalhes(lista);
        setFilmes(listaComDetalhes);
        setTotalResultados(listaComDetalhes.length);
        return;
      }

      const data = await buscarFilmes(termo, page);
      const resultados = data.Search || [];
      const resultadosComDetalhes = await adicionarDetalhes(resultados);

      setFilmes(resultadosComDetalhes);
      setTotalResultados(Number(data.totalResults) || resultados.length);
    } catch (error) {
      setFilmes([]);
      setTotalResultados(0);
      setErro(error.message);
    } finally {
      setCarregando(false);
    }
  }

  useEffect(() => {
    carregarCatalogo(buscaInicial, pagina);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [buscaInicial, pagina]);

  function pesquisar(termo) {
    setPagina(1);
    setCategoria("Todos");
    setSearchParams({ q: termo });
  }

  function mudarCategoria(novaCategoria) {
    setCategoria(novaCategoria);
    setPagina(1);
  }

  const filmesFiltrados = filmes.filter((filme) =>
    correspondeCategoria(filme, categoria)
  );

  const podeVoltar = pagina > 1;
  const podeAvancar = buscaInicial && pagina < Math.ceil(totalResultados / 10);

  return (
    <section className="section catalog-page">
      <div className="catalog-title">
        <span className="section-label">CATÁLOGO</span>
        <h1>Encontre seu próximo filme</h1>
        <p>Pesquise por título ou explore nossas categorias.</p>
      </div>

      <Pesquisa onPesquisar={pesquisar} valorInicial={buscaInicial} />

      <div className="category-area">
        <h3>Explore por categorias</h3>
        <Categorias selecionada={categoria} onSelecionar={mudarCategoria} />
      </div>

      {carregando ? (
        <div className="loading">Buscando filmes...</div>
      ) : erro ? (
        <div className="error-box">
          <strong>Ops!</strong>
          <span>{erro}</span>
          <small>
            Confira se sua API Key está configurada em{" "}
            <code>src/services/api.js</code>.
          </small>
        </div>
      ) : (
        <>
          {buscaInicial && (
            <p className="results-info">
              Resultados para <strong>"{buscaInicial}"</strong>
              {totalResultados ? ` — ${totalResultados} encontrados` : ""}
            </p>
          )}

          {filmesFiltrados.length > 0 ? (
            <ListaFilmes filmes={filmesFiltrados} />
          ) : (
            <div className="empty-box">
              <strong>Nenhum filme encontrado nessa categoria.</strong>
              <span>Experimente outra categoria ou pesquise outro título.</span>
            </div>
          )}

          {buscaInicial && totalResultados > 10 && (
            <div className="pagination">
              <button
                disabled={!podeVoltar}
                onClick={() => setPagina((p) => p - 1)}
              >
                ← Anterior
              </button>

              <span>Página {pagina}</span>

              <button
                disabled={!podeAvancar}
                onClick={() => setPagina((p) => p + 1)}
              >
                Próxima →
              </button>
            </div>
          )}
        </>
      )}
    </section>
  );
}
