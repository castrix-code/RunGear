import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 border-b border-neutral-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="text-xl font-bold tracking-tight text-neutral-900">
          RunGear
        </Link>
        <nav className="flex items-center gap-6">
          <Link
            href="/quiz"
            className="text-sm font-medium text-neutral-600 transition hover:text-accent"
          >
            Quiz
          </Link>
          <Link
            href="/catalog"
            className="text-sm font-medium text-neutral-600 transition hover:text-accent"
          >
            Catalog
          </Link>
        </nav>
      </div>
    </header>
  );
}
