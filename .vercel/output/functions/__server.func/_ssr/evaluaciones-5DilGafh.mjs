import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Badge, S as EVAL_TYPE_LABEL, c as formatDay, d as todayIso, s as useAppStore } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, t as Card } from "./card-F5OXodUz.mjs";
import { i as Textarea, n as Input, r as NativeSelect, t as Field } from "./input-8cr4jBjm.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { t as Drawer$1 } from "./drawer-C8q4lSIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluaciones-5DilGafh.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function EvalsPage() {
	const { canEdit } = useScope();
	const evaluations = useAppStore((s) => s.evaluations);
	const subjects = useAppStore((s) => s.subjects);
	const addEvaluation = useAppStore((s) => s.addEvaluation);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [subjectId, setSubjectId] = (0, import_react.useState)(subjects[0]?.id ?? "mat");
	const [type, setType] = (0, import_react.useState)("parcial");
	const [scheduledAt, setScheduledAt] = (0, import_react.useState)(todayIso());
	const [durationMin, setDurationMin] = (0, import_react.useState)(40);
	const [instructions, setInstructions] = (0, import_react.useState)("");
	const [personalized, setPersonalized] = (0, import_react.useState)(true);
	function create(e) {
		e.preventDefault();
		if (!title.trim()) return;
		addEvaluation({
			title: title.trim(),
			subjectId,
			type,
			scheduledAt,
			durationMin,
			instructions: instructions.trim(),
			personalized
		});
		toast.success("Evaluación programada en borrador");
		setOpen(false);
		setTitle("");
		setInstructions("");
	}
	const sorted = [...evaluations].sort((a, b) => b.scheduledAt.localeCompare(a.scheduledAt));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Instrumentos",
			title: "Evaluaciones",
			hint: "Programa, personaliza según el desempeño y califica.",
			action: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Programar"]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: sorted.map((e) => {
				const subject = subjects.find((s) => s.id === e.subjectId);
				const done = e.attempts.filter((a) => a.submittedAt).length;
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/evaluaciones/$id",
					params: { id: e.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
						className: "p-4",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											subject?.name,
											" · ",
											formatDay(e.scheduledAt),
											" · ",
											e.durationMin,
											" min"
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-xl font-medium tracking-tight",
										children: e.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, {
										className: "mt-1",
										children: [
											EVAL_TYPE_LABEL[e.type],
											e.instruments.length ? ` · ${e.instruments.length} instrumentos` : " · sin instrumento",
											e.status === "en_curso" || e.status === "calificada" ? ` · ${done} rendidas` : ""
										]
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex flex-col items-end gap-1",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: statusTone(e.status),
									children: e.status.replace("_", " ")
								}), e.personalized ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: "info",
									children: "Adaptativa"
								}) : null]
							})]
						})
					})
				}) }, e.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open,
			onOpenChange: setOpen,
			title: "Programar evaluación",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
				className: "space-y-4",
				onSubmit: create,
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Título",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							value: title,
							onChange: (e) => setTitle(e.target.value),
							required: true,
							placeholder: "Parcial 2 — funciones"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Asignatura",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: subjectId,
							onChange: (e) => setSubjectId(e.target.value),
							children: subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: s.id,
								children: s.name
							}, s.id))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Tipo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
							value: type,
							onChange: (e) => setType(e.target.value),
							children: Object.entries(EVAL_TYPE_LABEL).map(([k, v]) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
								value: k,
								children: v
							}, k))
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "grid grid-cols-2 gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Fecha",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "date",
								value: scheduledAt,
								onChange: (e) => setScheduledAt(e.target.value),
								required: true
							})
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
							label: "Minutos",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
								type: "number",
								min: 10,
								max: 120,
								value: durationMin,
								onChange: (e) => setDurationMin(Number(e.target.value))
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Indicaciones",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: instructions,
							onChange: (e) => setInstructions(e.target.value)
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
						className: "flex min-h-11 items-center gap-3 text-sm",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
							type: "checkbox",
							className: "size-4 accent-primary",
							checked: personalized,
							onChange: (e) => setPersonalized(e.target.checked)
						}), "Personalizar según el desempeño de cada estudiante"]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "Guardar borrador"
					})
				]
			})
		})
	] });
}
function statusTone(status) {
	if (status === "calificada") return "ok";
	if (status === "en_curso") return "info";
	if (status === "programada") return "warn";
	return "muted";
}
//#endregion
export { EvalsPage as component };
