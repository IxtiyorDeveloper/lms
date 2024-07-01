import * as yup from "yup";

export const ComplaintSchema = yup.object().shape({
  description: yup.string().nullable().required("Description is required"),
});
