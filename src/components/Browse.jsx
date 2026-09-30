import Header from "./Header";
import Footer from "./Footer";
import MovieModal from "./MovieModal";
import useNowPlaying from "./../hooks/useNowPlaying";
import MainContainer from "./MainContainer";
import SecondaryContainer from "./SecondaryContainer";
import useAiringToday from "../hooks/useAiringToday";
import useOnTheAir from "../hooks/useOnTheAir";
import usePopularMovies from "../hooks/usePopularMovies";
import useTopRatedMovies from "../hooks/useTopRatedMovies";
import useUpcomingMovies from "../hooks/useUpcomingMovies";
import GptSearch from "./GptSearch";
import ShimmerMovieList from "../shimmerUI/ShimmerMovieList";
import { useSelector } from "react-redux";

const Browse = () => {
  const visibility = useSelector((store) => store.gpt.visibility);
  const nowPlayingMovies = useSelector((store) => store.movie.nowPlayingMovies);

  useNowPlaying();
  useAiringToday();
  useOnTheAir();
  usePopularMovies();
  useTopRatedMovies();
  useUpcomingMovies();

  return (
    <div className="min-h-screen bg-[#141414]">
      <Header />
      {visibility ? (
        <GptSearch />
      ) : (
        <>
          <MainContainer />
          {nowPlayingMovies ? <SecondaryContainer /> : <ShimmerMovieList />}
        </>
      )}
      {!visibility && <Footer />}
      <MovieModal />
    </div>
  );
};

export default Browse;
