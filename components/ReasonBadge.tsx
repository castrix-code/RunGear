interface ReasonBadgeProps {
  reason: string;
}

export default function ReasonBadge({ reason }: ReasonBadgeProps) {
  return (
    <div className="rounded-full bg-accent/10 px-3 py-1 text-xs font-medium text-accent">
      {reason}
    </div>
  );
}
