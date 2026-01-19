import {POSTER_URL} from './../utils/constant';

const MovieCard = ({posterPath}) => {
    if(!posterPath) return;
    return (
        <div className='w-30 md:w-44 '>
            <img className='w-[100%] hover:scale-125' src={POSTER_URL+posterPath} />
        </div>
    )
}

export default MovieCard;