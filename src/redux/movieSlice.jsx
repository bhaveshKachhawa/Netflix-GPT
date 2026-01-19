import {createSlice} from '@reduxjs/toolkit';

const movieSlice = createSlice({
    name:'movie',
    initialState:{
        nowPlayingMovies:null,
        popularMovies:null,
        topRatedMovies:null,
        upcomingMovies:null,
        airingToday:null,
        onTheAir:null,
        movieTrailerKey:null
    },
    reducers:{
        addMovieList:(state, action) => {
            state.nowPlayingMovies = action.payload;
        },
        addPopularMovieList:(state, action) => {
            state.popularMovies = action.payload;
        },
        addTopRatedMovieList:(state, action) => {
            state.topRatedMovies = action.payload;
        },
        addUpcomingMovieList:(state, action) => {
            state.upcomingMovies = action.payload;
        },
        addAiringTodayList:(state, action) => {
            state.airingToday = action.payload;
        },
        addOnTheAirList:(state, action) => {
            state.onTheAir = action.payload;
        },                      
        addMovieTrailerKey:(state, action) => {
            state.key = action.payload;
        }
    }
});

export const {addMovieList, addPopularMovieList, addTopRatedMovieList, addUpcomingMovieList, addOnTheAirList, addAiringTodayList, addMovieTrailerKey} = movieSlice.actions;
export default movieSlice.reducer;