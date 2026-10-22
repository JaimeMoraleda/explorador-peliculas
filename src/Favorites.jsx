
import { Link } from "react-router-dom";
import MovieCard from "./MovieCard";
import { useMovies } from "./MovieContext";

export default function Favorites() {
  const { favorites } = useMovies();

  return (
    <main className="container">
      <h1>Mis películas favoritas</h1>

      {favorites.length === 0 ? (
        <p>
          Todavía no tienes favoritos.{" "}
          <Link to="/">Explora las películas</Link> para añadir alguna.
        </p>
      ) : (
        <section className="movie-grid">
          {favorites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </section>
      )}
    </main>
  );
}
