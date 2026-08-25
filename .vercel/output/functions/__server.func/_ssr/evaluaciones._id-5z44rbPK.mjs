import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { h as ArrowLeft } from "../_libs/lucide-react.mjs";
import { n as toast } from "../_libs/sonner.mjs";
import { E as Badge, S as EVAL_TYPE_LABEL, h as attemptScore, l as formatLong, r as Route$1, s as useAppStore } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Button } from "./button-Ctf84m-_.mjs";
import { n as CardMeta, r as CardTitle, t as Card } from "./card-F5OXodUz.mjs";
import { n as Input } from "./input-8cr4jBjm.mjs";
import { n as GradeNum } from "./grade-JPd4NAj_.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { t as Avatar } from "./avatar-DeO2V3Xj.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/evaluaciones._id-5z44rbPK.js
var import_jsx_runtime = require_jsx_runtime();
function EvalDetail() {
	const { id } = Route$1.useParams();
	const { canEdit, students, isFamily, familyStudentId } = useScope();
	const evaluation = useAppStore((s) => s.evaluations.find((e) => e.id === id));
	const subjects = useAppStore((s) => s.subjects);
	const generateInstruments = useAppStore((s) => s.generateInstruments);
	const setEvalStatus = useAppStore((s) => s.setEvalStatus);
	const gradeOpen = useAppStore((s) => s.gradeOpen);
	const publishEvaluation = useAppStore((s) => s.publishEvaluation);
	if (!evaluation) return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "No se encontró la evaluación." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
		to: "/evaluaciones",
		className: "text-primary",
		children: "Volver"
	})] });
	const subject = subjects.find((s) => s.id === evaluation.subjectId);
	const takeId = isFamily ? familyStudentId : students[0]?.id;
	function gen() {
		generateInstruments(evaluation.id);
		toast.success(evaluation.personalized ? "Instrumentos adaptados al desempeño de cada estudiante" : "Instrumento estándar generado para el curso");
	}
	function publish() {
		const n = publishEvaluation(evaluation.id);
		toast.success(`Notas publicadas · ${n} avisos a familias`);
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
			to: "/evaluaciones",
			className: "no-print mb-4 inline-flex min-h-11 items-center gap-1 text-sm text-muted-foreground",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ArrowLeft, { className: "size-4" }), "Evaluaciones"]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: `${subject?.name ?? ""} · ${EVAL_TYPE_LABEL[evaluation.type]}`,
			title: evaluation.title,
			hint: `${formatLong(evaluation.scheduledAt)} · ${evaluation.durationMin} min. ${evaluation.instructions}`
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "no-print mb-6 flex flex-wrap gap-2",
			children: [
				canEdit ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "outline",
					onClick: gen,
					children: evaluation.instruments.length ? "Regenerar instrumentos" : "Elaborar instrumentos"
				}) : null,
				canEdit && evaluation.instruments.length > 0 && evaluation.status !== "en_curso" && evaluation.status !== "calificada" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					onClick: () => setEvalStatus(evaluation.id, "en_curso"),
					children: "Abrir ejecución"
				}) : null,
				evaluation.status === "en_curso" && takeId ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					asChild: true,
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						to: "/evaluaciones/$id/rendir",
						params: { id: evaluation.id },
						children: isFamily ? "Rendir evaluación" : "Rendir como estudiante"
					})
				}) : null,
				canEdit && evaluation.status === "en_curso" ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Button, {
					variant: "secondary",
					onClick: publish,
					children: "Publicar notas y avisar"
				}) : null
			]
		}),
		evaluation.instruments.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
			className: "p-5",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardTitle, { children: "Sin instrumento" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(CardMeta, {
				className: "mt-2",
				children: evaluation.personalized ? "Al elaborar, cada estudiante recibe un set según su nivel (refuerzo, medio o avanzado) y las destrezas débiles de pruebas anteriores." : "Se armará el mismo cuestionario para todo el curso."
			})]
		}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-3",
			children: students.map((st) => {
				const inst = evaluation.instruments.find((i) => i.studentId === st.id);
				const att = evaluation.attempts.find((a) => a.studentId === st.id);
				if (!inst) return null;
				const openQs = inst.questions.filter((q) => q.type === "abierta");
				return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Card, {
					className: "p-4",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "flex items-start gap-3",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Avatar, { name: `${st.firstName} ${st.lastName}` }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "min-w-0 flex-1",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "flex flex-wrap items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
											className: "font-medium",
											children: [
												st.firstName,
												" ",
												st.lastName
											]
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: inst.level === "refuerzo" ? "warn" : inst.level === "avanzado" ? "ok" : "muted",
											children: inst.level
										}),
										inst.focus.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Badge, {
											tone: "info",
											children: ["Enfoque: ", inst.focus.join(", ")]
										}) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
									className: "mt-1 text-xs text-muted-foreground",
									children: [
										inst.questions.length,
										" ítems · ",
										inst.questions.filter((q) => q.difficulty === 1).length,
										" básicas ·",
										" ",
										inst.questions.filter((q) => q.difficulty === 3).length,
										" de análisis"
									]
								}),
								att?.submittedAt ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-2 flex items-center gap-2",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "text-sm text-muted-foreground",
											children: "Nota"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
											value: attemptScore(att),
											className: "text-lg"
										}),
										att.published ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, {
											tone: "ok",
											children: "Publicada"
										}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Badge, { children: "Por publicar" })
									]
								}) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
									className: "mt-2 text-sm text-muted-foreground",
									children: "Aún no rinde"
								}),
								canEdit && att?.submittedAt && openQs.length > 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "mt-3 space-y-2 rounded-xl bg-muted/70 p-3",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "text-xs font-medium tracking-wide text-muted-foreground uppercase",
										children: "Calificar abiertas"
									}), openQs.map((q) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "space-y-1",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
												className: "text-sm",
												children: q.prompt
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
												className: "text-xs text-muted-foreground",
												children: [
													"Respuesta: ",
													att.answers[q.id] || "—",
													" · Rúbrica: ",
													q.rubric
												]
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
												className: "flex items-center gap-2",
												children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
													type: "number",
													min: 0,
													max: q.points,
													step: .5,
													className: "h-10 w-24",
													value: att.openScores[q.id] ?? 0,
													onChange: (e) => gradeOpen(evaluation.id, st.id, q.id, Number(e.target.value))
												}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", {
													className: "text-xs text-muted-foreground",
													children: ["/ ", q.points]
												})]
											})
										]
									}, q.id))]
								}) : null
							]
						})]
					})
				}) }, st.id);
			})
		})
	] });
}
//#endregion
export { EvalDetail as component };
