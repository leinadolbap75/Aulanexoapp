import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { formatWhen } from "@/lib/format";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";

export const Route = createFileRoute("/comunicaciones")({ component: CommsPage });

function CommsPage() {
  const { ids, canEdit, isFamily } = useScope();
  const messages = useAppStore((s) => s.messages.filter((m) => ids.has(m.studentId)));
  const students = useAppStore((s) => s.students);
  const setMessages = (updater: typeof messages) => {
    const others = useAppStore.getState().messages.filter((m) => !ids.has(m.studentId));
    useAppStore.setState({ messages: [...updater, ...others] });
  };

  const queued = messages.filter((m) => m.status === "cola");

  function sendQueue() {
    if (queued.length === 0) {
      toast.message("No hay avisos en cola");
      return;
    }
    setMessages(messages.map((m) => (m.status === "cola" ? { ...m, status: "enviado" as const } : m)));
    toast.success(`${queued.length} avisos entregados a la bandeja de familias`);
  }

  return (
    <div>
      <PageHeader
        kicker="Familias"
        title="Comunicaciones"
        hint={
          isFamily
            ? "Avisos de cumplimiento, incumplimiento y calificaciones."
            : "Se arman solos al verificar deberes o publicar notas. Aquí se envían a la bandeja de la familia."
        }
        action={
          canEdit ? (
            <Button onClick={sendQueue} variant={queued.length ? "default" : "outline"}>
              Enviar cola ({queued.length})
            </Button>
          ) : null
        }
      />

      {messages.length === 0 ? (
        <Card className="p-5 text-sm text-muted-foreground">No hay mensajes en esta vista.</Card>
      ) : (
        <ul className="space-y-3">
          {messages.map((m) => {
            const st = students.find((s) => s.id === m.studentId);
            return (
              <li key={m.id}>
                <Card className="p-4">
                  <div className="flex flex-wrap items-center gap-2">
                    <Badge tone={kindTone(m.kind)}>{kindLabel(m.kind)}</Badge>
                    <Badge tone={m.status === "enviado" ? "ok" : "warn"}>{m.status === "enviado" ? "Enviado" : "En cola"}</Badge>
                    <span className="text-xs text-muted-foreground">{formatWhen(m.createdAt)}</span>
                  </div>
                  <h2 className="mt-2 font-medium">{m.subject}</h2>
                  <p className="text-xs text-muted-foreground">
                    {st ? `${st.firstName} ${st.lastName} · ${st.parentName}` : m.studentId}
                  </p>
                  <p className="mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground">{m.body}</p>
                </Card>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}

function kindLabel(kind: string) {
  if (kind === "incumplimiento") return "Incumplimiento";
  if (kind === "cumplimiento") return "Cumplimiento";
  if (kind === "calificacion") return "Calificación";
  return "Alerta";
}

function kindTone(kind: string) {
  if (kind === "incumplimiento") return "danger" as const;
  if (kind === "cumplimiento") return "ok" as const;
  if (kind === "calificacion") return "info" as const;
  return "warn" as const;
}
