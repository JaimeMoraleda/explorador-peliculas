
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const API_URL = "https://api.themoviedb.org/3";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const controller = new AbortController();

    async function loadMovies() {
      setLoading(true);
      setError("");

      try {
        const endpoint = search.trim()
          ? `${API_URL}/search/movie?query=${encodeURIComponent(search.trim())}&language=es-ES`
          : `${API_URL}/movie/popular?language=es-ES`;

        const separator = endpoint.includes("?") ? "&" : "?";
        const url = `${endpoint}${separator}api_key=${API_KEY}`;

        const response = await fetch(url, {
        signal: controller.signal,
        });

        if (!response.ok) {
          const details = await response.text();
          console.error("Error de TMDB:", response.status, details);
          throw new Error(`Error de TMDB (${response.status}). Revisa la consola.`);
        }

        const data = await response.json();
        setMovies(data.results || []);
      } catch (err) {
        if (err.name !== "AbortError") {
          setError(err.message || "Ha ocurrido un error.");
        }
      } finally {
        if (!controller.signal.aborted) setLoading(false);
      }
    }

    const timeout = setTimeout(loadMovies, search.trim() ? 400 : 0);

    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [search]);

  return (
    <main className="container">
      <h1>Explora el mundo del cine</h1>
      <p>Descubre películas populares y encuentra tu próxima favorita.</p>

      <input
        className="search-input"
        type="search"
        placeholder="Buscar películas por título..."
        value={search}
        onChange={(event) => setSearch(event.target.value)}
      />

      {loading && <p role="status">Cargando películas...</p>}
      {error && <p role="alert" className="error">{error}</p>}

      {!loading && !error && movies.length === 0 && (
        <p>No se encontraron películas.</p>
      )}

      <section className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </section>
    </main>
  );
}
