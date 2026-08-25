import { initials } from "@/lib/utils";
import { cn } from "@/lib/utils";

export function Avatar({ name, className }: { name: string; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary font-medium text-xs tracking-wide text-secondary-foreground",
        className,
      )}
    >
      {initials(name)}
    </span>
  );
}
