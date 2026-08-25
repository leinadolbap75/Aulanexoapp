import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { C as ROLE_HINT, s as useAppStore, w as ROLE_LABEL } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-F5OXodUz.mjs";
import { n as Input, r as NativeSelect, t as Field } from "./input-8cr4jBjm.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/ajustes-CSbTAPA6.js
var import_jsx_runtime = require_jsx_runtime();
var ROLES = [
	"docente",
	"dece",
	"vicerrector",
	"rector",
	"familia"
];
function SettingsPage() {
	const schoolName = useAppStore((s) => s.schoolName);
	const role = useAppStore((s) => s.role);
	const familyStudentId = useAppStore((s) => s.familyStudentId);
	const students = useAppStore((s) => s.students);
	const setSchoolName = useAppStore((s) => s.setSchoolName);
	const setRole = useAppStore((s) => s.setRole);
	const setFamilyStudentId = useAppStore((s) => s.setFamilyStudentId);
	const resetDemo = useAppStore((s) => s.resetDemo);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Dispositivo",
			title: "Ajustes",
			hint: "Todo se guarda en este teléfono. No necesitas cuenta."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "space-y-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Institución" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
				label: "Nombre de la institución",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
					value: schoolName,
					onChange: (e) => setSchoolName(e.target.value)
				})
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 space-y-3 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Quién usa la app" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "Cambia de rol para ver el mismo curso como docente, DECE, vicerrectorado, rectorado o familia." }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "grid gap-2",
					children: ROLES.map((r) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						type: "button",
						onClick: () => setRole(r),
						className: `min-h-14 rounded-xl px-4 py-3 text-left ${role === r ? "bg-primary text-primary-foreground" : "bg-muted text-foreground"}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: ROLE_LABEL[r]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: `text-xs ${role === r ? "text-primary-foreground/80" : "text-muted-foreground"}`,
							children: ROLE_HINT[r]
						})]
					}, r))
				}),
				role === "familia" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Field, {
					label: "Hijo o hija vinculado",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NativeSelect, {
						value: familyStudentId,
						onChange: (e) => setFamilyStudentId(e.target.value),
						children: students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: s.id,
							children: [
								s.firstName,
								" ",
								s.lastName
							]
						}, s.id))
					})
				}) : null
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Usar en el teléfono" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
				className: "mt-2",
				children: "En Chrome para Android: menú · Añadir a la pantalla de inicio. AulaNexo queda como app y funciona sin escribir direcciones. Los datos viven en este dispositivo."
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Datos de demostración" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: "Restaura el curso 10.º EGB A con deberes, pruebas y avisos de ejemplo."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "outline",
					onClick: () => {
						resetDemo();
						toast.success("Curso de ejemplo restaurado");
					},
					children: "Restaurar ejemplo"
				})
			]
		})
	] });
}
//#endregion
export { SettingsPage as component };
