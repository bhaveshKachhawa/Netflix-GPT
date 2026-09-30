import { useEffect } from "react";
import { OPTIONS } from "../utils/constant";
import { useDispatch } from "react-redux";
import { addMovieTrailerKey } from "./../redux/movieSlice";

const pickTrailer = (videos = []) =>
  videos.find((v) => v.type === "Trailer" && /official/i.test(v.name || "")) ||
  videos.find((v) => v.type === "Trailer") ||
  videos.find((v) => v.type === "Teaser") ||
  videos[0];

const useMovieTrailer = (id) => {
  const dispatch = useDispatch();

  useEffect(() => {
    if (!id) return;

    const fetchMovieVideos = async () => {
      try {
        const response = await fetch(
          "https://api.themoviedb.org/3/movie/" + id + "/videos",
          OPTIONS
        );
        const data = await response.json();
        const trailer = pickTrailer(data.results);
        if (trailer?.key) dispatch(addMovieTrailerKey(trailer.key));
      } catch {
        // Keep the hero usable even if the trailer request fails.
      }
    };

    fetchMovieVideos();
  }, [id, dispatch]);
};

export default useMovieTrailer;
