const PageLoading = ({ lines = 3 }) => (
  <div className="flex flex-col gap-3 animate-fade-in motion-reduce:animate-none" aria-hidden="true">
    <div className="h-5 w-40 rounded-md bg-[var(--border)] animate-pulse-soft" />
    {Array.from({ length: lines }).map((_, i) => (
      <div
        key={i}
        className="h-24 rounded-xl bg-[var(--card)] border border-[var(--border)] animate-pulse-soft"
        style={{ animationDelay: `${i * 120}ms` }}
      />
    ))}
  </div>
);

export default PageLoading;
