import { createFileRoute, Link } from "@tanstack/react-router";
import { Bell, FileBarChart, Settings, Users } from "lucide-react";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";

export const Route = createFileRoute("/mas")({ component: MorePage });

const ITEMS = [
  { to: "/estudiantes", title: "Estudiantes", hint: "Nómina, fichas y riesgo", icon: Users },
  { to: "/reportes", title: "Reportes", hint: "Mensual, trimestral y anual", icon: FileBarChart },
  { to: "/comunicaciones", title: "Comunicaciones", hint: "Avisos a padres de familia", icon: Bell },
  { to: "/ajustes", title: "Ajustes", hint: "Rol, institución y datos locales", icon: Settings },
] as const;

function MorePage() {
  return (
    <div>
      <PageHeader kicker="AulaNexo" title="Más" hint="Nómina, reportes institucionales, avisos y ajustes del teléfono." />
      <ul className="space-y-2">
        {ITEMS.map((item) => {
          const Icon = item.icon;
          return (
            <li key={item.to}>
              <Link to={item.to}>
                <Card className="flex min-h-16 items-center gap-3 p-4">
                  <span className="flex size-11 items-center justify-center rounded-lg bg-muted">
                    <Icon className="size-5" />
                  </span>
                  <div>
                    <p className="font-medium">{item.title}</p>
                    <p className="text-sm text-muted-foreground">{item.hint}</p>
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
