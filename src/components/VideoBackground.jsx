import { useSelector } from "react-redux";
import useMovieTrailer from "./../hooks/useMovieTrailer";

const VideoBackground = ({ id }) => {
  const key = useSelector((store) => store.movie.key);
  useMovieTrailer(id);

  return (
    <div className="relative w-full overflow-hidden bg-black pt-[56%] md:pt-[48%]">
      {key && (
        <iframe
          className="pointer-events-none absolute top-1/2 left-1/2 aspect-video h-[130%] w-[140%] max-w-none -translate-x-1/2 -translate-y-[54%]"
          src={`https://www.youtube.com/embed/${key}?autoplay=1&mute=1&loop=1&playlist=${key}&controls=0&rel=0&modestbranding=1`}
          title="Featured trailer"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          referrerPolicy="strict-origin-when-cross-origin"
        />
      )}
      <div className="absolute inset-0 bg-gradient-to-r from-[#141414] via-[#141414]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#141414] via-transparent to-black/50" />
    </div>
  );
};

export default VideoBackground;
