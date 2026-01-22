import {useSelector} from 'react-redux';
import MovieList from './MovieList';
import ShimmerGPTSearch from '../shimmerUI/ShimmerGPTSearch';

const GPTSearchSugesstions = () => {
    const { movies, names, shimmerVisibility} = useSelector((store) => store.gpt);
    if(shimmerVisibility && !movies) return <ShimmerGPTSearch />
    if(!movies) return;
    return (
        <div className='absolute z-50 mt-90  md:mt-75 opacity-90 bg-black w-[90%] md:w-[95%] mx-4 md:mx-8'>
            {names.map((movieName, index) => {
                return <MovieList key={index} title={movieName} movieList={movies[index]}/>
            })}
        </div>
    );
}

export default GPTSearchSugesstions;