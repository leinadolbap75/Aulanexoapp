import { i as __toESM } from "../_runtime.mjs";
import { n as clsx, t as cva } from "../_libs/class-variance-authority+clsx.mjs";
import { t as twMerge } from "../_libs/tailwind-merge.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { _ as createRootRoute, b as useRouter, d as useRouterState, g as createFileRoute, h as lazyRouteComponent, l as Scripts, m as Outlet, p as createRouter, u as HeadContent, v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { a as Menu, f as BookOpen, n as TriangleAlert, o as LayoutDashboard, s as GraduationCap, u as ClipboardList } from "../_libs/lucide-react.mjs";
import { a as union, i as string, n as number, r as object, t as literal } from "../_libs/zod.mjs";
import { n as create, t as persist } from "../_libs/zustand.mjs";
import { i as isValid, n as parseISO, r as format, t as es } from "../_libs/date-fns.mjs";
import { t as Toaster } from "../_libs/sonner.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/utils-CMh9uA0a.js
function cn(...inputs) {
	return twMerge(clsx(inputs));
}
function uid() {
	return crypto.randomUUID().replace(/-/g, "").slice(0, 10);
}
function initials(name) {
	const parts = name.trim().split(/\s+/).filter(Boolean);
	if (parts.length === 0) return "?";
	if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
	return `${parts[0][0] ?? ""}${parts[parts.length - 1][0] ?? ""}`.toUpperCase();
}
//#endregion
//#region node_modules/.nitro/vite/services/ssr/assets/router-BeuJ94SI.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
var __defProp = Object.defineProperty;
var __exportAll = (all, no_symbols) => {
	let target = {};
	for (var name in all) __defProp(target, name, {
		get: all[name],
		enumerable: true
	});
	if (!no_symbols) __defProp(target, Symbol.toStringTag, { value: "Module" });
	return target;
};
function AppErrorComponent({ error }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-3 bg-background px-6 text-center text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "text-destructive",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, {
					className: "size-10",
					strokeWidth: 2
				})
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
				className: "font-display text-xl font-medium",
				children: "Algo salió mal"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "max-w-md text-sm break-words text-muted-foreground",
				children: error.message || "Ocurrió un error inesperado. Recarga la página."
			})
		]
	});
}
/**
* App-wide client provider mounted once near the root (in `src/routes/__root.tsx`):
*
*   <AuthProvider><Outlet /></AuthProvider>
*
* Better Auth's React client (`@/lib/auth/client`) needs NO context provider —
* its `useSession()` works standalone — so this is a passthrough today. It's
* kept as the single, stable mount point for any future client-side providers
* (e.g. a toast or theme provider) without churning the root shell.
*/
function AuthProvider({ children }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)(import_jsx_runtime.Fragment, { children });
}
function isGrokEmbedderOrigin(origin) {
	try {
		const url = new URL(origin);
		if (url.protocol !== "https:" && url.protocol !== "http:") return false;
		const host = url.hostname.toLowerCase();
		if (host === "grok.com" || host.endsWith(".grok.com")) return true;
		if (host === "localhost" || host === "127.0.0.1" || host === "[::1]") return true;
		return false;
	} catch {
		return false;
	}
}
function isSandboxPreviewGuestHost(hostname) {
	const host = hostname.toLowerCase();
	return host === "grok-sandbox.com" || host.endsWith(".grok-sandbox.com");
}
function isRemintPreviewPair(guestHost, parentHost) {
	const guest = guestHost.toLowerCase();
	const parent = parentHost.toLowerCase();
	const i = guest.indexOf(".preview.");
	if (i <= 0) return false;
	const label = guest.slice(0, i);
	const rest = guest.slice(i + 9);
	if (label.includes(".") || !rest.includes(".")) return false;
	return parent === rest || parent === `grok.${rest}`;
}
function resolveParentEmbedderOrigin(parentIsSelf, referrer, ancestorOrigin, guestHostname = "") {
	if (parentIsSelf) return null;
	for (const candidate of [referrer, ancestorOrigin ?? ""].filter(Boolean)) try {
		const url = new URL(candidate.includes("://") ? candidate : `https://${candidate}`);
		if (url.protocol !== "https:" && url.protocol !== "http:") continue;
		if (isGrokEmbedderOrigin(url.origin)) return url.origin;
		if (isSandboxPreviewGuestHost(guestHostname) || isRemintPreviewPair(guestHostname, url.hostname)) return url.origin;
	} catch {}
	return null;
}
/**
* Guest side of the grok-web ↔ sandbox preview postMessage bridge.
*
* Activates only when this page is framed by an allowlisted Grok embedder.
* Top-level runs (download/export, local `npm run dev`, deployed sites) noop.
*/
var PREVIEW_BRIDGE_CHANNEL = "grok-preview-bridge";
var EnvelopeSchema = object({
	channel: literal(PREVIEW_BRIDGE_CHANNEL),
	version: number().int().positive(),
	type: string().min(1)
});
var HelloSchema = EnvelopeSchema.extend({ type: literal("hello") });
var NavigateSchema = EnvelopeSchema.extend({
	type: literal("navigate"),
	path: string().min(1)
});
var HistorySchema = EnvelopeSchema.extend({
	type: literal("history"),
	delta: union([literal(-1), literal(1)])
});
function isSafeBridgePath(path) {
	if (!path.startsWith("/") || path.startsWith("//") || path.includes("\\")) return false;
	try {
		return new URL(path, "https://preview.invalid").origin === "https://preview.invalid";
	} catch {
		return false;
	}
}
/**
* Install host↔guest messaging. Returns a dispose function.
* Noops (returns a no-op dispose) when not embedded under a Grok parent.
*/
function installPreviewHostBridge(options = {}) {
	if (typeof window === "undefined") return () => {};
	const ancestorOrigin = typeof location.ancestorOrigins !== "undefined" && location.ancestorOrigins.length > 0 ? location.ancestorOrigins[0] : null;
	const parentOrigin = resolveParentEmbedderOrigin(window.parent === window, document.referrer, ancestorOrigin, window.location.hostname);
	if (parentOrigin === null) return () => {};
	const ROOT_STATE_KEY = "__grokPreviewBridgeRoot";
	const originalPushState = window.history.pushState.bind(window.history);
	const originalReplaceState = window.history.replaceState.bind(window.history);
	const isAtHistoryRoot = () => {
		const state = window.history.state;
		return Boolean(state && typeof state === "object" && state[ROOT_STATE_KEY] === true);
	};
	try {
		const current = window.history.state;
		if (!(current !== null && typeof current === "object" && Object.prototype.hasOwnProperty.call(current, ROOT_STATE_KEY))) {
			const isRoot = window.history.length <= 1;
			originalReplaceState(current && typeof current === "object" ? {
				...current,
				[ROOT_STATE_KEY]: isRoot
			} : { [ROOT_STATE_KEY]: isRoot }, "", window.location.href);
		}
	} catch {}
	const post = (message) => {
		window.parent.postMessage(message, parentOrigin);
	};
	const reportLocation = () => {
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "location",
			path: window.location.pathname || "/",
			search: window.location.search,
			hash: window.location.hash
		});
	};
	const reportRoutes = () => {
		const paths = options.getRoutePaths?.() ?? [];
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "routes",
			paths
		});
	};
	const defaultNavigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		try {
			const url = new URL(path, window.location.origin);
			if (url.origin !== window.location.origin) return;
			const next = `${url.pathname}${url.search}${url.hash}`;
			window.history.pushState(window.history.state, "", next);
			window.dispatchEvent(new PopStateEvent("popstate", { state: window.history.state }));
		} catch {}
	};
	const navigate = (path) => {
		if (!isSafeBridgePath(path)) return;
		if (options.navigate) {
			options.navigate(path);
			return;
		}
		defaultNavigate(path);
	};
	const announce = () => {
		reportLocation();
		reportRoutes();
		post({
			channel: PREVIEW_BRIDGE_CHANNEL,
			version: 1,
			type: "ready"
		});
	};
	const onMessage = (event) => {
		if (event.source !== window.parent) return;
		if (event.origin !== parentOrigin) return;
		const envelope = EnvelopeSchema.safeParse(event.data);
		if (!envelope.success || envelope.data.version !== 1) return;
		if (envelope.data.type === "hello") {
			if (!HelloSchema.safeParse(event.data).success) return;
			announce();
			return;
		}
		if (envelope.data.type === "navigate") {
			const parsed = NavigateSchema.safeParse(event.data);
			if (!parsed.success) return;
			navigate(parsed.data.path);
			queueMicrotask(reportLocation);
			return;
		}
		if (envelope.data.type === "history") {
			const parsed = HistorySchema.safeParse(event.data);
			if (!parsed.success) return;
			if (parsed.data.delta === -1 && isAtHistoryRoot()) return;
			window.history.go(parsed.data.delta);
		}
	};
	const onPopState = () => {
		reportLocation();
	};
	const onHashChange = () => {
		reportLocation();
	};
	window.history.pushState = (data, unused, url) => {
		const next = data && typeof data === "object" ? {
			...data,
			[ROOT_STATE_KEY]: false
		} : data;
		originalPushState(next, unused, url);
		reportLocation();
	};
	window.history.replaceState = (data, unused, url) => {
		const next = isAtHistoryRoot() ? {
			...data && typeof data === "object" ? data : {},
			[ROOT_STATE_KEY]: true
		} : data;
		originalReplaceState(next, unused, url);
		reportLocation();
	};
	window.addEventListener("message", onMessage);
	window.addEventListener("popstate", onPopState);
	window.addEventListener("hashchange", onHashChange);
	announce();
	return () => {
		window.removeEventListener("message", onMessage);
		window.removeEventListener("popstate", onPopState);
		window.removeEventListener("hashchange", onHashChange);
		window.history.pushState = originalPushState;
		window.history.replaceState = originalReplaceState;
	};
}
/** Collect static path patterns from a TanStack route tree (best-effort). */
function collectRoutePathsFromTree(routeTree) {
	const paths = /* @__PURE__ */ new Set();
	const walk = (node) => {
		if (!node || typeof node !== "object") return;
		const record = node;
		const full = typeof record.fullPath === "string" ? record.fullPath : typeof record.path === "string" ? record.path : null;
		if (full !== null && full !== "") paths.add(full.startsWith("/") ? full : `/${full}`);
		else if (full === "") paths.add("/");
		const children = record.children;
		if (Array.isArray(children)) for (const child of children) walk(child);
		else if (children && typeof children === "object") for (const child of Object.values(children)) walk(child);
	};
	walk(routeTree);
	return [...paths];
}
/**
* Mount once in `__root.tsx` so the Grok preview chrome can drive navigation
* (and later receive registered routes). Noops when the app is not embedded.
*/
function PreviewHostBridge() {
	const router = useRouter();
	(0, import_react.useEffect)(() => {
		return installPreviewHostBridge({
			navigate: (path) => {
				router.history.push(path);
			},
			getRoutePaths: () => collectRoutePathsFromTree(router.routeTree)
		});
	}, [router]);
	return null;
}
function Mark({ className }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("svg", {
		viewBox: "0 0 32 32",
		className: cn("size-8", className),
		"aria-hidden": "true",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "3.5",
				y: "4.5",
				width: "17",
				height: "23",
				rx: "3.5",
				className: "fill-primary"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("rect", {
				x: "11.5",
				y: "8.5",
				width: "17",
				height: "19",
				rx: "3.5",
				className: "fill-foreground"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("path", {
				d: "M16 14.5h8.5M16 18.5h6.5M16 22.5h4",
				className: "stroke-background",
				strokeWidth: "1.6",
				strokeLinecap: "round"
			})
		]
	});
}
var badgeVariants = cva("inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium tracking-wide", {
	variants: { tone: {
		muted: "bg-muted text-muted-foreground",
		primary: "bg-primary text-primary-foreground",
		ok: "bg-ok-foreground text-ok",
		warn: "bg-warn-foreground text-warn",
		danger: "bg-destructive/10 text-destructive",
		info: "bg-info-foreground text-info"
	} },
	defaultVariants: { tone: "muted" }
});
function Badge({ className, tone, ...props }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		className: cn(badgeVariants({ tone }), className),
		...props
	});
}
var BANK = [
	{
		id: "q-mat-01",
		subjectId: "mat",
		skill: "álgebra",
		difficulty: 1,
		type: "opcion",
		prompt: "Resuelve 2x + 5 = 17. ¿Cuál es el valor de x?",
		options: [
			"4",
			"5",
			"6",
			"12"
		],
		answer: "6",
		points: 1
	},
	{
		id: "q-mat-02",
		subjectId: "mat",
		skill: "álgebra",
		difficulty: 2,
		type: "opcion",
		prompt: "Factoriza x² − 5x + 6.",
		options: [
			"(x − 2)(x − 3)",
			"(x − 1)(x − 6)",
			"(x + 2)(x + 3)",
			"(x − 6)(x + 1)"
		],
		answer: "(x − 2)(x − 3)",
		points: 2
	},
	{
		id: "q-mat-03",
		subjectId: "mat",
		skill: "álgebra",
		difficulty: 3,
		type: "abierta",
		prompt: "Un número más el triple de su consecutivo suma 31. Plantea la ecuación y halla el número.",
		answer: "7",
		rubric: "Ecuación x + 3(x+1) = 31 → 4x + 3 = 31 → x = 7. Punto completo si plantea y resuelve.",
		points: 3
	},
	{
		id: "q-mat-04",
		subjectId: "mat",
		skill: "geometría",
		difficulty: 1,
		type: "opcion",
		prompt: "Un triángulo tiene base 8 cm y altura 5 cm. ¿Cuál es su área?",
		options: [
			"20 cm²",
			"40 cm²",
			"13 cm²",
			"26 cm²"
		],
		answer: "20 cm²",
		points: 1
	},
	{
		id: "q-mat-05",
		subjectId: "mat",
		skill: "geometría",
		difficulty: 2,
		type: "verdadero",
		prompt: "La suma de los ángulos interiores de cualquier triángulo es 180°.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-mat-06",
		subjectId: "mat",
		skill: "estadística",
		difficulty: 1,
		type: "opcion",
		prompt: "La media de 4, 6, 8 y 10 es:",
		options: [
			"6",
			"7",
			"8",
			"28"
		],
		answer: "7",
		points: 1
	},
	{
		id: "q-mat-07",
		subjectId: "mat",
		skill: "estadística",
		difficulty: 2,
		type: "opcion",
		prompt: "En el conjunto 2, 5, 5, 7, 11, la mediana es:",
		options: [
			"2",
			"5",
			"6",
			"7"
		],
		answer: "5",
		points: 1
	},
	{
		id: "q-mat-08",
		subjectId: "mat",
		skill: "aritmética",
		difficulty: 1,
		type: "opcion",
		prompt: "El 25% de 80 es:",
		options: [
			"15",
			"20",
			"25",
			"40"
		],
		answer: "20",
		points: 1
	},
	{
		id: "q-mat-09",
		subjectId: "mat",
		skill: "álgebra",
		difficulty: 2,
		type: "verdadero",
		prompt: "La pendiente de la recta y = −3x + 2 es negativa.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-mat-10",
		subjectId: "mat",
		skill: "geometría",
		difficulty: 3,
		type: "abierta",
		prompt: "Un rectángulo tiene perímetro 36 cm y largo 11 cm. Calcula el ancho y el área.",
		answer: "ancho 7 cm, área 77 cm²",
		rubric: "2(l+a)=36 → a=7; área=77. Mitad de puntaje si solo halla el ancho.",
		points: 3
	},
	{
		id: "q-len-01",
		subjectId: "len",
		skill: "gramática",
		difficulty: 1,
		type: "opcion",
		prompt: "¿Cuál oración está correctamente tildada?",
		options: [
			"El publico aplaudio al actor.",
			"El público aplaudió al actor.",
			"El publico aplaudió al actor.",
			"El público aplaudio al actor."
		],
		answer: "El público aplaudió al actor.",
		points: 1
	},
	{
		id: "q-len-02",
		subjectId: "len",
		skill: "gramática",
		difficulty: 2,
		type: "opcion",
		prompt: "En «Los estudiantes, cansados, salieron», las comas encierran un:",
		options: [
			"Vocativo",
			"Inciso explicativo",
			"Enumeración",
			"Hipérbaton"
		],
		answer: "Inciso explicativo",
		points: 1
	},
	{
		id: "q-len-03",
		subjectId: "len",
		skill: "comprensión",
		difficulty: 1,
		type: "verdadero",
		prompt: "La idea principal de un párrafo suele aparecer al inicio o al cierre del mismo.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-len-04",
		subjectId: "len",
		skill: "comprensión",
		difficulty: 2,
		type: "opcion",
		prompt: "Un texto argumentativo se caracteriza sobre todo por:",
		options: [
			"Narrar una anécdota personal",
			"Defender una tesis con razones y evidencias",
			"Describir un paisaje con adjetivos",
			"Listar definiciones de un diccionario"
		],
		answer: "Defender una tesis con razones y evidencias",
		points: 2
	},
	{
		id: "q-len-05",
		subjectId: "len",
		skill: "redacción",
		difficulty: 2,
		type: "abierta",
		prompt: "Escribe un párrafo de 4–6 líneas que defienda por qué conviene entregar los deberes a tiempo. Incluye una tesis y dos razones.",
		answer: "Tesis + dos razones + cierre",
		rubric: "Tesis clara (1), dos razones (1), cohesión y ortografía (1).",
		points: 3
	},
	{
		id: "q-len-06",
		subjectId: "len",
		skill: "gramática",
		difficulty: 1,
		type: "opcion",
		prompt: "El sujeto de «Llegaron tarde los invitados» es:",
		options: [
			"Llegaron",
			"tarde",
			"los invitados",
			"elíptico"
		],
		answer: "los invitados",
		points: 1
	},
	{
		id: "q-len-07",
		subjectId: "len",
		skill: "comprensión",
		difficulty: 3,
		type: "abierta",
		prompt: "Lee: «No todo lo que brilla es oro, pero a veces el barro esconde pepitas.» Explica el sentido figurado en dos oraciones.",
		answer: "Las apariencias engañan; el valor puede estar en lo humilde.",
		rubric: "Identifica contraste apariencia/esencia. Puntaje parcial si parafrasea literalmente.",
		points: 3
	},
	{
		id: "q-len-08",
		subjectId: "len",
		skill: "redacción",
		difficulty: 1,
		type: "verdadero",
		prompt: "Un conector como «sin embargo» introduce una idea de contraste.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-ccn-01",
		subjectId: "ccn",
		skill: "célula",
		difficulty: 1,
		type: "opcion",
		prompt: "La organela que produce la mayor parte del ATP en la célula eucariota es:",
		options: [
			"Ribosoma",
			"Mitocondria",
			"Lisosoma",
			"Aparato de Golgi"
		],
		answer: "Mitocondria",
		points: 1
	},
	{
		id: "q-ccn-02",
		subjectId: "ccn",
		skill: "célula",
		difficulty: 2,
		type: "verdadero",
		prompt: "Las células vegetales poseen pared celular y cloroplastos; las animales no.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-ccn-03",
		subjectId: "ccn",
		skill: "ecosistema",
		difficulty: 1,
		type: "opcion",
		prompt: "En una cadena trófica, los productores son principalmente:",
		options: [
			"Herbívoros",
			"Hongos",
			"Plantas y algas",
			"Carnívoros"
		],
		answer: "Plantas y algas",
		points: 1
	},
	{
		id: "q-ccn-04",
		subjectId: "ccn",
		skill: "ecosistema",
		difficulty: 2,
		type: "opcion",
		prompt: "Si desaparecen los depredadores tope de un bosque, lo más probable es:",
		options: [
			"Que aumenten los herbívoros y se altere la vegetación",
			"Que las plantas se reproduzcan más rápido",
			"Que el clima se vuelva más frío",
			"Que desaparezcan los descomponedores"
		],
		answer: "Que aumenten los herbívoros y se altere la vegetación",
		points: 2
	},
	{
		id: "q-ccn-05",
		subjectId: "ccn",
		skill: "laboratorio",
		difficulty: 2,
		type: "abierta",
		prompt: "Describe tres normas de seguridad que deben cumplirse al usar un mechero y reactivos en el laboratorio.",
		answer: "Bata, gafas, cabello recogido, no pipetear con la boca, identificar reactivos.",
		rubric: "Tres normas pertinentes y específicas del lab (1 c/u).",
		points: 3
	},
	{
		id: "q-ccn-06",
		subjectId: "ccn",
		skill: "célula",
		difficulty: 3,
		type: "abierta",
		prompt: "Explica por qué una célula muscular tiene más mitocondrias que una célula adiposa.",
		answer: "Mayor demanda energética para la contracción.",
		rubric: "Relaciona función (contracción) con demanda de ATP y número de mitocondrias.",
		points: 3
	},
	{
		id: "q-ccn-07",
		subjectId: "ccn",
		skill: "laboratorio",
		difficulty: 1,
		type: "verdadero",
		prompt: "La observación al microscopio requiere empezar con el objetivo de menor aumento.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-ccn-08",
		subjectId: "ccn",
		skill: "ecosistema",
		difficulty: 1,
		type: "opcion",
		prompt: "El agua que pasa de líquido a vapor en las hojas se llama:",
		options: [
			"Infiltración",
			"Transpiración",
			"Condensación",
			"Escorrentía"
		],
		answer: "Transpiración",
		points: 1
	},
	{
		id: "q-eso-01",
		subjectId: "eso",
		skill: "historia",
		difficulty: 1,
		type: "opcion",
		prompt: "La independencia del actual Ecuador se consolidó con la Batalla de Pichincha en:",
		options: [
			"1809",
			"1820",
			"1822",
			"1830"
		],
		answer: "1822",
		points: 1
	},
	{
		id: "q-eso-02",
		subjectId: "eso",
		skill: "historia",
		difficulty: 2,
		type: "verdadero",
		prompt: "El 10 de agosto de 1809 se produjo el Primer Grito de Independencia en Quito.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-eso-03",
		subjectId: "eso",
		skill: "civica",
		difficulty: 1,
		type: "opcion",
		prompt: "En el Ecuador, el organismo que vela por los derechos de niñas, niños y adolescentes en la escuela se articula con:",
		options: [
			"El DECE",
			"El SRI",
			"El IESS únicamente",
			"La Junta Mercantil"
		],
		answer: "El DECE",
		points: 1
	},
	{
		id: "q-eso-04",
		subjectId: "eso",
		skill: "geografía",
		difficulty: 1,
		type: "opcion",
		prompt: "La cordillera de los Andes divide al Ecuador en regiones. La región litoral se conoce como:",
		options: [
			"Oriente",
			"Costa",
			"Insular",
			"Sierra centro"
		],
		answer: "Costa",
		points: 1
	},
	{
		id: "q-eso-05",
		subjectId: "eso",
		skill: "historia",
		difficulty: 3,
		type: "abierta",
		prompt: "Compara el Primer Grito de Independencia (1809) con la Batalla de Pichincha (1822): ¿qué cambió entre ambos hitos?",
		answer: "De junta local a campaña militar bolivariana que sella la independencia.",
		rubric: "Sitúa ambos hechos, explica el cambio de alcance político-militar.",
		points: 3
	},
	{
		id: "q-eso-06",
		subjectId: "eso",
		skill: "civica",
		difficulty: 2,
		type: "abierta",
		prompt: "Menciona dos deberes y dos derechos de un estudiante según la convivencia escolar.",
		answer: "Derechos: educación, respeto. Deberes: asistencia, respeto a pares y docentes.",
		rubric: "Dos derechos y dos deberes pertinentes (0.75 c/u, redondeo a enteros).",
		points: 3
	},
	{
		id: "q-eso-07",
		subjectId: "eso",
		skill: "geografía",
		difficulty: 2,
		type: "verdadero",
		prompt: "Las islas Galápagos pertenecen a la región insular del Ecuador.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-ing-01",
		subjectId: "ing",
		skill: "vocabulario",
		difficulty: 1,
		type: "opcion",
		prompt: "Choose the correct meaning of “homework”.",
		options: [
			"Housework",
			"School assignment",
			"Holiday",
			"Classroom"
		],
		answer: "School assignment",
		points: 1
	},
	{
		id: "q-ing-02",
		subjectId: "ing",
		skill: "gramática",
		difficulty: 1,
		type: "opcion",
		prompt: "She ____ to school every day.",
		options: [
			"go",
			"goes",
			"going",
			"gone"
		],
		answer: "goes",
		points: 1
	},
	{
		id: "q-ing-03",
		subjectId: "ing",
		skill: "gramática",
		difficulty: 2,
		type: "opcion",
		prompt: "If it rains tomorrow, we ____ the field trip.",
		options: [
			"cancel",
			"will cancel",
			"cancelled",
			"cancelling"
		],
		answer: "will cancel",
		points: 2
	},
	{
		id: "q-ing-04",
		subjectId: "ing",
		skill: "comprensión",
		difficulty: 2,
		type: "verdadero",
		prompt: "“Yet” at the end of a sentence often means the action has not happened up to now.",
		options: ["Verdadero", "Falso"],
		answer: "Verdadero",
		points: 1
	},
	{
		id: "q-ing-05",
		subjectId: "ing",
		skill: "redacción",
		difficulty: 2,
		type: "abierta",
		prompt: "Write 4 sentences about your study habits using present simple and at least one frequency adverb.",
		answer: "I always review math at night. …",
		rubric: "Cuatro oraciones (1), presente simple correcto (1), adverbio de frecuencia (1).",
		points: 3
	},
	{
		id: "q-ing-06",
		subjectId: "ing",
		skill: "vocabulario",
		difficulty: 1,
		type: "opcion",
		prompt: "A student who did not turn in work is ____.",
		options: [
			"on time",
			"absent-minded only",
			"missing the deadline",
			"the teacher"
		],
		answer: "missing the deadline",
		points: 1
	},
	{
		id: "q-ing-07",
		subjectId: "ing",
		skill: "comprensión",
		difficulty: 3,
		type: "abierta",
		prompt: "Read: “Maya reviewed her weak topics before the test and asked for extra practice.” What strategy did she use, and why does it help?",
		answer: "Targeted review of weak skills; practice retrieval improves retention.",
		rubric: "Identifica práctica deliberada / refuerzo de debilidades y da una razón.",
		points: 3
	}
];
function questionsForSubject(subjectId) {
	return BANK.filter((q) => q.subjectId === subjectId);
}
var ROLE_LABEL = {
	docente: "Docente",
	dece: "DECE",
	vicerrector: "Vicerrectorado",
	rector: "Rectorado",
	familia: "Familia"
};
var ROLE_HINT = {
	docente: "Asigna, verifica, evalúa y califica",
	dece: "Seguimiento socioemocional y riesgo",
	vicerrector: "Rendimiento académico del curso",
	rector: "Vista institucional y periodos",
	familia: "Deberes, notas y avisos del hijo"
};
var EVAL_TYPE_LABEL = {
	diagnostico: "Diagnóstico",
	parcial: "Parcial",
	trimestral: "Trimestral",
	recuperacion: "Recuperación"
};
var SUBMISSION_LABEL = {
	pendiente: "Pendiente",
	entregado: "Entregado",
	tarde: "Atrasado",
	no_entregado: "No presentado"
};
var APPROVAL_LABEL = {
	aprobado: "Aprobado",
	supletorio: "Supletorio",
	remedial: "Remedial"
};
function round1(n) {
	return Math.round(n * 10) / 10;
}
function approvalOf(score) {
	if (score === null) return null;
	if (score >= 7) return "aprobado";
	if (score >= 5) return "supletorio";
	return "remedial";
}
function homeworkPoints(status) {
	if (status === "entregado") return 1;
	if (status === "tarde") return .5;
	if (status === "no_entregado") return 0;
	return null;
}
function homeworkAverage(homeworks, studentId) {
	const scored = homeworks.filter((h) => h.studentIds.includes(studentId)).map((h) => h.submissions.find((s) => s.studentId === studentId)).map((s) => s ? homeworkPoints(s.status) : null).filter((v) => v !== null);
	if (scored.length === 0) return null;
	return round1(scored.reduce((a, b) => a + b, 0) / scored.length * 10);
}
function homeworkRate(homeworks, studentId) {
	const relevant = homeworks.filter((h) => h.studentIds.includes(studentId));
	if (relevant.length === 0) return 0;
	return relevant.filter((h) => {
		const s = h.submissions.find((x) => x.studentId === studentId);
		return s && (s.status === "entregado" || s.status === "tarde");
	}).length / relevant.length;
}
function evalAverage(evaluations, studentId, subjectId) {
	const scores = evaluations.filter((e) => {
		if (subjectId && e.subjectId !== subjectId) return false;
		const att = e.attempts.find((a) => a.studentId === studentId);
		return Boolean(att && (att.published || e.status === "calificada") && att.submittedAt);
	}).map((e) => {
		const att = e.attempts.find((a) => a.studentId === studentId);
		if (att.maxScore <= 0) return null;
		return att.score / att.maxScore * 10;
	}).filter((v) => v !== null);
	if (scores.length === 0) return null;
	return round1(scores.reduce((a, b) => a + b, 0) / scores.length);
}
function finalAverage(homeworks, evaluations, studentId, subjectId) {
	const hw = subjectId ? homeworkAverage(homeworks.filter((h) => h.subjectId === subjectId), studentId) : homeworkAverage(homeworks, studentId);
	const ev = evalAverage(evaluations, studentId, subjectId);
	if (hw === null && ev === null) return null;
	if (hw === null) return ev;
	if (ev === null) return hw;
	return round1(hw * .3 + ev * .7);
}
function courseAverage(students, homeworks, evaluations) {
	const vals = students.map((s) => finalAverage(homeworks, evaluations, s.id)).filter((v) => v !== null);
	if (vals.length === 0) return null;
	return round1(vals.reduce((a, b) => a + b, 0) / vals.length);
}
function levelFromAvg(avg, rate) {
	if (avg === null) return rate < .6 ? "refuerzo" : "medio";
	if (avg < 7 || rate < .55) return "refuerzo";
	if (avg >= 8.6 && rate >= .8) return "avanzado";
	return "medio";
}
function attemptScore(att) {
	return att.maxScore > 0 ? round1(att.score / att.maxScore * 10) : 0;
}
function shuffle(arr) {
	const copy = [...arr];
	for (let i = copy.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[copy[i], copy[j]] = [copy[j], copy[i]];
	}
	return copy;
}
function skillScores(evaluations, studentId, subjectId) {
	const map = /* @__PURE__ */ new Map();
	for (const ev of evaluations) {
		if (ev.subjectId !== subjectId) continue;
		const inst = ev.instruments.find((i) => i.studentId === studentId);
		const att = ev.attempts.find((a) => a.studentId === studentId);
		if (!inst || !att?.submittedAt) continue;
		for (const q of inst.questions) {
			const given = att.answers[q.id];
			let ok = 0;
			if (q.type === "abierta") {
				const pts = att.openScores[q.id];
				if (pts === void 0) continue;
				ok = q.points > 0 ? pts / q.points : 0;
			} else if (given !== void 0) ok = given.trim().toLowerCase() === q.answer.trim().toLowerCase() ? 1 : 0;
			else continue;
			const cur = map.get(q.skill) ?? {
				sum: 0,
				n: 0
			};
			cur.sum += ok;
			cur.n += 1;
			map.set(q.skill, cur);
		}
	}
	const weak = [];
	for (const [skill, v] of map) if (v.n > 0 && v.sum / v.n < .65) weak.push(skill);
	return weak;
}
function pickByDifficulty(pool, difficulty, n, preferSkills) {
	const preferred = shuffle(pool.filter((q) => q.difficulty === difficulty && preferSkills.includes(q.skill)));
	const rest = shuffle(pool.filter((q) => q.difficulty === difficulty && !preferSkills.includes(q.skill)));
	return [...preferred, ...rest].slice(0, n);
}
function mixForLevel(level) {
	if (level === "refuerzo") return {
		d1: 3,
		d2: 2,
		d3: 1
	};
	if (level === "avanzado") return {
		d1: 1,
		d2: 2,
		d3: 3
	};
	return {
		d1: 2,
		d2: 3,
		d3: 1
	};
}
function buildInstrument(studentId, subjectId, level, focus, personalized) {
	const pool = questionsForSubject(subjectId);
	const mix = personalized ? mixForLevel(level) : {
		d1: 2,
		d2: 3,
		d3: 1
	};
	const skills = personalized ? focus : [];
	const picked = [];
	const take = (d, n) => {
		const next = pickByDifficulty(pool.filter((q) => !picked.some((p) => p.id === q.id)), d, n, skills);
		picked.push(...next);
	};
	take(1, mix.d1);
	take(2, mix.d2);
	take(3, mix.d3);
	if (picked.length < 6) {
		const extra = shuffle(pool.filter((q) => !picked.some((p) => p.id === q.id))).slice(0, 6 - picked.length);
		picked.push(...extra);
	}
	return {
		studentId,
		level: personalized ? level : "medio",
		focus: personalized ? focus : [],
		questions: picked.map((q) => ({ ...q }))
	};
}
function studentLevel(studentId, subjectId, homeworks, evaluations) {
	const avg = evalAverage(evaluations, studentId, subjectId);
	const rate = homeworkRate(homeworks.filter((h) => h.subjectId === subjectId), studentId);
	const focus = skillScores(evaluations, studentId, subjectId);
	return {
		level: levelFromAvg(avg, rate),
		focus,
		avg,
		rate
	};
}
function scoreClosed(questions, answers) {
	let score = 0;
	let max = 0;
	for (const q of questions) {
		max += q.points;
		if (q.type === "abierta") continue;
		const given = answers[q.id];
		if (given && given.trim().toLowerCase() === q.answer.trim().toLowerCase()) score += q.points;
	}
	return {
		score,
		max
	};
}
var SCHOOL_DEFAULT = "Unidad Educativa Los Arrayanes";
var COURSE = "10.º EGB A";
var YEAR_LABEL = "2026-2027 · Primer trimestre";
var SUBJECTS = [
	{
		id: "mat",
		name: "Matemática",
		teacher: "Lcda. Marina Cobo",
		short: "MAT"
	},
	{
		id: "len",
		name: "Lengua y Literatura",
		teacher: "Mtr. Pablo Ayala",
		short: "LEN"
	},
	{
		id: "ccn",
		name: "Ciencias Naturales",
		teacher: "Ing. Ruth Paredes",
		short: "CCN"
	},
	{
		id: "eso",
		name: "Estudios Sociales",
		teacher: "Lcdo. Iván Guerra",
		short: "ESO"
	},
	{
		id: "ing",
		name: "Inglés",
		teacher: "Ms. Helen Brooks",
		short: "ING"
	}
];
var STUDENTS = [
	{
		id: "s01",
		firstName: "Camila",
		lastName: "Andrade",
		course: COURSE,
		parentName: "Elena Andrade",
		parentRelation: "Madre",
		parentPhone: "099 451 2201",
		notes: "Liderazgo en clase. Candidata a monitora."
	},
	{
		id: "s02",
		firstName: "Mateo",
		lastName: "Vásquez",
		course: COURSE,
		parentName: "Jorge Vásquez",
		parentRelation: "Padre",
		parentPhone: "098 332 1180",
		notes: "Constante. Pide refuerzo en estadística."
	},
	{
		id: "s03",
		firstName: "Valentina",
		lastName: "Cevallos",
		course: COURSE,
		parentName: "Patricia Cevallos",
		parentRelation: "Madre",
		parentPhone: "097 610 4492",
		notes: "Participa bien en lengua; distrae en matemática."
	},
	{
		id: "s04",
		firstName: "Diego",
		lastName: "Paredes",
		course: COURSE,
		parentName: "Lucía Paredes",
		parentRelation: "Madre",
		parentPhone: "096 228 7714",
		notes: "Cumple, sin destacar. Seguimiento rutinario."
	},
	{
		id: "s05",
		firstName: "Isabella",
		lastName: "Mora",
		course: COURSE,
		parentName: "Andrés Mora",
		parentRelation: "Padre",
		parentPhone: "095 804 3366",
		notes: "Baja entrega de deberes. DECE ya tiene ficha abierta."
	},
	{
		id: "s06",
		firstName: "Sebastián",
		lastName: "Quishpe",
		course: COURSE,
		parentName: "Rosa Quishpe",
		parentRelation: "Madre",
		parentPhone: "099 120 5588",
		notes: "Riesgo académico. Refuerzo personalizado urgente."
	},
	{
		id: "s07",
		firstName: "Lucía",
		lastName: "Benítez",
		course: COURSE,
		parentName: "Carlos Benítez",
		parentRelation: "Padre",
		parentPhone: "098 777 2019",
		notes: "Buena comprensión lectora. Apoya a pares."
	},
	{
		id: "s08",
		firstName: "Andrés",
		lastName: "Salazar",
		course: COURSE,
		parentName: "Mónica Salazar",
		parentRelation: "Madre",
		parentPhone: "097 441 0903",
		notes: "Promedio justo. Mejoró en el último parcial."
	},
	{
		id: "s09",
		firstName: "Emilia",
		lastName: "Torres",
		course: COURSE,
		parentName: "Gabriel Torres",
		parentRelation: "Padre",
		parentPhone: "096 555 8120",
		notes: "Alto desempeño. Proponer ampliación."
	},
	{
		id: "s10",
		firstName: "Nicolás",
		lastName: "Ibarra",
		course: COURSE,
		parentName: "Sofía Ibarra",
		parentRelation: "Madre",
		parentPhone: "095 333 6741",
		notes: "Muy constante. Leve ansiedad ante pruebas."
	},
	{
		id: "s11",
		firstName: "Paula",
		lastName: "Mendoza",
		course: COURSE,
		parentName: "Héctor Mendoza",
		parentRelation: "Padre",
		parentPhone: "099 888 4402",
		notes: "Fluctúa según la materia. Ciencias más baja."
	},
	{
		id: "s12",
		firstName: "Joaquín",
		lastName: "Rivas",
		course: COURSE,
		parentName: "Ana Rivas",
		parentRelation: "Madre",
		parentPhone: "098 212 9090",
		notes: "Inasistencias puntuales. Familia notificada en julio."
	}
];
var ALL_IDS = STUDENTS.map((s) => s.id);
function subs(map, at) {
	return ALL_IDS.map((id) => ({
		studentId: id,
		status: map[id] ?? "pendiente",
		at: map[id] && map[id] !== "pendiente" ? at : void 0
	}));
}
function snapshot(subjectId, ids) {
	const pool = BANK.filter((q) => q.subjectId === subjectId).slice(0, 6);
	return ids.map((studentId) => ({
		studentId,
		level: "medio",
		focus: [],
		questions: pool.map((q) => ({ ...q }))
	}));
}
function gradedAttempts(instruments, scores10, submittedAt) {
	return instruments.map((inst) => {
		const maxScore = inst.questions.reduce((a, q) => a + q.points, 0);
		const target = scores10[inst.studentId] ?? 7;
		const score = Math.round(target / 10 * maxScore * 10) / 10;
		return {
			studentId: inst.studentId,
			answers: {},
			openScores: {},
			score,
			maxScore,
			submittedAt,
			published: true
		};
	});
}
var MAT_SCORES = {
	s01: 9.5,
	s02: 7.6,
	s03: 8,
	s04: 7.1,
	s05: 5.4,
	s06: 4.3,
	s07: 8.4,
	s08: 7.2,
	s09: 9.1,
	s10: 8.8,
	s11: 6.6,
	s12: 5.1
};
var LEN_SCORES = {
	s01: 9.2,
	s02: 7.8,
	s03: 8.6,
	s04: 7.4,
	s05: 6.8,
	s06: 5,
	s07: 9,
	s08: 7,
	s09: 8.9,
	s10: 8.3,
	s11: 7.2,
	s12: 5.8
};
function createSeed() {
	const homeworks = [
		{
			id: "hw1",
			title: "Ecuaciones lineales — hoja 12",
			subjectId: "mat",
			due: "2026-08-22",
			assignedAt: "2026-08-18",
			description: "Resolver los ejercicios 1 al 15 de la hoja 12. Mostrar el procedimiento completo.",
			studentIds: ALL_IDS,
			submissions: subs({
				s01: "entregado",
				s02: "entregado",
				s03: "entregado",
				s04: "entregado",
				s05: "no_entregado",
				s06: "no_entregado",
				s07: "entregado",
				s08: "tarde",
				s09: "entregado",
				s10: "entregado",
				s11: "tarde",
				s12: "no_entregado"
			}, "2026-08-22T18:10:00.000Z")
		},
		{
			id: "hw2",
			title: "Ensayo argumentativo: la lectura en casa",
			subjectId: "len",
			due: "2026-08-26",
			assignedAt: "2026-08-20",
			description: "Redactar un ensayo de 350 palabras con tesis, dos argumentos y cierre. Entregar en el cuaderno.",
			studentIds: ALL_IDS,
			submissions: subs({
				s01: "entregado",
				s02: "entregado",
				s03: "pendiente",
				s04: "entregado",
				s05: "pendiente",
				s06: "pendiente",
				s07: "entregado",
				s08: "pendiente",
				s09: "entregado",
				s10: "entregado",
				s11: "pendiente",
				s12: "pendiente"
			}, "2026-08-25T16:00:00.000Z")
		},
		{
			id: "hw3",
			title: "Informe de laboratorio: células",
			subjectId: "ccn",
			due: "2026-08-28",
			assignedAt: "2026-08-21",
			description: "Completar la guía de observación al microscopio e incluir un dibujo etiquetado.",
			studentIds: ALL_IDS,
			submissions: subs({
				s01: "pendiente",
				s02: "pendiente",
				s03: "pendiente",
				s04: "pendiente",
				s05: "pendiente",
				s06: "pendiente",
				s07: "pendiente",
				s08: "pendiente",
				s09: "pendiente",
				s10: "pendiente",
				s11: "pendiente",
				s12: "pendiente"
			})
		},
		{
			id: "hw4",
			title: "Línea de tiempo: 1809–1822",
			subjectId: "eso",
			due: "2026-09-02",
			assignedAt: "2026-08-24",
			description: "Construir una línea de tiempo con cinco hitos entre el Grito de Independencia y Pichincha.",
			studentIds: ALL_IDS,
			submissions: subs({
				s01: "pendiente",
				s02: "pendiente",
				s03: "pendiente",
				s04: "pendiente",
				s05: "pendiente",
				s06: "pendiente",
				s07: "pendiente",
				s08: "pendiente",
				s09: "pendiente",
				s10: "pendiente",
				s11: "pendiente",
				s12: "pendiente"
			})
		}
	];
	const matInst = snapshot("mat", ALL_IDS);
	const lenInst = snapshot("len", ALL_IDS);
	const evaluations = [
		{
			id: "ev1",
			title: "Parcial 1 — álgebra y geometría",
			subjectId: "mat",
			type: "parcial",
			status: "calificada",
			scheduledAt: "2026-08-15",
			durationMin: 45,
			instructions: "Calculadora simple permitida. Justificar procedimientos.",
			personalized: false,
			instruments: matInst,
			attempts: gradedAttempts(matInst, MAT_SCORES, "2026-08-15T15:40:00.000Z")
		},
		{
			id: "ev2",
			title: "Diagnóstico de comprensión lectora",
			subjectId: "len",
			type: "diagnostico",
			status: "calificada",
			scheduledAt: "2026-08-20",
			durationMin: 40,
			instructions: "Leer con atención. Las abiertas se califican con rúbrica.",
			personalized: false,
			instruments: lenInst,
			attempts: gradedAttempts(lenInst, LEN_SCORES, "2026-08-20T14:20:00.000Z")
		},
		{
			id: "ev3",
			title: "Parcial — célula y ecosistema",
			subjectId: "ccn",
			type: "parcial",
			status: "programada",
			scheduledAt: "2026-09-04",
			durationMin: 40,
			instructions: "Instrumento personalizado según el desempeño del diagnóstico de hábitos y el parcial de matemática (transferencia de rigor).",
			personalized: true,
			instruments: [],
			attempts: []
		},
		{
			id: "ev4",
			title: "Recuperación de matemática",
			subjectId: "mat",
			type: "recuperacion",
			status: "borrador",
			scheduledAt: "2026-09-08",
			durationMin: 40,
			instructions: "Solo para estudiantes en supletorio o remedial. Instrumento de refuerzo.",
			personalized: true,
			instruments: [],
			attempts: []
		}
	];
	evaluations[2].instruments = ALL_IDS.map((id) => {
		const { level, focus } = studentLevel(id, "ccn", homeworks, evaluations);
		const mathLevel = studentLevel(id, "mat", homeworks, evaluations);
		return buildInstrument(id, "ccn", mathLevel.avg !== null && mathLevel.avg < 7 ? "refuerzo" : level, focus, true);
	});
	return {
		schoolName: SCHOOL_DEFAULT,
		role: "docente",
		familyStudentId: "s06",
		students: STUDENTS,
		subjects: SUBJECTS,
		homeworks,
		evaluations,
		messages: [
			{
				id: "m1",
				studentId: "s05",
				kind: "incumplimiento",
				status: "enviado",
				subject: "No presentación de deber — Matemática",
				body: "Estimado Andrés Mora:\n\nLe informamos que Isabella no presentó el deber «Ecuaciones lineales — hoja 12», con fecha de entrega 22 de agosto. El promedio actual en matemática se encuentra bajo la nota de aprobación (7.0).\n\nQuedamos atentos para coordinar refuerzo.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
				createdAt: "2026-08-22T19:00:00.000Z",
				relatedId: "hw1"
			},
			{
				id: "m2",
				studentId: "s06",
				kind: "incumplimiento",
				status: "enviado",
				subject: "No presentación de deber — Matemática",
				body: "Estimada Rosa Quishpe:\n\nSebastián no presentó el deber «Ecuaciones lineales — hoja 12» (22 de agosto). Su último parcial fue 4.3/10. El DECE y el área académica recomiendan un plan de refuerzo personalizado.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
				createdAt: "2026-08-22T19:02:00.000Z",
				relatedId: "hw1"
			},
			{
				id: "m3",
				studentId: "s12",
				kind: "incumplimiento",
				status: "enviado",
				subject: "No presentación de deber — Matemática",
				body: "Estimada Ana Rivas:\n\nJoaquín no presentó el deber de ecuaciones lineales del 22 de agosto. El promedio proyectado está en zona de supletorio.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
				createdAt: "2026-08-22T19:04:00.000Z",
				relatedId: "hw1"
			},
			{
				id: "m4",
				studentId: "s01",
				kind: "calificacion",
				status: "enviado",
				subject: "Calificación publicada — Parcial 1 de Matemática",
				body: "Estimada Elena Andrade:\n\nCamila obtuvo 9.5/10 en el Parcial 1 de Matemática (15 de agosto). Felicitamos el desempeño y el cumplimiento de deberes.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
				createdAt: "2026-08-16T09:10:00.000Z",
				relatedId: "ev1"
			},
			{
				id: "m5",
				studentId: "s06",
				kind: "calificacion",
				status: "enviado",
				subject: "Calificación publicada — Parcial 1 de Matemática",
				body: "Estimada Rosa Quishpe:\n\nSebastián obtuvo 4.3/10 en el Parcial 1 de Matemática. La nota no alcanza la aprobación (7.0). Se programará una evaluación de recuperación con instrumento personalizado de refuerzo.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
				createdAt: "2026-08-16T09:12:00.000Z",
				relatedId: "ev1"
			},
			{
				id: "m6",
				studentId: "s08",
				kind: "cumplimiento",
				status: "cola",
				subject: "Entrega tardía registrada — Matemática",
				body: "Estimada Mónica Salazar:\n\nAndrés entregó el deber de ecuaciones lineales fuera de plazo. La entrega se registra como atrasada (50% del puntaje de deber). Agradecemos el envío y recordamos la fecha de los próximos trabajos.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
				createdAt: "2026-08-23T08:00:00.000Z",
				relatedId: "hw1"
			}
		]
	};
}
function parseDate(value) {
	const d = value.length <= 10 ? parseISO(`${value}T12:00:00`) : parseISO(value);
	return isValid(d) ? d : new Date(value);
}
function formatDay(value) {
	return format(parseDate(value), "d MMM", { locale: es });
}
function formatLong(value) {
	return format(parseDate(value), "d 'de' MMMM yyyy", { locale: es });
}
function formatWhen(value) {
	const d = parseDate(value);
	if (!isValid(d)) return value;
	if (value.length > 10) return format(d, "d MMM, HH:mm", { locale: es });
	return format(d, "EEE d MMM", { locale: es });
}
function todayIso() {
	return format(/* @__PURE__ */ new Date(), "yyyy-MM-dd");
}
function nowIso() {
	return (/* @__PURE__ */ new Date()).toISOString();
}
function fullName(state, studentId) {
	const s = state.students.find((x) => x.id === studentId);
	return s ? `${s.firstName} ${s.lastName}` : "el/la estudiante";
}
function parentLine(state, studentId) {
	const s = state.students.find((x) => x.id === studentId);
	if (!s) return "Familia";
	return `${s.parentRelation === "Madre" ? "Estimada" : "Estimado"} ${s.parentName}`;
}
function subjectName(state, subjectId) {
	return state.subjects.find((x) => x.id === subjectId)?.name ?? "la asignatura";
}
function teacherOf(state, subjectId) {
	return state.subjects.find((x) => x.id === subjectId)?.teacher ?? "El área académica";
}
function pushMessage(messages, input) {
	if (messages.some((m) => m.relatedId === input.relatedId && m.studentId === input.studentId && m.kind === input.kind && m.status === "cola")) return messages;
	return [{
		...input,
		id: uid(),
		createdAt: nowIso(),
		status: input.status ?? "cola"
	}, ...messages];
}
var useAppStore = create()(persist((set, get) => ({
	...createSeed(),
	setRole: (role) => set({ role }),
	setSchoolName: (schoolName) => set({ schoolName }),
	setFamilyStudentId: (familyStudentId) => set({ familyStudentId }),
	resetDemo: () => set({
		...createSeed(),
		role: get().role,
		familyStudentId: get().familyStudentId
	}),
	addHomework: (input) => {
		const id = uid();
		set({ homeworks: [{
			id,
			title: input.title,
			subjectId: input.subjectId,
			due: input.due,
			assignedAt: todayIso(),
			description: input.description,
			studentIds: input.studentIds,
			submissions: input.studentIds.map((studentId) => ({
				studentId,
				status: "pendiente"
			}))
		}, ...get().homeworks] });
		return id;
	},
	setSubmission: (homeworkId, studentId, status) => {
		set({ homeworks: get().homeworks.map((h) => {
			if (h.id !== homeworkId) return h;
			return {
				...h,
				submissions: h.submissions.map((s) => s.studentId === studentId ? {
					...s,
					status,
					at: status === "pendiente" ? void 0 : nowIso()
				} : s)
			};
		}) });
	},
	notifyHomework: (homeworkId) => {
		const state = get();
		const hw = state.homeworks.find((h) => h.id === homeworkId);
		if (!hw) return 0;
		let added = 0;
		let messages = state.messages;
		for (const sub of hw.submissions) {
			if (sub.status === "pendiente") continue;
			const kind = sub.status === "no_entregado" ? "incumplimiento" : sub.status === "entregado" ? "cumplimiento" : "cumplimiento";
			if (messages.some((m) => m.relatedId === hw.id && m.studentId === sub.studentId && m.kind === kind && m.status === "enviado")) continue;
			const name = fullName(state, sub.studentId);
			const subj = subjectName(state, hw.subjectId);
			const greeting = parentLine(state, sub.studentId);
			const statusLine = sub.status === "no_entregado" ? `${name} no presentó el deber «${hw.title}» (fecha ${hw.due}).` : sub.status === "tarde" ? `${name} entregó con atraso el deber «${hw.title}». Se registra como atrasado.` : `${name} presentó a tiempo el deber «${hw.title}».`;
			messages = pushMessage(messages, {
				studentId: sub.studentId,
				kind,
				status: "enviado",
				subject: sub.status === "no_entregado" ? `Incumplimiento de deber — ${subj}` : `Cumplimiento de deber — ${subj}`,
				body: `${greeting}:\n\n${statusLine}\n\nAsignatura: ${subj}.\n\n${teacherOf(state, hw.subjectId)}\n${state.schoolName}`,
				relatedId: hw.id
			});
			added += 1;
		}
		set({ messages });
		return added;
	},
	addEvaluation: (input) => {
		const id = uid();
		set({ evaluations: [{
			id,
			title: input.title,
			subjectId: input.subjectId,
			type: input.type,
			status: "borrador",
			scheduledAt: input.scheduledAt,
			durationMin: input.durationMin,
			instructions: input.instructions,
			personalized: input.personalized,
			instruments: [],
			attempts: []
		}, ...get().evaluations] });
		return id;
	},
	generateInstruments: (evaluationId) => {
		const state = get();
		set({ evaluations: state.evaluations.map((ev) => {
			if (ev.id !== evaluationId) return ev;
			const instruments = state.students.map((st) => {
				const { level, focus } = studentLevel(st.id, ev.subjectId, state.homeworks, state.evaluations);
				return buildInstrument(st.id, ev.subjectId, level, focus, ev.personalized);
			});
			return {
				...ev,
				instruments,
				status: ev.status === "borrador" ? "programada" : ev.status
			};
		}) });
	},
	setEvalStatus: (evaluationId, status) => {
		set({ evaluations: get().evaluations.map((ev) => ev.id === evaluationId ? {
			...ev,
			status
		} : ev) });
	},
	submitAttempt: (evaluationId, studentId, answers) => {
		set({ evaluations: get().evaluations.map((ev) => {
			if (ev.id !== evaluationId) return ev;
			const inst = ev.instruments.find((i) => i.studentId === studentId);
			if (!inst) return ev;
			const closed = scoreClosed(inst.questions, answers);
			const openScores = ev.attempts.find((a) => a.studentId === studentId)?.openScores ?? {};
			const openPts = inst.questions.filter((q) => q.type === "abierta").reduce((a, q) => a + (openScores[q.id] ?? 0), 0);
			const attempt = {
				studentId,
				answers,
				openScores,
				score: closed.score + openPts,
				maxScore: closed.max,
				submittedAt: nowIso(),
				published: false
			};
			const rest = ev.attempts.filter((a) => a.studentId !== studentId);
			return {
				...ev,
				attempts: [...rest, attempt]
			};
		}) });
	},
	gradeOpen: (evaluationId, studentId, questionId, points) => {
		set({ evaluations: get().evaluations.map((ev) => {
			if (ev.id !== evaluationId) return ev;
			const inst = ev.instruments.find((i) => i.studentId === studentId);
			const att = ev.attempts.find((a) => a.studentId === studentId);
			if (!inst || !att) return ev;
			const openScores = {
				...att.openScores,
				[questionId]: points
			};
			const closed = scoreClosed(inst.questions, att.answers);
			const openPts = inst.questions.filter((q) => q.type === "abierta").reduce((a, q) => a + (openScores[q.id] ?? 0), 0);
			const next = {
				...att,
				openScores,
				score: closed.score + openPts,
				maxScore: closed.max
			};
			return {
				...ev,
				attempts: ev.attempts.map((a) => a.studentId === studentId ? next : a)
			};
		}) });
	},
	publishEvaluation: (evaluationId) => {
		const state = get();
		const ev = state.evaluations.find((e) => e.id === evaluationId);
		if (!ev) return 0;
		let messages = state.messages;
		let added = 0;
		const evaluations = state.evaluations.map((item) => {
			if (item.id !== evaluationId) return item;
			return {
				...item,
				status: "calificada",
				attempts: item.attempts.map((a) => ({
					...a,
					published: true
				}))
			};
		});
		for (const att of ev.attempts) {
			if (!att.submittedAt) continue;
			const name = fullName(state, att.studentId);
			const subj = subjectName(state, ev.subjectId);
			const greeting = parentLine(state, att.studentId);
			const over10 = att.maxScore > 0 ? Math.round(att.score / att.maxScore * 100) / 10 : 0;
			messages = pushMessage(messages, {
				studentId: att.studentId,
				kind: "calificacion",
				status: "enviado",
				subject: `Calificación publicada — ${ev.title}`,
				body: `${greeting}:\n\n${name} obtuvo ${over10.toFixed(1)}/10 en «${ev.title}» (${subj}). La nota de aprobación institucional es 7.0.\n\n${teacherOf(state, ev.subjectId)}\n${state.schoolName}`,
				relatedId: ev.id
			});
			added += 1;
		}
		set({
			evaluations,
			messages
		});
		return added;
	}
}), {
	name: "aulanexo-v1",
	skipHydration: true,
	partialize: (s) => ({
		schoolName: s.schoolName,
		role: s.role,
		familyStudentId: s.familyStudentId,
		students: s.students,
		subjects: s.subjects,
		homeworks: s.homeworks,
		evaluations: s.evaluations,
		messages: s.messages
	})
}));
var NAV = [
	{
		to: "/",
		label: "Inicio",
		icon: LayoutDashboard
	},
	{
		to: "/deberes",
		label: "Deberes",
		icon: ClipboardList
	},
	{
		to: "/evaluaciones",
		label: "Pruebas",
		icon: BookOpen
	},
	{
		to: "/calificaciones",
		label: "Notas",
		icon: GraduationCap
	},
	{
		to: "/mas",
		label: "Más",
		icon: Menu
	}
];
function Shell({ children }) {
	const [ready, setReady] = (0, import_react.useState)(false);
	const pathname = useRouterState({ select: (s) => s.location.pathname });
	const schoolName = useAppStore((s) => s.schoolName);
	const role = useAppStore((s) => s.role);
	(0, import_react.useEffect)(() => {
		useAppStore.persist.rehydrate();
		setReady(true);
	}, []);
	if (!ready) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-h-dvh flex-col items-center justify-center gap-4 bg-background text-foreground",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-12" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-2xl tracking-tight",
				children: "AulaNexo"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Cargando bitácora del curso"
			})
		]
	});
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "min-h-dvh bg-background text-foreground",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mx-auto flex min-h-dvh max-w-6xl",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "no-print sticky top-0 hidden h-dvh w-56 shrink-0 flex-col border-r border-border/80 bg-card/60 px-3 py-5 md:flex",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, { schoolName }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
						className: "mt-8 flex flex-1 flex-col gap-1",
						children: NAV.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(NavLink, {
							...item,
							active: isActive(pathname, item.to)
						}, item.to))
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: "primary",
						className: "self-start",
						children: ROLE_LABEL[role]
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "flex min-w-0 flex-1 flex-col",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "no-print sticky top-0 z-30 flex items-center justify-between gap-3 border-b border-border/80 bg-background/90 px-4 py-3 backdrop-blur-sm md:px-6",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "min-w-0 md:hidden",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Brand, {
								schoolName,
								compact: true
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "hidden min-w-0 md:block",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "truncate text-sm text-muted-foreground",
								children: [
									COURSE,
									" · ",
									YEAR_LABEL
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: "primary",
							children: ROLE_LABEL[role]
						})
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
					className: "flex-1 px-4 py-5 pb-28 md:px-8 md:pb-10",
					children
				})]
			})]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
			className: "no-print fixed inset-x-0 bottom-0 z-40 border-t border-border bg-card/95 pb-[env(safe-area-inset-bottom)] backdrop-blur-sm md:hidden",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
				className: "grid grid-cols-5",
				children: NAV.map((item) => {
					const Icon = item.icon;
					const active = isActive(pathname, item.to);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: item.to,
						className: cn("flex min-h-14 flex-col items-center justify-center gap-0.5 text-[11px] font-medium", active ? "text-primary" : "text-muted-foreground"),
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, {
							className: "size-5",
							strokeWidth: active ? 2.2 : 1.8
						}), item.label]
					}) }, item.to);
				})
			})
		})]
	});
}
function Brand({ schoolName, compact }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "flex min-w-0 items-center gap-2.5",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mark, { className: "size-8 shrink-0" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "min-w-0",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "font-display text-lg leading-none tracking-tight",
				children: "AulaNexo"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: cn("truncate text-xs text-muted-foreground", compact && "max-w-xs"),
				children: schoolName
			})]
		})]
	});
}
function NavLink({ to, label, icon: Icon, active }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
		to,
		className: cn("flex min-h-11 items-center gap-2.5 rounded-lg px-3 text-sm font-medium transition-colors duration-150", active ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted hover:text-foreground"),
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Icon, { className: "size-4" }), label]
	});
}
function isActive(pathname, to) {
	if (to === "/") return pathname === "/";
	return pathname === to || pathname.startsWith(`${to}/`);
}
var styles_default = "/assets/styles-BvvpsfoX.css";
var APP_NAME = "AulaNexo";
var Route$13 = createRootRoute({
	head: () => ({
		meta: [
			{ charSet: "utf-8" },
			{
				name: "viewport",
				content: "width=device-width, initial-scale=1, viewport-fit=cover"
			},
			{ title: APP_NAME },
			{
				name: "theme-color",
				content: "#1F4D45"
			},
			{
				name: "description",
				content: "Bitácora escolar: deberes, evaluaciones, calificaciones y avisos a familias."
			}
		],
		links: [
			{
				rel: "icon",
				type: "image/svg+xml",
				href: "/favicon.svg"
			},
			{
				rel: "stylesheet",
				href: styles_default
			},
			{
				rel: "manifest",
				href: "/__grok/manifest.webmanifest"
			},
			{
				rel: "apple-touch-icon",
				href: "/__grok/icon-180.png"
			}
		]
	}),
	component: Root
});
function Root() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("html", {
		lang: "es",
		className: "antialiased",
		suppressHydrationWarning: true,
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("head", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(HeadContent, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("body", { children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PreviewHostBridge, {}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(AuthProvider, { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Shell, { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Outlet, {}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Toaster, {
				position: "top-center",
				toastOptions: { className: "font-sans" }
			})] }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Scripts, {})
		] })]
	});
}
var $$splitComponentImporter$12 = () => import("./routes-DvI8Kanp.mjs");
var Route$12 = createFileRoute("/")({ component: lazyRouteComponent($$splitComponentImporter$12, "component") });
var $$splitComponentImporter$11 = () => import("./ajustes-CSbTAPA6.mjs");
var Route$11 = createFileRoute("/ajustes")({ component: lazyRouteComponent($$splitComponentImporter$11, "component") });
var $$splitComponentImporter$10 = () => import("./calificaciones-CbznppyA.mjs");
var Route$10 = createFileRoute("/calificaciones")({ component: lazyRouteComponent($$splitComponentImporter$10, "component") });
var $$splitComponentImporter$9 = () => import("./comunicaciones-Brnqppbz.mjs");
var Route$9 = createFileRoute("/comunicaciones")({ component: lazyRouteComponent($$splitComponentImporter$9, "component") });
var $$splitComponentImporter$8 = () => import("./deberes-CbG-Wp0w.mjs");
var Route$8 = createFileRoute("/deberes")({ component: lazyRouteComponent($$splitComponentImporter$8, "component") });
var $$splitComponentImporter$7 = () => import("./estudiantes-CvLWAZ44.mjs");
var Route$7 = createFileRoute("/estudiantes")({ component: lazyRouteComponent($$splitComponentImporter$7, "component") });
var $$splitComponentImporter$6 = () => import("./evaluaciones-5DilGafh.mjs");
var Route$6 = createFileRoute("/evaluaciones")({ component: lazyRouteComponent($$splitComponentImporter$6, "component") });
var $$splitComponentImporter$5 = () => import("./mas-I38AeXhq.mjs");
var Route$5 = createFileRoute("/mas")({ component: lazyRouteComponent($$splitComponentImporter$5, "component") });
var $$splitComponentImporter$4 = () => import("./reportes-DFjGtlk6.mjs");
var Route$4 = createFileRoute("/reportes")({
	validateSearch: (raw) => ({ student: typeof raw.student === "string" ? raw.student : void 0 }),
	component: lazyRouteComponent($$splitComponentImporter$4, "component")
});
var $$splitComponentImporter$3 = () => import("./deberes._id-CERbVtvN.mjs");
var Route$3 = createFileRoute("/deberes/$id")({ component: lazyRouteComponent($$splitComponentImporter$3, "component") });
var $$splitComponentImporter$2 = () => import("./estudiantes._id-CeR9mNbn.mjs");
var Route$2 = createFileRoute("/estudiantes/$id")({ component: lazyRouteComponent($$splitComponentImporter$2, "component") });
var $$splitComponentImporter$1 = () => import("./evaluaciones._id-5z44rbPK.mjs");
var Route$1 = createFileRoute("/evaluaciones/$id")({ component: lazyRouteComponent($$splitComponentImporter$1, "component") });
var $$splitComponentImporter = () => import("./evaluaciones._id.rendir-BYYuYQNo.mjs");
var Route = createFileRoute("/evaluaciones/$id/rendir")({ component: lazyRouteComponent($$splitComponentImporter, "component") });
var IndexRoute = Route$12.update({
	id: "/",
	path: "/",
	getParentRoute: () => Route$13
});
var AjustesRoute = Route$11.update({
	id: "/ajustes",
	path: "/ajustes",
	getParentRoute: () => Route$13
});
var CalificacionesRoute = Route$10.update({
	id: "/calificaciones",
	path: "/calificaciones",
	getParentRoute: () => Route$13
});
var ComunicacionesRoute = Route$9.update({
	id: "/comunicaciones",
	path: "/comunicaciones",
	getParentRoute: () => Route$13
});
var DeberesRoute = Route$8.update({
	id: "/deberes",
	path: "/deberes",
	getParentRoute: () => Route$13
});
var EstudiantesRoute = Route$7.update({
	id: "/estudiantes",
	path: "/estudiantes",
	getParentRoute: () => Route$13
});
var EvaluacionesRoute = Route$6.update({
	id: "/evaluaciones",
	path: "/evaluaciones",
	getParentRoute: () => Route$13
});
var MasRoute = Route$5.update({
	id: "/mas",
	path: "/mas",
	getParentRoute: () => Route$13
});
var ReportesRoute = Route$4.update({
	id: "/reportes",
	path: "/reportes",
	getParentRoute: () => Route$13
});
var DeberesIdRoute = Route$3.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => DeberesRoute
});
var EstudiantesIdRoute = Route$2.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => EstudiantesRoute
});
var EvaluacionesIdRoute = Route$1.update({
	id: "/$id",
	path: "/$id",
	getParentRoute: () => EvaluacionesRoute
});
var EvaluacionesIdRendirRoute = Route.update({
	id: "/rendir",
	path: "/rendir",
	getParentRoute: () => EvaluacionesIdRoute
});
var DeberesRouteChildren = { DeberesIdRoute };
var DeberesRouteWithChildren = DeberesRoute._addFileChildren(DeberesRouteChildren);
var EstudiantesRouteChildren = { EstudiantesIdRoute };
var EstudiantesRouteWithChildren = EstudiantesRoute._addFileChildren(EstudiantesRouteChildren);
var EvaluacionesIdRouteChildren = { EvaluacionesIdRendirRoute };
var EvaluacionesRouteChildren = { EvaluacionesIdRoute: EvaluacionesIdRoute._addFileChildren(EvaluacionesIdRouteChildren) };
var rootRouteChildren = {
	IndexRoute,
	AjustesRoute,
	CalificacionesRoute,
	ComunicacionesRoute,
	DeberesRoute: DeberesRouteWithChildren,
	EstudiantesRoute: EstudiantesRouteWithChildren,
	EvaluacionesRoute: EvaluacionesRoute._addFileChildren(EvaluacionesRouteChildren),
	MasRoute,
	ReportesRoute
};
var routeTree = Route$13._addFileChildren(rootRouteChildren)._addFileTypes();
var router_exports = /* @__PURE__ */ __exportAll({ getRouter: () => getRouter });
function getRouter() {
	return createRouter({
		routeTree,
		defaultErrorComponent: AppErrorComponent
	});
}
//#endregion
export { ROLE_HINT as C, cn as D, Badge as E, initials as O, EVAL_TYPE_LABEL as S, SUBMISSION_LABEL as T, evalAverage as _, Route$3 as a, homeworkRate as b, formatDay as c, todayIso as d, COURSE as f, courseAverage as g, attemptScore as h, Route$2 as i, formatLong as l, approvalOf as m, Route as n, Route$4 as o, YEAR_LABEL as p, Route$1 as r, useAppStore as s, router_exports as t, formatWhen as u, finalAverage as v, ROLE_LABEL as w, APPROVAL_LABEL as x, homeworkAverage as y };
