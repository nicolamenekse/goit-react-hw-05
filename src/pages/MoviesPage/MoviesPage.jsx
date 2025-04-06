import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import MovieList from "../../components/MovieList/MovieList";
import axios from "axios";
import css from './MoviesPage.module.css'

export default function MoviesPage() {
  const [movies, setMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("query");

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = e.target;
    const inputValue = form.elements.query.value.trim();
    setSearchParams({ query: inputValue });
    form.reset();
  };

  useEffect(() => {
    if (!query) return;

    const fetchMovies = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/search/movie?query=${query}&include_adult=false&language=en-US`,
          {
            headers: {
              Authorization:
                " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDBmZjNiMWVjZmRiZGNmMDk2ZjQ5ZmFlNmJjMDJlNCIsIm5iZiI6MTc0Mzg5MDEyNy4yNzEwMDAxLCJzdWIiOiI2N2YxYTZjZmVkZGVjMjhiMDNhZDM1ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.z_WD4dQz2ty7Xoh-Gll_cIg-ZL8nGukQfzqZJsQGaps",
            },
          }
        );
        setMovies(response.data.results);
      } catch (err) {
        console.log("Hata var", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [query]);

  return (
    <div className={css.moviesPageContainer}>
      {loading && <div>Loadinggg.....</div>}
      {error && <div> {error} </div>}
      <h1>Search Movies</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="query"
          placeholder="Which film maan?"
          defaultValue={query}
        />
        <button type="submit">Search</button>
      </form>
      {movies.length > 0 && <MovieList trandingMovies={movies} />}
    </div>
  );
}
