import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { toast } from "sonner";
import { Avatar } from "@/components/avatar";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatLong } from "@/lib/format";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";
import { SUBMISSION_LABEL, type SubmissionStatus } from "@/lib/types";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/deberes_/$id")({ component: DeberDetail });

const STATUSES: SubmissionStatus[] = ["pendiente", "entregado", "tarde", "no_entregado"];

function DeberDetail() {
  const { id } = Route.useParams();
  const { canEdit, students, ids } = useScope();
  const homework = useAppStore((s) => s.homeworks.find((h) => h.id === id));
  const subjects = useAppStore((s) => s.subjects);
  const setSubmission = useAppStore((s) => s.setSubmission);
  const notifyHomework = useAppStore((s) => s.notifyHomework);

  if (!homework) {
    return (
      <div>
        <p>No se encontró el deber.</p>
        <Link to="/deberes" className="text-primary">
          Volver
        </Link>
      </div>
    );
  }

  const subject = subjects.find((s) => s.id === homework.subjectId);

  function notify() {
    const n = notifyHomework(homework!.id);
    toast.success(n ? `${n} avisos enviados a familias` : "No había avisos nuevos");
  }

  return (
    <div>
      <Link to="/deberes" className="no-print mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground">
        <ArrowLeft className="size-4" />
        Deberes
      </Link>
      <PageHeader
        kicker={subject?.name ?? "Deber"}
        title={homework.title}
        hint={`Entrega ${formatLong(homework.due)}. ${homework.description}`}
        action={
          canEdit ? (
            <Button onClick={notify} variant="outline">
              Notificar familias
            </Button>
          ) : null
        }
      />

      <Card className="overflow-hidden p-2">
        <ul>
          {students
            .filter((s) => ids.has(s.id) && homework.studentIds.includes(s.id))
            .map((st) => {
              const sub = homework.submissions.find((x) => x.studentId === st.id);
              const status = sub?.status ?? "pendiente";
              return (
                <li key={st.id} className="flex flex-col gap-2 border-b border-border/70 px-3 py-3 last:border-0 sm:flex-row sm:items-center">
                  <div className="flex min-w-0 flex-1 items-center gap-3">
                    <Avatar name={`${st.firstName} ${st.lastName}`} />
                    <div className="min-w-0">
                      <p className="truncate font-medium">
                        {st.firstName} {st.lastName}
                      </p>
                      <p className="text-xs text-muted-foreground">{st.parentName}</p>
                    </div>
                  </div>
                  {canEdit ? (
                    <div className="grid grid-cols-2 gap-1 sm:flex sm:flex-wrap">
                      {STATUSES.map((s) => (
                        <button
                          key={s}
                          type="button"
                          onClick={() => setSubmission(homework.id, st.id, s)}
                          className={cn(
                            "h-10 rounded-md px-2.5 text-xs font-medium",
                            status === s ? toneClass(s) : "bg-muted text-muted-foreground",
                          )}
                        >
                          {SUBMISSION_LABEL[s]}
                        </button>
                      ))}
                    </div>
                  ) : (
                    <Badge tone={tone(status)}>{SUBMISSION_LABEL[status]}</Badge>
                  )}
                </li>
              );
            })}
        </ul>
      </Card>
    </div>
  );
}

function tone(status: SubmissionStatus) {
  if (status === "entregado") return "ok" as const;
  if (status === "tarde") return "warn" as const;
  if (status === "no_entregado") return "danger" as const;
  return "muted" as const;
}

function toneClass(status: SubmissionStatus) {
  if (status === "entregado") return "bg-ok text-ok-foreground";
  if (status === "tarde") return "bg-warn text-warn-foreground";
  if (status === "no_entregado") return "bg-destructive text-destructive-foreground";
  return "bg-foreground text-background";
}
