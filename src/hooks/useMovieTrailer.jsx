import { useEffect } from "react";
import { OPTIONS } from "../utils/constant";
import { useDispatch, useSelector } from "react-redux";
import {addMovieTrailerKey} from './../redux/movieSlice'

const useMovieTrailer = (id) => {
       const dispatch = useDispatch();
         const key = useSelector((store) => store.movie.key);
        const fetchMovieVideos = async() => {
        const responce = await fetch('https://api.themoviedb.org/3/movie/'+id+'/videos', OPTIONS);
        const data = await responce.json();
        const trailerVideoKey = data.results.filter(
                            (data) => (data.type === "Trailer" && data.name === "Official Trailer"))[0].key;
        dispatch(addMovieTrailerKey(trailerVideoKey));
    }

    useEffect(() => {!key && fetchMovieVideos()}, []);
}

export default useMovieTrailer;