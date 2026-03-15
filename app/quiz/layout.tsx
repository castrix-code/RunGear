import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Find Your Gear | RunGear Quiz",
  description:
    "Answer a few questions to get personalized running gear recommendations.",
};

export default function QuizLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
