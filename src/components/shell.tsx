import { Link, useRouterState } from "@tanstack/react-router";
import {
  BookOpen,
  ClipboardList,
  GraduationCap,
  LayoutDashboard,
  Menu,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";
import { Mark } from "@/components/mark";
import { Badge } from "@/components/ui/badge";
import { COURSE, YEAR_LABEL } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { ROLE_LABEL } from "@/lib/types";
import { cn } from "@/lib/utils";

const NAV = [
  { to: "/", label: "Inicio", icon: LayoutDashboard },
  { to: "/deberes", label: "Deberes", icon: ClipboardList },
  { to: "/evaluaciones", label: "Pruebas", icon: BookOpen },
  { to: "/calificaciones", label: "Notas", icon: GraduationCap },
  { to: "/mas", label: "Más", icon: Menu },
] as const;

export function Shell({ children }: { children: ReactNode }) {
  const [ready, setReady] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const schoolName = useAppStore((s) => s.schoolName);
  const role = useAppStore((s) => s.role);

  useEffect(() => {
    void useAppStore.persist.rehydrate().then(() => setReady(true));
  }, []);

  if (!ready) {
    return (
      <div className="flex min-h-dvh flex-col items-center justify-center gap-4 bg-background text-foreground">
        <Mark className="size-12" />
        <p className="font-display text-2xl tracking-tight">AulaNexo</p>
        <p className="text-sm text-muted-foreground">Cargando bitácora del curso</p>
      </div>
    );
  }

  return (
    <div className="min-h-dvh overflow-x-hidden bg-background text-foreground">
      <div className="mx-auto flex min-h-dvh min-w-0 max-w-6xl">
        <aside className="no-print sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border/80 bg-card/60 px-3 py-5 md:flex">
          <Brand schoolName={schoolName} />
          <nav className="mt-8 flex flex-1 flex-col gap-1">
            {NAV.map((item) => (
              <NavLink key={item.to} {...item} active={isActive(pathname, item.to)} />
            ))}
          </nav>
          <Badge tone="primary" className="self-start">
            {ROLE_LABEL[role]}
          </Badge>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <header className="no-print sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur-sm md:px-6">
            <div className="min-w-0 flex-1 md:hidden">
              <Brand schoolName={schoolName} compact />
            </div>
            <div className="hidden min-w-0 md:block">
              <p className="truncate text-sm text-muted-foreground">
                {COURSE} · {YEAR_LABEL}
              </p>
            </div>
            <Badge tone="primary">{ROLE_LABEL[role]}</Badge>
          </header>

          <main className="min-w-0 flex-1 px-4 py-5 pb-28 md:px-8 md:pb-10">{children}</main>
        </div>
      </div>

      <nav className="no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden">
        <ul className="grid grid-cols-5">
          {NAV.map((item) => {
            const Icon = item.icon;
            const active = isActive(pathname, item.to);
            return (
              <li key={item.to}>
                <Link
                  to={item.to}
                  className={cn(
                    "flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium",
                    active ? "text-primary" : "text-muted-foreground",
                  )}
                >
                  <Icon className="size-5" strokeWidth={active ? 2.2 : 1.8} />
                  {item.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </div>
  );
}

function Brand({ schoolName, compact }: { schoolName: string; compact?: boolean }) {
  return (
    <div className="flex min-w-0 items-center gap-2.5">
      <Mark className="size-8 shrink-0" />
      <div className="min-w-0">
        <p className="font-display text-lg leading-none tracking-tight">AulaNexo</p>
        <p className={cn("truncate text-xs text-muted-foreground", compact && "max-w-xs")}>
          {schoolName}
        </p>
      </div>
    </div>
  );
}

function NavLink({
  to,
  label,
  icon: Icon,
  active,
}: {
  to: string;
  label: string;
  icon: typeof LayoutDashboard;
  active: boolean;
}) {
  return (
    <Link
      to={to}
      className={cn(
        "flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors duration-150",
        active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground",
      )}
    >
      <Icon className="size-4" />
      {label}
    </Link>
  );
}

function isActive(pathname: string, to: string) {
  if (to === "/") return pathname === "/";
  return pathname === to || pathname.startsWith(`${to}/`);
}
