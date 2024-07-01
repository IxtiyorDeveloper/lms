import * as yup from "yup";

export const CreateOperatorSchema = yup.object().shape({
  general: yup.object().shape({
    operator_number: yup
      .string()
      .required("Operator number is a required field"),
    user_id: yup.string().nullable().required("Staff is a required field"),
    sip_login: yup.string().required("Login is a required field"),
    sip_password: yup
      .string()
      .matches(/^.{4,}$/, "Field must have more than three characters")
      .required("Password is required"),
    status: yup.string().nullable(),
  }),
});
