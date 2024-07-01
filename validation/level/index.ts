import * as yup from "yup";
export const field = {
  name: yup.string().required("Name is a required field"),
  duration: yup.string().nullable().required("Duration is a required field"),
};

export const CreateLevel: { [x: string]: any } = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    duration: yup.string().nullable().required("Duration is a required field"),
    subLevel: yup.array().of(yup.object().shape(field)),
  }),
});
