import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { i as Plus } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Badge, T as SUBMISSION_LABEL, c as formatDay, d as todayIso, s as useAppStore } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, t as Card } from "./card-F5OXodUz.mjs";
import { i as Textarea, n as Input, r as NativeSelect, t as Field } from "./input-8cr4jBjm.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { t as Drawer$1 } from "./drawer-C8q4lSIs.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/deberes-CbG-Wp0w.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function DeberesPage() {
	const { canEdit, ids } = useScope();
	const homeworks = useAppStore((s) => s.homeworks);
	const subjects = useAppStore((s) => s.subjects);
	const students = useAppStore((s) => s.students);
	const addHomework = useAppStore((s) => s.addHomework);
	const [open, setOpen] = (0, import_react.useState)(false);
	const [title, setTitle] = (0, import_react.useState)("");
	const [subjectId, setSubjectId] = (0, import_react.useState)(subjects[0]?.id ?? "mat");
	const [due, setDue] = (0, import_react.useState)(todayIso());
	const [description, setDescription] = (0, import_react.useState)("");
	const sorted = (0, import_react.useMemo)(() => [...homeworks].sort((a, b) => b.due.localeCompare(a.due)), [homeworks]);
	function create(e) {
		e.preventDefault();
		if (!title.trim()) return;
		addHomework({
			title: title.trim(),
			subjectId,
			due,
			description: description.trim(),
			studentIds: students.map((s) => s.id)
		});
		toast.success("Deber asignado al curso");
		setOpen(false);
		setTitle("");
		setDescription("");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Seguimiento",
			title: "Deberes",
			hint: "Asigna, verifica la presentación y notifica a las familias.",
			action: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
				onClick: () => setOpen(true),
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Plus, {}), "Asignar"]
			}) : null
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: sorted.map((h) => {
				const scoped = h.submissions.filter((s) => ids.has(s.studentId));
				const counts = countBy(scoped.map((s) => s.status));
				const subject = subjects.find((s) => s.id === h.subjectId);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/deberes/$id",
					params: { id: h.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-4 transition-[box-shadow] duration-150 hover:shadow-border",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-start justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "min-w-0",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
										className: "text-xs text-muted-foreground",
										children: [
											subject?.name,
											" · entrega ",
											formatDay(h.due)
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										className: "mt-1 font-display text-xl font-medium tracking-tight",
										children: h.title
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
										className: "mt-1 line-clamp-2",
										children: h.description
									})
								]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, { children: [scoped.length, " est."] })]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mt-4 flex flex-wrap gap-1.5",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "ok",
									n: counts.entregado,
									label: SUBMISSION_LABEL.entregado
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "warn",
									n: counts.tarde,
									label: SUBMISSION_LABEL.tarde
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "danger",
									n: counts.no_entregado,
									label: SUBMISSION_LABEL.no_entregado
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Chip, {
									tone: "muted",
									n: counts.pendiente,
									label: SUBMISSION_LABEL.pendiente
								})
							]
						})]
					})
				}) }, h.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer$1, {
			open,
			onOpenChange: setOpen,
			title: "Asignar deber",
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
							placeholder: "Ej. Hoja de ecuaciones"
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
						label: "Fecha de entrega",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
							type: "date",
							value: due,
							onChange: (e) => setDue(e.target.value),
							required: true
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
						label: "Indicaciones",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Textarea, {
							value: description,
							onChange: (e) => setDescription(e.target.value),
							placeholder: "Qué deben presentar y cómo."
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
						type: "submit",
						className: "w-full",
						children: "Asignar al curso"
					})
				]
			})
		})
	] });
}
function countBy(statuses) {
	return {
		pendiente: statuses.filter((s) => s === "pendiente").length,
		entregado: statuses.filter((s) => s === "entregado").length,
		tarde: statuses.filter((s) => s === "tarde").length,
		no_entregado: statuses.filter((s) => s === "no_entregado").length
	};
}
function Chip({ n, label, tone }) {
	if (!n) return null;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
		tone,
		children: [
			n,
			" ",
			label.toLowerCase()
		]
	});
}
//#endregion
export { DeberesPage as component };
