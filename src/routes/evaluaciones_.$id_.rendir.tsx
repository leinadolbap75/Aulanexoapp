import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { NativeSelect, Textarea } from "@/components/ui/input";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/evaluaciones_/$id_/rendir")({ component: RendirPage });

function RendirPage() {
  const { id } = Route.useParams();
  const navigate = useNavigate();
  const { canEdit, students, isFamily, familyStudentId } = useScope();
  const evaluation = useAppStore((s) => s.evaluations.find((e) => e.id === id));
  const submitAttempt = useAppStore((s) => s.submitAttempt);
  const [studentId, setStudentId] = useState(isFamily ? familyStudentId : students[0]?.id ?? "");
  const [answers, setAnswers] = useState<Record<string, string>>({});

  const instrument = useMemo(
    () => evaluation?.instruments.find((i) => i.studentId === studentId),
    [evaluation, studentId],
  );

  if (!evaluation) {
    return <p>Evaluación no encontrada.</p>;
  }

  if (evaluation.status !== "en_curso") {
    return (
      <div>
        <p className="text-muted-foreground">Esta evaluación no está abierta para rendir.</p>
        <Link to="/evaluaciones/$id" params={{ id }} className="text-primary">
          Volver
        </Link>
      </div>
    );
  }

  function setAns(qid: string, value: string) {
    setAnswers((prev) => ({ ...prev, [qid]: value }));
  }

  function submit() {
    if (!instrument) return;
    submitAttempt(evaluation!.id, studentId, answers);
    toast.success("Evaluación enviada. Las cerradas se califican solas.");
    void navigate({ to: "/evaluaciones/$id", params: { id: evaluation!.id } });
  }

  return (
    <div>
      <PageHeader
        kicker="Ejecución"
        title={evaluation.title}
        hint={
          instrument
            ? `Instrumento ${instrument.level}${instrument.focus.length ? ` · refuerzo en ${instrument.focus.join(", ")}` : ""}`
            : "Este estudiante aún no tiene instrumento."
        }
      />

      {canEdit && !isFamily ? (
        <div className="mb-5 max-w-sm">
          <p className="mb-1.5 text-xs font-medium tracking-wide text-muted-foreground">Rendir como</p>
          <NativeSelect
            value={studentId}
            onChange={(e) => {
              setStudentId(e.target.value);
              setAnswers({});
            }}
          >
            {students.map((s) => (
              <option key={s.id} value={s.id}>
                {s.firstName} {s.lastName}
              </option>
            ))}
          </NativeSelect>
        </div>
      ) : null}

      {!instrument ? (
        <Card className="p-5">No hay instrumento para este estudiante. Elabóralo primero.</Card>
      ) : (
        <ol className="space-y-4">
          {instrument.questions.map((q, idx) => (
            <li key={q.id}>
              <Card className="p-4">
                <p className="text-xs text-muted-foreground">
                  {idx + 1} · {q.skill} · {q.points} pto{q.points === 1 ? "" : "s"}
                </p>
                <p className="mt-1 font-medium">{q.prompt}</p>
                {q.type === "abierta" ? (
                  <Textarea
                    className="mt-3"
                    value={answers[q.id] ?? ""}
                    onChange={(e) => setAns(q.id, e.target.value)}
                    placeholder="Escribe tu respuesta"
                  />
                ) : (
                  <div className="mt-3 grid gap-2">
                    {(q.options ?? []).map((opt) => {
                      const selected = answers[q.id] === opt;
                      return (
                        <button
                          key={opt}
                          type="button"
                          onClick={() => setAns(q.id, opt)}
                          className={cn(
                            "min-h-11 rounded-lg px-3 text-left text-sm",
                            selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground",
                          )}
                        >
                          {opt}
                        </button>
                      );
                    })}
                  </div>
                )}
              </Card>
            </li>
          ))}
        </ol>
      )}

      {instrument ? (
        <div className="mt-6">
          <Button className="w-full md:w-auto" onClick={submit}>
            Entregar evaluación
          </Button>
        </div>
      ) : null}
    </div>
  );
}
