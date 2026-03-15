export default function CatalogLoading() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <div className="h-9 w-48 animate-pulse rounded bg-neutral-200" />
        <div className="mt-2 h-5 w-64 animate-pulse rounded bg-neutral-100" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row">
        <div className="h-80 w-64 shrink-0 animate-pulse rounded-xl bg-neutral-100" />
        <div className="grid flex-1 grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="overflow-hidden rounded-xl border border-neutral-200"
            >
              <div className="aspect-square animate-pulse bg-neutral-100" />
              <div className="space-y-2 p-4">
                <div className="h-3 w-16 animate-pulse rounded bg-neutral-100" />
                <div className="h-5 w-3/4 animate-pulse rounded bg-neutral-100" />
                <div className="h-6 w-12 animate-pulse rounded bg-neutral-100" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
