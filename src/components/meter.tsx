import { cn } from "@/lib/utils";

export function Meter({ value, className }: { value: number; className?: string }) {
  const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
  return (
    <div className={cn("h-1.5 overflow-hidden rounded-full bg-muted", className)}>
      <div className="h-full rounded-full bg-primary transition-[width] duration-200 ease-out" style={{ width: `${pct}%` }} />
    </div>
  );
}
