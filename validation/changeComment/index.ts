import * as yup from "yup";
const mapValues = require("lodash/mapValues");

export const ChangeCommentValidation: { [x: string]: any } = yup.lazy((obj) =>
  yup.object(
    mapValues(obj, (value: any, key: string) => {
      if (key.includes("note_")) {
        return yup.string().min(3).required();
      }
    })
  )
);

export const AddReason = yup.object().shape({
  comment: yup.string().required(),
});
