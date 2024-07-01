import * as yup from "yup";

export const ConditionalPass = yup.object().shape({
  description: yup
    .string()
    .nullable()
    .required("Description is a required field"),
});
