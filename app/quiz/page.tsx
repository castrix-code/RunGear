"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type {
  CarryItem,
  Climate,
  DataInterest,
  ExperienceLevel,
  GearCategory,
  HydrationCarry,
  InjuryType,
  LaundryFrequency,
  Lighting,
  LongRunDuration,
  PrimaryGoal,
  QuizAnswers,
  SurfaceMix,
  TechComfort,
  TimeOfDay,
  TrafficExposure,
  TravelFrequency,
  WeeklyMileage,
} from "@/lib/types";

const STEPS = [
  { id: "basics", title: "Running basics" },
  { id: "profile", title: "Running profile" },
  { id: "env", title: "Environment & time" },
  { id: "surfaces", title: "Surfaces & events" },
  { id: "comfort", title: "Comfort & fit" },
  { id: "hydration", title: "Hydration & carrying" },
  { id: "safety", title: "Safety & visibility" },
  { id: "tech", title: "Tech & data" },
  { id: "style", title: "Style & brands" },
  { id: "lifestyle", title: "Lifestyle & recovery" },
];

const CATEGORY_LABELS: Record<GearCategory, string> = {
  shoes: "Shoes",
  clothes: "Clothes",
  hydration: "Hydration",
  accessories: "Accessories",
  watches: "Watches",
};

const INITIAL_ANSWERS: QuizAnswers = {
  runningStyle: "road",
  distance: "10k",
  terrain: "mixed",
  budget: "mid",
  priorityCategories: ["shoes"],
  experienceLevel: "beginner",
  weeklyMileage: "<10",
  primaryGoal: "fitness",
  climate: "mixed",
  timeOfDay: "morning",
  surfaceMix: "road",
  longRunDuration: "45-90",
  injuryHistory: [],
  hydrationCarry: [],
  carryItems: [],
  techComfort: "balanced",
  dataInterest: "training",
  stylePref: "performance_first",
  sustainability: "medium",
  laundryFreq: "weekly",
  travelFrequency: "local",
  recoveryFocus: [],
};

