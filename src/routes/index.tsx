import { createFileRoute, Link } from "@tanstack/react-router";
import { AlertTriangle, ArrowRight, Bell, ClipboardCheck, FilePen } from "lucide-react";
import type { ReactNode } from "react";
import { ApprovalBadge, GradeNum } from "@/components/grade";
import { PageHeader } from "@/components/page-header";
import { Avatar } from "@/components/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { formatDay } from "@/lib/format";
import { courseAverage, finalAverage, homeworkRate } from "@/lib/grades";
import { useScope } from "@/lib/scope";
import { COURSE } from "@/lib/seed";
import { useAppStore } from "@/lib/store";
import { ROLE_HINT, SUBMISSION_LABEL } from "@/lib/types";

export const Route = createFileRoute("/")({ component: Home });

function Home() {
  const { role, canEdit, students, ids, isFamily } = useScope();
  const homeworks = useAppStore((s) => s.homeworks);
  const evaluations = useAppStore((s) => s.evaluations);
  const messages = useAppStore((s) => s.messages);
  const schoolName = useAppStore((s) => s.schoolName);

  const avg = courseAverage(students, homeworks, evaluations);
  const atRisk = students.filter((s) => {
    const n = finalAverage(homeworks, evaluations, s.id);
    return n !== null && n < 7;
  });
  const pendingHw = homeworks.filter((h) => h.submissions.some((x) => ids.has(x.studentId) && x.status === "pendiente"));
  const missing = homeworks.flatMap((h) =>
    h.submissions
      .filter((x) => ids.has(x.studentId) && x.status === "no_entregado")
      .map((x) => ({ hw: h, studentId: x.studentId })),
  );
  const upcoming = evaluations
    .filter((e) => e.status === "programada" || e.status === "en_curso" || e.status === "borrador")
    .slice()
    .sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
  const queued = messages.filter((m) => m.status === "cola" && ids.has(m.studentId));
  const inbox = messages.filter((m) => m.status === "enviado" && ids.has(m.studentId)).slice(0, 3);

  return (
    <div className="enter-stagger min-w-0">
      <PageHeader
        kicker={schoolName}
        title={isFamily ? "El curso de tu hijo" : COURSE}
        hint={ROLE_HINT[role]}
      />

      <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
        <Stat label="Promedio del grupo" value={<GradeNum value={avg} className="text-2xl" />} />
        <Stat
          label="En riesgo"
          value={<span className="text-2xl tabular-nums font-medium">{atRisk.length}</span>}
          hint="Promedio menor a 7.0"
        />
        <Stat
          label="Deberes abiertos"
          value={<span className="text-2xl tabular-nums font-medium">{pendingHw.length}</span>}
        />
        <Stat
          label="Pruebas próximas"
          value={<span className="text-2xl tabular-nums font-medium">{upcoming.length}</span>}
        />
      </div>

      {canEdit ? (
        <div className="mt-5 flex flex-wrap gap-2">
          <Button asChild>
            <Link to="/deberes">
              Nuevo deber
              <ArrowRight />
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link to="/evaluaciones">Programar evaluación</Link>
          </Button>
        </div>
      ) : null}

      <section className="mt-8 grid min-w-0 gap-4 lg:grid-cols-2">
        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <CardTitle>Estudiantes en seguimiento</CardTitle>
            <Link to="/estudiantes" className="text-sm text-primary">
              Ver lista
            </Link>
          </div>
          {atRisk.length === 0 ? (
            <CardMeta>Nadie está bajo la nota de aprobación.</CardMeta>
          ) : (
            <ul className="space-y-3">
              {atRisk.map((s) => {
                const n = finalAverage(homeworks, evaluations, s.id);
                const rate = homeworkRate(homeworks, s.id);
                return (
                  <li key={s.id}>
                    <Link
                      to="/estudiantes/$id"
                      params={{ id: s.id }}
                      className="flex min-h-11 min-w-0 items-center gap-3 rounded-lg px-1 hover:bg-muted"
                    >
                      <Avatar name={`${s.firstName} ${s.lastName}`} />
                      <div className="min-w-0 flex-1">
                        <p className="truncate font-medium">
                          {s.firstName} {s.lastName}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          Cumplimiento de deberes {Math.round(rate * 100)}%
                        </p>
                      </div>
                      <GradeNum value={n} />
                    </Link>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <ClipboardCheck className="size-4 text-muted-foreground" />
            <CardTitle>Verificación de deberes</CardTitle>
          </div>
          {pendingHw.length === 0 && missing.length === 0 ? (
            <CardMeta>No hay entregas pendientes de revisar.</CardMeta>
          ) : (
            <ul className="space-y-3">
              {pendingHw.slice(0, 4).map((h) => {
                const left = h.submissions.filter((x) => ids.has(x.studentId) && x.status === "pendiente").length;
                return (
                  <li key={h.id}>
                    <Link to="/deberes/$id" params={{ id: h.id }} className="block rounded-lg hover:bg-muted">
                      <div className="flex items-center justify-between gap-2 px-1 py-1">
                        <div className="min-w-0">
                          <p className="truncate font-medium">{h.title}</p>
                          <p className="text-xs text-muted-foreground">
                            Entrega {formatDay(h.due)} · {left} pendientes
                          </p>
                        </div>
                        <Badge>Revisar</Badge>
                      </div>
                    </Link>
                  </li>
                );
              })}
              {missing.slice(0, 3).map(({ hw, studentId }) => {
                const st = students.find((s) => s.id === studentId);
                return (
                  <li key={`${hw.id}-${studentId}`} className="flex min-w-0 items-center gap-2 px-1 text-sm">
                    <AlertTriangle className="size-3.5 shrink-0 text-destructive" />
                    <span className="min-w-0 flex-1 truncate">
                      {st?.firstName} · {hw.title}
                    </span>
                    <Badge tone="danger" className="shrink-0">
                      {SUBMISSION_LABEL.no_entregado}
                    </Badge>
                  </li>
                );
              })}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center gap-2">
            <FilePen className="size-4 text-muted-foreground" />
            <CardTitle>Evaluaciones</CardTitle>
          </div>
          {upcoming.length === 0 ? (
            <CardMeta>No hay pruebas programadas.</CardMeta>
          ) : (
            <ul className="space-y-3">
              {upcoming.map((e) => (
                <li key={e.id}>
                  <Link to="/evaluaciones/$id" params={{ id: e.id }} className="flex items-center justify-between gap-2 rounded-lg px-1 py-1 hover:bg-muted">
                    <div className="min-w-0">
                      <p className="truncate font-medium">{e.title}</p>
                      <p className="text-xs text-muted-foreground">{formatDay(e.scheduledAt)}</p>
                    </div>
                    <Badge tone={e.personalized ? "info" : "muted"}>
                      {e.personalized ? "Personalizada" : e.status}
                    </Badge>
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </Card>

        <Card className="p-5">
          <div className="mb-4 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Bell className="size-4 text-muted-foreground" />
              <CardTitle>Avisos a familias</CardTitle>
            </div>
            <Link to="/comunicaciones" className="text-sm text-primary">
              Bandeja
            </Link>
          </div>
          {isFamily ? (
            inbox.length === 0 ? (
              <CardMeta>No hay avisos nuevos.</CardMeta>
            ) : (
              <ul className="space-y-3">
                {inbox.map((m) => (
                  <li key={m.id}>
                    <p className="text-sm font-medium">{m.subject}</p>
                    <p className="line-clamp-2 text-xs text-muted-foreground">{m.body}</p>
                  </li>
                ))}
              </ul>
            )
          ) : queued.length > 0 ? (
            <div className="flex items-center justify-between gap-3">
              <CardMeta>{queued.length} avisos en cola por enviar.</CardMeta>
              <Button size="sm" asChild>
                <Link to="/comunicaciones">Enviar</Link>
              </Button>
            </div>
          ) : (
            <CardMeta>La bandeja está al día. Los avisos se generan al verificar deberes o publicar notas.</CardMeta>
          )}
        </Card>
      </section>

      {role === "dece" || role === "rector" || role === "vicerrector" ? (
        <Card className="mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <CardTitle>Reportes para tu área</CardTitle>
            <CardMeta className="mt-1">
              Mensuales, trimestrales y anuales · individuales o de grupo.
            </CardMeta>
          </div>
          <Button asChild>
            <Link to="/reportes">Abrir reportes</Link>
          </Button>
        </Card>
      ) : null}

      {students.length === 1 ? (
        <Card className="mt-4 p-5">
          <CardTitle>Estado de aprobación</CardTitle>
          <div className="mt-3 flex items-center gap-3">
            <GradeNum value={finalAverage(homeworks, evaluations, students[0]!.id)} className="text-3xl" />
            <ApprovalBadge value={finalAverage(homeworks, evaluations, students[0]!.id)} />
          </div>
        </Card>
      ) : null}
    </div>
  );
}

function Stat({ label, value, hint }: { label: string; value: ReactNode; hint?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-muted-foreground">{label}</p>
      <div className="mt-2">{value}</div>
      {hint ? <p className="mt-1 text-[11px] text-muted-foreground">{hint}</p> : null}
    </Card>
  );
}
