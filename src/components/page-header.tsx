import type { ReactNode } from "react";

export function PageHeader({
  kicker,
  title,
  hint,
  action,
}: {
  kicker: string;
  title: string;
  hint?: string;
  action?: ReactNode;
}) {
  return (
    <div className="mb-6 flex min-w-0 items-start justify-between gap-3">
      <div className="min-w-0">
        <p className="text-[11px] font-medium tracking-[0.16em] text-muted-foreground uppercase">{kicker}</p>
        <h1 className="mt-1 text-3xl md:text-4xl">{title}</h1>
        {hint ? <p className="mt-1 max-w-xl text-sm text-muted-foreground">{hint}</p> : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  );
}
