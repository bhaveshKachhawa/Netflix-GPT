import { useSelector } from "react-redux";
import MovieList from "./MovieList";

const SecondaryContainer = () => {
  const nowPlayingMoviesList = useSelector(
    (store) => store.movie.nowPlayingMovies?.results
  );
  const popularMoviesList = useSelector(
    (store) => store.movie.popularMovies?.results
  );
  const topRatedMoviesList = useSelector(
    (store) => store.movie.topRatedMovies?.results
  );
  const upcomingMoviesList = useSelector(
    (store) => store.movie.upcomingMovies?.results
  );
  const airingTodayList = useSelector(
    (store) => store.movie.airingToday?.results
  );
  const onTheAirList = useSelector((store) => store.movie.onTheAir?.results);

  if (!nowPlayingMoviesList) return null;

  return (
    <div className="relative z-20 bg-linear-to-b from-transparent to-[#141414] pb-10 md:-mt-28">
      <MovieList title="Now Playing" movieList={nowPlayingMoviesList} />
      <div className="bg-[#141414]">
        <MovieList title="Popular" movieList={popularMoviesList} />
        <MovieList title="Top Rated" movieList={topRatedMoviesList} />
        <MovieList title="Upcoming" movieList={upcomingMoviesList} />
        <MovieList
          title="Airing Today"
          movieList={airingTodayList}
          mediaType="tv"
        />
        <MovieList title="On The Air" movieList={onTheAirList} mediaType="tv" />
      </div>
    </div>
  );
};

export default SecondaryContainer;
