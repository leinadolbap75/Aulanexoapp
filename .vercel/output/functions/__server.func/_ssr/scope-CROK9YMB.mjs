import { s as useAppStore } from "./router-BeuJ94SI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/scope-CROK9YMB.js
function useScope() {
	const role = useAppStore((s) => s.role);
	const familyStudentId = useAppStore((s) => s.familyStudentId);
	const allStudents = useAppStore((s) => s.students);
	const canEdit = role === "docente";
	const students = role === "familia" ? allStudents.filter((s) => s.id === familyStudentId) : allStudents;
	return {
		role,
		canEdit,
		students,
		ids: new Set(students.map((s) => s.id)),
		familyStudentId,
		isFamily: role === "familia"
	};
}
//#endregion
export { useScope as t };
