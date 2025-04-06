import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import css from './MovieReviews.module.css'


const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
export default function MovieReviews() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [reviews, setReviews] = useState([]);
  const { movieId } = useParams();

  useEffect(() => {
    

    const fetchReviews = async () => {
      setLoading(true);
      setError(null)
      try {
        const response = await axios.get(
          `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US`,
          {
            headers: {
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI1ZDBmZjNiMWVjZmRiZGNmMDk2ZjQ5ZmFlNmJjMDJlNCIsIm5iZiI6MTc0Mzg5MDEyNy4yNzEwMDAxLCJzdWIiOiI2N2YxYTZjZmVkZGVjMjhiMDNhZDM1ZDgiLCJzY29wZXMiOlsiYXBpX3JlYWQiXSwidmVyc2lvbiI6MX0.z_WD4dQz2ty7Xoh-Gll_cIg-ZL8nGukQfzqZJsQGaps",
            },
          }
        );
        setReviews(response.data.results);
      } catch (err) {
        setError("Yorum Bulunamadı", err);
      } finally {
        setLoading(false);
      }
    };
    fetchReviews();
  }, [movieId]);
  return (
    <div>
      { loading && <div>Loading ......</div> }
      {error && <div> {error} </div> }
      {reviews.length > 0 ? (
        reviews.map((review) => (
          <div className={css.movieReviewsContainer} key={review.id}>
            <p> <strong>Author : </strong>{review.author} </p>
            <p> {review.content} </p>
          </div>
        ))
      ) : (
        <h4>We don't have any reviews for this movie</h4>
      )}
    </div>
  );
}
