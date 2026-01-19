import {useEffect} from 'react';
import { OPTIONS } from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import { addOnTheAirList } from '../redux/movieSlice';

const useOnTheAir = () => {
    const dispatch = useDispatch();
    const {onTheAir} = useSelector(store => store.movie);
    const fetchNowPlaying = async() => {
        const data = await fetch('https://api.themoviedb.org/3/tv/on_the_air', OPTIONS);
        const json = await data.json();
        dispatch(addOnTheAirList(json));
    }

    useEffect(() => {!onTheAir && fetchNowPlaying()},[]);
}

export default useOnTheAir;