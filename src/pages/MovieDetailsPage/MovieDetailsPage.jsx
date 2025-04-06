import React, { useEffect, useRef, useState } from "react";
import { useLocation, Link } from "react-router-dom";
import axios from "axios";
import { Outlet, useParams } from "react-router";
import css from "./MovieDetailsPage.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieDetailsPage() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [movieDetails, setMovieDetails] = useState([]);

  const { movieId } = useParams();
  const location = useLocation();
  const backLinkRef = useRef(location.state ? location.state.from : "/");
  useEffect(() => {
    setError(null);
    setLoading(true);
    const fetchMovieDetails = async () => {
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDBmZjNiMWVjZmRiZGNmMDk2ZjQ5ZmFlNmJjMDJlNCIsIm5iZiI6MTc0Mzg5MDEyNy4yNzEwMDAxLCJzdWIiOiI2N2YxYTZjZmVkZGVjMjhiMDNhZDM1ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.z_WD4dQz2ty7Xoh-Gll_cIg-ZL8nGukQfzqZJsQGaps",
            },
          }
        );
        setMovieDetails(response.data);
      } catch (err) {
        setError("Hata vaar", err);
      } finally {
        setLoading(false);
      }
    };
    fetchMovieDetails();
    console.log(movieDetails);
  }, [movieId]);
  return (
    <>
      <div>
        {error && <div> {error} </div>}
        {loading && <div> Loadinggg..... </div>}
        <Link to={backLinkRef.current} className={css.backLink} >Geri Dön</Link>
        <div className={css.movieDetailsPageContainer}>
          <div className={css.imgContainer}>
            <img
              src={`${IMAGE_BASE_URL}${movieDetails.poster_path}`}
              alt={movieDetails.title}
            />
          </div>
          <div className={css.textContainer}>
            <h2>
              {movieDetails.title} ({movieDetails.release_date}){" "}
            </h2>
            <p> User Score: {movieDetails.popularity} </p>

            <p className={css.overview}>
              <strong>Overview:</strong> {movieDetails.overview}
            </p>

            <p>
              <strong>Genres :</strong>{" "}
              {movieDetails.genres?.map((genre) => genre.name)}{" "}
            </p>

          </div>
        </div>
        <div className={css.linkContainer}>
          <ul>
            <li>
              <Link to="cast">Cast</Link>
            </li>
            <li>
              <Link to="reviews">Reviews</Link>
            </li>
          </ul>
        </div>
      </div>
      <Outlet />
    </>
  );
}
