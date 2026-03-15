"use client";

import type { GearItem, GearCategory } from "@/lib/types";
import GearCard from "@/components/GearCard";
import FilterBar, { type FilterState } from "@/components/FilterBar";

interface CatalogClientProps {
  filterState: FilterState;
  brands: string[];
  categories: GearCategory[];
  gear: GearItem[];
}

export default function CatalogClient({
  filterState,
  brands,
  categories,
  gear,
}: CatalogClientProps) {
  return (
    <>
      <FilterBar
        filterState={filterState}
        brands={brands}
        categories={categories}
      />
      <div className="min-w-0 flex-1">
        {gear.length === 0 ? (
          <p className="py-12 text-center text-neutral-500">
            No gear matches your filters. Try adjusting them.
          </p>
        ) : (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
            {gear.map((item) => (
              <GearCard key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}
