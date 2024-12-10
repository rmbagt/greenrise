import { Progress } from "@/Components/ui/progress";

interface DonationProgressProps {
  current: number;
  target: number;
}

export function DonationProgress({ current, target }: DonationProgressProps) {
  const percentage = Math.min((current / target) * 100, 100);

  return (
    <div className="space-y-2">
      <Progress value={percentage} className="h-2" />
      <div className="flex justify-between text-sm text-muted-foreground">
        <span>${current.toLocaleString()}</span>
        <span>${target.toLocaleString()}</span>
      </div>
    </div>
  );
}
