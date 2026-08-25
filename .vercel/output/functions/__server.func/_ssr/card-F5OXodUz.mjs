import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as cn } from "./router-BeuJ94SI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/card-F5OXodUz.js
var import_jsx_runtime = require_jsx_runtime();
function Card({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("rounded-2xl bg-card p-4 text-card-foreground shadow-border", className),
		...props
	});
}
function CardTitle({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
		className: cn("font-display text-lg font-medium tracking-tight", className),
		...props
	});
}
function CardMeta({ className, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
		className: cn("text-sm text-muted-foreground", className),
		...props
	});
}
//#endregion
export { CardMeta as n, CardTitle as r, Card as t };
