import { createFileRoute } from "@tanstack/react-router";
import { toast } from "sonner";
import { PageHeader } from "@/components/page-header";
import { Button } from "@/components/ui/button";
import { Card, CardMeta, CardTitle } from "@/components/ui/card";
import { Field, Input, NativeSelect } from "@/components/ui/input";
import { useAppStore } from "@/lib/store";
import { ROLE_HINT, ROLE_LABEL, type Role } from "@/lib/types";

export const Route = createFileRoute("/ajustes")({ component: SettingsPage });

const ROLES: Role[] = ["docente", "dece", "vicerrector", "rector", "familia"];

function SettingsPage() {
  const schoolName = useAppStore((s) => s.schoolName);
  const role = useAppStore((s) => s.role);
  const familyStudentId = useAppStore((s) => s.familyStudentId);
  const students = useAppStore((s) => s.students);
  const setSchoolName = useAppStore((s) => s.setSchoolName);
  const setRole = useAppStore((s) => s.setRole);
  const setFamilyStudentId = useAppStore((s) => s.setFamilyStudentId);
  const resetDemo = useAppStore((s) => s.resetDemo);

  return (
    <div>
      <PageHeader
        kicker="Dispositivo"
        title="Ajustes"
        hint="Todo se guarda en este teléfono. No necesitas cuenta."
      />

      <Card className="space-y-4 p-5">
        <CardTitle>Institución</CardTitle>
        <Field label="Nombre de la institución">
          <Input value={schoolName} onChange={(e) => setSchoolName(e.target.value)} />
        </Field>
      </Card>

      <Card className="mt-4 space-y-3 p-5">
        <CardTitle>Quién usa la app</CardTitle>
        <CardMeta>
          Cambia de rol para ver el mismo curso como docente, DECE, vicerrectorado, rectorado o familia.
        </CardMeta>
        <div className="grid gap-2">
          {ROLES.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setRole(r)}
              className={`min-h-14 rounded-xl px-4 py-3 text-left ${
                role === r ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"
              }`}
            >
              <p className="font-medium">{ROLE_LABEL[r]}</p>
              <p className={`text-xs ${role === r ? "text-primary-foreground/80" : "text-muted-foreground"}`}>
                {ROLE_HINT[r]}
              </p>
            </button>
          ))}
        </div>
        {role === "familia" ? (
          <Field label="Hijo o hija vinculado">
            <NativeSelect value={familyStudentId} onChange={(e) => setFamilyStudentId(e.target.value)}>
              {students.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.firstName} {s.lastName}
                </option>
              ))}
            </NativeSelect>
          </Field>
        ) : null}
      </Card>

      <Card className="mt-4 p-5">
        <CardTitle>Usar en el teléfono</CardTitle>
        <CardMeta className="mt-2">
          En Chrome para Android: menú · Añadir a la pantalla de inicio. AulaNexo queda como app y funciona sin
          escribir direcciones. Los datos viven en este dispositivo.
        </CardMeta>
      </Card>

      <Card className="mt-4 p-5">
        <CardTitle>Datos de demostración</CardTitle>
        <CardMeta className="mt-2">
          Restaura el curso 10.º EGB A con deberes, pruebas y avisos de ejemplo.
        </CardMeta>
        <Button
          className="mt-4"
          variant="outline"
          onClick={() => {
            resetDemo();
            toast.success("Curso de ejemplo restaurado");
          }}
        >
          Restaurar ejemplo
        </Button>
      </Card>
    </div>
  );
}
