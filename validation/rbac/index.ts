import * as yup from "yup";

export const CreateDepSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
});

export const CreateReceptionSchema = yup.object().shape({
  general: yup.object().shape({
    firstname: yup.string().required("Name is a required field"),
    lastname: yup.string().required("Last Name is a required field"),
    username: yup.string().required("Username is a required field"),
    phone_number: yup.string().required("Phone number is a required field"),
    password: yup.string().required("Password is a required field"),
    branch_id: yup.string().required("Branches is a required field"),
    type: yup.string().required("Type is a required field"),
    avatar: yup.array().required("Avatar is a required field"),
  }),
});

export const UpdateReceptionSchema = yup.object().shape({
  general: yup.object().shape({
    firstname: yup.string().optional(),
    lastname: yup.string().optional(),
    username: yup.string().optional(),
    phone_number: yup.string().nullable().optional(),
    password: yup.string().nullable().optional(),
    branch_id: yup.array().of(yup.string()).optional(),
    type: yup.string().optional(),
    avatar: yup.string().optional(),
  }),
});

export const CreateRoleSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  degree: yup.number().required("Last Name is a required field"),
});
