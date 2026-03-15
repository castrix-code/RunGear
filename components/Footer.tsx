import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white py-12">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="flex flex-col items-center justify-between gap-6 sm:flex-row">
          <Link href="/" className="text-lg font-bold text-neutral-900">
            RunGear
          </Link>
          <nav className="flex gap-8">
            <Link
              href="/quiz"
              className="text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              Quiz
            </Link>
            <Link
              href="/catalog"
              className="text-sm text-neutral-500 transition hover:text-neutral-900"
            >
              Catalog
            </Link>
          </nav>
        </div>
        <p className="mt-8 text-center text-sm text-neutral-400">
          RunGear helps runners discover the best gear. Quiz-based recommendations
          and filterable catalog.
        </p>
      </div>
    </footer>
  );
}
