import {createSlice} from '@reduxjs/toolkit';

const gptSlice = createSlice({
    name:'gpt',
    initialState:{
        visibility:false,
        movies:null,
        names:null,
        shimmerVisibility:false
    },
    reducers:{
        updateVisibility:(state) => {
            state.visibility = !state.visibility;
        },
        addUserSearchResultData:(state, action) => {
            const {userMoviesData, searchMoviesList} = action.payload;
            state.movies = userMoviesData;
            state.names = searchMoviesList;
        },
        emptyUserSearchData:(state) => {
            state.names = null,
            state.movies = null;
        },
        updateShimmerVisibility:(state) =>{
            state.shimmerVisibility = !state.shimmerVisibility;
        }
    }
});

export const {updateVisibility, addUserSearchResultData, emptyUserSearchData, updateShimmerVisibility} = gptSlice.actions;
export default gptSlice.reducer;
