import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as cn } from "./router-BeuJ94SI.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/meter-CxuyuKYc.js
var import_jsx_runtime = require_jsx_runtime();
function Meter({ value, className }) {
	const pct = Math.max(0, Math.min(100, Math.round(value * 100)));
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
		className: cn("h-1.5 overflow-hidden rounded-full bg-muted", className),
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "h-full rounded-full bg-primary transition-[width] duration-200 ease-out",
			style: { width: `${pct}%` }
		})
	});
}
//#endregion
export { Meter as t };
