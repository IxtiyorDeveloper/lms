import * as yup from "yup";

export const ReasonSchema = yup.object().shape({
  reason: yup.string().required("Reason is a required field"),
});
