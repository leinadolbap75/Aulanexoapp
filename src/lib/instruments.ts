import { questionsForSubject } from "./bank";
import { evalAverage, homeworkRate, levelFromAvg } from "./grades";
import type { Evaluation, Homework, Level, Question, StudentInstrument } from "./types";

function shuffle<T>(arr: T[]) {
  const copy = [...arr];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j]!, copy[i]!];
  }
  return copy;
}

function skillScores(evaluations: Evaluation[], studentId: string, subjectId: string) {
  const map = new Map<string, { sum: number; n: number }>();
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
        if (pts === undefined) continue;
        ok = q.points > 0 ? pts / q.points : 0;
      } else if (given !== undefined) {
        ok = given.trim().toLowerCase() === q.answer.trim().toLowerCase() ? 1 : 0;
      } else {
        continue;
      }
      const cur = map.get(q.skill) ?? { sum: 0, n: 0 };
      cur.sum += ok;
      cur.n += 1;
      map.set(q.skill, cur);
    }
  }
  const weak: string[] = [];
  for (const [skill, v] of map) {
    if (v.n > 0 && v.sum / v.n < 0.65) weak.push(skill);
  }
  return weak;
}

function pickByDifficulty(pool: Question[], difficulty: 1 | 2 | 3, n: number, preferSkills: string[]) {
  const preferred = shuffle(pool.filter((q) => q.difficulty === difficulty && preferSkills.includes(q.skill)));
  const rest = shuffle(pool.filter((q) => q.difficulty === difficulty && !preferSkills.includes(q.skill)));
  return [...preferred, ...rest].slice(0, n);
}

function mixForLevel(level: Level): { d1: number; d2: number; d3: number } {
  if (level === "refuerzo") return { d1: 3, d2: 2, d3: 1 };
  if (level === "avanzado") return { d1: 1, d2: 2, d3: 3 };
  return { d1: 2, d2: 3, d3: 1 };
}

export function buildInstrument(
  studentId: string,
  subjectId: string,
  level: Level,
  focus: string[],
  personalized: boolean,
): StudentInstrument {
  const pool = questionsForSubject(subjectId);
  const mix = personalized ? mixForLevel(level) : { d1: 2, d2: 3, d3: 1 };
  const skills = personalized ? focus : [];
  const picked: Question[] = [];
  const take = (d: 1 | 2 | 3, n: number) => {
    const next = pickByDifficulty(
      pool.filter((q) => !picked.some((p) => p.id === q.id)),
      d,
      n,
      skills,
    );
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
    questions: picked.map((q) => ({ ...q })),
  };
}

export function studentLevel(
  studentId: string,
  subjectId: string,
  homeworks: Homework[],
  evaluations: Evaluation[],
): { level: Level; focus: string[]; avg: number | null; rate: number } {
  const avg = evalAverage(evaluations, studentId, subjectId);
  const rate = homeworkRate(
    homeworks.filter((h) => h.subjectId === subjectId),
    studentId,
  );
  const focus = skillScores(evaluations, studentId, subjectId);
  const level = levelFromAvg(avg, rate);
  return { level, focus, avg, rate };
}

export function scoreClosed(questions: Question[], answers: Record<string, string>) {
  let score = 0;
  let max = 0;
  for (const q of questions) {
    max += q.points;
    if (q.type === "abierta") continue;
    const given = answers[q.id];
    if (given && given.trim().toLowerCase() === q.answer.trim().toLowerCase()) {
      score += q.points;
    }
  }
  return { score, max };
}

export function openMax(questions: Question[]) {
  return questions.filter((q) => q.type === "abierta").reduce((a, q) => a + q.points, 0);
}
