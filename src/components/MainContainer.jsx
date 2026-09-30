import { useSelector } from "react-redux";
import VideoBackground from "./VideoBackground";
import VideoTitle from "./VideoTitle";

const MainContainer = () => {
  const movieList = useSelector((store) => store.movie.nowPlayingMovies);
  if (!movieList?.results?.length) return null;

  const mainMovie = movieList.results[0];

  return (
    <div className="relative bg-black">
      <VideoTitle movie={mainMovie} />
      <VideoBackground id={mainMovie.id} />
    </div>
  );
};

export default MainContainer;
