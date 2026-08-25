import { Drawer as Vaul } from "vaul";
import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

export function Drawer({
  open,
  onOpenChange,
  title,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  title: string;
  children: ReactNode;
}) {
  return (
    <Vaul.Root open={open} onOpenChange={onOpenChange}>
      <Vaul.Portal>
        <Vaul.Overlay className="fixed inset-0 z-50 bg-foreground/30" />
        <Vaul.Content
          className={cn(
            "fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92vh] flex-col rounded-t-2xl bg-card text-card-foreground shadow-border",
          )}
        >
          <div className="mx-auto mt-3 h-1 w-10 rounded-full bg-border" />
          <Vaul.Title className="px-5 pt-4 font-display text-xl font-medium tracking-tight">
            {title}
          </Vaul.Title>
          <div className="overflow-y-auto px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]">
            {children}
          </div>
        </Vaul.Content>
      </Vaul.Portal>
    </Vaul.Root>
  );
}
