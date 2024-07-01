import * as yup from "yup";

export const CreateGroupType = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    group_form: yup.string().required("Group form is a required field"),
    max_count: yup.string().required("Max count is a required field"),
    min_count: yup.string().required("Min count is a required field"),
    max_age: yup.string().nullable().required("Max age is a required field"),
    min_age: yup.string().nullable().required("Min age is a required field"),
    lesson_duration: yup
      .string()
      .required("Lesson Duration is a required field"),
    additional_seat: yup
      .string()
      .required("Additional seat is a required field"),
  }),
});
