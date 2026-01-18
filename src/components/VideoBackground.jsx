import useMovieTrailer from './../hooks/useMovieTrailer';

const VideoBackground = ({id}) => {
    const key = useMovieTrailer(id);
    return (
        <>
            {key?<div className='w-99vw pt-2 overflow-hidden'>
                <iframe 
                    className="w-99vw aspect-video scale-135 " 
                    src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&controls=0`} 
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