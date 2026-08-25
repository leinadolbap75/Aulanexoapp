import { create } from "zustand";
import { persist } from "zustand/middleware";
import { todayIso, nowIso } from "./format";
import { buildInstrument, scoreClosed, studentLevel } from "./instruments";
import { createSeed, type SeedState } from "./seed";
import type {
  EvalStatus,
  EvalType,
  Evaluation,
  Homework,
  Message,
  MessageKind,
  Role,
  SubmissionStatus,
} from "./types";
import { uid } from "./utils";

function fullName(state: SeedState, studentId: string) {
  const s = state.students.find((x) => x.id === studentId);
  return s ? `${s.firstName} ${s.lastName}` : "el/la estudiante";
}

function parentLine(state: SeedState, studentId: string) {
  const s = state.students.find((x) => x.id === studentId);
  if (!s) return "Familia";
  return `${s.parentRelation === "Madre" ? "Estimada" : "Estimado"} ${s.parentName}`;
}

function subjectName(state: SeedState, subjectId: string) {
  return state.subjects.find((x) => x.id === subjectId)?.name ?? "la asignatura";
}

function teacherOf(state: SeedState, subjectId: string) {
  return state.subjects.find((x) => x.id === subjectId)?.teacher ?? "El área académica";
}

function pushMessage(
  messages: Message[],
  input: Omit<Message, "id" | "createdAt" | "status"> & { status?: Message["status"] },
): Message[] {
  const exists = messages.some(
    (m) => m.relatedId === input.relatedId && m.studentId === input.studentId && m.kind === input.kind && m.status === "cola",
  );
  if (exists) return messages;
  return [
    {
      ...input,
      id: uid(),
      createdAt: nowIso(),
      status: input.status ?? "cola",
    },
    ...messages,
  ];
}

export interface AppState extends SeedState {
  setRole: (role: Role) => void;
  setSchoolName: (name: string) => void;
  setFamilyStudentId: (id: string) => void;
  resetDemo: () => void;

  addHomework: (input: {
    title: string;
    subjectId: string;
    due: string;
    description: string;
    studentIds: string[];
  }) => string;
  setSubmission: (homeworkId: string, studentId: string, status: SubmissionStatus) => void;
  notifyHomework: (homeworkId: string) => number;

  addEvaluation: (input: {
    title: string;
    subjectId: string;
    type: EvalType;
    scheduledAt: string;
    durationMin: number;
    instructions: string;
    personalized: boolean;
  }) => string;
  generateInstruments: (evaluationId: string) => void;
  setEvalStatus: (evaluationId: string, status: EvalStatus) => void;
  submitAttempt: (evaluationId: string, studentId: string, answers: Record<string, string>) => void;
  gradeOpen: (evaluationId: string, studentId: string, questionId: string, points: number) => void;
  publishEvaluation: (evaluationId: string) => number;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      ...createSeed(),

      setRole: (role) => set({ role }),
      setSchoolName: (schoolName) => set({ schoolName }),
      setFamilyStudentId: (familyStudentId) => set({ familyStudentId }),
      resetDemo: () => set({ ...createSeed(), role: get().role, familyStudentId: get().familyStudentId }),

      addHomework: (input) => {
        const id = uid();
        const homework: Homework = {
          id,
          title: input.title,
          subjectId: input.subjectId,
          due: input.due,
          assignedAt: todayIso(),
          description: input.description,
          studentIds: input.studentIds,
          submissions: input.studentIds.map((studentId) => ({ studentId, status: "pendiente" })),
        };
        set({ homeworks: [homework, ...get().homeworks] });
        return id;
      },

      setSubmission: (homeworkId, studentId, status) => {
        set({
          homeworks: get().homeworks.map((h) => {
            if (h.id !== homeworkId) return h;
            return {
              ...h,
              submissions: h.submissions.map((s) =>
                s.studentId === studentId
                  ? { ...s, status, at: status === "pendiente" ? undefined : nowIso() }
                  : s,
              ),
            };
          }),
        });
      },

      notifyHomework: (homeworkId) => {
        const state = get();
        const hw = state.homeworks.find((h) => h.id === homeworkId);
        if (!hw) return 0;
        let added = 0;
        let messages = state.messages;
        for (const sub of hw.submissions) {
          if (sub.status === "pendiente") continue;
          const kind: MessageKind =
            sub.status === "no_entregado" ? "incumplimiento" : sub.status === "entregado" ? "cumplimiento" : "cumplimiento";
          const already = messages.some(
            (m) => m.relatedId === hw.id && m.studentId === sub.studentId && m.kind === kind && m.status === "enviado",
          );
          if (already) continue;
          const name = fullName(state, sub.studentId);
          const subj = subjectName(state, hw.subjectId);
          const greeting = parentLine(state, sub.studentId);
          const statusLine =
            sub.status === "no_entregado"
              ? `${name} no presentó el deber «${hw.title}» (fecha ${hw.due}).`
              : sub.status === "tarde"
                ? `${name} entregó con atraso el deber «${hw.title}». Se registra como atrasado.`
                : `${name} presentó a tiempo el deber «${hw.title}».`;
          messages = pushMessage(messages, {
            studentId: sub.studentId,
            kind,
            status: "enviado",
            subject:
              sub.status === "no_entregado"
                ? `Incumplimiento de deber — ${subj}`
                : `Cumplimiento de deber — ${subj}`,
            body: `${greeting}:\n\n${statusLine}\n\nAsignatura: ${subj}.\n\n${teacherOf(state, hw.subjectId)}\n${state.schoolName}`,
            relatedId: hw.id,
          });
          added += 1;
        }
        set({ messages });
        return added;
      },

