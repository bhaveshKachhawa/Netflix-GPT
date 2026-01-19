import {useSelector} from 'react-redux';
import MovieList from './MovieList';

const SecondaryContainer = () => {
    const nowPlayingMoviesObj = useSelector(store => store.movie.nowPlayingMovies);
    const popularMoviesObj = useSelector(store => store.movie.popularMovies);
    const topRatedMoviesObj = useSelector(store => store.movie.topRatedMovies);
    const upcomingMoviesObj = useSelector(store => store.movie.upcomingMovies);
    const airingTodayObj = useSelector(store => store.movie.airingToday);
    const onTheAirObj = useSelector(store => store.movie.onTheAir);
    if(!nowPlayingMoviesObj || !popularMoviesObj || !topRatedMoviesObj 
        || !upcomingMoviesObj || !airingTodayObj || !onTheAirObj
    ) return;

    const nowPlayingMoviesList = nowPlayingMoviesObj.results;      
    const popularMoviesList = popularMoviesObj.results;
    const topRatedMoviesList = topRatedMoviesObj.results;
    const upcomingMoviesList = upcomingMoviesObj.results;
    const airingTodayList = airingTodayObj.results;
    const onTheAirList = onTheAirObj.results;

    return (
        <div className='relative z-50'>
            <div className='mt-35 md:-mt-86 bg-none relative'>
                <MovieList title={"Now Playing"} movieList={nowPlayingMoviesList}/>
            </div>
            <div className='bg-black'>
            <MovieList title={"Popular"} movieList={popularMoviesList}/>
            <MovieList title={"Top Rated"} movieList={topRatedMoviesList}/>
            <MovieList title={"Upcoming"} movieList={upcomingMoviesList}/>
            <MovieList title={"Airing Today"} movieList={airingTodayList}/>
            <MovieList title={"On The Air"} movieList={onTheAirList}/>
            </div>
        </div>
    );
}

export default SecondaryContainer;