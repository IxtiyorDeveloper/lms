import {
  LESSON_DAY_MAIN_EXAM,
  LESSON_DAY_SPEAKING_EXAM,
} from "./lessonDayEnums";

export const EXAM_PARTS = {
  MAIN: 10000,
  SPEAKING: 20000,
  PRESENTATION: 30000,
};

export enum EnumExamParts {
  MAIN = 10000,
  SPEAKING = 20000,
  PRESENTATION = 30000,
}

export const EXAM_PROCESS = {
  FAIL: 10000,
  NOT_SET: 20000,
  CONDITIONAL: 30000,
  SUCCESS: 40000,
};

export const EXAM_USER_TYPE = {
  TYPE_SUPERVISOR: 10000,
  TYPE_TEACHER: 10100,
  TYPE_SUPPORT: 10200,
  TYPE_STUDENT: 10300,
};
export const CONDITIONAL = 30000;
export const FAIL = 10000;
export const EXAM_PROCESS_STATUS = {
  10000: "FAIL",
  20000: "NOT_SET",
  30000: "CONDITIONAL",
  40000: "PASS",
  FAIL: 10000,
  NOT_SET: 20000,
  NOT_SET_TEXT: "NOT_SET",
  NOT_STARTED: "Not passed",
  CONDITIONAL: 30000,
  PASS: 40000,
};
export const GROUP_EXAM = {
  PENDING: 10000,
  PROCESSING: 20000,
  CHECKING: 30000,
  ARCHIVED: 40000,
};

export const EXAM_PROCESS_ATTENDANCE_STATUS = {
  ATTENDED: 10000,
  PARTIAL_ABS: 20000,
  FULL_ABS: 30000,
};

export const EXAM_PROCESS_ATTENDANCE_STATUS1 = {
  ATTENDED: "10000",
  PARTIAL_ABS: "20000",
  FULL_ABS: "30000",
};

export const EXAM_ABS = {
  ABSENT: 100,
  ATTENDED: 200,
};

export enum EnumExamAbs {
  ABSENT = 100,
  ATTENDED = 200,
  ADD = 300,
}

export const EXAMINATION_PART = {
  WRITING: 100,
  LISTENING: 200,
  SPEAKING: 300,
  READING: 400,
  GRAMMAR: 500,
  VOCABULARY: 600,
  PRESENTATION: 700,
};

export const group_exam_names = {
  [LESSON_DAY_MAIN_EXAM]: "Main",
  [LESSON_DAY_SPEAKING_EXAM]: "Speaking",
};

export enum EExamAnswerStatus {
  INCORRECT = 10000,
  CORRECT = 30000,
}

export enum EExamParts {
  WRITING = 100,
  LISTENING = 200,
  SPEAKING = 300,
  READING = 400,
  GRAMMAR = 500,
  VOCABULARY = 600,
  PRESENTATION = 700,
  MAIN = 800,
}

export const EExamPartsNames = {
  [EExamParts.WRITING]: "Writing",
  [EExamParts.LISTENING]: "Listening",
  [EExamParts.SPEAKING]: "Speaking",
  [EExamParts.READING]: "Reading",
  [EExamParts.GRAMMAR]: "Grammar",
  [EExamParts.VOCABULARY]: "Vocabulary",
  [EExamParts.PRESENTATION]: "Presentation",
  [EExamParts.MAIN]: "Main",
};

export enum MockExamStatus {
  IN_PROGRESS = 100,
  FINISHED = 300,
}

export enum EStudentExamStatus {
  RESULT_FAIL = 10000,
  RESULT_NOT_SET = 20000,
  RESULT_CONDITIONAL = 30000,
  RESULT_SUCCESS = 40000,
}
