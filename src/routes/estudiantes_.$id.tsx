import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { Avatar } from "@/components/avatar";
import { ApprovalBadge, GradeNum } from "@/components/grade";
import { Meter } from "@/components/meter";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { formatDay } from "@/lib/format";
import { evalAverage, finalAverage, homeworkAverage, homeworkRate } from "@/lib/grades";
import { useAppStore } from "@/lib/store";
import { SUBMISSION_LABEL } from "@/lib/types";

export const Route = createFileRoute("/estudiantes_/$id")({ component: StudentProfile });

function StudentProfile() {
  const { id } = Route.useParams();
  const student = useAppStore((s) => s.students.find((x) => x.id === id));
  const subjects = useAppStore((s) => s.subjects);
  const homeworks = useAppStore((s) => s.homeworks);
  const evaluations = useAppStore((s) => s.evaluations);
  const messages = useAppStore((s) => s.messages.filter((m) => m.studentId === id));

  if (!student) {
    return (
      <div>
        <p>Estudiante no encontrado.</p>
        <Link to="/estudiantes" className="text-primary">
          Volver
        </Link>
      </div>
    );
  }

  const avg = finalAverage(homeworks, evaluations, student.id);
  const hw = homeworkAverage(homeworks, student.id);
  const ev = evalAverage(evaluations, student.id);
  const rate = homeworkRate(homeworks, student.id);
  const intervention =
    avg !== null && avg < 7 && rate < 0.6
      ? "Hábitos de estudio y contacto con la familia. Coordinar DECE + refuerzo académico."
      : avg !== null && avg < 7
        ? "Cumple deberes pero la nota no alcanza. Instrumento de recuperación personalizado."
        : rate < 0.6
          ? "El rendimiento aguanta; el incumplimiento de deberes requiere seguimiento de convivencia."
          : "Seguimiento rutinario. Mantener comunicación de logros.";

  return (
    <div>
      <Link
        to="/estudiantes"
        className="no-print mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Estudiantes
      </Link>

      <div className="flex items-start gap-4">
        <Avatar name={`${student.firstName} ${student.lastName}`} className="size-14 text-base" />
        <div className="min-w-0">
          <h1 className="text-3xl">
            {student.firstName} {student.lastName}
          </h1>
          <p className="text-sm text-muted-foreground">
            {student.course} · {student.parentRelation}: {student.parentName} · {student.parentPhone}
          </p>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-3 gap-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Promedio</p>
          <GradeNum value={avg} className="mt-1 block text-2xl" />
          <div className="mt-2">
            <ApprovalBadge value={avg} />
          </div>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Deberes</p>
          <GradeNum value={hw} className="mt-1 block text-2xl" />
          <Meter className="mt-3" value={rate} />
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Pruebas</p>
          <GradeNum value={ev} className="mt-1 block text-2xl" />
        </Card>
      </div>

      <Card className="mt-4 p-5">
        <CardTitle>Lectura para DECE / dirección</CardTitle>
        <p className="mt-2 text-sm leading-relaxed">{intervention}</p>
        <CardMeta className="mt-2">{student.notes}</CardMeta>
        <Button className="mt-4" variant="outline" asChild>
          <Link to="/reportes" search={{ student: student.id }}>
            Reporte individual
          </Link>
        </Button>
      </Card>

      <h2 className="mt-8 font-display text-2xl">Por asignatura</h2>
      <ul className="mt-3 space-y-2">
        {subjects.map((sub) => {
          const n = finalAverage(homeworks, evaluations, student.id, sub.id);
          return (
            <li key={sub.id}>
              <Card className="flex items-center justify-between p-3">
                <div>
                  <p className="font-medium">{sub.name}</p>
                  <p className="text-xs text-muted-foreground">{sub.teacher}</p>
                </div>
                <GradeNum value={n} className="text-lg" />
              </Card>
            </li>
          );
        })}
      </ul>

      <h2 className="mt-8 font-display text-2xl">Deberes</h2>
      <ul className="mt-3 space-y-2">
        {homeworks
          .filter((h) => h.studentIds.includes(student.id))
          .map((h) => {
            const st = h.submissions.find((x) => x.studentId === student.id)?.status ?? "pendiente";
            return (
              <li key={h.id} className="flex items-center justify-between gap-2 text-sm">
                <Link to="/deberes/$id" params={{ id: h.id }} className="min-w-0 truncate">
                  {h.title}
                </Link>
                <Badge tone={st === "entregado" ? "ok" : st === "tarde" ? "warn" : st === "no_entregado" ? "danger" : "muted"}>
                  {SUBMISSION_LABEL[st]}
                </Badge>
              </li>
            );
          })}
      </ul>

      <h2 className="mt-8 font-display text-2xl">Avisos</h2>
      <ul className="mt-3 space-y-3">
        {messages.length === 0 ? (
          <p className="text-sm text-muted-foreground">Sin avisos registrados.</p>
        ) : (
          messages.map((m) => (
            <li key={m.id}>
              <Card className="p-4">
                <div className="flex items-center justify-between gap-2">
                  <p className="font-medium">{m.subject}</p>
                  <Badge tone={m.status === "enviado" ? "ok" : "warn"}>{m.status}</Badge>
                </div>
                <p className="mt-2 whitespace-pre-line text-sm text-muted-foreground">{m.body}</p>
                <p className="mt-2 text-xs text-muted-foreground">{formatDay(m.createdAt)}</p>
              </Card>
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
