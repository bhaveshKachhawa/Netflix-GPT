import { useDispatch } from "react-redux";
import { setSelectedMovie } from "../redux/movieSlice";

const VideoTitle = ({ movie }) => {
  const dispatch = useDispatch();
  const title = movie?.original_title || movie?.title || "";
  const overview = movie?.overview || "";
  const shortOverview =
    overview.length > 180 ? `${overview.slice(0, 180).trim()}…` : overview;

  const openDetails = () => {
    dispatch(setSelectedMovie({ ...movie, mediaType: "movie" }));
  };

  return (
    <div className="absolute bottom-[22%] left-0 z-20 w-full px-5 md:bottom-[28%] md:w-1/2 md:px-16">
      <h1 className="mb-3 text-3xl font-extrabold drop-shadow-lg md:text-5xl">
        {title}
      </h1>
      <p className="mb-5 hidden text-sm leading-relaxed text-neutral-200 md:block md:text-base">
        {shortOverview}
      </p>
      <div className="flex gap-3">
        <button
          type="button"
          className="rounded-md bg-white px-5 py-2 font-semibold text-black transition hover:bg-white/80 md:px-7"
          onClick={openDetails}
        >
          ▶ Play
        </button>
        <button
          type="button"
          className="rounded-md bg-white/30 px-5 py-2 font-semibold text-white backdrop-blur-sm transition hover:bg-white/20 md:px-7"
          onClick={openDetails}
        >
          More info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
