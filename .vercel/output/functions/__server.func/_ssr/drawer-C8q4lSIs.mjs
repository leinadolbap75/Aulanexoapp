import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { D as cn } from "./router-BeuJ94SI.mjs";
import { t as Drawer } from "../_libs/vaul.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/drawer-C8q4lSIs.js
var import_jsx_runtime = require_jsx_runtime();
function Drawer$1({ open, onOpenChange, title, children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Root, {
		open,
		onOpenChange,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Portal, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Overlay, { className: "fixed inset-0 z-50 bg-foreground/30" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Drawer.Content, {
			className: cn("fixed inset-x-0 bottom-0 z-50 mt-24 flex max-h-[92vh] flex-col rounded-t-2xl bg-card text-card-foreground shadow-border"),
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "mx-auto mt-3 h-1 w-10 rounded-full bg-border" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Drawer.Title, {
					className: "px-5 pt-4 font-display text-xl font-medium tracking-tight",
					children: title
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "overflow-y-auto px-5 pt-4 pb-[max(1.5rem,env(safe-area-inset-bottom))]",
					children
				})
			]
		})] })
	});
}
//#endregion
export { Drawer$1 as t };
