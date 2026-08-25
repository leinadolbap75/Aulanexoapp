import { useAppStore } from "./store";

export function useScope() {
  const role = useAppStore((s) => s.role);
  const familyStudentId = useAppStore((s) => s.familyStudentId);
  const allStudents = useAppStore((s) => s.students);
  const canEdit = role === "docente";
  const students = role === "familia" ? allStudents.filter((s) => s.id === familyStudentId) : allStudents;
  const ids = new Set(students.map((s) => s.id));
  return { role, canEdit, students, ids, familyStudentId, isFamily: role === "familia" };
}

export function studentName(first: string, last: string) {
  return `${first} ${last}`;
}
