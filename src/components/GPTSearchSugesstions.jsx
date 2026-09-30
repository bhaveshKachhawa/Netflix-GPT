import { useSelector } from "react-redux";
import MovieList from "./MovieList";
import ShimmerGPTSearch from "../shimmerUI/ShimmerGPTSearch";

const GPTSearchSugesstions = () => {
  const { movies, names, shimmerVisibility } = useSelector((store) => store.gpt);

  if (shimmerVisibility && !movies) return <ShimmerGPTSearch />;
  if (!movies) return null;

  return (
    <div className="relative z-50 mx-4 mb-16 mt-6 rounded-xl bg-black/85 py-4 md:mx-8">
      {names.map((movieName, index) => (
        <MovieList
          key={movieName}
          title={movieName}
          movieList={movies[index]}
        />
      ))}
    </div>
  );
};

export default GPTSearchSugesstions;
