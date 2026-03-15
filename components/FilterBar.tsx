"use client";

import { useRouter, useSearchParams } from "next/navigation";
import type { GearCategory } from "@/lib/types";
import { getUniqueBrands, getUniqueCategories } from "@/lib/gear";

const CATEGORY_LABELS: Record<GearCategory, string> = {
  shoes: "Shoes",
  clothes: "Clothes",
  hydration: "Hydration",
  accessories: "Accessories",
  watches: "Watches",
};

export interface FilterState {
  category?: GearCategory;
  brand?: string;
  minPrice?: string;
  maxPrice?: string;
  sort?: "price-asc" | "price-desc" | "name";
}

interface FilterBarProps {
  filterState: FilterState;
  brands: string[];
  categories: GearCategory[];
}

export default function FilterBar({
  filterState,
  brands,
  categories,
}: FilterBarProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateFilters(updates: Partial<FilterState>) {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(updates).forEach(([key, value]) => {
      if (value === undefined || value === "") params.delete(key);
      else params.set(key, value);
    });
    router.push(`/catalog?${params.toString()}`);
  }

  return (
    <aside className="w-full shrink-0 lg:w-64">
      <div className="space-y-6 rounded-xl border border-neutral-200 bg-white p-4">
        <h3 className="font-semibold text-neutral-900">Filters</h3>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-600">
            Category
          </label>
          <select
            value={filterState.category ?? ""}
            onChange={(e) =>
              updateFilters({
                category: (e.target.value || undefined) as GearCategory | undefined,
              })
            }
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            <option value="">All categories</option>
            {categories.map((c) => (
              <option key={c} value={c}>
                {CATEGORY_LABELS[c]}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-600">
            Brand
          </label>
          <select
            value={filterState.brand ?? ""}
            onChange={(e) =>
              updateFilters({ brand: e.target.value || undefined })
            }
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            <option value="">All brands</option>
            {brands.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-600">
            Price range
          </label>
          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Min"
              min={0}
              value={filterState.minPrice ?? ""}
              onChange={(e) =>
                updateFilters({ minPrice: e.target.value || undefined })
              }
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
            <input
              type="number"
              placeholder="Max"
              min={0}
              value={filterState.maxPrice ?? ""}
              onChange={(e) =>
                updateFilters({ maxPrice: e.target.value || undefined })
              }
              className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
            />
          </div>
        </div>

        <div>
          <label className="mb-2 block text-sm font-medium text-neutral-600">
            Sort by
          </label>
          <select
            value={filterState.sort ?? "name"}
            onChange={(e) =>
              updateFilters({
                sort: (e.target.value as FilterState["sort"]) ?? undefined,
              })
            }
            className="w-full rounded-lg border border-neutral-200 px-3 py-2 text-sm"
          >
            <option value="name">Name</option>
            <option value="price-asc">Price: Low to High</option>
            <option value="price-desc">Price: High to Low</option>
          </select>
        </div>
      </div>
    </aside>
  );
}
