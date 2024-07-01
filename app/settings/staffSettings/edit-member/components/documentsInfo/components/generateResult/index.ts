import { Type } from "./type";

export const generateResult = ({ values }: { values: Type }) => {
  let other_file_ids: any = [];

  if (values?.other?.length) {
    for (let i = 0; i < values?.other?.length; i++) {
      const current = values?.other?.[i];
      if (typeof current?.file == "object") {
        if (!!current?.file?.fileStorageItem?.id)
          other_file_ids = [
            ...other_file_ids,
            current?.file?.fileStorageItem?.id,
          ];
      } else {
        if (!!current?.file)
          other_file_ids = [...other_file_ids, current?.file];
      }
    }
  }

  let job_application_file_id =
    typeof values?.job_application_file_id === "number"
      ? values?.job_application_file_id
      : values?.job_application_file_id?.fileStorageItem?.id;

  let job_order_file_id =
    typeof values?.job_order_file_id === "number"
      ? values?.job_order_file_id
      : values?.job_order_file_id?.fileStorageItem?.id;

  let labor_contract_file_id =
    typeof values?.labor_contract_file_id === "number"
      ? values?.labor_contract_file_id
      : values?.labor_contract_file_id?.fileStorageItem?.id;

  let self_employment_file_id =
    typeof values?.self_employment_file_id === "number"
      ? values?.self_employment_file_id
      : values?.self_employment_file_id?.fileStorageItem?.id;

  let passport_back_file_id =
    typeof values?.passport_back_file_id === "number"
      ? values?.passport_back_file_id
      : values?.passport_back_file_id?.fileStorageItem?.id;

  let passport_front_file_id =
    typeof values?.passport_front_file_id === "number"
      ? values?.passport_front_file_id
      : values?.passport_front_file_id?.fileStorageItem?.id;

  let ielts_file_id =
    typeof values?.ielts_file_id === "number"
      ? values?.ielts_file_id
      : values?.ielts_file_id?.fileStorageItem?.id;

  return {
    job_application_file_id,
    job_order_file_id,
    labor_contract_file_id,
    self_employment_file_id,
    passport_front_file_id,
    passport_back_file_id,
    ielts_file_id,
    ielts_score: values?.ielts_score,
    other_file_ids,
  };
};
