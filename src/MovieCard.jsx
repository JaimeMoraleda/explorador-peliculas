
import { useMovies } from "./MovieContext";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

export default function MovieCard({ movie }) {
  const { favorites, toggleFavorite } = useMovies();

  const isFavorite = favorites.some((item) => item.id === movie.id);

  return (
    <article className="movie-card">
      {movie.poster_path ? (
        <img
          src={`${IMAGE_BASE}${movie.poster_path}`}
          alt={`Cartel de ${movie.title}`}
        />
      ) : (
        <div className="no-poster">Sin cartel</div>
      )}

      <div className="movie-info">
        <h3>{movie.title}</h3>
        <p>
          {movie.release_date
            ? movie.release_date.slice(0, 4)
            : "Año desconocido"}
        </p>
        <p>⭐ {movie.vote_average?.toFixed(1) ?? "Sin nota"}</p>

        <button onClick={() => toggleFavorite(movie)}>
          {isFavorite ? "♥ Quitar de favoritos" : "♡ Añadir a favoritos"}
        </button>
      </div>
    </article>
  );
}
