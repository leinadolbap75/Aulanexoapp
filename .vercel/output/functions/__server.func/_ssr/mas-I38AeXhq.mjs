import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { l as FileChartColumnIncreasing, p as Bell, r as Settings, t as Users } from "../_libs/lucide-react.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Card } from "./card-F5OXodUz.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/mas-I38AeXhq.js
var import_jsx_runtime = require_jsx_runtime();
var ITEMS = [
	{
		to: "/estudiantes",
		title: "Estudiantes",
		hint: "Nómina, fichas y riesgo",
		icon: Users
	},
	{
		to: "/reportes",
		title: "Reportes",
		hint: "Mensual, trimestral y anual",
		icon: FileChartColumnIncreasing
	},
	{
		to: "/comunicaciones",
		title: "Comunicaciones",
		hint: "Avisos a padres de familia",
		icon: Bell
	},
	{
		to: "/ajustes",
		title: "Ajustes",
		hint: "Rol, institución y datos locales",
		icon: Settings
	}
];
function MorePage() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
		kicker: "AulaNexo",
		title: "Más",
		hint: "Nómina, reportes institucionales, avisos y ajustes del teléfono."
	}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
		className: "space-y-2",
		children: ITEMS.map((item) => {
			const Icon = item.icon;
			return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: item.to,
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex min-h-16 items-center gap-3 p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "flex size-11 items-center justify-center rounded-lg bg-muted",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-5" })
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: item.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-sm text-muted-foreground",
						children: item.hint
					})] })]
				})
			}) }, item.to);
		})
	})] });
}
//#endregion
export { MorePage as component };
