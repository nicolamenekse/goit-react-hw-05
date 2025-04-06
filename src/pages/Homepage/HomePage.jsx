import React, { useEffect, useState } from "react";
import axios from "axios";
import MovieList from "../../components/MovieList/MovieList";
import { Link } from "react-router-dom";
import css from "./HomePage.module.css";

export default function HomePage() {
  const [trandingMovies, setTrandingMovies] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchTrandingMovies = async () => {
      try {
        const response = await axios.get(
          "https://api.themoviedb.org/3/trending/movie/day?language=en-US",
          {
            headers: {
              Authorization:
                " Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDBmZjNiMWVjZmRiZGNmMDk2ZjQ5ZmFlNmJjMDJlNCIsIm5iZiI6MTc0Mzg5MDEyNy4yNzEwMDAxLCJzdWIiOiI2N2YxYTZjZmVkZGVjMjhiMDNhZDM1ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.z_WD4dQz2ty7Xoh-Gll_cIg-ZL8nGukQfzqZJsQGaps",
            },
          }
        );
        setTrandingMovies(response.data.results);
      } catch (err) {
        setError("Veriyi cekerken bir hata olustu", err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrandingMovies();
    console.log(trandingMovies);
  }, []);

  return (
    <div className={css.homePageContainer}>
      {loading && <div>Loadingg.....</div>}
      {error && <p>{error}</p>}
      <h1 className={css.trandingMoviesTitle}>Trending Movies</h1>

      {console.log(trandingMovies)}
      <ul>
        {trandingMovies.map((trend) => (
          <Link to={`/movies/${trend.id}`}>
            <li key={trend.id}>{trend.title}</li>{" "}
          </Link>
        ))}
      </ul>
      {/* 
      {trandingMovies.length > 0 && (
        <MovieList trandingMovies={trandingMovies} />
      )} */}
    </div>
  );
}
