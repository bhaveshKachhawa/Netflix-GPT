import {useEffect} from 'react';
import { OPTIONS } from '../utils/constant';
import {useDispatch} from 'react-redux';
import { addPopularMovieList } from '../redux/movieSlice';

const usePopularMovies = () => {
    const dispatch = useDispatch();
    const fetchNowPlaying = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/popular', OPTIONS);
        const json = await data.json();
        dispatch(addPopularMovieList(json));
    }

    useEffect(() => fetchNowPlaying,[]);
}

export default usePopularMovies;