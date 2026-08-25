import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { c as FilePen, d as ClipboardCheck, m as ArrowRight, n as TriangleAlert, p as Bell } from "../_libs/lucide-react.mjs";
import { C as ROLE_HINT, E as Badge, T as SUBMISSION_LABEL, b as homeworkRate, c as formatDay, f as COURSE, g as courseAverage, s as useAppStore, v as finalAverage } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-F5OXodUz.mjs";
import { n as GradeNum, t as ApprovalBadge } from "./grade-JPd4NAj_.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { t as Avatar } from "./avatar-DeO2V3Xj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/routes-DvI8Kanp.js
var import_jsx_runtime = require_jsx_runtime();
function Home() {
	const { role, canEdit, students, ids, isFamily } = useScope();
	const homeworks = useAppStore((s) => s.homeworks);
	const evaluations = useAppStore((s) => s.evaluations);
	const messages = useAppStore((s) => s.messages);
	const schoolName = useAppStore((s) => s.schoolName);
	const avg = courseAverage(students, homeworks, evaluations);
	const atRisk = students.filter((s) => {
		const n = finalAverage(homeworks, evaluations, s.id);
		return n !== null && n < 7;
	});
	const pendingHw = homeworks.filter((h) => h.submissions.some((x) => ids.has(x.studentId) && x.status === "pendiente"));
	const missing = homeworks.flatMap((h) => h.submissions.filter((x) => ids.has(x.studentId) && x.status === "no_entregado").map((x) => ({
		hw: h,
		studentId: x.studentId
	})));
	const upcoming = evaluations.filter((e) => e.status === "programada" || e.status === "en_curso" || e.status === "borrador").slice().sort((a, b) => a.scheduledAt.localeCompare(b.scheduledAt));
	const queued = messages.filter((m) => m.status === "cola" && ids.has(m.studentId));
	const inbox = messages.filter((m) => m.status === "enviado" && ids.has(m.studentId)).slice(0, 3);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "enter-stagger",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
				kicker: schoolName,
				title: isFamily ? "El curso de tu hijo" : COURSE,
				hint: ROLE_HINT[role]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "grid grid-cols-2 gap-3 md:grid-cols-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Promedio del grupo",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
							value: avg,
							className: "text-2xl"
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "En riesgo",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl tabular-nums font-medium",
							children: atRisk.length
						}),
						hint: "Promedio menor a 7.0"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Deberes abiertos",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl tabular-nums font-medium",
							children: pendingHw.length
						})
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Stat, {
						label: "Pruebas próximas",
						value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
							className: "text-2xl tabular-nums font-medium",
							children: upcoming.length
						})
					})
				]
			}),
			canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "mt-5 flex flex-wrap gap-2",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
						to: "/deberes",
						children: ["Nuevo deber", /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowRight, {})]
					})
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/evaluaciones",
						children: "Programar evaluación"
					})
				})]
			}) : null,
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "mt-8 grid gap-4 lg:grid-cols-2",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Estudiantes en seguimiento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/estudiantes",
								className: "text-sm text-primary",
								children: "Ver lista"
							})]
						}), atRisk.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "Nadie está bajo la nota de aprobación." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: atRisk.map((s) => {
								const n = finalAverage(homeworks, evaluations, s.id);
								const rate = homeworkRate(homeworks, s.id);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
									to: "/estudiantes/$id",
									params: { id: s.id },
									className: "flex min-h-11 items-center gap-3 rounded-lg px-1 hover:bg-muted",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: `${s.firstName} ${s.lastName}` }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0 flex-1",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "truncate font-medium",
												children: [
													s.firstName,
													" ",
													s.lastName
												]
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													"Cumplimiento de deberes ",
													Math.round(rate * 100),
													"%"
												]
											})]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: n })
									]
								}) }, s.id);
							})
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ClipboardCheck, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Verificación de deberes" })]
						}), pendingHw.length === 0 && missing.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "No hay entregas pendientes de revisar." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("ul", {
							className: "space-y-3",
							children: [pendingHw.slice(0, 4).map((h) => {
								const left = h.submissions.filter((x) => ids.has(x.studentId) && x.status === "pendiente").length;
								return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/deberes/$id",
									params: { id: h.id },
									className: "block rounded-lg hover:bg-muted",
									children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "flex items-center justify-between gap-2 px-1 py-1",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
											className: "min-w-0",
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "truncate font-medium",
												children: h.title
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													"Entrega ",
													formatDay(h.due),
													" · ",
													left,
													" pendientes"
												]
											})]
										}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Revisar" })]
									})
								}) }, h.id);
							}), missing.slice(0, 3).map(({ hw, studentId }) => {
								const st = students.find((s) => s.id === studentId);
								return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
									className: "flex items-center gap-2 px-1 text-sm",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(TriangleAlert, { className: "size-3.5 text-destructive" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
											className: "min-w-0 truncate",
											children: [
												st?.firstName,
												" · ",
												hw.title
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "danger",
											children: SUBMISSION_LABEL.no_entregado
										})
									]
								}, `${hw.id}-${studentId}`);
							})]
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center gap-2",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(FilePen, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Evaluaciones" })]
						}), upcoming.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "No hay pruebas programadas." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: upcoming.map((e) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
								to: "/evaluaciones/$id",
								params: { id: e.id },
								className: "flex items-center justify-between gap-2 rounded-lg px-1 py-1 hover:bg-muted",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "min-w-0",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "truncate font-medium",
										children: e.title
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs text-muted-foreground",
										children: formatDay(e.scheduledAt)
									})]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
									tone: e.personalized ? "info" : "muted",
									children: e.personalized ? "Personalizada" : e.status
								})]
							}) }, e.id))
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
						className: "p-5",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "mb-4 flex items-center justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-2",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bell, { className: "size-4 text-muted-foreground" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Avisos a familias" })]
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								to: "/comunicaciones",
								className: "text-sm text-primary",
								children: "Bandeja"
							})]
						}), isFamily ? inbox.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "No hay avisos nuevos." }) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
							className: "space-y-3",
							children: inbox.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "text-sm font-medium",
								children: m.subject
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "line-clamp-2 text-xs text-muted-foreground",
								children: m.body
							})] }, m.id))
						}) : queued.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex items-center justify-between gap-3",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, { children: [queued.length, " avisos en cola por enviar."] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
								size: "sm",
								asChild: true,
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
									to: "/comunicaciones",
									children: "Enviar"
								})
							})]
						}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, { children: "La bandeja está al día. Los avisos se generan al verificar deberes o publicar notas." })]
					})
				]
			}),
			role === "dece" || role === "rector" || role === "vicerrector" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 flex flex-col gap-3 p-5 sm:flex-row sm:items-center sm:justify-between",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Reportes para tu área" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-1",
					children: "Mensuales, trimestrales y anuales · individuales o de grupo."
				})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/reportes",
						children: "Abrir reportes"
					})
				})]
			}) : null,
			students.length === 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "mt-4 p-5",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Estado de aprobación" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-3 flex items-center gap-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
						value: finalAverage(homeworks, evaluations, students[0].id),
						className: "text-3xl"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalBadge, { value: finalAverage(homeworks, evaluations, students[0].id) })]
				})]
			}) : null
		]
	});
}
function Stat({ label, value, hint }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
		className: "p-4",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-xs text-muted-foreground",
				children: label
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
				className: "mt-2",
				children: value
			}),
			hint ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "mt-1 text-[11px] text-muted-foreground",
				children: hint
			}) : null
		]
	});
}
//#endregion
export { Home as component };
