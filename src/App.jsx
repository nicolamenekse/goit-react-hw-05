import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import Navigation from "./components/Navigation/Navigation";
import MovieCast from "./components/MovieCast/MovieCast";
import MovieReviews from "./components/MovieReviews/MovieReviews";

const HomePage = lazy(() => import("./pages/Homepage/HomePage"));
const MoviesPage = lazy(() => import("./pages/MoviesPage/MoviesPage"));
const MovieDetailsPage = lazy(() =>
  import("./pages/MovieDetailsPage/MovieDetailsPage")
);
const NotFoundPage = lazy(()=>import("./pages/NotFoundPage/NotFoundPage"))
export default function App() {
  return (
    <>
    <nav><Navigation /></nav>
      
      <Suspense fallback={<div>Loadingggg....</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/movies" element={<MoviesPage />} />
          <Route path="/movies/:movieId" element={<MovieDetailsPage />}>
            <Route path="cast" element={<MovieCast />} />
            <Route path="reviews" element={<MovieReviews />} />
          </Route>
          <Route path="*" element={<NotFoundPage/>} />
        </Routes>
      </Suspense>
    </>
  );
}
