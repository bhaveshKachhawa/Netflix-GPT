import MovieCard from "./MovieCard";

const MovieList = ({ title, movieList, mediaType = "movie" }) => {
  if (!movieList?.length) return null;

  return (
    <section className="px-2 md:px-4">
      <h2 className="px-3 pt-5 pb-2 text-lg font-semibold text-white md:text-2xl">
        {title}
      </h2>
      <div className="hide-scrollbar flex gap-3 overflow-x-auto px-3 pb-4 pt-1">
        {movieList.map((item) => (
          <MovieCard
            key={`${mediaType}-${item.id}`}
            movie={item}
            mediaType={mediaType}
          />
        ))}
      </div>
    </section>
  );
};

export default MovieList;
