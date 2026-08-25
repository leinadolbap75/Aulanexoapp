import { createFileRoute, Link } from "@tanstack/react-router";
import { ApprovalBadge, GradeNum } from "@/components/grade";
import { PageHeader } from "@/components/page-header";
import { Card } from "@/components/ui/card";
import { evalAverage, finalAverage, homeworkAverage } from "@/lib/grades";
import { useScope } from "@/lib/scope";
import { useAppStore } from "@/lib/store";
import { PASSING } from "@/lib/types";

export const Route = createFileRoute("/calificaciones")({ component: GradesPage });

function GradesPage() {
  const { students } = useScope();
  const subjects = useAppStore((s) => s.subjects);
  const homeworks = useAppStore((s) => s.homeworks);
  const evaluations = useAppStore((s) => s.evaluations);

  const approved = students.filter((s) => {
    const n = finalAverage(homeworks, evaluations, s.id);
    return n !== null && n >= PASSING;
  }).length;

  return (
    <div>
      <PageHeader
        kicker="Acta"
        title="Calificaciones"
        hint={`Promedio = 30% deberes + 70% evaluaciones. Aprobación desde ${PASSING.toFixed(1)}.`}
      />

      <div className="mb-5 grid grid-cols-2 gap-3">
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Aprobados</p>
          <p className="mt-1 text-2xl tabular-nums font-medium">
            {approved}/{students.length}
          </p>
        </Card>
        <Card className="p-4">
          <p className="text-xs text-muted-foreground">Ponderación</p>
          <p className="mt-1 text-sm">Deberes 30 · Pruebas 70</p>
        </Card>
      </div>

      <div className="hidden overflow-x-auto md:block">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border text-xs text-muted-foreground">
              <th className="py-2 pr-3 font-medium">Estudiante</th>
              {subjects.map((s) => (
                <th key={s.id} className="py-2 pr-3 font-medium">
                  {s.short}
                </th>
              ))}
              <th className="py-2 pr-3 font-medium">Deberes</th>
              <th className="py-2 pr-3 font-medium">Pruebas</th>
              <th className="py-2 pr-3 font-medium">Final</th>
              <th className="py-2 font-medium">Estado</th>
            </tr>
          </thead>
          <tbody>
            {students.map((st) => {
              const hw = homeworkAverage(homeworks, st.id);
              const ev = evalAverage(evaluations, st.id);
              const fin = finalAverage(homeworks, evaluations, st.id);
              return (
                <tr key={st.id} className="border-b border-border/70">
                  <td className="py-3 pr-3">
                    <Link to="/estudiantes/$id" params={{ id: st.id }} className="font-medium">
                      {st.firstName} {st.lastName}
                    </Link>
                  </td>
                  {subjects.map((s) => (
                    <td key={s.id} className="py-3 pr-3">
                      <GradeNum value={finalAverage(homeworks, evaluations, st.id, s.id)} />
                    </td>
                  ))}
                  <td className="py-3 pr-3">
                    <GradeNum value={hw} />
                  </td>
                  <td className="py-3 pr-3">
                    <GradeNum value={ev} />
                  </td>
                  <td className="py-3 pr-3">
                    <GradeNum value={fin} />
                  </td>
                  <td className="py-3">
                    <ApprovalBadge value={fin} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <ul className="space-y-2 md:hidden">
        {students.map((st) => {
          const fin = finalAverage(homeworks, evaluations, st.id);
          return (
            <li key={st.id}>
              <Link to="/estudiantes/$id" params={{ id: st.id }}>
                <Card className="flex items-center justify-between p-4">
                  <div>
                    <p className="font-medium">
                      {st.firstName} {st.lastName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Deberes <GradeNum value={homeworkAverage(homeworks, st.id)} /> · Pruebas{" "}
                      <GradeNum value={evalAverage(evaluations, st.id)} />
                    </p>
                  </div>
                  <div className="flex flex-col items-end gap-1">
                    <GradeNum value={fin} className="text-lg" />
                    <ApprovalBadge value={fin} />
                  </div>
                </Card>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
