"use client";

import { useState } from "react";
import type { GearItem, QuizAnswers } from "@/lib/types";
import ResultsCard from "@/components/ResultsCard";
import NavigationActions from "@/components/NavigationActions";

interface ResultsClientProps {
  recommendations: Array<{
    item: GearItem;
    score: number;
    reasons: string[];
  }>;
  quizAnswers: QuizAnswers;
}

export default function ResultsClient({ recommendations, quizAnswers }: ResultsClientProps) {
  const [isSharing, setIsSharing] = useState(false);

  const handleShare = async () => {
    setIsSharing(true);
    try {
      const shareData = {
        title: "My Running Gear Recommendations",
        text: `Check out my personalized running gear recommendations from RunGear!`,
        url: window.location.href,
      };

      if (navigator.share) {
        await navigator.share(shareData);
      } else {
        // Fallback: copy to clipboard
        await navigator.clipboard.writeText(window.location.href);
        alert("Results link copied to clipboard!");
      }
    } catch (error) {
      console.error("Error sharing:", error);
    } finally {
      setIsSharing(false);
    }
  };

  const handleRetakeQuiz = () => {
    window.location.href = "/quiz";
  };

  const handleBrowseCatalog = () => {
    const params = new URLSearchParams();
    params.set("quiz", "1");
    params.set("answers", btoa(encodeURIComponent(JSON.stringify(quizAnswers))));
    window.location.href = `/catalog?${params.toString()}`;
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center">
        <h1 className="text-4xl font-bold text-neutral-900">
          Your Personalized Gear Recommendations
        </h1>
        <p className="mt-3 text-lg text-neutral-600">
          Based on your quiz answers, here are the top matches for your running needs
        </p>
      </div>

      {/* Results Grid */}
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {recommendations.map((rec, index) => (
          <ResultsCard
            key={rec.item.id}
            item={rec.item}
            score={rec.score}
            reasons={rec.reasons}
            rank={index + 1}
          />
        ))}
      </div>

      {/* Empty State */}
      {recommendations.length === 0 && (
        <div className="text-center py-12">
          <div className="mx-auto max-w-md">
            <h2 className="text-2xl font-semibold text-neutral-900">
              No Perfect Matches Found
            </h2>
            <p className="mt-4 text-neutral-600">
              We couldn't find gear that perfectly matches your preferences. 
              Try adjusting your quiz answers or browse our full catalog.
            </p>
          </div>
        </div>
      )}

      {/* Navigation Actions */}
      <NavigationActions
        onRetakeQuiz={handleRetakeQuiz}
        onBrowseCatalog={handleBrowseCatalog}
        onShare={handleShare}
        isSharing={isSharing}
        hasRecommendations={recommendations.length > 0}
      />
    </div>
  );
}
