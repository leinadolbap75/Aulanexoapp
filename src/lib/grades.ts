import type {
  Approval,
  Attempt,
  Evaluation,
  Homework,
  Level,
  Student,
  SubmissionStatus,
} from "./types";
import { PASSING, SUPLETORIO } from "./types";

export function round1(n: number) {
  return Math.round(n * 10) / 10;
}

export function approvalOf(score: number | null): Approval | null {
  if (score === null) return null;
  if (score >= PASSING) return "aprobado";
  if (score >= SUPLETORIO) return "supletorio";
  return "remedial";
}

export function homeworkPoints(status: SubmissionStatus): number | null {
  if (status === "entregado") return 1;
  if (status === "tarde") return 0.5;
  if (status === "no_entregado") return 0;
  return null;
}

export function homeworkAverage(homeworks: Homework[], studentId: string): number | null {
  const relevant = homeworks.filter((h) => h.studentIds.includes(studentId));
  const scored = relevant
    .map((h) => h.submissions.find((s) => s.studentId === studentId))
    .map((s) => (s ? homeworkPoints(s.status) : null))
    .filter((v): v is number => v !== null);
  if (scored.length === 0) return null;
  return round1((scored.reduce((a, b) => a + b, 0) / scored.length) * 10);
}

export function homeworkRate(homeworks: Homework[], studentId: string) {
  const relevant = homeworks.filter((h) => h.studentIds.includes(studentId));
  if (relevant.length === 0) return 0;
  const done = relevant.filter((h) => {
    const s = h.submissions.find((x) => x.studentId === studentId);
    return s && (s.status === "entregado" || s.status === "tarde");
  }).length;
  return done / relevant.length;
}

export function publishedAttempts(evaluation: Evaluation) {
  return evaluation.attempts.filter((a) => a.published || evaluation.status === "calificada");
}

export function evalAverage(evaluations: Evaluation[], studentId: string, subjectId?: string): number | null {
  const list = evaluations.filter((e) => {
    if (subjectId && e.subjectId !== subjectId) return false;
    const att = e.attempts.find((a) => a.studentId === studentId);
    return Boolean(att && (att.published || e.status === "calificada") && att.submittedAt);
  });
  const scores = list
    .map((e) => {
      const att = e.attempts.find((a) => a.studentId === studentId)!;
      if (att.maxScore <= 0) return null;
      return (att.score / att.maxScore) * 10;
    })
    .filter((v): v is number => v !== null);
  if (scores.length === 0) return null;
  return round1(scores.reduce((a, b) => a + b, 0) / scores.length);
}

export function finalAverage(
  homeworks: Homework[],
  evaluations: Evaluation[],
  studentId: string,
  subjectId?: string,
): number | null {
  const hw = subjectId
    ? homeworkAverage(
        homeworks.filter((h) => h.subjectId === subjectId),
        studentId,
      )
    : homeworkAverage(homeworks, studentId);
  const ev = evalAverage(evaluations, studentId, subjectId);
  if (hw === null && ev === null) return null;
  if (hw === null) return ev;
  if (ev === null) return hw;
  return round1(hw * 0.3 + ev * 0.7);
}

export function courseAverage(students: Student[], homeworks: Homework[], evaluations: Evaluation[]) {
  const vals = students
    .map((s) => finalAverage(homeworks, evaluations, s.id))
    .filter((v): v is number => v !== null);
  if (vals.length === 0) return null;
  return round1(vals.reduce((a, b) => a + b, 0) / vals.length);
}

export function levelFromAvg(avg: number | null, rate: number): Level {
  if (avg === null) return rate < 0.6 ? "refuerzo" : "medio";
  if (avg < 7 || rate < 0.55) return "refuerzo";
  if (avg >= 8.6 && rate >= 0.8) return "avanzado";
  return "medio";
}

export function attemptScore(att: Attempt) {
  return att.maxScore > 0 ? round1((att.score / att.maxScore) * 10) : 0;
}

export function inMonth(iso: string, year: number, month: number) {
  const d = new Date(iso);
  return d.getFullYear() === year && d.getMonth() === month;
}

export function inTrimester(iso: string, year: number, trimester: 1 | 2 | 3) {
  const d = new Date(iso);
  if (d.getFullYear() !== year) return false;
  const m = d.getMonth();
  if (trimester === 1) return m >= 4 && m <= 7;
  if (trimester === 2) return m >= 8 && m <= 11;
  return m >= 0 && m <= 3;
}

export function currentTrimester(now = new Date()): 1 | 2 | 3 {
  const m = now.getMonth();
  if (m >= 4 && m <= 7) return 1;
  if (m >= 8 && m <= 11) return 2;
  return 3;
}
