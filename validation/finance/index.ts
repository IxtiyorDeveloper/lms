import * as yup from "yup";

export const CreateProductServiceSchema = yup.object().shape({
  general: yup.object().shape({
    name: yup.string().required("Name is a required field"),
    pricing_type: yup.string().required("Pricing Type is a required field"),
    view_level: yup.string().required("View Level is a required field"),
    type: yup.string().required("Product Type is a required field"),
    description: yup.string().optional(),
    sell_place: yup.string().optional(),
    price: yup.string().optional(),
  }),
});

export const FilterBlackList = yup.object().shape({
  day_id: yup.array().required("Days is a required field"),
  branch_id: yup.array().required("Branch is a required field"),
});
