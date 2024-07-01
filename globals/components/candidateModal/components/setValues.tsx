import { MainPhone } from "constants/phoneTypes";
import { ICandidate } from "types";

export const setValues = ({
  candidate,
  setValue,
}: {
  candidate: ICandidate;
  setValue: any;
}) => {
  setValue("root", {
    first_name: candidate?.first_name,
    last_name: candidate?.last_name,
    gender: candidate?.gender,
    dob: candidate?.dob,
    description: candidate?.description,
    source_id: candidate?.source_id,
    vacancy_id: candidate?.vacancy?.id?.toString(),
    bonus_for: candidate?.bonus_for,
    bonus_for_id: candidate?.bonus_for_id,
    bonus_for_type: candidate?.bonus_for_type,
    avatar_file_id: candidate?.candidateAvatar?.file_storage_item_id,
    documents: candidate?.candidateDocuments?.map((item) => ({
      url: item?.url,
      name: item?.name,
      file_storage_item_id: item.file_storage_item_id,
    })),
    phone_numbers: candidate?.candidatePhoneNumbers?.length
      ? candidate?.candidatePhoneNumbers?.map((item) => ({
          type: item.type,
          phone_number: `+${item.phone_number}`,
        }))
      : [{ type: `${MainPhone}`, phone_number: undefined }],
  });
};
