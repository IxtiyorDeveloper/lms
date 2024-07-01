import * as yup from "yup";

export const TemplateSchema = yup.object().shape({
  name: yup.string().nullable().required("Name is required"),
  url: yup.string().nullable().required("Audio file is required"),
  delay: yup.string().nullable().required("Hold time is required"),
  default: yup.string().nullable(),
  max_attempt: yup.string().nullable().required("Recall attempt is required"),
  attempt_interval: yup
    .string()
    .nullable()
    .required("Recall interval is required"),
  is_repeat: yup.string().nullable(),
});
