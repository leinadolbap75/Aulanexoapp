import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as homeworkRate, f as COURSE, g as courseAverage, m as approvalOf, o as Route$4, p as YEAR_LABEL, s as useAppStore, v as finalAverage, x as APPROVAL_LABEL } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-F5OXodUz.mjs";
import { r as NativeSelect } from "./input-8cr4jBjm.mjs";
import { n as GradeNum, t as ApprovalBadge } from "./grade-JPd4NAj_.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { a as Bar, i as CartesianGrid, n as YAxis, o as ResponsiveContainer, r as XAxis, s as Tooltip, t as BarChart } from "../_libs/recharts+[...].mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/reportes-DFjGtlk6.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function ReportesPage() {
	const search = Route$4.useSearch();
	const { students, role } = useScope();
	const schoolName = useAppStore((s) => s.schoolName);
	const subjects = useAppStore((s) => s.subjects);
	const homeworks = useAppStore((s) => s.homeworks);
	const evaluations = useAppStore((s) => s.evaluations);
	const [period, setPeriod] = (0, import_react.useState)("trimestral");
	const [audience, setAudience] = (0, import_react.useState)(role === "dece" ? "dece" : role === "rector" ? "rectorado" : role === "familia" ? "familia" : "vicerrectorado");
	const [studentId, setStudentId] = (0, import_react.useState)(search.student ?? (students.length === 1 ? students[0].id : "grupo"));
	const [chartReady, setChartReady] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		setChartReady(true);
	}, []);
	const scoped = studentId === "grupo" ? students : students.filter((s) => s.id === studentId);
	const avg = courseAverage(scoped, homeworks, evaluations);
	const approved = scoped.filter((s) => {
		const n = finalAverage(homeworks, evaluations, s.id);
		return n !== null && n >= 7;
	}).length;
	const risk = scoped.filter((s) => {
		const n = finalAverage(homeworks, evaluations, s.id);
		return n !== null && n < 7;
	});
	const chart = (0, import_react.useMemo)(() => subjects.map((sub) => ({
		name: sub.short,
		promedio: courseAverage(scoped, homeworks.filter((h) => h.subjectId === sub.id), evaluations.filter((e) => e.subjectId === sub.id)) ?? 0
	})), [
		subjects,
		scoped,
		homeworks,
		evaluations
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Documentos",
			title: "Reportes",
			hint: "Mensual, trimestral o anual · individual o grupal · DECE, vicerrectorado, rectorado o familia.",
			action: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
				variant: "outline",
				className: "no-print",
				onClick: () => window.print(),
				children: "Imprimir / PDF"
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mb-6 grid gap-3 sm:grid-cols-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
					value: period,
					onChange: (e) => setPeriod(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "mensual",
							children: "Mensual · agosto 2026"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "trimestral",
							children: "Trimestral · 1.er trimestre"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
							value: "anual",
							children: ["Anual · ", YEAR_LABEL.split("·")[0]]
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
					value: audience,
					onChange: (e) => setAudience(e.target.value),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "dece",
							children: "DECE"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "vicerrectorado",
							children: "Vicerrectorado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "rectorado",
							children: "Rectorado"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
							value: "familia",
							children: "Familia"
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(NativeSelect, {
					value: studentId,
					onChange: (e) => setStudentId(e.target.value),
					children: [students.length > 1 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: "grupo",
						children: ["Grupo · ", COURSE]
					}) : null, students.map((s) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("option", {
						value: s.id,
						children: [
							s.firstName,
							" ",
							s.lastName
						]
					}, s.id))]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
			className: "rounded-2xl bg-card p-5 shadow-border md:p-8",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "text-xs tracking-[0.16em] text-muted-foreground uppercase",
					children: schoolName
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", {
					className: "mt-1 font-display text-2xl",
					children: [
						"Informe ",
						period,
						" · ",
						audience === "familia" ? "familia" : audience
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-1 text-sm text-muted-foreground",
					children: [
						COURSE,
						" · ",
						YEAR_LABEL,
						" · ",
						studentId === "grupo" ? "grupo completo" : scoped[0] ? `${scoped[0].firstName} ${scoped[0].lastName}` : ""
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-4 max-w-2xl text-sm leading-relaxed",
					children: {
						dece: "Enfoque socioemocional: incumplimiento de deberes, riesgo de reprobación y recomendaciones de acompañamiento.",
						vicerrectorado: "Enfoque académico: promedios por asignatura, aprobación y estudiantes que requieren recuperación.",
						rectorado: "Síntesis institucional del periodo para junta y archivo de dirección.",
						familia: "Informe claro del desempeño de tu hijo o hija, con logros e incumplimientos."
					}[audience]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-6 grid grid-cols-2 gap-3 md:grid-cols-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Promedio",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
								value: avg,
								className: "text-xl"
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Aprobación",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
								className: "text-xl tabular-nums",
								children: [
									approved,
									"/",
									scoped.length
								]
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "En riesgo",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-xl tabular-nums",
								children: risk.length
							})
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Mini, {
							label: "Periodo",
							value: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
								className: "text-sm font-medium capitalize",
								children: period
							})
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "mt-8 h-52",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mb-2 text-xs text-muted-foreground",
						children: "Promedio por asignatura"
					}), chartReady ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ResponsiveContainer, {
						width: "100%",
						height: "100%",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(BarChart, {
							data: chart,
							margin: {
								top: 8,
								right: 8,
								left: -20,
								bottom: 0
							},
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CartesianGrid, {
									stroke: "var(--color-border)",
									vertical: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(XAxis, {
									dataKey: "name",
									tick: {
										fill: "var(--color-muted-foreground)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(YAxis, {
									domain: [0, 10],
									tick: {
										fill: "var(--color-muted-foreground)",
										fontSize: 12
									},
									axisLine: false,
									tickLine: false
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Tooltip, { contentStyle: {
									background: "var(--color-card)",
									border: "1px solid var(--color-border)",
									borderRadius: 12
								} }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Bar, {
									dataKey: "promedio",
									fill: "var(--color-primary)",
									radius: [
										6,
										6,
										0,
										0
									]
								})
							]
						})
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", { className: "h-full rounded-xl bg-muted" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", {
					className: "mt-10 font-display text-xl",
					children: "Detalle"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
					className: "mt-3 divide-y divide-border",
					children: scoped.map((s) => {
						const n = finalAverage(homeworks, evaluations, s.id);
						const a = approvalOf(n);
						const rate = homeworkRate(homeworks, s.id);
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
							className: "flex flex-col gap-1 py-3 sm:flex-row sm:items-center sm:justify-between",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "font-medium",
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
									"%",
									audience === "dece" ? ` · ${s.notes}` : ""
								]
							})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "flex items-center gap-3",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, { value: n }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalBadge, { value: n }),
									a ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "sr-only",
										children: APPROVAL_LABEL[a]
									}) : null
								]
							})]
						}, s.id);
					})
				}),
				audience === "dece" && risk.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "mt-6 bg-muted p-4 shadow-none",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Recomendación DECE" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(CardMeta, {
						className: "mt-2",
						children: [
							"Convocar a las familias de ",
							risk.map((s) => s.firstName).join(", "),
							" y abrir plan de acompañamiento (hábitos, asistencia a refuerzo y seguimiento quincenal)."
						]
					})]
				}) : null,
				audience === "rectorado" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "mt-6 text-sm text-muted-foreground",
					children: [
						"El vicerrectorado académico valida las actas. Este informe queda disponible para junta y archivo del periodo ",
						period,
						"."
					]
				}) : null
			]
		})
	] });
}
function Mini({ label, value }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "rounded-xl bg-muted/80 p-3",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
			className: "text-xs text-muted-foreground",
			children: label
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
			className: "mt-1",
			children: value
		})]
	});
}
//#endregion
export { ReportesPage as component };
