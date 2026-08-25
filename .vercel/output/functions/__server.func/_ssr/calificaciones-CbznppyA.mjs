import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { _ as evalAverage, s as useAppStore, v as finalAverage, y as homeworkAverage } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Card } from "./card-F5OXodUz.mjs";
import { n as GradeNum, t as ApprovalBadge } from "./grade-JPd4NAj_.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/calificaciones-CbznppyA.js
var import_jsx_runtime = require_jsx_runtime();
function GradesPage() {
	const { students } = useScope();
	const subjects = useAppStore((s) => s.subjects);
	const homeworks = useAppStore((s) => s.homeworks);
	const evaluations = useAppStore((s) => s.evaluations);
	const approved = students.filter((s) => {
		const n = finalAverage(homeworks, evaluations, s.id);
		return n !== null && n >= 7;
	}).length;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Acta",
			title: "Calificaciones",
			hint: `Promedio = 30% deberes + 70% evaluaciones. Aprobación desde ${7 .toFixed(1)}.`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mb-5 grid grid-cols-2 gap-3",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Aprobados"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-2xl tabular-nums font-medium",
					children: [
						approved,
						"/",
						students.length
					]
				})]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs text-muted-foreground",
					children: "Ponderación"
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-1 text-sm",
					children: "Deberes 30 · Pruebas 70"
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "hidden overflow-x-auto md:block",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("table", {
				className: "w-full min-w-[640px] text-left text-sm",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("thead", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
					className: "border-b border-border text-xs text-muted-foreground",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Estudiante"
						}),
						subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: s.short
						}, s.id)),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Deberes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Pruebas"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 pr-3 font-medium",
							children: "Final"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("th", {
							className: "py-2 font-medium",
							children: "Estado"
						})
					]
				}) }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("tbody", { children: students.map((st) => {
					const hw = homeworkAverage(homeworks, st.id);
					const ev = evalAverage(evaluations, st.id);
					const fin = finalAverage(homeworks, evaluations, st.id);
					return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("tr", {
						className: "border-b border-border/70",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/estudiantes/$id",
									params: { id: st.id },
									className: "font-medium",
									children: [
										st.firstName,
										" ",
										st.lastName
									]
								})
							}),
							subjects.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: finalAverage(homeworks, evaluations, st.id, s.id) })
							}, s.id)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: hw })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: ev })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3 pr-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: fin })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("td", {
								className: "py-3",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalBadge, { value: fin })
							})
						]
					}, st.id);
				}) })]
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2 md:hidden",
			children: students.map((st) => {
				const fin = finalAverage(homeworks, evaluations, st.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					to: "/estudiantes/$id",
					params: { id: st.id },
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "flex items-center justify-between p-4",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "font-medium",
							children: [
								st.firstName,
								" ",
								st.lastName
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
							className: "text-xs text-muted-foreground",
							children: [
								"Deberes ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: homeworkAverage(homeworks, st.id) }),
								" · Pruebas",
								" ",
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: evalAverage(evaluations, st.id) })
							]
						})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
								value: fin,
								className: "text-lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalBadge, { value: fin })]
						})]
					})
				}) }, st.id);
			})
		})
	] });
}
//#endregion
export { GradesPage as component };
