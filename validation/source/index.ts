import * as yup from "yup";

export const CreateSourceSchema = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    using_place: yup.string().nullable().required("Type is a required field"),
    icon_file_id: yup.string().nullable(),
    order: yup.number().nullable(),
  }),
});
