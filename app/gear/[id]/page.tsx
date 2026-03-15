import Image from "next/image";
import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getGearById } from "@/lib/gear";

interface ProductPageProps {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({
  params,
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const item = getGearById(id);
  if (!item)
    return { title: "Not found | RunGear" };
  return {
    title: `${item.name} by ${item.brand} | RunGear`,
    description: item.description,
    openGraph: {
      title: `${item.name} by ${item.brand}`,
      description: item.description,
      images: [item.imageUrl],
    },
  };
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { id } = await params;
  const item = getGearById(id);

  if (!item) notFound();

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Link
        href="/catalog"
        className="mb-6 inline-block text-sm font-medium text-neutral-500 hover:text-accent"
      >
        ← Back to catalog
      </Link>

      <div className="grid gap-8 md:grid-cols-2">
        <div className="relative aspect-square overflow-hidden rounded-2xl bg-neutral-100">
          <Image
            src={item.imageUrl}
            alt={item.name}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 50vw"
          />
        </div>

        <div>
          <p className="text-sm font-medium uppercase tracking-wider text-neutral-400">
            {item.brand}
          </p>
          <h1 className="mt-2 text-3xl font-bold text-neutral-900">{item.name}</h1>
          <p className="mt-4 text-2xl font-bold text-neutral-900">
            ${item.price}
          </p>
          <p className="mt-6 text-neutral-600">{item.description}</p>

          {item.attributes && Object.keys(item.attributes).length > 0 && (
            <dl className="mt-6 border-t border-neutral-200 pt-6">
              {Object.entries(item.attributes).map(([key, value]) => (
                <div key={key} className="flex justify-between py-2">
                  <dt className="text-sm font-medium text-neutral-500 capitalize">
                    {key}
                  </dt>
                  <dd className="text-sm text-neutral-900">{value}</dd>
                </div>
              ))}
            </dl>
          )}

          <a
            href="#"
            className="mt-8 inline-block rounded-lg bg-accent px-6 py-3 font-semibold text-white transition hover:bg-accent-hover"
          >
            Find retailer (placeholder)
          </a>
        </div>
      </div>
    </div>
  );
}
