import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from "./MovieCast.module.css";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieCast() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [cast, setCast] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    const fetchCast = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/credits?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDBmZjNiMWVjZmRiZGNmMDk2ZjQ5ZmFlNmJjMDJlNCIsIm5iZiI6MTc0Mzg5MDEyNy4yNzEwMDAxLCJzdWIiOiI2N2YxYTZjZmVkZGVjMjhiMDNhZDM1ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.z_WD4dQz2ty7Xoh-Gll_cIg-ZL8nGukQfzqZJsQGaps",
            },
          }
        );
        setCast(response.data.cast);
      } catch (err) {
        setError("Hat vaaar", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCast();
  }, [movieId]);

  return (
    <div className={css.movieCastContainer}>
      {loading && <div>Loadinggg....</div>}
      {error && <div> {error} </div>}

      <ul>
        {cast.map((actor) => (
          <li key={actor.cast_id}>
            <img
              src={`${IMAGE_BASE_URL}${actor.profile_path}`}
              alt={actor.name}
            />
            <p>
              {" "}
              <strong> {actor.name} </strong>{" "}
            </p>
            <p>
              {" "}
              <strong>Character :</strong> {actor.character}{" "}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
}
