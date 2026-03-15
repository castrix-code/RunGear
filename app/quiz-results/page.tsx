import { Suspense } from "react";
import type { Metadata } from "next";
import type { GearItem, QuizAnswers } from "@/lib/types";
import { getTopRecommendationsWithReasons } from "@/lib/recommend";
import ResultsClient from "./ResultsClient";

interface ResultsPageProps {
  searchParams: Promise<{
    answers?: string;
  }>;
}

export const metadata: Metadata = {
  title: "Your Personalized Gear Recommendations | RunGear",
  description: "Discover the perfect running gear matched to your preferences and needs.",
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

export default async function ResultsPage({ searchParams }: ResultsPageProps) {
  const params = await searchParams;
  const quizAnswers = parseQuizAnswers(params.answers);

  if (!quizAnswers) {
    return (
      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold text-neutral-900">
            No Quiz Results Found
          </h1>
          <p className="mt-4 text-neutral-600">
            Please take the quiz to get personalized recommendations.
          </p>
          <a
            href="/quiz"
            className="mt-6 inline-block rounded-lg bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover"
          >
            Take Quiz
          </a>
        </div>
      </div>
    );
  }

  const recommendations = getTopRecommendationsWithReasons(quizAnswers);

  return (
    <div className="mx-auto max-w-6xl px-4 py-8 sm:px-6">
      <Suspense fallback={<div className="h-64 animate-pulse rounded-xl bg-neutral-100" />}>
        <ResultsClient recommendations={recommendations} quizAnswers={quizAnswers} />
      </Suspense>
    </div>
  );
}
