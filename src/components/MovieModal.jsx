import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { OPTIONS, POSTER_URL } from "../utils/constant";
import { setSelectedMovie } from "../redux/movieSlice";

const pickTrailer = (videos = []) =>
  videos.find((v) => v.type === "Trailer" && /official/i.test(v.name || "")) ||
  videos.find((v) => v.type === "Trailer") ||
  videos.find((v) => v.type === "Teaser") ||
  videos[0];

const MovieModal = () => {
  const dispatch = useDispatch();
  const movie = useSelector((store) => store.movie.selectedMovie);
  const [trailerKey, setTrailerKey] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!movie?.id) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event) => {
      if (event.key === "Escape") dispatch(setSelectedMovie(null));
    };
    window.addEventListener("keydown", onKeyDown);

    const fetchTrailer = async () => {
      setLoading(true);
      setTrailerKey(null);
      try {
        const path = movie.mediaType === "tv" ? "tv" : "movie";
        const response = await fetch(
          `https://api.themoviedb.org/3/${path}/${movie.id}/videos`,
          OPTIONS
        );
        const data = await response.json();
        const trailer = pickTrailer(data.results);
        setTrailerKey(trailer?.key || null);
      } catch {
        setTrailerKey(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrailer();

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [movie, dispatch]);

  if (!movie) return null;

  const title = movie.title || movie.original_title || movie.name || movie.original_name;
  const year = (movie.release_date || movie.first_air_date || "").slice(0, 4);
  const rating = movie.vote_average ? Number(movie.vote_average).toFixed(1) : null;

  return (
    <div
      className="fixed inset-0 z-[200] flex items-end justify-center bg-black/80 p-0 md:items-center md:p-8"
      onClick={() => dispatch(setSelectedMovie(null))}
    >
      <div
        className="relative max-h-[95vh] w-full max-w-3xl overflow-y-auto rounded-t-2xl bg-[#181818] shadow-2xl md:rounded-2xl"
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type="button"
          aria-label="Close"
          className="absolute right-3 top-3 z-10 flex h-9 w-9 items-center justify-center rounded-full bg-black/70 text-xl text-white hover:bg-black"
          onClick={() => dispatch(setSelectedMovie(null))}
        >
          ×
        </button>

        <div className="relative aspect-video w-full bg-black">
          {trailerKey ? (
            <iframe
              className="h-full w-full"
              src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=0&rel=0`}
              title={`${title} trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              {movie.poster_path && (
                <img
                  src={POSTER_URL + movie.poster_path}
                  alt={title}
                  className="h-full w-full object-cover opacity-60"
                />
              )}
              <p className="absolute text-sm text-neutral-300">
                {loading ? "Loading trailer…" : "Trailer unavailable"}
              </p>
            </div>
          )}
        </div>

        <div className="space-y-3 px-5 py-5 md:px-8">
          <h2 className="text-2xl font-bold md:text-3xl">{title}</h2>
          <div className="flex flex-wrap gap-3 text-sm text-neutral-300">
            {year && <span>{year}</span>}
            {rating && (
              <span className="rounded border border-green-500/40 px-2 py-0.5 text-green-400">
                {rating} rating
              </span>
            )}
            <span className="uppercase tracking-wide text-neutral-500">
              {movie.mediaType === "tv" ? "TV" : "Movie"}
            </span>
          </div>
          <p className="text-sm leading-relaxed text-neutral-200 md:text-base">
            {movie.overview || "No overview available."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default MovieModal;
