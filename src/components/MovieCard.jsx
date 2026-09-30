import { useDispatch } from "react-redux";
import { POSTER_URL } from "./../utils/constant";
import { setSelectedMovie } from "../redux/movieSlice";

const MovieCard = ({ movie, mediaType = "movie" }) => {
  const dispatch = useDispatch();
  if (!movie?.poster_path) return null;

  const title = movie.title || movie.original_title || movie.name || movie.original_name;

  return (
    <button
      type="button"
      className="w-28 shrink-0 text-left md:w-40"
      onClick={() => dispatch(setSelectedMovie({ ...movie, mediaType }))}
    >
      <div className="overflow-hidden rounded-md">
        <img
          className="aspect-[2/3] w-full object-cover transition duration-300 hover:scale-110 hover:brightness-90"
          src={POSTER_URL + movie.poster_path}
          alt={title}
          loading="lazy"
        />
      </div>
      <p className="mt-2 line-clamp-2 text-xs text-neutral-200 md:text-sm">{title}</p>
    </button>
  );
};

export default MovieCard;
