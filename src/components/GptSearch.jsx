import { BG } from "./../utils/constant";
import GPTSearchBar from "./GPTSearchBar";
import GPTSearchSugesstions from "./GPTSearchSugesstions";
import Footer from "./Footer";

const GptSearch = () => {
  return (
    <div className="relative min-h-screen">
      <img
        src={BG}
        className="fixed inset-0 h-full w-full object-cover"
        alt=""
      />
      <div className="fixed inset-0 bg-black/55" />
      <div className="relative z-10 pt-2">
        <GPTSearchBar />
        <GPTSearchSugesstions />
        <Footer />
      </div>
    </div>
  );
};

export default GptSearch;
