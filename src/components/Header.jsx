import { Link, NavLink } from "react-router-dom";

export default function Header() {
  return (
    <header className="header">
      <Link to="/" className="logo">
        <span>🎬</span> CINEFLIX
      </Link>

      <nav>
        <NavLink to="/" end>Início</NavLink>
        <NavLink to="/filmes">Filmes</NavLink>
      </nav>

      <Link to="/filmes" className="header-search">
        🔎 <span>Pesquisar</span>
      </Link>
    </header>
  );
}