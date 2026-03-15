import Image from "next/image";
import Link from "next/link";
import type { GearItem } from "@/lib/types";

interface GearCardProps {
  item: GearItem;
}

export default function GearCard({ item }: GearCardProps) {
  return (
    <Link
      href={`/gear/${item.id}`}
      className="group block overflow-hidden rounded-xl border border-neutral-200 bg-white transition hover:border-accent/30 hover:shadow-lg"
    >
      <div className="relative aspect-square bg-neutral-100">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover transition group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <div className="p-4">
        <p className="text-xs font-medium uppercase tracking-wider text-neutral-400">
          {item.brand}
        </p>
        <h3 className="mt-1 font-semibold text-neutral-900 group-hover:text-accent">
          {item.name}
        </h3>
        <p className="mt-2 text-lg font-bold text-neutral-900">
          ${item.price}
        </p>
      </div>
    </Link>
  );
}
