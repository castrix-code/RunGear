export type GearCategory =
  | "shoes"
  | "clothes"
  | "hydration"
  | "accessories"
  | "watches";

export interface GearItem {
  id: string;
  name: string;
  category: GearCategory;
  subcategory?: string;
  brand: string;
  price: number;
  description: string;
  imageUrl: string;
  tags: string[];
  attributes?: Record<string, string>;
}

export interface QuizAnswers {
  runningStyle: "road" | "trail" | "both";
  distance: "5k" | "10k" | "half" | "full" | "ultra";
  terrain: "flat" | "hills" | "mixed";
  budget: "budget" | "mid" | "premium";
  priorityCategories: GearCategory[];
}
