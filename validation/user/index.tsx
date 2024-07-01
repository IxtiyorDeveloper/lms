import * as yup from "yup";

export const PasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is a required field")
    .matches(
      /^(?=.*[a-zA-Z])(?=.*[0-9]).{7,}$/,
      "Password must contain at least one letter and number and 7 characters"
    ),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("password"), null], "Passwords must match")
    .required("Confirm password is a required field"),
});

export const ChangeStartDateSchema = yup.object().shape({
  date_from: yup.string().nullable().required("Start date is required"),
});
