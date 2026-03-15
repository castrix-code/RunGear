import Link from "next/link";

export default function NotFound() {
  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      <h1 className="text-4xl font-bold text-neutral-900">404</h1>
      <p className="mt-2 text-neutral-600">This page could not be found.</p>
      <Link
        href="/"
        className="mt-6 rounded-lg bg-accent px-6 py-2 font-semibold text-white transition hover:bg-accent-hover"
      >
        Go home
      </Link>
    </div>
  );
}
