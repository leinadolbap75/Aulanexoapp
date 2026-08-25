import { cn } from "@/lib/utils";

export function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={cn("size-8", className)} aria-hidden="true">
      <rect x="3.5" y="4.5" width="17" height="23" rx="3.5" className="fill-primary" />
      <rect x="11.5" y="8.5" width="17" height="19" rx="3.5" className="fill-foreground" />
      <path
        d="M16 14.5h8.5M16 18.5h6.5M16 22.5h4"
        className="stroke-background"
        strokeWidth="1.6"
        strokeLinecap="round"
      />
    </svg>
  );
}
