import type { GearItem } from "./types";
import gearData from "@/data/gear.json";

const gear = gearData as GearItem[];

export function getAllGear(): GearItem[] {
  return gear;
}

export function getGearById(id: string): GearItem | undefined {
  return gear.find((item) => item.id === id);
}

export function getGearByCategory(category: GearItem["category"]): GearItem[] {
  return gear.filter((item) => item.category === category);
}

export function getUniqueBrands(): string[] {
  const brands = new Set(gear.map((item) => item.brand));
  return Array.from(brands).sort();
}

export function getUniqueCategories(): GearItem["category"][] {
  const cats = new Set(gear.map((item) => item.category));
  return Array.from(cats);
}
