import React from "react";
import { Link, useLocation } from "react-router-dom";
import css from './MovieList.module.css'

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieList({ trandingMovies }) {
  const location = useLocation();

  return (
    <div className={css.movieListContainer}>
      <ul>
        {trandingMovies.map((movie) => (
          <li key={movie.id}>
            <Link to={`/movies/${movie.id}`} state={{ from: location }}>
              {movie.poster_path ? (
                <img
                  src={`${IMAGE_BASE_URL}${movie.poster_path}`}
                  alt={movie.title}
                  width="200"
                />
              ) : (
                <p>Poster yok</p>
              )}
              <h1> {movie.title} </h1>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );

}