      addEvaluation: (input) => {
        const id = uid();
        const evaluation: Evaluation = {
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
          attempts: [],
        };
        set({ evaluations: [evaluation, ...get().evaluations] });
        return id;
      },

      generateInstruments: (evaluationId) => {
        const state = get();
        set({
          evaluations: state.evaluations.map((ev) => {
            if (ev.id !== evaluationId) return ev;
            const instruments = state.students.map((st) => {
              const { level, focus } = studentLevel(st.id, ev.subjectId, state.homeworks, state.evaluations);
              return buildInstrument(st.id, ev.subjectId, level, focus, ev.personalized);
            });
            return { ...ev, instruments, status: ev.status === "borrador" ? "programada" : ev.status };
          }),
        });
      },

      setEvalStatus: (evaluationId, status) => {
        set({
          evaluations: get().evaluations.map((ev) => (ev.id === evaluationId ? { ...ev, status } : ev)),
        });
      },

      submitAttempt: (evaluationId, studentId, answers) => {
        const state = get();
        set({
          evaluations: state.evaluations.map((ev) => {
            if (ev.id !== evaluationId) return ev;
            const inst = ev.instruments.find((i) => i.studentId === studentId);
            if (!inst) return ev;
            const closed = scoreClosed(inst.questions, answers);
            const prev = ev.attempts.find((a) => a.studentId === studentId);
            const openScores = prev?.openScores ?? {};
            const openPts = inst.questions
              .filter((q) => q.type === "abierta")
              .reduce((a, q) => a + (openScores[q.id] ?? 0), 0);
            const attempt: AttemptLike = {
              studentId,
              answers,
              openScores,
              score: closed.score + openPts,
              maxScore: closed.max,
              submittedAt: nowIso(),
              published: false,
            };
            const rest = ev.attempts.filter((a) => a.studentId !== studentId);
            return { ...ev, attempts: [...rest, attempt] };
          }),
        });
      },

      gradeOpen: (evaluationId, studentId, questionId, points) => {
        set({
          evaluations: get().evaluations.map((ev) => {
            if (ev.id !== evaluationId) return ev;
            const inst = ev.instruments.find((i) => i.studentId === studentId);
            const att = ev.attempts.find((a) => a.studentId === studentId);
            if (!inst || !att) return ev;
            const openScores = { ...att.openScores, [questionId]: points };
            const closed = scoreClosed(inst.questions, att.answers);
            const openPts = inst.questions
              .filter((q) => q.type === "abierta")
              .reduce((a, q) => a + (openScores[q.id] ?? 0), 0);
            const next = {
              ...att,
              openScores,
              score: closed.score + openPts,
              maxScore: closed.max,
            };
            return {
              ...ev,
              attempts: ev.attempts.map((a) => (a.studentId === studentId ? next : a)),
            };
          }),
        });
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
            status: "calificada" as const,
            attempts: item.attempts.map((a) => ({ ...a, published: true })),
          };
        });
        for (const att of ev.attempts) {
          if (!att.submittedAt) continue;
          const name = fullName(state, att.studentId);
          const subj = subjectName(state, ev.subjectId);
          const greeting = parentLine(state, att.studentId);
          const over10 = att.maxScore > 0 ? Math.round((att.score / att.maxScore) * 100) / 10 : 0;
          messages = pushMessage(messages, {
            studentId: att.studentId,
            kind: "calificacion",
            status: "enviado",
            subject: `Calificación publicada — ${ev.title}`,
            body: `${greeting}:\n\n${name} obtuvo ${over10.toFixed(1)}/10 en «${ev.title}» (${subj}). La nota de aprobación institucional es 7.0.\n\n${teacherOf(state, ev.subjectId)}\n${state.schoolName}`,
            relatedId: ev.id,
          });
          added += 1;
        }
        set({ evaluations, messages });
        return added;
      },
    }),
    {
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
        messages: s.messages,
      }),
    },
  ),
);

type AttemptLike = AppState["evaluations"][number]["attempts"][number];

export function useHydratedStore() {
  return useAppStore();
}
