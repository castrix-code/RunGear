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

export type ExperienceLevel = "beginner" | "intermediate" | "advanced";

export type WeeklyMileage = "<10" | "10-25" | "25-40" | ">40";

export type PrimaryGoal =
  | "fitness"
  | "race_pr"
  | "weight_loss"
  | "trail_adventure"
  | "ultra";

export type Climate = "hot" | "cold" | "mixed";

export type TimeOfDay = "morning" | "day" | "evening" | "night";

export type InjuryType =
  | "none"
  | "plantar"
  | "shin_splints"
  | "knee"
  | "it_band"
  | "achilles"
  | "other";

export type CushionPreference = "soft" | "balanced" | "firm";

export type SupportPreference =
  | "neutral"
  | "mild_support"
  | "strong_stability"
  | "unsure";

export type SurfaceMix = "road" | "mixed" | "trail" | "technical_trail";

export type LongRunDuration = "<45" | "45-90" | "90-150" | ">150";

export type HydrationCarry = "handheld" | "belt" | "vest" | "none";

export type CarryItem =
  | "phone"
  | "keys"
  | "id_cards"
  | "gels"
  | "poles"
  | "nothing";

export type TrafficExposure = "paths" | "quiet_streets" | "busy_roads";

export type Lighting =
  | "well_lit"
  | "suburban"
  | "dark_trails"
  | "rural";

export type TechComfort = "simple" | "balanced" | "advanced";

export type DataInterest = "basic" | "training" | "advanced_metrics";

export type StylePreference =
  | "neutral"
  | "bright"
  | "performance_first";

export type SustainabilityPreference = "high" | "medium" | "low";

export type LaundryFrequency = "often" | "weekly" | "rare";

export type TravelFrequency = "local" | "sometimes" | "often";

export type RecoveryFocus =
  | "foam_rolling"
  | "massage"
  | "compression"
  | "sleep"
  | "nutrition";

export interface QuizAnswers {
  runningStyle: "road" | "trail" | "both";
  distance: "5k" | "10k" | "half" | "full" | "ultra";
  terrain: "flat" | "hills" | "mixed";
  budget: "budget" | "mid" | "premium";
  priorityCategories: GearCategory[];

  // Expanded profile (all optional so older URLs still decode safely)
  experienceLevel?: ExperienceLevel;
  weeklyMileage?: WeeklyMileage;
  primaryGoal?: PrimaryGoal;
  climate?: Climate;
  timeOfDay?: TimeOfDay;
  injuryHistory?: InjuryType[];
  cushionPref?: CushionPreference;
  supportPref?: SupportPreference;
  surfaceMix?: SurfaceMix;
  longRunDuration?: LongRunDuration;
  hydrationCarry?: HydrationCarry[];
  carryItems?: CarryItem[];
  trafficExposure?: TrafficExposure;
  lighting?: Lighting;
  techComfort?: TechComfort;
  dataInterest?: DataInterest;
  brandAffinity?: string[];
  stylePref?: StylePreference;
  sustainability?: SustainabilityPreference;
  laundryFreq?: LaundryFrequency;
  travelFrequency?: TravelFrequency;
  recoveryFocus?: RecoveryFocus[];
}
