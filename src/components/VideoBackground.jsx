import { useSelector } from 'react-redux';
import useMovieTrailer from './../hooks/useMovieTrailer';

const VideoBackground = ({id}) => {
    const key = useSelector((store) => store.movie.key);
    useMovieTrailer(id);
    return (
        <>
            {key?<div className='md:w-99vw pt-50 md:pt-2 overflow-hidden mx-2 md:mx-0'>
                <iframe 
                    className="md:w-99vw md:aspect-video md:scale-135" 
                    src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&controls=0&rel=0&enablejsapi=1`} 
                    title="YouTube video player" 
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                    referrerPolicy="strict-origin-when-cross-origin"
                ></iframe>
            </div>:
            <div className='w-99vw pt-2'></div>}
        </>
    )
}

export default VideoBackground;