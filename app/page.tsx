import Link from "next/link";

export default function HomePage() {
  return (
    <div>
      <section className="relative overflow-hidden bg-gradient-to-br from-neutral-900 via-neutral-800 to-neutral-900 py-24 text-white">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23ffffff\' fill-opacity=\'0.03\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E')] opacity-50" />
        <div className="relative mx-auto max-w-6xl px-4 sm:px-6">
          <div className="max-w-2xl">
            <h1 className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl">
              Find your perfect running gear
            </h1>
            <p className="mt-6 text-lg text-neutral-300">
              Shoes, clothes, hydration, accessories, watches. Take our quick quiz
              for personalized recommendations, or browse the catalog.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link
                href="/quiz"
                className="rounded-lg bg-accent px-6 py-3 text-base font-semibold text-white transition hover:bg-accent-hover"
              >
                Take the quiz
              </Link>
              <Link
                href="/catalog"
                className="rounded-lg border-2 border-white/30 bg-white/5 px-6 py-3 text-base font-semibold text-white backdrop-blur transition hover:border-white/50 hover:bg-white/10"
              >
                Browse catalog
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <h2 className="text-center text-2xl font-bold text-neutral-900">
            Shop by category
          </h2>
          <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
            {[
              { slug: "shoes", label: "Shoes" },
              { slug: "clothes", label: "Clothes" },
              { slug: "hydration", label: "Hydration" },
              { slug: "accessories", label: "Accessories" },
              { slug: "watches", label: "Watches" },
            ].map(({ slug, label }) => (
              <Link
                key={slug}
                href={`/catalog?category=${slug}`}
                className="flex flex-col items-center rounded-xl border border-neutral-200 bg-white p-6 text-center transition hover:border-accent/40 hover:shadow-md"
              >
                <span className="text-lg font-semibold text-neutral-900">
                  {label}
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="border-t border-neutral-200 bg-neutral-50 py-16">
        <div className="mx-auto max-w-6xl px-4 sm:px-6">
          <div className="rounded-2xl bg-white p-8 shadow-sm md:p-12">
            <h2 className="text-2xl font-bold text-neutral-900">
              How it works
            </h2>
            <div className="mt-8 grid gap-8 md:grid-cols-2">
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">
                  1
                </span>
                <h3 className="mt-4 font-semibold text-neutral-900">
                  Take the quiz
                </h3>
                <p className="mt-2 text-neutral-600">
                  Answer a few questions about your running style, distance, and
                  budget. We&apos;ll match you with gear that fits your needs.
                </p>
              </div>
              <div>
                <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent/10 text-accent font-bold">
                  2
                </span>
                <h3 className="mt-4 font-semibold text-neutral-900">
                  Browse recommendations
                </h3>
                <p className="mt-2 text-neutral-600">
                  See personalized picks in our catalog. Filter and sort to narrow
                  down, then click through for details.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
