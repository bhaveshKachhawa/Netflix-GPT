import {useRef} from 'react';
import groq from '../utils/groqAi';
import {OPTIONS} from './../utils/constant';
import { useDispatch } from 'react-redux';
import {addUserSearchResultData, updateShimmerVisibility} from './../redux/gptSlice';

const GPTSearchBar = () => {
    const userInput = useRef(null);
    const dispatch = useDispatch();

    const fetchUserMoviesData =  async (movie) => {
        const response = await fetch(`https://api.themoviedb.org/3/search/movie?query=${movie}&page=1`, OPTIONS);
        const data = await response.json();
        return data.results;
    }

    const handleGPTSearch = async() => {
        if(!userInput.current.value) return;
        dispatch(updateShimmerVisibility(true));
        const query = "Act as a movie recommendation system and suggest some movies for the query " + userInput.current.value +". Only give me names of 5 movies, comma seperated like this example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";
        const response = await groq.chat.completions.create({
            messages: [{ role: 'user', content: query }],
            model: "llama-3.3-70b-versatile", 
        });
        const searchMoviesList = response.choices[0].message.content.split(",");
        const userMoviesPromiseArray = searchMoviesList.map((movie) => fetchUserMoviesData(movie));
        const userMoviesData = await Promise.all((userMoviesPromiseArray));
        dispatch(addUserSearchResultData({userMoviesData, searchMoviesList}));
    }

    return (
                <div className="mt-40 w-[75%] md:w-[55%] absolute md:ml-[25%] md:w-1/2 bg-black z-10 p-5 opacity-95 z-50">
                    <form onSubmit={(e) => e.preventDefault()} className="flex gap-2 h-10">
                        <input type="text" ref={userInput} placeholder=" What would you like to watch today?" className="w-[100%] md:w-[80%] bg-white pl-1 text-sm md:text-1xl"/>
                        <button className="hover:opacity-70 w-[25%] md:w-[20%] bg-red-500 text-white rounded-lg" onClick={handleGPTSearch}>Search</button>
                    </form>
                </div>
        
    );
}

export default GPTSearchBar;