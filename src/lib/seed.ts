import { BANK } from "./bank";
import { buildInstrument, studentLevel } from "./instruments";
import type {
  Attempt,
  Evaluation,
  Homework,
  Message,
  Role,
  Student,
  StudentInstrument,
  Subject,
  Submission,
  SubmissionStatus,
} from "./types";

export const SCHOOL_DEFAULT = "Unidad Educativa Los Arrayanes";
export const COURSE = "10.º EGB A";
export const YEAR_LABEL = "2026-2027 · Primer trimestre";

export const SUBJECTS: Subject[] = [
  { id: "mat", name: "Matemática", teacher: "Lcda. Marina Cobo", short: "MAT" },
  { id: "len", name: "Lengua y Literatura", teacher: "Mtr. Pablo Ayala", short: "LEN" },
  { id: "ccn", name: "Ciencias Naturales", teacher: "Ing. Ruth Paredes", short: "CCN" },
  { id: "eso", name: "Estudios Sociales", teacher: "Lcdo. Iván Guerra", short: "ESO" },
  { id: "ing", name: "Inglés", teacher: "Ms. Helen Brooks", short: "ING" },
];

export const STUDENTS: Student[] = [
  { id: "s01", firstName: "Camila", lastName: "Andrade", course: COURSE, parentName: "Elena Andrade", parentRelation: "Madre", parentPhone: "099 451 2201", notes: "Liderazgo en clase. Candidata a monitora." },
  { id: "s02", firstName: "Mateo", lastName: "Vásquez", course: COURSE, parentName: "Jorge Vásquez", parentRelation: "Padre", parentPhone: "098 332 1180", notes: "Constante. Pide refuerzo en estadística." },
  { id: "s03", firstName: "Valentina", lastName: "Cevallos", course: COURSE, parentName: "Patricia Cevallos", parentRelation: "Madre", parentPhone: "097 610 4492", notes: "Participa bien en lengua; distrae en matemática." },
  { id: "s04", firstName: "Diego", lastName: "Paredes", course: COURSE, parentName: "Lucía Paredes", parentRelation: "Madre", parentPhone: "096 228 7714", notes: "Cumple, sin destacar. Seguimiento rutinario." },
  { id: "s05", firstName: "Isabella", lastName: "Mora", course: COURSE, parentName: "Andrés Mora", parentRelation: "Padre", parentPhone: "095 804 3366", notes: "Baja entrega de deberes. DECE ya tiene ficha abierta." },
  { id: "s06", firstName: "Sebastián", lastName: "Quishpe", course: COURSE, parentName: "Rosa Quishpe", parentRelation: "Madre", parentPhone: "099 120 5588", notes: "Riesgo académico. Refuerzo personalizado urgente." },
  { id: "s07", firstName: "Lucía", lastName: "Benítez", course: COURSE, parentName: "Carlos Benítez", parentRelation: "Padre", parentPhone: "098 777 2019", notes: "Buena comprensión lectora. Apoya a pares." },
  { id: "s08", firstName: "Andrés", lastName: "Salazar", course: COURSE, parentName: "Mónica Salazar", parentRelation: "Madre", parentPhone: "097 441 0903", notes: "Promedio justo. Mejoró en el último parcial." },
  { id: "s09", firstName: "Emilia", lastName: "Torres", course: COURSE, parentName: "Gabriel Torres", parentRelation: "Padre", parentPhone: "096 555 8120", notes: "Alto desempeño. Proponer ampliación." },
  { id: "s10", firstName: "Nicolás", lastName: "Ibarra", course: COURSE, parentName: "Sofía Ibarra", parentRelation: "Madre", parentPhone: "095 333 6741", notes: "Muy constante. Leve ansiedad ante pruebas." },
  { id: "s11", firstName: "Paula", lastName: "Mendoza", course: COURSE, parentName: "Héctor Mendoza", parentRelation: "Padre", parentPhone: "099 888 4402", notes: "Fluctúa según la materia. Ciencias más baja." },
  { id: "s12", firstName: "Joaquín", lastName: "Rivas", course: COURSE, parentName: "Ana Rivas", parentRelation: "Madre", parentPhone: "098 212 9090", notes: "Inasistencias puntuales. Familia notificada en julio." },
];

const ALL_IDS = STUDENTS.map((s) => s.id);

function subs(map: Record<string, SubmissionStatus>, at?: string): Submission[] {
  return ALL_IDS.map((id) => ({
    studentId: id,
    status: map[id] ?? "pendiente",
    at: map[id] && map[id] !== "pendiente" ? at : undefined,
  }));
}

function snapshot(subjectId: string, ids: string[]): StudentInstrument[] {
  const pool = BANK.filter((q) => q.subjectId === subjectId).slice(0, 6);
  return ids.map((studentId) => ({
    studentId,
    level: "medio" as const,
    focus: [],
    questions: pool.map((q) => ({ ...q })),
  }));
}

