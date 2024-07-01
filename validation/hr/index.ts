import * as yup from "yup";
export const HRVacancyForm = yup.object().shape({
  title: yup.string().required("Title is a required field"),
  order: yup.string().required("Order is a required field"),
  color: yup.string().required("Color is a required field"),
  slug: yup.string().required("Slug is a required field"),
  candidate_stage: yup.array().required("Candidate stages is a required field"),
});
