import type {
  GearItem,
  InjuryType,
  QuizAnswers,
} from "./types";
import { getAllGear } from "./gear";

const BUDGET_RANGES = {
  budget: { min: 0, max: 80 },
  mid: { min: 60, max: 250 },
  premium: { min: 180, max: 10000 },
};

function scoreGearItem(item: GearItem, answers: QuizAnswers): number {
  // 1) Hard filters first so some items are completely excluded

  // Running style: if user is strictly road or trail, hide obviously wrong-surface gear.
  if (answers.runningStyle === "trail" && !item.tags.includes("trail")) {
    return 0;
  }
  if (answers.runningStyle === "road" && !item.tags.includes("road")) {
    return 0;
  }

  // Budget: drop items far outside the chosen budget band.
  const range = BUDGET_RANGES[answers.budget];
  const tooCheapForPremium =
    answers.budget === "premium" && item.price < range.min * 0.6;
  const tooExpensiveForBudgetOrMid = item.price > range.max * 1.1;

  if (tooCheapForPremium || tooExpensiveForBudgetOrMid) {
    return 0;
  }

  // If user picked priority categories, strongly de-prioritize others.
  const hasPriorityCategories = answers.priorityCategories.length > 0;
  const isPriorityCategory = answers.priorityCategories.includes(
    item.category
  );
  if (hasPriorityCategories && !isPriorityCategory) {
    // Allow item, but with much lower score later.
  }

  // 2) Soft scoring for remaining items
  let score = 0;

  // Tag matching for running style (road/trail/both)
  const styleTags =
    answers.runningStyle === "both"
      ? ["road", "trail"]
      : [answers.runningStyle];
  if (item.tags.some((t) => styleTags.includes(t))) score += 3;

  // Tag matching for distance
  const distanceTags = {
    "5k": ["everyday", "short-runs"],
    "10k": ["10k", "everyday"],
    half: ["half", "long-distance"],
    full: ["marathon", "long-distance"],
    ultra: ["ultra", "trail", "long-distance"],
  }[answers.distance];
  if (item.tags.some((t) => distanceTags?.includes(t))) score += 2;

  // Tag matching for terrain
  if (answers.terrain === "mixed" || item.tags.includes(answers.terrain))
    score += 1;

  // Running profile / goals
  if (answers.experienceLevel === "beginner" && item.tags.includes("beginner-friendly")) {
    score += 3;
  }
  if (answers.primaryGoal === "ultra" && item.tags.includes("ultra")) {
    score += 3;
  }
  if (
    answers.primaryGoal === "race_pr" &&
    (item.tags.includes("racing") || item.tags.includes("marathon"))
  ) {
    score += 3;
  }

  // Climate & time of day
  if (answers.climate === "hot" && item.tags.includes("hot-weather")) {
    score += 2;
  }
  if (answers.climate === "cold" && item.tags.includes("cold-weather")) {
    score += 2;
  }
  if (answers.timeOfDay === "night" && item.tags.includes("night")) {
    score += 3;
  }

  // Budget fit: reward items that are nicely inside the budget band.
  const comfortablyInBudget =
    item.price >= range.min && item.price <= range.max;
  const justUnderMax = item.price <= range.max * 1.05;
  if (comfortablyInBudget) score += 4;
  else if (justUnderMax) score += 1;

  // Comfort, support, injuries (only shoes & recovery gear)
  const injuryHistory: InjuryType[] = answers.injuryHistory ?? [];
  const hasLegInjuries = injuryHistory.some((i) =>
    ["knee", "shin_splints", "it_band", "achilles"].includes(i)
  );
  if (item.category === "shoes") {
    if (answers.cushionPref === "soft" && item.tags.includes("max-cushion")) {
      score += 3;
    }
    if (answers.cushionPref === "firm" && item.tags.includes("firm")) {
      score += 2;
    }
    if (
      answers.supportPref === "strong_stability" &&
      item.tags.includes("stability")
    ) {
      score += 4;
    }
    if (
      answers.supportPref === "neutral" &&
      item.tags.includes("neutral")
    ) {
      score += 2;
    }
    if (hasLegInjuries && (item.tags.includes("max-cushion") || item.tags.includes("stability"))) {
      score += 2;
    }
  }
  if (
    item.tags.includes("recovery") &&
    (answers.recoveryFocus ?? []).length > 0
  ) {
    score += 3;
  }

  // Surfaces & events
  if (
    (answers.surfaceMix === "trail" ||
      answers.surfaceMix === "technical_trail") &&
    item.tags.includes("trail")
  ) {
    score += 3;
  }

  // Hydration & carrying
  const carryPrefs = answers.hydrationCarry ?? [];
  if (carryPrefs.includes("vest") && item.subcategory === "vest") {
    score += 4;
  }
  if (
    carryPrefs.includes("handheld") &&
    item.subcategory === "bottle" &&
    item.tags.includes("handheld")
  ) {
    score += 3;
  }

  const carryItems = answers.carryItems ?? [];
  if (carryItems.includes("phone") && item.tags.includes("phone")) {
    score += 2;
  }
  if (carryItems.includes("gels") && item.tags.includes("pockets")) {
    score += 2;
  }

  // Safety & visibility
  if (
    answers.trafficExposure === "busy_roads" &&
    (item.tags.includes("safety") || item.tags.includes("high-visibility"))
  ) {
    score += 3;
  }
  if (
    answers.lighting === "dark_trails" &&
    (item.subcategory === "headlamp" || item.tags.includes("headlamp"))
  ) {
    score += 4;
  }

  // Tech & data: watches only
  if (item.category === "watches") {
    if (
      answers.techComfort === "simple" &&
      item.tags.includes("fitness")
    ) {
      score += 2;
    }
    if (
      answers.techComfort === "advanced" &&
      (item.tags.includes("training") || item.tags.includes("smartwatch"))
    ) {
      score += 3;
    }
    if (
      answers.dataInterest === "advanced_metrics" &&
      item.tags.includes("training")
    ) {
      score += 3;
    }
  }

  // Priority category boost / penalty
  if (hasPriorityCategories) {
    if (isPriorityCategory) score += 5;
    else score -= 3;
  }

  return score;
}

export function getRecommendations(answers: QuizAnswers): GearItem[] {
  const all = getAllGear();
  const scored = all.map((item) => ({
    item,
    score: scoreGearItem(item, answers),
  }));
  return scored
    .filter(({ score }) => score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 12)
    .map(({ item }) => item);
}
