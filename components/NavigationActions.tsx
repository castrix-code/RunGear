interface NavigationActionsProps {
  onRetakeQuiz: () => void;
  onBrowseCatalog: () => void;
  onShare: () => void;
  isSharing: boolean;
  hasRecommendations: boolean;
}

export default function NavigationActions({
  onRetakeQuiz,
  onBrowseCatalog,
  onShare,
  isSharing,
  hasRecommendations,
}: NavigationActionsProps) {
  return (
    <div className="rounded-2xl border border-neutral-200 bg-white p-6 shadow-sm">
      <h2 className="text-lg font-semibold text-neutral-900 mb-4">
        Want to explore more?
      </h2>
      
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <button
          onClick={onRetakeQuiz}
          className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="h-6 w-6 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
              />
            </svg>
            <span>Retake Quiz</span>
          </div>
        </button>

        <button
          onClick={onBrowseCatalog}
          className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50"
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="h-6 w-6 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
              />
            </svg>
            <span>Browse Full Catalog</span>
          </div>
        </button>

        <button
          onClick={onShare}
          disabled={isSharing}
          className="rounded-lg border border-neutral-200 px-4 py-3 text-sm font-medium text-neutral-700 transition hover:border-neutral-300 hover:bg-neutral-50 disabled:opacity-50"
        >
          <div className="flex flex-col items-center space-y-2">
            <svg
              className="h-6 w-6 text-neutral-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m9.032 4.026a9.001 9.001 0 01-7.432 0m9.032-4.026A9.001 9.001 0 0112 3c-4.474 0-8.268 3.12-9.032 7.326m0 0A9.001 9.001 0 0012 21c4.474 0 8.268-3.12 9.032-7.326"
              />
            </svg>
            <span>{isSharing ? "Sharing..." : "Share Results"}</span>
          </div>
        </button>

        {hasRecommendations && (
          <button className="rounded-lg bg-accent px-4 py-3 text-sm font-semibold text-white transition hover:bg-accent-hover">
            <div className="flex flex-col items-center space-y-2">
              <svg
                className="h-6 w-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.446 2.293l6.614 6.614c.586.63 1.663.076 2.293-.447L19 14m-7-7l-2.293 2.293c-.63.63-.184 1.707.446 2.293"
                />
              </svg>
              <span>Shop All Picks</span>
            </div>
          </button>
        )}
      </div>
    </div>
  );
}
