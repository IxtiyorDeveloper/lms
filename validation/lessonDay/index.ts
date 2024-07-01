import * as yup from "yup";

export const CreateLessonDay = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    day: yup.string().required("Day is a required field"),
  }),
});
