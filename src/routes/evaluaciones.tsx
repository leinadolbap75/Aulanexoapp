import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useState, type FormEvent } from "react";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardMeta } from "@/components/ui/card";
import { Drawer } from "@/components/ui/drawer";
import { Field, Input, NativeSelect, Textarea } from "@/components/ui/input";
import { formatDay, todayIso } from "@/lib/format";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";
import { EVAL_TYPE_LABEL, type EvalType } from "@/lib/types";

export const Route = createFileRoute("/evaluaciones")({ component: EvalsPage });

function EvalsPage() {
  const { canEdit } = useScope();
  const evaluations = useAppStore((s) => s.evaluations);
  const subjects = useAppStore((s) => s.subjects);
  const addEvaluation = useAppStore((s) => s.addEvaluation);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "mat");
  const [type, setType] = useState<EvalType>("parcial");
  const [scheduledAt, setScheduledAt] = useState(todayIso());
  const [durationMin, setDurationMin] = useState(40);
  const [instructions, setInstructions] = useState("");
  const [personalized, setPersonalized] = useState(true);

  function create(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    addEvaluation({
      title: title.trim(),
      subjectId,
      type,
      scheduledAt,
      durationMin,
      instructions: instructions.trim(),
      personalized,
    });
    toast.success("Evaluación programada en borrador");
    setOpen(false);
    setTitle("");
    setInstructions("");
  }

  const sorted = [...evaluations].sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt));

  return (
    <div>
      <PageHeader
        kicker="Instrumentos"
        title="Evaluaciones"
        hint="Programa, personaliza según el desempeño y califica."
        action={
          canEdit ? (
            <Button onClick={() => setOpen(true)}>
              <Plus />
              Programar
            </Button>
          ) : null
        }
      />

      <ul className="space-y-3">
        {sorted.map((e) => {
          const subject = subjects.find((s) => s.id === e.subjectId);
          const done = e.attempts.filter((a) => a.submittedAt).length;
          return (
            <li key={e.id}>
              <Link to="/evaluaciones/$id" params={{ id: e.id }}>
                <Card className="p-4">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {subject?.name} · {formatDay(e.scheduledAt)} · {e.durationMin} min
                      </p>
                      <h2 className="mt-1 font-display text-xl font-medium tracking-tight">{e.title}</h2>
                      <CardMeta className="mt-1">
                        {EVAL_TYPE_LABEL[e.type]}
                        {e.instruments.length ? ` · ${e.instruments.length} instrumentos` : " · sin instrumento"}
                        {e.status === "en_curso" || e.status === "calificada" ? ` · ${done} rendidas` : ""}
                      </CardMeta>
                    </div>
                    <div className="flex flex-col items-end gap-1">
                      <Badge tone={statusTone(e.status)}>{e.status.replace("_", " ")}</Badge>
                      {e.personalized ? <Badge tone="info">Adaptativa</Badge> : null}
                    </div>
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>

      <Drawer open={open} onOpenChange={setOpen} title="Programar evaluación">
        <form className="space-y-4" onSubmit={create}>
          <Field label="Título">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Parcial 2 — funciones" />
          </Field>
          <Field label="Asignatura">
            <NativeSelect value={subjectId} onChange={(e) => setSubjectId(e.target.value)}>
              {subjects.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <Field label="Tipo">
            <NativeSelect value={type} onChange={(e) => setType(e.target.value as EvalType)}>
              {Object.entries(EVAL_TYPE_LABEL).map(([k, v]) => (
                <option key={k} value={k}>
                  {v}
                </option>
              ))}
            </NativeSelect>
          </Field>
          <div className="grid grid-cols-2 gap-3">
            <Field label="Fecha">
              <Input type="date" value={scheduledAt} onChange={(e) => setScheduledAt(e.target.value)} required />
            </Field>
            <Field label="Minutos">
              <Input
                type="number"
                min={10}
                max={120}
                value={durationMin}
                onChange={(e) => setDurationMin(Number(e.target.value))}
              />
            </Field>
          </div>
          <Field label="Indicaciones">
            <Textarea value={instructions} onChange={(e) => setInstructions(e.target.value)} />
          </Field>
          <label className="flex min-h-11 items-center gap-3 text-sm">
            <input
              type="checkbox"
              className="size-4 accent-primary"
              checked={personalized}
              onChange={(e) => setPersonalized(e.target.checked)}
            />
            Personalizar según el desempeño de cada estudiante
          </label>
          <Button type="submit" className="w-full">
            Guardar borrador
          </Button>
        </form>
      </Drawer>
    </div>
  );
}

function statusTone(status: string) {
  if (status === "calificada") return "ok" as const;
  if (status === "en_curso") return "info" as const;
  if (status === "programada") return "warn" as const;
  return "muted" as const;
}
