import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Badge, s as useAppStore, u as formatWhen } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { t as Card } from "./card-F5OXodUz.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/comunicaciones-Brnqppbz.js
var import_jsx_runtime = require_jsx_runtime();
function CommsPage() {
	const { ids, canEdit, isFamily } = useScope();
	const messages = useAppStore((s) => s.messages.filter((m) => ids.has(m.studentId)));
	const students = useAppStore((s) => s.students);
	const setMessages = (updater) => {
		const others = useAppStore.getState().messages.filter((m) => !ids.has(m.studentId));
		useAppStore.setState({ messages: [...updater, ...others] });
	};
	const queued = messages.filter((m) => m.status === "cola");
	function sendQueue() {
		if (queued.length === 0) {
			toast.message("No hay avisos en cola");
			return;
		}
		setMessages(messages.map((m) => m.status === "cola" ? {
			...m,
			status: "enviado"
		} : m));
		toast.success(`${queued.length} avisos entregados a la bandeja de familias`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "Familias",
		title: "Comunicaciones",
		hint: isFamily ? "Avisos de cumplimiento, incumplimiento y calificaciones." : "Se arman solos al verificar deberes o publicar notas. Aquí se envían a la bandeja de la familia.",
		action: canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Button, {
			onClick: sendQueue,
			variant: queued.length ? "default" : "outline",
			children: [
				"Enviar cola (",
				queued.length,
				")"
			]
		}) : null
	}), messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
		className: "p-5 text-sm text-muted-foreground",
		children: "No hay mensajes en esta vista."
	}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-3",
		children: messages.map((m) => {
			const st = students.find((s) => s.id === m.studentId);
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex flex-wrap items-center gap-2",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: kindTone(m.kind),
								children: kindLabel(m.kind)
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
								tone: m.status === "enviado" ? "ok" : "warn",
								children: m.status === "enviado" ? "Enviado" : "En cola"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xs text-muted-foreground",
								children: formatWhen(m.createdAt)
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
						className: "mt-2 font-medium",
						children: m.subject
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: st ? `${st.firstName} ${st.lastName} · ${st.parentName}` : m.studentId
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-3 whitespace-pre-line text-sm leading-relaxed text-muted-foreground",
						children: m.body
					})
				]
			}) }, m.id);
		})
	})] });
}
function kindLabel(kind) {
	if (kind === "incumplimiento") return "Incumplimiento";
	if (kind === "cumplimiento") return "Cumplimiento";
	if (kind === "calificacion") return "Calificación";
	return "Alerta";
}
function kindTone(kind) {
	if (kind === "incumplimiento") return "danger";
	if (kind === "cumplimiento") return "ok";
	if (kind === "calificacion") return "info";
	return "warn";
}
//#endregion
export { CommsPage as component };
