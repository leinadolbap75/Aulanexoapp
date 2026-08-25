import { createFileRoute, Link } from "@tanstack/react-router";
import { Plus } from "lucide-react";
import { useMemo, useState, type FormEvent } from "react";
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
import { SUBMISSION_LABEL, type SubmissionStatus } from "@/lib/types";

export const Route = createFileRoute("/deberes")({ component: DeberesPage });

function DeberesPage() {
  const { canEdit, ids } = useScope();
  const homeworks = useAppStore((s) => s.homeworks);
  const subjects = useAppStore((s) => s.subjects);
  const students = useAppStore((s) => s.students);
  const addHomework = useAppStore((s) => s.addHomework);
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subjectId, setSubjectId] = useState(subjects[0]?.id ?? "mat");
  const [due, setDue] = useState(todayIso());
  const [description, setDescription] = useState("");

  const sorted = useMemo(
    () => [...homeworks].sort((a, b) => b.due.localeCompare(a.due)),
    [homeworks],
  );

  function create(e: FormEvent) {
    e.preventDefault();
    if (!title.trim()) return;
    const id = addHomework({
      title: title.trim(),
      subjectId,
      due,
      description: description.trim(),
      studentIds: students.map((s) => s.id),
    });
    toast.success("Deber asignado al curso");
    setOpen(false);
    setTitle("");
    setDescription("");
    void id;
  }

  return (
    <div>
      <PageHeader
        kicker="Seguimiento"
        title="Deberes"
        hint="Asigna, verifica la presentación y notifica a las familias."
        action={
          canEdit ? (
            <Button onClick={() => setOpen(true)}>
              <Plus />
              Asignar
            </Button>
          ) : null
        }
      />

      <ul className="space-y-3">
        {sorted.map((h) => {
          const scoped = h.submissions.filter((s) => ids.has(s.studentId));
          const counts = countBy(scoped.map((s) => s.status));
          const subject = subjects.find((s) => s.id === h.subjectId);
          return (
            <li key={h.id}>
              <Link to="/deberes/$id" params={{ id: h.id }}>
                <Card className="p-4 transition-[box-shadow] duration-150 hover:shadow-border">
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <p className="text-xs text-muted-foreground">
                        {subject?.name} · entrega {formatDay(h.due)}
                      </p>
                      <h2 className="mt-1 font-display text-xl font-medium tracking-tight">{h.title}</h2>
                      <CardMeta className="mt-1 line-clamp-2">{h.description}</CardMeta>
                    </div>
                    <Badge>{scoped.length} est.</Badge>
                  </div>
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    <Chip tone="ok" n={counts.entregado} label={SUBMISSION_LABEL.entregado} />
                    <Chip tone="warn" n={counts.tarde} label={SUBMISSION_LABEL.tarde} />
                    <Chip tone="danger" n={counts.no_entregado} label={SUBMISSION_LABEL.no_entregado} />
                    <Chip tone="muted" n={counts.pendiente} label={SUBMISSION_LABEL.pendiente} />
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>

      <Drawer open={open} onOpenChange={setOpen} title="Asignar deber">
        <form className="space-y-4" onSubmit={create}>
          <Field label="Título">
            <Input value={title} onChange={(e) => setTitle(e.target.value)} required placeholder="Ej. Hoja de ecuaciones" />
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
          <Field label="Fecha de entrega">
            <Input type="date" value={due} onChange={(e) => setDue(e.target.value)} required />
          </Field>
          <Field label="Indicaciones">
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Qué deben presentar y cómo." />
          </Field>
          <Button type="submit" className="w-full">
            Asignar al curso
          </Button>
        </form>
      </Drawer>
    </div>
  );
}

function countBy(statuses: SubmissionStatus[]) {
  return {
    pendiente: statuses.filter((s) => s === "pendiente").length,
    entregado: statuses.filter((s) => s === "entregado").length,
    tarde: statuses.filter((s) => s === "tarde").length,
    no_entregado: statuses.filter((s) => s === "no_entregado").length,
  };
}

function Chip({ n, label, tone }: { n: number; label: string; tone: "ok" | "warn" | "danger" | "muted" }) {
  if (!n) return null;
  return (
    <Badge tone={tone}>
      {n} {label.toLowerCase()}
    </Badge>
  );
}