function gradedAttempts(
  instruments: StudentInstrument[],
  scores10: Record<string, number>,
  submittedAt: string,
): Attempt[] {
  return instruments.map((inst) => {
    const maxScore = inst.questions.reduce((a, q) => a + q.points, 0);
    const target = scores10[inst.studentId] ?? 7;
    const score = Math.round((target / 10) * maxScore * 10) / 10;
    return {
      studentId: inst.studentId,
      answers: {},
      openScores: {},
      score,
      maxScore,
      submittedAt,
      published: true,
    };
  });
}

const MAT_SCORES: Record<string, number> = {
  s01: 9.5, s02: 7.6, s03: 8.0, s04: 7.1, s05: 5.4, s06: 4.3,
  s07: 8.4, s08: 7.2, s09: 9.1, s10: 8.8, s11: 6.6, s12: 5.1,
};

const LEN_SCORES: Record<string, number> = {
  s01: 9.2, s02: 7.8, s03: 8.6, s04: 7.4, s05: 6.8, s06: 5.0,
  s07: 9.0, s08: 7.0, s09: 8.9, s10: 8.3, s11: 7.2, s12: 5.8,
};

export function createSeed() {
  const homeworks: Homework[] = [
    {
      id: "hw1",
      title: "Ecuaciones lineales — hoja 12",
      subjectId: "mat",
      due: "2026-08-22",
      assignedAt: "2026-08-18",
      description: "Resolver los ejercicios 1 al 15 de la hoja 12. Mostrar el procedimiento completo.",
      studentIds: ALL_IDS,
      submissions: subs(
        {
          s01: "entregado", s02: "entregado", s03: "entregado", s04: "entregado",
          s05: "no_entregado", s06: "no_entregado", s07: "entregado", s08: "tarde",
          s09: "entregado", s10: "entregado", s11: "tarde", s12: "no_entregado",
        },
        "2026-08-22T18:10:00.000Z",
      ),
    },
    {
      id: "hw2",
      title: "Ensayo argumentativo: la lectura en casa",
      subjectId: "len",
      due: "2026-08-26",
      assignedAt: "2026-08-20",
      description: "Redactar un ensayo de 350 palabras con tesis, dos argumentos y cierre. Entregar en el cuaderno.",
      studentIds: ALL_IDS,
      submissions: subs(
        {
          s01: "entregado", s02: "entregado", s03: "pendiente", s04: "entregado",
          s05: "pendiente", s06: "pendiente", s07: "entregado", s08: "pendiente",
          s09: "entregado", s10: "entregado", s11: "pendiente", s12: "pendiente",
        },
        "2026-08-25T16:00:00.000Z",
      ),
    },
    {
      id: "hw3",
      title: "Informe de laboratorio: células",
      subjectId: "ccn",
      due: "2026-08-28",
      assignedAt: "2026-08-21",
      description: "Completar la guía de observación al microscopio e incluir un dibujo etiquetado.",
      studentIds: ALL_IDS,
      submissions: subs({
        s01: "pendiente", s02: "pendiente", s03: "pendiente", s04: "pendiente",
        s05: "pendiente", s06: "pendiente", s07: "pendiente", s08: "pendiente",
        s09: "pendiente", s10: "pendiente", s11: "pendiente", s12: "pendiente",
      }),
    },
    {
      id: "hw4",
      title: "Línea de tiempo: 1809–1822",
      subjectId: "eso",
      due: "2026-09-02",
      assignedAt: "2026-08-24",
      description: "Construir una línea de tiempo con cinco hitos entre el Grito de Independencia y Pichincha.",
      studentIds: ALL_IDS,
      submissions: subs({
        s01: "pendiente", s02: "pendiente", s03: "pendiente", s04: "pendiente",
        s05: "pendiente", s06: "pendiente", s07: "pendiente", s08: "pendiente",
        s09: "pendiente", s10: "pendiente", s11: "pendiente", s12: "pendiente",
      }),
    },
  ];

  const matInst = snapshot("mat", ALL_IDS);
  const lenInst = snapshot("len", ALL_IDS);

  const evaluations: Evaluation[] = [
    {
      id: "ev1",
      title: "Parcial 1 — álgebra y geometría",
      subjectId: "mat",
      type: "parcial",
      status: "calificada",
      scheduledAt: "2026-08-15",
      durationMin: 45,
      instructions: "Calculadora simple permitida. Justificar procedimientos.",
      personalized: false,
      instruments: matInst,
      attempts: gradedAttempts(matInst, MAT_SCORES, "2026-08-15T15:40:00.000Z"),
    },
    {
      id: "ev2",
      title: "Diagnóstico de comprensión lectora",
      subjectId: "len",
      type: "diagnostico",
      status: "calificada",
      scheduledAt: "2026-08-20",
      durationMin: 40,
      instructions: "Leer con atención. Las abiertas se califican con rúbrica.",
      personalized: false,
      instruments: lenInst,
      attempts: gradedAttempts(lenInst, LEN_SCORES, "2026-08-20T14:20:00.000Z"),
    },
    {
      id: "ev3",
      title: "Parcial — célula y ecosistema",
      subjectId: "ccn",
      type: "parcial",
      status: "programada",
      scheduledAt: "2026-09-04",
      durationMin: 40,
      instructions: "Instrumento personalizado según el desempeño del diagnóstico de hábitos y el parcial de matemática (transferencia de rigor).",
      personalized: true,
      instruments: [],
      attempts: [],
    },
    {
      id: "ev4",
      title: "Recuperación de matemática",
      subjectId: "mat",
      type: "recuperacion",
      status: "borrador",
      scheduledAt: "2026-09-08",
      durationMin: 40,
      instructions: "Solo para estudiantes en supletorio o remedial. Instrumento de refuerzo.",
      personalized: true,
      instruments: [],
      attempts: [],
    },
  ];

  evaluations[2]!.instruments = ALL_IDS.map((id) => {
    const { level, focus } = studentLevel(id, "ccn", homeworks, evaluations);
    const mathLevel = studentLevel(id, "mat", homeworks, evaluations);
    return buildInstrument(id, "ccn", mathLevel.avg !== null && mathLevel.avg < 7 ? "refuerzo" : level, focus, true);
  });

  const messages: Message[] = [
    {
      id: "m1",
      studentId: "s05",
      kind: "incumplimiento",
      status: "enviado",
      subject: "No presentación de deber — Matemática",
      body: "Estimado Andrés Mora:\n\nLe informamos que Isabella no presentó el deber «Ecuaciones lineales — hoja 12», con fecha de entrega 22 de agosto. El promedio actual en matemática se encuentra bajo la nota de aprobación (7.0).\n\nQuedamos atentos para coordinar refuerzo.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
      createdAt: "2026-08-22T19:00:00.000Z",
      relatedId: "hw1",
    },
    {
      id: "m2",
      studentId: "s06",
      kind: "incumplimiento",
      status: "enviado",
      subject: "No presentación de deber — Matemática",
      body: "Estimada Rosa Quishpe:\n\nSebastián no presentó el deber «Ecuaciones lineales — hoja 12» (22 de agosto). Su último parcial fue 4.3/10. El DECE y el área académica recomiendan un plan de refuerzo personalizado.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
      createdAt: "2026-08-22T19:02:00.000Z",
      relatedId: "hw1",
    },
    {
      id: "m3",
      studentId: "s12",
      kind: "incumplimiento",
      status: "enviado",
      subject: "No presentación de deber — Matemática",
      body: "Estimada Ana Rivas:\n\nJoaquín no presentó el deber de ecuaciones lineales del 22 de agosto. El promedio proyectado está en zona de supletorio.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
      createdAt: "2026-08-22T19:04:00.000Z",
      relatedId: "hw1",
    },
    {
      id: "m4",
      studentId: "s01",
      kind: "calificacion",
      status: "enviado",
      subject: "Calificación publicada — Parcial 1 de Matemática",
      body: "Estimada Elena Andrade:\n\nCamila obtuvo 9.5/10 en el Parcial 1 de Matemática (15 de agosto). Felicitamos el desempeño y el cumplimiento de deberes.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
      createdAt: "2026-08-16T09:10:00.000Z",
      relatedId: "ev1",
    },
    {
      id: "m5",
      studentId: "s06",
      kind: "calificacion",
      status: "enviado",
      subject: "Calificación publicada — Parcial 1 de Matemática",
      body: "Estimada Rosa Quishpe:\n\nSebastián obtuvo 4.3/10 en el Parcial 1 de Matemática. La nota no alcanza la aprobación (7.0). Se programará una evaluación de recuperación con instrumento personalizado de refuerzo.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
      createdAt: "2026-08-16T09:12:00.000Z",
      relatedId: "ev1",
    },
    {
      id: "m6",
      studentId: "s08",
      kind: "cumplimiento",
      status: "cola",
      subject: "Entrega tardía registrada — Matemática",
      body: "Estimada Mónica Salazar:\n\nAndrés entregó el deber de ecuaciones lineales fuera de plazo. La entrega se registra como atrasada (50% del puntaje de deber). Agradecemos el envío y recordamos la fecha de los próximos trabajos.\n\nLcda. Marina Cobo\nUE Los Arrayanes",
      createdAt: "2026-08-23T08:00:00.000Z",
      relatedId: "hw1",
    },
  ];

  return {
    schoolName: SCHOOL_DEFAULT,
    role: "docente" as Role,
    familyStudentId: "s06",
    students: STUDENTS,
    subjects: SUBJECTS,
    homeworks,
    evaluations,
    messages,
  };
}

export type SeedState = ReturnType<typeof createSeed>;
