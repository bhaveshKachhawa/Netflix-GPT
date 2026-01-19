import MovieCard from "./MovieCard";

const MovieList = ({title, movieList}) => {
    if(!movieList) return;
    return (
        <div>
            <h1 className="text-2xl ml-3 p-3 pt-6 text-white">{title}</h1>
            <div className="ml-5 pt-3 flex overflow-x-scroll 
                            [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] ">
                <div className="flex gap-2">
                    {movieList.map((item) => <MovieCard key={item.id} posterPath={item.poster_path}/>)}
                </div>
            </div>
        </div>
    );
}

export default MovieList;