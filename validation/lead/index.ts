import * as yup from "yup";

export const CreateTabSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  color: yup.string().required("Color is a required field"),
  order: yup.string().required("Order is a required field"),
});
export const CreateLeadTabSchema = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  color: yup.string().required("Color is a required field"),
});
export const CreateTakeModal = yup.object().shape({
  state: yup.string().required("State is a required field"),
});

export const PhoneSchema = {
  phone: yup.string().required("Phone is a required field"),
  type: yup.string().required("Type is a required field"),
  is_confirmed: yup.boolean().nullable(),
  confirmation_id: yup.number().nullable(),
};

export const CreateLeadSchema: { [x: string]: any } = yup.object().shape({
  name: yup.string().required("Name is a required field"),
  // lastname: yup.string().required("Lastname is a required field"),
  source_id: yup.string().required("Type is a required field"),
  comment: yup.string().optional(),
  phones: yup
    .array()
    .of(yup.object().shape(PhoneSchema))
    .required("Must have fields")
    .min(1, "Minimum of 1 field"),
});

export const TransferLeadSchema: { [x: string]: any } = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    source: yup.string().nullable().required("Source is a required field"),
    comment: yup.string().nullable(),
    tab_id: yup.string().nullable(),
    phones: yup
      .array()
      .of(yup.object().shape(PhoneSchema))
      .required("Must have fields")
      .min(1, "Minimum of 1 field"),
  }),
});
