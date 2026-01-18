import {useSelector} from 'react-redux';
import VideoBackground from './VideoBackground';
import VideoTitle from './VideoTitle';

const MainContainer = () => {
    const movieList = useSelector(store => store.movie.nowPlayingMovies);
    if(!movieList) return;
    const mainMovie = movieList.results[1];
    const {original_title, overview, id} = mainMovie;
    return (
        <div>
            <VideoTitle title={original_title} overview={overview}/>
            <VideoBackground id={id}/>
        </div>
    );
}

export default MainContainer;