import {useEffect} from 'react';
import { OPTIONS } from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import { addMovieList } from '../redux/movieSlice';

const useNowPlaying = () => {
    const dispatch = useDispatch();
    const {nowPlayingMovies} = useSelector(store => store.movie);
    const fetchNowPlaying = async() => {
        const data = await fetch('https://api.themoviedb.org/3/movie/now_playing', OPTIONS);
        const json = await data.json();
        dispatch(addMovieList(json));
    }

    useEffect(() => {!nowPlayingMovies && fetchNowPlaying()},[]);
}

export default useNowPlaying;