// COLOQUE SUA API KEY DA OMDb ENTRE AS ASPAS ABAIXO.
export const API_KEY = "7b123e1c";
export const BASE_URL = "https://www.omdbapi.com/";

const pesquisasIniciais = [
  "Interstellar",
  "Avatar",
  "The Dark Knight",
  "Oppenheimer",
  "Joker",
  "The Matrix",
  "Avengers",
  "Spider-Man"
];

async function requisicao(params) {
  const query = new URLSearchParams({ apikey: API_KEY, ...params });
  const response = await fetch(`${BASE_URL}?${query.toString()}`);

  if (!response.ok) {
    throw new Error("Não foi possível conectar à OMDb.");
  }

  return response.json();
}

export async function buscarFilmes(termo, pagina = 1) {
  const data = await requisicao({
    s: termo,
    page: String(pagina)
  });

  if (data.Response === "False") {
    // A pesquisa por título exato é um fallback útil para títulos
    // que a busca geral da OMDb não encontra.
    const exato = await requisicao({ t: termo, plot: "short" });
    if (exato.Response === "True" && exato.Type === "movie") {
      return {
        Search: [exato],
        totalResults: "1",
        Response: "True"
      };
    }

    throw new Error(data.Error || "Nenhum filme encontrado.");
  }

  return data;
}

export async function buscarDetalhes(id) {
  const data = await requisicao({ i: id, plot: "full" });

  if (data.Response === "False") {
    throw new Error(data.Error || "Filme não encontrado.");
  }

  return data;
}

export async function carregarFilmesIniciais() {
  const resultados = await Promise.all(
    pesquisasIniciais.map(async (titulo) => {
      try {
        const data = await buscarFilmes(titulo, 1);
        return data.Search?.[0] || null;
      } catch {
        return null;
      }
    })
  );

  return resultados.filter(Boolean);
}

export const categorias = [
  "Todos",
  "Ação",
  "Aventura",
  "Comédia",
  "Drama",
  "Terror",
  "Ficção científica"
];

export function correspondeCategoria(filme, categoria) {
  if (categoria === "Todos") return true;

  const mapa = {
    "Ação": ["Action"],
    "Aventura": ["Adventure"],
    "Comédia": ["Comedy"],
    "Drama": ["Drama"],
    "Terror": ["Horror"],
    "Ficção científica": ["Sci-Fi"]
  };

  return mapa[categoria]?.some((genero) =>
    filme.Genre?.split(",").map((item) => item.trim()).includes(genero)
  ) || false;
}
