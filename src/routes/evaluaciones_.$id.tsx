import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/avatar";
import { GradeNum } from "@/components/grade";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { formatLong } from "@/lib/format";
import { attemptScore } from "@/lib/grades";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";
import { EVAL_TYPE_LABEL } from "@/lib/types";

export const Route = createFileRoute("/evaluaciones_/$id")({ component: EvalDetail });

function EvalDetail() {
  const { id } = Route.useParams();
  const { canEdit, students, isFamily, familyStudentId } = useScope();
  const evaluation = useAppStore((s) => s.evaluations.find((e) => e.id === id));
  const subjects = useAppStore((s) => s.subjects);
  const generateInstruments = useAppStore((s) => s.generateInstruments);
  const setEvalStatus = useAppStore((s) => s.setEvalStatus);
  const gradeOpen = useAppStore((s) => s.gradeOpen);
  const publishEvaluation = useAppStore((s) => s.publishEvaluation);

  if (!evaluation) {
    return (
      <div>
        <p>No se encontró la evaluación.</p>
        <Link to="/evaluaciones" className="text-primary">
          Volver
        </Link>
      </div>
    );
  }

  const subject = subjects.find((s) => s.id === evaluation.subjectId);
  const takeId = isFamily ? familyStudentId : students[0]?.id;

  function gen() {
    generateInstruments(evaluation!.id);
    toast.success(
      evaluation!.personalized
        ? "Instrumentos adaptados al desempeño de cada estudiante"
        : "Instrumento estándar generado para el curso",
    );
  }

  function publish() {
    const n = publishEvaluation(evaluation!.id);
    toast.success(`Notas publicadas · ${n} avisos a familias`);
  }

  return (
    <div>
      <Link
        to="/evaluaciones"
        className="no-print mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="size-4" />
        Evaluaciones
      </Link>
      <PageHeader
        kicker={`${subject?.name ?? ""} · ${EVAL_TYPE_LABEL[evaluation.type]}`}
        title={evaluation.title}
        hint={`${formatLong(evaluation.scheduledAt)} · ${evaluation.durationMin} min. ${evaluation.instructions}`}
      />

      <div className="no-print mb-6 flex flex-wrap gap-2">
        {canEdit ? (
          <Button variant="outline" onClick={gen}>
            {evaluation.instruments.length ? "Regenerar instrumentos" : "Elaborar instrumentos"}
          </Button>
        ) : null}
        {canEdit && evaluation.instruments.length > 0 && evaluation.status !== "en_curso" && evaluation.status !== "calificada" ? (
          <Button onClick={() => setEvalStatus(evaluation.id, "en_curso")}>Abrir ejecución</Button>
        ) : null}
        {evaluation.status === "en_curso" && takeId ? (
          <Button asChild>
            <Link to="/evaluaciones/$id/rendir" params={{ id: evaluation.id }}>
              {isFamily ? "Rendir evaluación" : "Rendir como estudiante"}
            </Link>
          </Button>
        ) : null}
        {canEdit && evaluation.status === "en_curso" ? (
          <Button variant="secondary" onClick={publish}>
            Publicar notas y avisar
          </Button>
        ) : null}
      </div>

      {evaluation.instruments.length === 0 ? (
        <Card className="p-5">
          <CardTitle>Sin instrumento</CardTitle>
          <CardMeta className="mt-2">
            {evaluation.personalized
              ? "Al elaborar, cada estudiante recibe un set según su nivel (refuerzo, medio o avanzado) y las destrezas débiles de pruebas anteriores."
              : "Se armará el mismo cuestionario para todo el curso."}
          </CardMeta>
        </Card>
      ) : (
        <ul className="space-y-3">
          {students.map((st) => {
            const inst = evaluation.instruments.find((i) => i.studentId === st.id);
            const att = evaluation.attempts.find((a) => a.studentId === st.id);
            if (!inst) return null;
            const openQs = inst.questions.filter((q) => q.type === "abierta");
            return (
              <li key={st.id}>
                <Card className="p-4">
                  <div className="flex items-start gap-3">
                    <Avatar name={`${st.firstName} ${st.lastName}`} />
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="font-medium">
                          {st.firstName} {st.lastName}
                        </p>
                        <Badge tone={inst.level === "refuerzo" ? "warn" : inst.level === "avanzado" ? "ok" : "muted"}>
                          {inst.level}
                        </Badge>
                        {inst.focus.length ? (
                          <Badge tone="info">Enfoque: {inst.focus.join(", ")}</Badge>
                        ) : null}
                      </div>
                      <p className="mt-1 text-xs text-muted-foreground">
                        {inst.questions.length} ítems · {inst.questions.filter((q) => q.difficulty === 1).length} básicas ·{" "}
                        {inst.questions.filter((q) => q.difficulty === 3).length} de análisis
                      </p>
                      {att?.submittedAt ? (
                        <div className="mt-2 flex items-center gap-2">
                          <span className="text-sm text-muted-foreground">Nota</span>
                          <GradeNum value={attemptScore(att)} className="text-lg" />
                          {att.published ? <Badge tone="ok">Publicada</Badge> : <Badge>Por publicar</Badge>}
                        </div>
                      ) : (
                        <p className="mt-2 text-sm text-muted-foreground">Aún no rinde</p>
                      )}

                      {canEdit && att?.submittedAt && openQs.length > 0 ? (
                        <div className="mt-3 space-y-2 rounded-xl bg-muted/70 p-3">
                          <p className="text-xs font-medium tracking-wide text-muted-foreground uppercase">
                            Calificar abiertas
                          </p>
                          {openQs.map((q) => (
                            <div key={q.id} className="space-y-1">
                              <p className="text-sm">{q.prompt}</p>
                              <p className="text-xs text-muted-foreground">
                                Respuesta: {att.answers[q.id] || "—"} · Rúbrica: {q.rubric}
                              </p>
                              <div className="flex items-center gap-2">
                                <Input
                                  type="number"
                                  min={0}
                                  max={q.points}
                                  step={0.5}
                                  className="h-10 w-24"
                                  value={att.openScores[q.id] ?? 0}
                                  onChange={(e) =>
                                    gradeOpen(evaluation.id, st.id, q.id, Number(e.target.value))
                                  }
                                />
                                <span className="text-xs text-muted-foreground">/ {q.points}</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : null}
                    </div>
                  </div>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
