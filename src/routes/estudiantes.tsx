import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { Avatar } from "@/components/avatar";
import { ApprovalBadge, GradeNum } from "@/components/grade";
import { Meter } from "@/components/meter";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { finalAverage, homeworkRate } from "@/lib/grades";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/estudiantes")({ component: StudentsPage });

function StudentsPage() {
  const { students } = useScope();
  const homeworks = useAppStore((s) => s.homeworks);
  const evaluations = useAppStore((s) => s.evaluations);
  const [q, setQ] = useState("");

  const rows = useMemo(() => {
    const needle = q.trim().toLowerCase();
    return students
      .filter((s) =>
        needle ? `${s.firstName} ${s.lastName} ${s.parentName}`.toLowerCase().includes(needle) : true,
      )
      .map((s) => ({
        s,
        avg: finalAverage(homeworks, evaluations, s.id),
        rate: homeworkRate(homeworks, s.id),
      }))
      .sort((a, b) => (a.avg ?? 99) - (b.avg ?? 99));
  }, [students, homeworks, evaluations, q]);

  return (
    <div>
      <PageHeader kicker="Nómina" title="Estudiantes" hint="Desempeño, cumplimiento y ficha para DECE o dirección." />
      <Input
        className="mb-4"
        placeholder="Buscar por nombre o familia"
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />
      <ul className="space-y-2">
        {rows.map(({ s, avg, rate }) => (
          <li key={s.id}>
            <Link to="/estudiantes/$id" params={{ id: s.id }}>
              <Card className="flex items-center gap-3 p-3">
                <Avatar name={`${s.firstName} ${s.lastName}`} />
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium">
                    {s.firstName} {s.lastName}
                  </p>
                  <Meter className="mt-2 max-w-40" value={rate} />
                </div>
                <div className="flex flex-col items-end gap-1">
                  <GradeNum value={avg} className="text-lg" />
                  <ApprovalBadge value={avg} />
                </div>
              </Card>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
