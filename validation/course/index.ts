import * as yup from "yup";

export const CreateCourse = yup.object().shape({
  name: yup.string().required("Course name is a required field"),
});
