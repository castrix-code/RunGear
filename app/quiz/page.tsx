"use client";

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import type { GearCategory, QuizAnswers } from "@/lib/types";

const STEPS = [
  { id: "style", title: "Running style" },
  { id: "distance", title: "Typical distance" },
  { id: "terrain", title: "Terrain" },
  { id: "budget", title: "Budget" },
  { id: "categories", title: "Priority categories" },
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
                Where do you run?
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
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
          )}

          {step === 1 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Typical distance
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {(["5k", "10k", "half", "full", "ultra"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateAnswer("distance", opt)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                      answers.distance === opt
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {opt === "half" ? "Half Marathon" : opt === "full" ? "Full Marathon" : opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 2 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Terrain
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
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
          )}

          {step === 3 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Budget
              </h2>
              <div className="mt-4 flex flex-wrap gap-3">
                {(["budget", "mid", "premium"] as const).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => updateAnswer("budget", opt)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium capitalize transition ${
                      answers.budget === opt
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {step === 4 && (
            <div>
              <h2 className="text-lg font-semibold text-neutral-900">
                Which categories matter most?
              </h2>
              <p className="mt-1 text-sm text-neutral-500">
                Select all that apply
              </p>
              <div className="mt-4 flex flex-wrap gap-3">
                {(Object.keys(CATEGORY_LABELS) as GearCategory[]).map((opt) => (
                  <button
                    key={opt}
                    onClick={() => toggleCategory(opt)}
                    className={`rounded-lg border-2 px-4 py-2 text-sm font-medium transition ${
                      answers.priorityCategories.includes(opt)
                        ? "border-accent bg-accent/10 text-accent"
                        : "border-neutral-200 text-neutral-600 hover:border-neutral-300"
                    }`}
                  >
                    {CATEGORY_LABELS[opt]}
                  </button>
                ))}
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
