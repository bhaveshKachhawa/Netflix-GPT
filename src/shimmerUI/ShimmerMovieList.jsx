const ShimmerMovieList = () => {
  const rows = [0, 1, 2];
  const cards = [0, 1, 2, 3, 4, 5, 6];

  return (
    <div className="relative z-10 space-y-8 bg-[#141414] px-4 pb-16 pt-8 md:-mt-40">
      {rows.map((row) => (
        <div key={row}>
          <div className="mb-3 ml-2 h-6 w-40 animate-pulse rounded bg-neutral-800" />
          <div className="flex gap-3 overflow-hidden">
            {cards.map((card) => (
              <div
                key={card}
                className="h-44 w-28 shrink-0 animate-pulse rounded-md bg-neutral-800 md:h-60 md:w-40"
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default ShimmerMovieList;
