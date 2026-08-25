import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { Bar, BarChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { ApprovalBadge, GradeNum } from "@/components/grade";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { NativeSelect } from "@/components/ui/input";
import { courseAverage, finalAverage, homeworkRate } from "@/lib/grades";
import { useScope } from "@/lib/scope";
import { COURSE, YEAR_LABEL } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import type { ReportAudience, ReportPeriod } from "@/lib/types";
import { APPROVAL_LABEL, PASSING } from "@/lib/types";
import { approvalOf } from "@/lib/grades";

type Search = { student?: string };

export const Route = createFileRoute("/reportes")({
  validateSearch: (raw: Record<string, unknown>): Search => ({
    student: typeof raw.student === "string" ? raw.student : undefined,
  }),
  component: ReportesPage,
});

function ReportesPage() {
  const search = Route.useSearch();
  const { students, role } = useScope();
  const schoolName = useAppStore((s) => s.schoolName);
  const subjects = useAppStore((s) => s.subjects);
  const homeworks = useAppStore((s) => s.homeworks);
  const evaluations = useAppStore((s) => s.evaluations);
  const [period, setPeriod] = useState<ReportPeriod>("trimestral");
  const [audience, setAudience] = useState<ReportAudience>(
    role === "dece" ? "dece" : role === "rector" ? "rectorado" : role === "familia" ? "familia" : "vicerrectorado",
  );
  const [studentId, setStudentId] = useState(search.student ?? (students.length === 1 ? students[0]!.id : "grupo"));
  const [chartReady, setChartReady] = useState(false);
  useEffect(() => {
    setChartReady(true);
  }, []);

  const scoped = studentId === "grupo" ? students : students.filter((s) => s.id === studentId);
  const avg = courseAverage(scoped, homeworks, evaluations);
  const approved = scoped.filter((s) => {
    const n = finalAverage(homeworks, evaluations, s.id);
    return n !== null && n >= PASSING;
  }).length;
  const risk = scoped.filter((s) => {
    const n = finalAverage(homeworks, evaluations, s.id);
    return n !== null && n < PASSING;
  });

  const chart = useMemo(
    () =>
      subjects.map((sub) => ({
        name: sub.short,
        promedio:
          courseAverage(
            scoped,
            homeworks.filter((h) => h.subjectId === sub.id),
            evaluations.filter((e) => e.subjectId === sub.id),
          ) ?? 0,
      })),
    [subjects, scoped, homeworks, evaluations],
  );

  const audienceCopy: Record<ReportAudience, string> = {
    dece: "Enfoque socioemocional: incumplimiento de deberes, riesgo de reprobación y recomendaciones de acompañamiento.",
    vicerrectorado: "Enfoque académico: promedios por asignatura, aprobación y estudiantes que requieren recuperación.",
    rectorado: "Síntesis institucional del periodo para junta y archivo de dirección.",
    familia: "Informe claro del desempeño de tu hijo o hija, con logros e incumplimientos.",
  };

  return (
    <div>
      <PageHeader
        kicker="Documentos"
        title="Reportes"
        hint="Mensual, trimestral o anual · individual o grupal · DECE, vicerrectorado, rectorado o familia."
        action={
          <Button variant="outline" className="no-print" onClick={() => window.print()}>
            Imprimir / PDF
          </Button>
        }
      />

      <div className="no-print mb-6 grid gap-3 sm:grid-cols-3">
        <NativeSelect value={period} onChange={(e) => setPeriod(e.target.value as ReportPeriod)}>
          <option value="mensual">Mensual · agosto 2026</option>
          <option value="trimestral">Trimestral · 1.er trimestre</option>
          <option value="anual">Anual · {YEAR_LABEL.split("·")[0]}</option>
        </NativeSelect>
        <NativeSelect value={audience} onChange={(e) => setAudience(e.target.value as ReportAudience)}>
          <option value="dece">DECE</option>
          <option value="vicerrectorado">Vicerrectorado</option>
          <option value="rectorado">Rectorado</option>
          <option value="familia">Familia</option>
        </NativeSelect>
        <NativeSelect value={studentId} onChange={(e) => setStudentId(e.target.value)}>
          {students.length > 1 ? <option value="grupo">Grupo · {COURSE}</option> : null}
          {students.map((s) => (
            <option key={s.id} value={s.id}>
              {s.firstName} {s.lastName}
            </option>
          ))}
        </NativeSelect>
      </div>

      <article className="rounded-2xl bg-card p-5 shadow-border md:p-8">
        <p className="text-xs tracking-[0.16em] text-muted-foreground uppercase">{schoolName}</p>
        <h2 className="mt-1 font-display text-2xl">
          Informe {period} · {audience === "familia" ? "familia" : audience}
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">
          {COURSE} · {YEAR_LABEL} · {studentId === "grupo" ? "grupo completo" : scoped[0] ? `${scoped[0].firstName} ${scoped[0].lastName}` : ""}
        </p>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed">{audienceCopy[audience]}</p>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-4">
          <Mini label="Promedio" value={<GradeNum value={avg} className="text-xl" />} />
          <Mini label="Aprobación" value={<span className="text-xl tabular-nums">{approved}/{scoped.length}</span>} />
          <Mini label="En riesgo" value={<span className="text-xl tabular-nums">{risk.length}</span>} />
          <Mini
            label="Periodo"
            value={<span className="text-sm font-medium capitalize">{period}</span>}
          />
        </div>

        <div className="mt-8 h-52">
          <p className="mb-2 text-xs text-muted-foreground">Promedio por asignatura</p>
          {chartReady ? (
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chart} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                <CartesianGrid stroke="var(--color-border)" vertical={false} />
                <XAxis dataKey="name" tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis domain={[0, 10]} tick={{ fill: "var(--color-muted-foreground)", fontSize: 12 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{
                    background: "var(--color-card)",
                    border: "1px solid var(--color-border)",
                    borderRadius: 12,
                  }}
                />
                <Bar dataKey="promedio" fill="var(--color-primary)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full rounded-xl bg-muted" />
          )}
        </div>

        <h3 className="mt-10 font-display text-xl">Detalle</h3>
        <ul className="mt-3 divide-y divide-border">
          {scoped.map((s) => {
            const n = finalAverage(homeworks, evaluations, s.id);
            const a = approvalOf(n);
            const rate = homeworkRate(homeworks, s.id);
            return (
              <li key={s.id} className="flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="font-medium">
                    {s.firstName} {s.lastName}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Cumplimiento de deberes {Math.round(rate * 100)}%
                    {audience === "dece" ? ` · ${s.notes}` : ""}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <GradeNum value={n} />
                  <ApprovalBadge value={n} />
                  {a ? <span className="sr-only">{APPROVAL_LABEL[a]}</span> : null}
                </div>
              </li>
            );
          })}
        </ul>

        {audience === "dece" && risk.length > 0 ? (
          <Card className="mt-6 bg-muted p-4 shadow-none">
            <CardTitle>Recomendación DECE</CardTitle>
            <CardMeta className="mt-2">
              Convocar a las familias de {risk.map((s) => s.firstName).join(", ")} y abrir plan de acompañamiento
              (hábitos, asistencia a refuerzo y seguimiento quincenal).
            </CardMeta>
          </Card>
        ) : null}

        {audience === "rectorado" ? (
          <p className="mt-6 text-sm text-muted-foreground">
            El vicerrectorado académico valida las actas. Este informe queda disponible para junta y archivo del
            periodo {period}.
          </p>
        ) : null}
      </article>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: ReactNode }) {
  return (
    <div className="rounded-xl bg-muted/80 p-3">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-1">{value}</div>
    </div>
  );
}
