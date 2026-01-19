import {useEffect} from 'react';
import { OPTIONS } from '../utils/constant';
import {useDispatch, useSelector} from 'react-redux';
import { addAiringTodayList } from '../redux/movieSlice';

const useAiringToday = () => {
    const dispatch = useDispatch();
    const {airingToday} = useSelector((store) => store.movie);
    const fetchNowPlaying = async() => {
        const data = await fetch('https://api.themoviedb.org/3/tv/airing_today', OPTIONS);
        const json = await data.json();
        dispatch(addAiringTodayList(json));
    }

    useEffect(() => {!airingToday && fetchNowPlaying()},[]);
}

export default useAiringToday;