import { Suspense } from "react";
import type { Metadata } from "next";
import type { GearItem, GearCategory, QuizAnswers } from "@/lib/types";
import {
  getAllGear,
  getUniqueBrands,
  getUniqueCategories,
} from "@/lib/gear";
import { getRecommendations } from "@/lib/recommend";
import CatalogClient from "./CatalogClient";
import type { FilterState } from "@/components/FilterBar";

interface CatalogPageProps {
  searchParams: Promise<{
    category?: string;
    brand?: string;
    minPrice?: string;
    maxPrice?: string;
    sort?: string;
    quiz?: string;
    answers?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Gear Catalog | RunGear",
  description:
    "Browse running shoes, clothes, hydration, accessories, and watches. Filter by category, brand, and price.",
};

function parseQuizAnswers(encoded: string | undefined): QuizAnswers | null {
  if (!encoded) return null;
  try {
    const json = Buffer.from(encoded, "base64").toString("utf-8");
    return JSON.parse(decodeURIComponent(json)) as QuizAnswers;
  } catch {
    return null;
  }
}

function filterAndSort(
  items: GearItem[],
  filters: FilterState
): GearItem[] {
  let result = [...items];

  if (filters.category) {
    result = result.filter((i) => i.category === filters.category);
  }
  if (filters.brand) {
    result = result.filter((i) => i.brand === filters.brand);
  }
  if (filters.minPrice) {
    const min = parseFloat(filters.minPrice);
    if (!isNaN(min)) result = result.filter((i) => i.price >= min);
  }
  if (filters.maxPrice) {
    const max = parseFloat(filters.maxPrice);
    if (!isNaN(max)) result = result.filter((i) => i.price <= max);
  }

  switch (filters.sort) {
    case "price-asc":
      result.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      result.sort((a, b) => b.price - a.price);
      break;
    default:
      result.sort((a, b) => a.name.localeCompare(b.name));
  }

  return result;
}

export default async function CatalogPage({ searchParams }: CatalogPageProps) {
  const params = await searchParams;
  const filterState: FilterState = {
    category: (params.category as GearCategory) || undefined,
    brand: params.brand || undefined,
    minPrice: params.minPrice || undefined,
    maxPrice: params.maxPrice || undefined,
    sort:
      (params.sort as FilterState["sort"]) || "name",
  };

  const brands = getUniqueBrands();
  const categories = getUniqueCategories();

  const quizAnswers = parseQuizAnswers(params.answers);
  const baseGear =
    params.quiz === "1" && quizAnswers
      ? getRecommendations(quizAnswers)
      : getAllGear();
  const filteredGear = filterAndSort(baseGear, filterState);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-neutral-900">
          {params.quiz ? "Recommended for You" : "Gear Catalog"}
        </h1>
        <p className="mt-2 text-neutral-600">
          {params.quiz
            ? "Based on your quiz answers"
            : "Filter and browse running gear"}
        </p>
      </div>

      <div className="flex flex-col gap-8 lg:flex-row">
        <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-neutral-100" />}>
          <CatalogClient
            filterState={filterState}
            brands={brands}
            categories={categories}
            gear={filteredGear}
          />
        </Suspense>
      </div>
    </div>
  );
}
