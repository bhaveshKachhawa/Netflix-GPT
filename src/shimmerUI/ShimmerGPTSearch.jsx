const ShimmerGPTSearch = () => {
  const rows = [0, 1];
  const cards = [0, 1, 2, 3, 4, 5];

  return (
    <div className="relative z-50 mx-4 mt-72 space-y-8 rounded-xl bg-black/80 p-6 md:mx-8 md:mt-56">
      {rows.map((row) => (
        <div key={row}>
          <div className="mb-3 h-6 w-48 animate-pulse rounded bg-neutral-800" />
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

export default ShimmerGPTSearch;
