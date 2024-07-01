import * as yup from "yup";

export const SaveDepartmentValidation = yup.object().shape({
  name: yup.string().required(),
});
export const PerformStopValidation = yup.object().shape({
  general: yup.object().shape({
    date_to: yup.string().optional(),
    leaving_category_id: yup
      .string()
      .required("Stopping category is a required field"),
    reason: yup.string().required("Reason is a required field"),
    check: yup.string().required("Check is a required field"),
  }),
});
export const BlockStudent = yup.object().shape({
  note: yup.string().required("Note is a required field"),
});

export const ResponsibleSchema = yup.object().shape({
  responsible_id: yup.string().required("Responsible is a required field"),
});
