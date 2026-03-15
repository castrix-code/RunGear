import Image from "next/image";
import type { GearItem } from "@/lib/types";

interface ReasonBadgeProps {
  reason: string;
}

function ReasonBadge({ reason }: ReasonBadgeProps) {
  return (
    <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      {reason}
    </div>
  );
}

interface ResultsCardProps {
  item: GearItem;
  score: number;
  reasons: string[];
  rank: number;
}

export default function ResultsCard({ item, score, reasons, rank }: ResultsCardProps) {
  return (
    <div className="relative rounded-2xl border border-neutral-200 bg-white p-6 shadow-lg transition-all hover:shadow-xl">
      {/* Rank Badge */}
      <div className="absolute -top-3 -right-3 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-sm font-bold text-white">
        {rank}
      </div>

      {/* Product Image */}
      <div className="relative mb-4 aspect-square overflow-hidden rounded-lg bg-neutral-100">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        />
      </div>

      {/* Product Info */}
      <div className="space-y-3">
        <div>
          <h3 className="text-lg font-semibold text-neutral-900">{item.name}</h3>
          <p className="text-sm text-neutral-600">{item.brand}</p>
        </div>

        <p className="text-sm text-neutral-700 line-clamp-2">{item.description}</p>

        {/* Match Score */}
        <div className="flex items-center justify-between">
          <div className="text-sm text-neutral-600">
            Match Score: <span className="font-semibold text-accent">{score}</span>
          </div>
          <div className="text-lg font-bold text-neutral-900">${item.price}</div>
        </div>

        {/* Why It's Perfect for You */}
        <div className="space-y-2">
          <h4 className="text-sm font-semibold text-neutral-900">
            Why it's perfect for you:
          </h4>
          <div className="flex flex-wrap gap-2">
            {reasons.slice(0, 4).map((reason, index) => (
              <ReasonBadge key={index} reason={reason} />
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          <button 
            onClick={() => alert(`View details for ${item.name}`)}
            className="flex-1 rounded-lg bg-accent px-4 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            View Details
          </button>
          <button className="rounded-lg border border-neutral-200 px-4 py-2 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50">
            Save
          </button>
        </div>
      </div>
    </div>
  );
}
