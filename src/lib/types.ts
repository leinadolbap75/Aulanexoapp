export type Role = "docente" | "dece" | "vicerrector" | "rector" | "familia";

export type SubmissionStatus = "pendiente" | "entregado" | "tarde" | "no_entregado";

export type EvalType = "diagnostico" | "parcial" | "trimestral" | "recuperacion";
export type EvalStatus = "borrador" | "programada" | "en_curso" | "calificada";

export type QuestionType = "opcion" | "verdadero" | "abierta";
export type Difficulty = 1 | 2 | 3;

export type MessageKind = "cumplimiento" | "incumplimiento" | "calificacion" | "alerta";
export type MessageStatus = "cola" | "enviado";

export type ReportPeriod = "mensual" | "trimestral" | "anual";
export type ReportAudience = "dece" | "vicerrectorado" | "rectorado" | "familia";

export type Approval = "aprobado" | "supletorio" | "remedial";

export type Level = "refuerzo" | "medio" | "avanzado";

export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  course: string;
  parentName: string;
  parentRelation: string;
  parentPhone: string;
  notes: string;
}

export interface Subject {
  id: string;
  name: string;
  teacher: string;
  short: string;
}

export interface Question {
  id: string;
  subjectId: string;
  skill: string;
  difficulty: Difficulty;
  type: QuestionType;
  prompt: string;
  options?: string[];
  answer: string;
  rubric?: string;
  points: number;
}

export interface Submission {
  studentId: string;
  status: SubmissionStatus;
  at?: string;
  note?: string;
}

export interface Homework {
  id: string;
  title: string;
  subjectId: string;
  due: string;
  assignedAt: string;
  description: string;
  studentIds: string[];
  submissions: Submission[];
}

export interface Attempt {
  studentId: string;
  answers: Record<string, string>;
  openScores: Record<string, number>;
  score: number;
  maxScore: number;
  submittedAt?: string;
  published: boolean;
}

export interface StudentInstrument {
  studentId: string;
  level: Level;
  focus: string[];
  questions: Question[];
}

export interface Evaluation {
  id: string;
  title: string;
  subjectId: string;
  type: EvalType;
  status: EvalStatus;
  scheduledAt: string;
  durationMin: number;
  instructions: string;
  personalized: boolean;
  instruments: StudentInstrument[];
  attempts: Attempt[];
}

export interface Message {
  id: string;
  studentId: string;
  kind: MessageKind;
  status: MessageStatus;
  subject: string;
  body: string;
  createdAt: string;
  relatedId?: string;
}

export const ROLE_LABEL: Record<Role, string> = {
  docente: "Docente",
  dece: "DECE",
  vicerrector: "Vicerrectorado",
  rector: "Rectorado",
  familia: "Familia",
};

export const ROLE_HINT: Record<Role, string> = {
  docente: "Asigna, verifica, evalúa y califica",
  dece: "Seguimiento socioemocional y riesgo",
  vicerrector: "Rendimiento académico del curso",
  rector: "Vista institucional y periodos",
  familia: "Deberes, notas y avisos del hijo",
};

export const EVAL_TYPE_LABEL: Record<EvalType, string> = {
  diagnostico: "Diagnóstico",
  parcial: "Parcial",
  trimestral: "Trimestral",
  recuperacion: "Recuperación",
};

export const SUBMISSION_LABEL: Record<SubmissionStatus, string> = {
  pendiente: "Pendiente",
  entregado: "Entregado",
  tarde: "Atrasado",
  no_entregado: "No presentado",
};

export const APPROVAL_LABEL: Record<Approval, string> = {
  aprobado: "Aprobado",
  supletorio: "Supletorio",
  remedial: "Remedial",
};

export const PASSING = 7;
export const SUPLETORIO = 5;
