const Footer = () => {
  return (
    <footer className="relative z-40 border-t border-white/10 bg-[#141414] px-6 py-10 text-sm text-neutral-400 md:px-16">
      <p className="mb-2 font-medium text-neutral-300">NetflixGPT</p>
      <p>
        Educational portfolio project inspired by Netflix. Not affiliated with Netflix, Inc.
      </p>
      <p className="mt-2">
        Movie data from{" "}
        <a
          href="https://www.themoviedb.org/"
          target="_blank"
          rel="noreferrer"
          className="text-neutral-200 underline-offset-2 hover:underline"
        >
          TMDB
        </a>
        . Recommendations powered by AI.
      </p>
    </footer>
  );
};

export default Footer;
