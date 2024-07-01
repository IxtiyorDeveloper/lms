import * as yup from "yup";

export const LoginSchema = yup.object().shape({
  // login: yup.string().required("Login is a required field"),
  // password: yup.string().required("Password is a required field"),
  iuytqwiqrtuwy1: yup.string().required("Login is a required field"),
  kjbsldbdfjklsa2: yup.string().required("Password is a required field"),
});
