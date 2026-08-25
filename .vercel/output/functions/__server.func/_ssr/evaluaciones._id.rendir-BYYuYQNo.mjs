import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link, y as useNavigate } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { D as cn, n as Route, s as useAppStore } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { t as Card } from "./card-F5OXodUz.mjs";
import { i as Textarea, r as NativeSelect } from "./input-8cr4jBjm.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluaciones._id.rendir-BYYuYQNo.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function RendirPage() {
	const { id } = Route.useParams();
	const navigate = useNavigate();
	const { canEdit, students, isFamily, familyStudentId } = useScope();
	const evaluation = useAppStore((s) => s.evaluations.find((e) => e.id === id));
	const submitAttempt = useAppStore((s) => s.submitAttempt);
	const [studentId, setStudentId] = (0, import_react.useState)(isFamily ? familyStudentId : students[0]?.id ?? "");
	const [answers, setAnswers] = (0, import_react.useState)({});
	const instrument = (0, import_react.useMemo)(() => evaluation?.instruments.find((i) => i.studentId === studentId), [evaluation, studentId]);
	if (!evaluation) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Evaluación no encontrada." });
	if (evaluation.status !== "en_curso") return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: "text-muted-foreground",
		children: "Esta evaluación no está abierta para rendir."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/evaluaciones/$id",
		params: { id },
		className: "text-primary",
		children: "Volver"
	})] });
	function setAns(qid, value) {
		setAnswers((prev) => ({
			...prev,
			[qid]: value
		}));
	}
	function submit() {
		if (!instrument) return;
		submitAttempt(evaluation.id, studentId, answers);
		toast.success("Evaluación enviada. Las cerradas se califican solas.");
		navigate({
			to: "/evaluaciones/$id",
			params: { id: evaluation.id }
		});
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Ejecución",
			title: evaluation.title,
			hint: instrument ? `Instrumento ${instrument.level}${instrument.focus.length ? ` · refuerzo en ${instrument.focus.join(", ")}` : ""}` : "Este estudiante aún no tiene instrumento."
		}),
		canEdit && !isFamily ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 max-w-sm",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mb-1.5 text-xs font-medium tracking-wide text-muted-foreground",
				children: "Rendir como"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
				value: studentId,
				onChange: (e) => {
					setStudentId(e.target.value);
					setAnswers({});
				},
				children: students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
					value: s.id,
					children: [
						s.firstName,
						" ",
						s.lastName
					]
				}, s.id))
			})]
		}) : null,
		!instrument ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
			className: "p-5",
			children: "No hay instrumento para este estudiante. Elabóralo primero."
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ol", {
			className: "space-y-4",
			children: instrument.questions.map((q, idx) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
						className: "text-xs text-muted-foreground",
						children: [
							idx + 1,
							" · ",
							q.skill,
							" · ",
							q.points,
							" pto",
							q.points === 1 ? "" : "s"
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-1 font-medium",
						children: q.prompt
					}),
					q.type === "abierta" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
						className: "mt-3",
						value: answers[q.id] ?? "",
						onChange: (e) => setAns(q.id, e.target.value),
						placeholder: "Escribe tu respuesta"
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "mt-3 grid gap-2",
						children: (q.options ?? []).map((opt) => {
							const selected = answers[q.id] === opt;
							return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								type: "button",
								onClick: () => setAns(q.id, opt),
								className: cn("min-h-11 rounded-lg px-3 text-left text-sm", selected ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"),
								children: opt
							}, opt);
						})
					})
				]
			}) }, q.id))
		}),
		instrument ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-6",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				className: "w-full md:w-auto",
				onClick: submit,
				children: "Entregar evaluación"
			})
		}) : null
	] });
}
//#endregion
export { RendirPage as component };
