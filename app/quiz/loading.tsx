export default function QuizLoading() {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <div className="h-10 w-72 animate-pulse rounded bg-neutral-200" />
      <div className="mt-2 h-5 w-96 animate-pulse rounded bg-neutral-100" />
      <div className="mt-8 flex gap-2">
        {Array.from({ length: 5 }).map((_, i) => (
          <div
            key={i}
            className="h-1.5 flex-1 animate-pulse rounded-full bg-neutral-200"
          />
        ))}
      </div>
      <div className="mt-8 rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
        <div className="h-6 w-48 animate-pulse rounded bg-neutral-100" />
        <div className="mt-4 flex gap-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-10 w-24 animate-pulse rounded-lg bg-neutral-100"
            />
          ))}
        </div>
        <div className="mt-8 flex justify-end">
          <div className="h-10 w-20 animate-pulse rounded-lg bg-neutral-200" />
        </div>
      </div>
    </div>
  );
}
