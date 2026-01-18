import Header from './Header';
import useNowPlaying from './../hooks/useNowPlaying'
import MainContainer from './MainContainer';
import SecondaryContainer from './SecondaryContainer';
import useAiringToday from '../hooks/useAiringToday';
import useOnTheAir from '../hooks/useOnTheAir';
import usePopularMovies from '../hooks/usePopularMovies';
import useTopRatedMovies from '../hooks/useTopRatedMovies';
import useUpcomingMovies from '../hooks/useUpcomingMovies';
import GptSearch from './GptSearch';
import { useSelector } from 'react-redux';

const Browse = () => {
    const visibility = useSelector((store) => store.gpt.visibility);
    useNowPlaying();
    useAiringToday();
    useNowPlaying();
    useOnTheAir();
    usePopularMovies();
    useTopRatedMovies();
    useUpcomingMovies();

    return (
        <div>
            <Header />
            {visibility?<GptSearch />:<>
                        <MainContainer />
                        <SecondaryContainer />
            </>}
        </div>
    )
}

export default Browse;