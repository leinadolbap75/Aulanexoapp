import { i as __toESM } from "../_runtime.mjs";
import { n as require_react } from "../_libs/@radix-ui/react-compose-refs+[...].mjs";
import { v as Link } from "../_libs/@tanstack/react-router+[...].mjs";
import { n as require_jsx_runtime } from "../_libs/radix-ui__react-context+react.mjs";
import { b as homeworkRate, s as useAppStore, v as finalAverage } from "./router-BeuJ94SI.mjs";
import { t as PageHeader } from "./page-header-C-rPDnpf.mjs";
import { t as Card } from "./card-F5OXodUz.mjs";
import { n as Input } from "./input-8cr4jBjm.mjs";
import { n as GradeNum, t as ApprovalBadge } from "./grade-JPd4NAj_.mjs";
import { t as useScope } from "./scope-CROK9YMB.mjs";
import { t as Avatar } from "./avatar-DeO2V3Xj.mjs";
import { t as Meter } from "./meter-CxuyuKYc.mjs";
//#region node_modules/.nitro/vite/services/ssr/assets/estudiantes-CvLWAZ44.js
var import_react = /* @__PURE__ */ __toESM(require_react());
var import_jsx_runtime = require_jsx_runtime();
function StudentsPage() {
	const { students } = useScope();
	const homeworks = useAppStore((s) => s.homeworks);
	const evaluations = useAppStore((s) => s.evaluations);
	const [q, setQ] = (0, import_react.useState)("");
	const rows = (0, import_react.useMemo)(() => {
		const needle = q.trim().toLowerCase();
		return students.filter((s) => needle ? `${s.firstName} ${s.lastName} ${s.parentName}`.toLowerCase().includes(needle) : true).map((s) => ({
			s,
			avg: finalAverage(homeworks, evaluations, s.id),
			rate: homeworkRate(homeworks, s.id)
		})).sort((a, b) => (a.avg ?? 99) - (b.avg ?? 99));
	}, [
		students,
		homeworks,
		evaluations,
		q
	]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(PageHeader, {
			kicker: "Nómina",
			title: "Estudiantes",
			hint: "Desempeño, cumplimiento y ficha para DECE o dirección."
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Input, {
			className: "mb-4",
			placeholder: "Buscar por nombre o familia",
			value: q,
			onChange: (e) => setQ(e.target.value)
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", {
			className: "space-y-2",
			children: rows.map(({ s, avg, rate }) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("li", { children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				to: "/estudiantes/$id",
				params: { id: s.id },
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Card, {
					className: "flex items-center gap-3 p-3",
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
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Meter, {
								className: "mt-2 max-w-40",
								value: rate
							})]
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "flex flex-col items-end gap-1",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(GradeNum, {
								value: avg,
								className: "text-lg"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(ApprovalBadge, { value: avg })]
						})
					]
				})
			}) }, s.id))
		})
	] });
}
//#endregion
export { StudentsPage as component };
