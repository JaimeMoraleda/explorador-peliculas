
import { Link, NavLink } from "react-router-dom";

export default function NavBar() {
  return (
    <nav className="navbar">
      <Link to="/" className="logo">
        CineExplora
      </Link>

      <div className="nav-links">
        <NavLink to="/">Inicio</NavLink>
        <NavLink to="/favoritos">Favoritos</NavLink>
      </div>
    </nav>
  );
}
