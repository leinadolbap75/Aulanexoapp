import { Badge } from "@/components/ui/badge";
import { APPROVAL_LABEL, type Approval } from "@/lib/types";
import { approvalOf } from "@/lib/grades";
import { cn } from "@/lib/utils";

export function GradeNum({ value, className }: { value: number | null; className?: string }) {
  if (value === null) {
    return <span className={cn("tabular-nums text-muted-foreground", className)}>—</span>;
  }
  const tone =
    value >= 7 ? "text-ok" : value >= 5 ? "text-warn" : "text-destructive";
  return <span className={cn("tabular-nums font-medium", tone, className)}>{value.toFixed(1)}</span>;
}

export function ApprovalBadge({ value }: { value: number | null }) {
  const a: Approval | null = approvalOf(value);
  if (!a) return <Badge>Sin nota</Badge>;
  const tone = a === "aprobado" ? "ok" : a === "supletorio" ? "warn" : "danger";
  return <Badge tone={tone}>{APPROVAL_LABEL[a]}</Badge>;
}