export default function QuizPage() {
  const router = useRouter();
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswers>(INITIAL_ANSWERS);

  function updateAnswer<K extends keyof QuizAnswers>(
    key: K,
    value: QuizAnswers[K]
  ) {
    setAnswers((prev) => ({ ...prev, [key]: value }));
  }

  function toggleCategory(cat: GearCategory) {
    setAnswers((prev) => {
      const next = prev.priorityCategories.includes(cat)
        ? prev.priorityCategories.filter((c) => c !== cat)
        : [...prev.priorityCategories, cat];
      return { ...prev, priorityCategories: next };
    });
  }

  function toggleMulti<K extends keyof QuizAnswers, V extends string>(
    key: K,
    value: V
  ) {
    setAnswers((prev) => {
      const current = ((prev[key] as unknown as V[]) ?? []) as V[];
      const exists = current.includes(value);
      const next = exists
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [key]: next as unknown as QuizAnswers[K] };
    });
  }

  const [isPending, startTransition] = useTransition();

  function handleSubmit() {
    startTransition(() => {
      const params = new URLSearchParams();
    params.set("quiz", "1");
      params.set(
        "answers",
        btoa(encodeURIComponent(JSON.stringify(answers)))
      );
      router.push(`/catalog?${params.toString()}`);
    });
  }

  const isLastStep = step === STEPS.length - 1;

  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6">
      <h1 className="text-3xl font-bold text-neutral-900">
        Find Your Perfect Gear
      </h1>
      <p className="mt-2 text-neutral-600">
        Answer a few questions to get personalized recommendations.
      </p>

      <div className="mt-8">
        <div className="mb-8 flex gap-2">
          {STEPS.map((s, i) => (
            <div
              key={s.id}
              className={`h-1.5 flex-1 rounded-full ${
                i <= step ? "bg-accent" : "bg-neutral-200"
              }`}
            />
          ))}
        </div>

        <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
          {step === 0 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Running basics
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Let&apos;s start with the fundamentals.
              </p>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Where do you mostly run?
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["road", "trail", "both"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("runningStyle", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.runningStyle === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Typical distance
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["5k", "10k", "half", "full", "ultra"] as const).map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => updateAnswer("distance", opt)}
                          className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                            answers.distance === opt
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {opt === "half"
                            ? "Half marathon"
                            : opt === "full"
                            ? "Full marathon"
                            : opt}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Terrain
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["flat", "hills", "mixed"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("terrain", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.terrain === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Running profile
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Experience level
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["beginner", "intermediate", "advanced"] as ExperienceLevel[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("experienceLevel", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.experienceLevel === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Weekly mileage
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["<10", "10-25", "25-40", ">40"] as WeeklyMileage[]).map(
                      (opt) => (
                        <button
                          key={opt}
                          onClick={() => updateAnswer("weeklyMileage", opt)}
                          className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                            answers.weeklyMileage === opt
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {opt} miles/week
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Main running goal
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      [
                        "fitness",
                        "race_pr",
                        "weight_loss",
                        "trail_adventure",
                        "ultra",
                      ] as PrimaryGoal[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("primaryGoal", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                          answers.primaryGoal === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt === "race_pr"
                          ? "Race a PR"
                          : opt === "trail_adventure"
                          ? "Trail adventures"
                          : opt.charAt(0).toUpperCase() + opt.slice(1).replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Environment & time
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Typical climate
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["hot", "cold", "mixed"] as Climate[]).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("climate", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.climate === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    When do you usually run?
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["morning", "day", "evening", "night"] as TimeOfDay[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("timeOfDay", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.timeOfDay === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Surfaces & events
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Mix of surfaces in a typical week
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["road", "mixed", "trail", "technical_trail"] as SurfaceMix[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("surfaceMix", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.surfaceMix === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Longest runs
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["<45", "45-90", "90-150", ">150"] as LongRunDuration[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("longRunDuration", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                          answers.longRunDuration === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt === "<45"
                          ? "<45 min"
                          : opt === ">150"
                          ? "2.5+ hours"
                          : opt.replace("-", "–") + " min"}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Comfort & fit
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Cushioning preference (shoes)
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(["soft", "balanced", "firm"] as const).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("cushionPref", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.cushionPref === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Support preference
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["neutral", "mild_support", "strong_stability", "unsure"] as const
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("supportPref", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.supportPref === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Injury history (optional)
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Select any that apply – we&apos;ll gently bias gear to help.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      [
                        "none",
                        "plantar",
                        "shin_splints",
                        "knee",
                        "it_band",
                        "achilles",
                        "other",
                      ] as InjuryType[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => toggleMulti("injuryHistory", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          (answers.injuryHistory ?? []).includes(opt)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 5 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Hydration & carrying
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    How do you prefer to carry water?
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Select all that appeal to you.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["handheld", "belt", "vest", "none"] as HydrationCarry[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => toggleMulti("hydrationCarry", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          (answers.hydrationCarry ?? []).includes(opt)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    What do you usually carry?
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Select all that apply.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      [
                        "phone",
                        "keys",
                        "id_cards",
                        "gels",
                        "poles",
                        "nothing",
                      ] as CarryItem[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => toggleMulti("carryItems", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          (answers.carryItems ?? []).includes(opt)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 6 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Safety & visibility
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Traffic exposure
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["paths", "quiet_streets", "busy_roads"] as TrafficExposure[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("trafficExposure", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.trafficExposure === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Lighting conditions
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["well_lit", "suburban", "dark_trails", "rural"] as Lighting[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("lighting", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.lighting === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 7 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Tech & data
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Comfort with techy gear
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["simple", "balanced", "advanced"] as TechComfort[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("techComfort", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.techComfort === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    How much data do you care about?
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["basic", "training", "advanced_metrics"] as DataInterest[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("dataInterest", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.dataInterest === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 8 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Style & brands
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Favorite brands (optional)
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    We&apos;ll still show alternatives.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {["Nike", "adidas", "Brooks", "Hoka", "Saucony", "Garmin"].map(
                      (brand) => (
                        <button
                          key={brand}
                          onClick={() => toggleMulti("brandAffinity", brand)}
                          className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                            (answers.brandAffinity ?? []).includes(brand)
                              ? "border-accent bg-accent/10 text-accent"
                              : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                          }`}
                        >
                          {brand}
                        </button>
                      )
                    )}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Style preference
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["neutral", "bright", "performance_first"] as const
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("stylePref", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.stylePref === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {step === 9 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Lifestyle & recovery
              </h2>
              <div className="mt-6 space-y-6">
                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Laundry routine
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["often", "weekly", "rare"] as LaundryFrequency[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("laundryFreq", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.laundryFreq === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Travel for runs or races
                  </h3>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      ["local", "sometimes", "often"] as TravelFrequency[]
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => updateAnswer("travelFrequency", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          answers.travelFrequency === opt
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="text-sm font-medium text-neutral-800">
                    Post‑run recovery focus
                  </h3>
                  <p className="mt-1 text-xs text-neutral-500">
                    Select all that you care about.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-3">
                    {(
                      [
                        "foam_rolling",
                        "massage",
                        "compression",
                        "sleep",
                        "nutrition",
                      ] as const
                    ).map((opt) => (
                      <button
                        key={opt}
                        onClick={() => toggleMulti("recoveryFocus", opt)}
                        className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                          (answers.recoveryFocus ?? []).includes(opt)
                            ? "border-accent bg-accent/10 text-accent"
                            : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                        }`}
                      >
                        {opt.replace("_", " ")}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          <div className="mt-8 flex justify-between">
            <button
              onClick={() => setStep((s) => Math.max(0, s - 1))}
              disabled={step === 0}
              className="rounded-lg px-4 py-2 text-sm font-medium text-neutral-600 disabled:opacity-50 hover:bg-neutral-100"
            >
              Back
            </button>
            {isLastStep ? (
              <button
                onClick={handleSubmit}
                disabled={isPending}
                className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover disabled:opacity-70"
              >
                {isPending ? "Loading..." : "See your picks"}
              </button>
            ) : (
              <button
                onClick={() => setStep((s) => Math.min(STEPS.length - 1, s + 1))}
                className="rounded-lg bg-accent px-6 py-2 text-sm font-semibold text-white transition hover:bg-accent-hover"
              >
                Next
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
