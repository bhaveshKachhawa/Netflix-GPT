import { useState, useEffect } from "react";
import { OPTIONS } from "../utils/constant";

const useMovieTrailer = (id) => {
       const [key, setKey] = useState(null);
    const fetchMovieVideos = async() => {
        const responce = await fetch('https://api.themoviedb.org/3/movie/'+id+'/videos', OPTIONS);
        const data = await responce.json();
        const trailerVideoKey = data.results.filter(
                            (data) => (data.type === "Trailer" && data.name === "Official Trailer"))[0].key;
        setKey(trailerVideoKey);
    }

    useEffect(() => fetchMovieVideos, []);
    return key;
}

export default useMovieTrailer;