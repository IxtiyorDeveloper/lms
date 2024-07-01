export const KPI_TEACHING_GROUP = "221";
export const KPI_TEACHING_INDIVIDUAL = "222";
export const SUB_TYPE_CORRECTION = "400";
export const SUB_TYPE_PENALTY = "500";
export const SUB_TYPE_COVER_TEACHER = "410";

const KPI_OFFENCE = 260;

export const SALARY_SUB_TYPE = {
  [KPI_TEACHING_GROUP]: "Group",
  [KPI_TEACHING_INDIVIDUAL]: "Individual",
  210: "In call",
  220: "Teaching",
  200: "Freshman",
  120: "Cover teacher",
  110: "Exclusion",
  100: "Fixed",
  [SUB_TYPE_CORRECTION]: "Correction",
  300: "Ranking",
};

export enum ESalarySubTypes {
  KPI_OFFENCE = 260,
}
