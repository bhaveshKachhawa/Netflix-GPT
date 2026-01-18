import {useEffect} from 'react';
import { OPTIONS } from '../utils/constant';
import {useDispatch} from 'react-redux';
import { addUpcomingMovieList } from '../redux/movieSlice';

const useUpcomingMovies = () => {
    const dispatch = useDispatch();
    const fetchNowPlaying = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/upcoming', OPTIONS);
        const json = await data.json();
        dispatch(addUpcomingMovieList(json));
    }

    useEffect(() => fetchNowPlaying,[]);
}

export default useUpcomingMovies;