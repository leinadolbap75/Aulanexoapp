import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as cn, E as Badge, m as approvalOf, x as APPROVAL_LABEL } from "./router-BeuJ94SI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/grade-JPd4NAj_.js
var import_jsx_runtime = require_jsx_runtime();
function GradeNum({ value, className }) {
	if (value === null) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular-nums text-muted-foreground", className),
		children: "—"
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn("tabular-nums font-medium", value >= 7 ? "text-ok" : value >= 5 ? "text-warn" : "text-destructive", className),
		children: value.toFixed(1)
	});
}
function ApprovalBadge({ value }) {
	const a = approvalOf(value);
	if (!a) return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Sin nota" });
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
		tone: a === "aprobado" ? "ok" : a === "supletorio" ? "warn" : "danger",
		children: APPROVAL_LABEL[a]
	});
}
//#endregion
export { GradeNum as n, ApprovalBadge as t };
