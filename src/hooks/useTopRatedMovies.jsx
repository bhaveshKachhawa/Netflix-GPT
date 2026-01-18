import {useEffect} from 'react';
import { OPTIONS } from '../utils/constant';
import {useDispatch} from 'react-redux';
import { addTopRatedMovieList } from '../redux/movieSlice';

const useTopRatedMovies = () => {
    const dispatch = useDispatch();
    const fetchNowPlaying = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/top_rated', OPTIONS);
        const json = await data.json();
        dispatch(addTopRatedMovieList(json));
    }

    useEffect(() => fetchNowPlaying,[]);
}

export default useTopRatedMovies;