import type { GearItem, QuizAnswers } from "./types";
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

  // Budget fit: reward items that are nicely inside the budget band.
  const comfortablyInBudget =
    item.price >= range.min && item.price <= range.max;
  const justUnderMax = item.price <= range.max * 1.05;
  if (comfortablyInBudget) score += 4;
  else if (justUnderMax) score += 1;

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
