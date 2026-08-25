import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { E as Badge, T as SUBMISSION_LABEL, _ as evalAverage, b as homeworkRate, c as formatDay, i as Route$2, s as useAppStore, v as finalAverage, y as homeworkAverage } from "./router-BeuJ94SI.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-F5OXodUz.mjs";
import { n as GradeNum, t as ApprovalBadge } from "./grade-JPd4NAj_.mjs";
import { t as Avatar } from "./avatar-DeO2V3Xj.mjs";
import { t as Meter } from "./meter-CxuyuKYc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estudiantes._id-CeR9mNbn.js
var import_jsx_runtime = require_jsx_runtime();
function StudentProfile() {
	const { id } = Route$2.useParams();
	const student = useAppStore((s) => s.students.find((x) => x.id === id));
	const subjects = useAppStore((s) => s.subjects);
	const homeworks = useAppStore((s) => s.homeworks);
	const evaluations = useAppStore((s) => s.evaluations);
	const messages = useAppStore((s) => s.messages.filter((m) => m.studentId === id));
	if (!student) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Estudiante no encontrado." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/estudiantes",
		className: "text-primary",
		children: "Volver"
	})] });
	const avg = finalAverage(homeworks, evaluations, student.id);
	const hw = homeworkAverage(homeworks, student.id);
	const ev = evalAverage(evaluations, student.id);
	const rate = homeworkRate(homeworks, student.id);
	const intervention = avg !== null && avg < 7 && rate < .6 ? "Hábitos de estudio y contacto con la familia. Coordinar DECE + refuerzo académico." : avg !== null && avg < 7 ? "Cumple deberes pero la nota no alcanza. Instrumento de recuperación personalizado." : rate < .6 ? "El rendimiento aguanta; el incumplimiento de deberes requiere seguimiento de convivencia." : "Seguimiento rutinario. Mantener comunicación de logros.";
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/estudiantes",
			className: "no-print mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Estudiantes"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "flex items-start gap-4",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, {
				name: `${student.firstName} ${student.lastName}`,
				className: "size-14 text-base"
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "min-w-0",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h1", {
					className: "text-3xl",
					children: [
						student.firstName,
						" ",
						student.lastName
					]
				}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
					className: "text-sm text-muted-foreground",
					children: [
						student.course,
						" · ",
						student.parentRelation,
						": ",
						student.parentName,
						" · ",
						student.parentPhone
					]
				})]
			})]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "mt-6 grid grid-cols-3 gap-3",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Promedio"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
							value: avg,
							className: "mt-1 block text-2xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "mt-2",
							children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalBadge, { value: avg })
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "text-xs text-muted-foreground",
							children: "Deberes"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
							value: hw,
							className: "mt-1 block text-2xl"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
							className: "mt-3",
							value: rate
						})
					]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "p-4",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: "Pruebas"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
						value: ev,
						className: "mt-1 block text-2xl"
					})]
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "mt-4 p-5",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Lectura para DECE / dirección" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "mt-2 text-sm leading-relaxed",
					children: intervention
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
					className: "mt-2",
					children: student.notes
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					className: "mt-4",
					variant: "outline",
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/reportes",
						search: { student: student.id },
						children: "Reporte individual"
					})
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Por asignatura"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: subjects.map((sub) => {
				const n = finalAverage(homeworks, evaluations, student.id, sub.id);
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center justify-between p-3",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "font-medium",
						children: sub.name
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "text-xs text-muted-foreground",
						children: sub.teacher
					})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
						value: n,
						className: "text-lg"
					})]
				}) }, sub.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Deberes"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-2",
			children: homeworks.filter((h) => h.studentIds.includes(student.id)).map((h) => {
				const st = h.submissions.find((x) => x.studentId === student.id)?.status ?? "pendiente";
				return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", {
					className: "flex items-center justify-between gap-2 text-sm",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/deberes/$id",
						params: { id: h.id },
						className: "min-w-0 truncate",
						children: h.title
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
						tone: st === "entregado" ? "ok" : st === "tarde" ? "warn" : st === "no_entregado" ? "danger" : "muted",
						children: SUBMISSION_LABEL[st]
					})]
				}, h.id);
			})
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
			className: "mt-8 font-display text-2xl",
			children: "Avisos"
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "mt-3 space-y-3",
			children: messages.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
				className: "text-sm text-muted-foreground",
				children: "Sin avisos registrados."
			}) : messages.map((m) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
				className: "p-4",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-center justify-between gap-2",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "font-medium",
							children: m.subject
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
							tone: m.status === "enviado" ? "ok" : "warn",
							children: m.status
						})]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 whitespace-pre-line text-sm text-muted-foreground",
						children: m.body
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "mt-2 text-xs text-muted-foreground",
						children: formatDay(m.createdAt)
					})
				]
			}) }, m.id))
		})
	] });
}
//#endregion
export { StudentProfile as component };
