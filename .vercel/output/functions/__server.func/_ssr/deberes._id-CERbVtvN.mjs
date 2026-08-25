import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as cn, E as Badge, T as SUBMISSION_LABEL, a as Route$3, l as formatLong, s as useAppStore } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { t as Card } from "./card-F5OXodUz.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { t as Avatar } from "./avatar-DeO2V3Xj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deberes._id-CERbVtvN.js
var import_jsx_runtime = require_jsx_runtime();
var STATUSES = [
	"pendiente",
	"entregado",
	"tarde",
	"no_entregado"
];
function DeberDetail() {
	const { id } = Route$3.useParams();
	const { canEdit, students, ids } = useScope();
	const homework = useAppStore((s) => s.homeworks.find((h) => h.id === id));
	const subjects = useAppStore((s) => s.subjects);
	const setSubmission = useAppStore((s) => s.setSubmission);
	const notifyHomework = useAppStore((s) => s.notifyHomework);
	if (!homework) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No se encontró el deber." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/deberes",
		className: "text-primary",
		children: "Volver"
	})] });
	const subject = subjects.find((s) => s.id === homework.subjectId);
	function notify() {
		const n = notifyHomework(homework.id);
		toast.success(n ? `${n} avisos enviados a familias` : "No había avisos nuevos");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/deberes",
			className: "no-print mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Deberes"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: subject?.name ?? "Deber",
			title: homework.title,
			hint: `Entrega ${formatLong(homework.due)}. ${homework.description}`,
			action: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				onClick: notify,
				variant: "outline",
				children: "Notificar familias"
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "overflow-hidden p-2",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: students.filter((s) => ids.has(s.id) && homework.studentIds.includes(s.id)).map((st) => {
				const status = homework.submissions.find((x) => x.studentId === st.id)?.status ?? "pendiente";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex flex-col gap-2 border-b border-border/70 px-3 py-3 last:border-0 sm:flex-row sm:items-center",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex min-w-0 flex-1 items-center gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: `${st.firstName} ${st.lastName}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate font-medium",
								children: [
									st.firstName,
									" ",
									st.lastName
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-xs text-muted-foreground",
								children: st.parentName
							})]
						})]
					}), canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "grid grid-cols-2 gap-1 sm:flex sm:flex-wrap",
						children: STATUSES.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "button",
							onClick: () => setSubmission(homework.id, st.id, s),
							className: cn("h-10 rounded-md px-2.5 text-xs font-medium", status === s ? toneClass(s) : "bg-muted text-muted-foreground"),
							children: SUBMISSION_LABEL[s]
						}, s))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: tone(status),
						children: SUBMISSION_LABEL[status]
					})]
				}, st.id);
			}) })
		})
	] });
}
function tone(status) {
	if (status === "entregado") return "ok";
	if (status === "tarde") return "warn";
	if (status === "no_entregado") return "danger";
	return "muted";
}
function toneClass(status) {
	if (status === "entregado") return "bg-ok text-ok-foreground";
	if (status === "tarde") return "bg-warn text-warn-foreground";
	if (status === "no_entregado") return "bg-destructive text-destructive-foreground";
	return "bg-foreground text-background";
}
//#endregion
export { DeberDetail as component };
