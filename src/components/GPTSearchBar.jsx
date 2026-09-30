import { useRef, useState } from "react";
import groq from "../utils/groqAi";
import { GPT_SUGGESTIONS, OPTIONS } from "./../utils/constant";
import { useDispatch } from "react-redux";
import {
  addUserSearchResultData,
  updateShimmerVisibility,
} from "./../redux/gptSlice";

const GPTSearchBar = () => {
  const userInput = useRef(null);
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [searching, setSearching] = useState(false);

  const fetchUserMoviesData = async (movie) => {
    const response = await fetch(
      `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(movie)}&page=1`,
      OPTIONS
    );
    const data = await response.json();
    return data.results;
  };

  const handleGPTSearch = async (presetQuery) => {
    const queryText = (presetQuery ?? userInput.current.value).trim();
    if (!queryText) return;

    if (presetQuery) userInput.current.value = presetQuery;

    setError("");
    setSearching(true);
    dispatch(updateShimmerVisibility(true));
    dispatch(addUserSearchResultData({ userMoviesData: null, searchMoviesList: null }));

    const query =
      "Act as a movie recommendation system and suggest some movies for the query " +
      queryText +
      ". Only give me names of 5 movies, comma seperated like this example result given ahead. Example Result: Gadar, Sholay, Don, Golmaal, Koi Mil Gaya";

    try {
      const response = await groq.chat.completions.create({
        messages: [{ role: "user", content: query }],
        model: "openai/gpt-oss-120b",
      });
      const searchMoviesList = response.choices[0].message.content
        .split(",")
        .map((name) => name.trim())
        .filter(Boolean)
        .slice(0, 5);

      const userMoviesPromiseArray = searchMoviesList.map((movie) =>
        fetchUserMoviesData(movie)
      );
      const userMoviesData = await Promise.all(userMoviesPromiseArray);
      dispatch(addUserSearchResultData({ userMoviesData, searchMoviesList }));
    } catch {
      setError("Could not fetch recommendations. Please try again.");
      dispatch(updateShimmerVisibility(false));
    } finally {
      setSearching(false);
    }
  };

  return (
    <div className="relative z-50 mx-auto mt-24 w-[92%] max-w-3xl rounded-xl bg-black/80 p-5 md:mt-28 md:p-7">
      <h1 className="mb-1 text-xl font-bold md:text-2xl">Ask GPT what to watch</h1>
      <p className="mb-4 text-sm text-neutral-400">
        Describe a mood, genre, or movie you like — we will recommend titles and
        pull matching posters.
      </p>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleGPTSearch();
        }}
        className="flex gap-2"
      >
        <input
          type="text"
          ref={userInput}
          placeholder="What would you like to watch today?"
          className="w-full rounded-md bg-white px-3 py-3 text-sm text-black outline-none md:text-base"
        />
        <button
          type="submit"
          disabled={searching}
          className="shrink-0 rounded-md bg-[#E50914] px-4 py-3 font-semibold text-white hover:bg-red-700 disabled:opacity-70 md:px-6"
        >
          {searching ? "…" : "Search"}
        </button>
      </form>
      {error && <p className="mt-3 text-sm text-red-400">{error}</p>}
      <div className="mt-4 flex flex-wrap gap-2">
        {GPT_SUGGESTIONS.map((suggestion) => (
          <button
            key={suggestion}
            type="button"
            className="rounded-full border border-neutral-600 px-3 py-1 text-xs text-neutral-200 transition hover:border-white hover:bg-white/10 md:text-sm"
            onClick={() => handleGPTSearch(suggestion)}
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
};

export default GPTSearchBar;
