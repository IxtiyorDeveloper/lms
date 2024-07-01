import React, { FC } from "react";
import { FileWrapper, FlexWrapper, Wrapper } from "./style";
import { UploadImage } from "components";
import { bgColors } from "styles/theme";
import { IStaffViewPageInfoData, STAFF_FILE_TYPES } from "types/staffSettings";
import { Control, UseFormSetValue, UseFormWatch } from "react-hook-form";

interface IProps {
  dataGetOne?: IStaffViewPageInfoData;
  watch: UseFormWatch<any>;
  control: Control;
  setValue: UseFormSetValue<any>;
}

const acceptType = {
  "image/*": [],
  "application/pdf": [".pdf"],
  "application/vnd.ms-excel": [".xls"],
  "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
    ".xlsx",
  ],
  "audio/*": [],
  "video/*": [],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
};

const ArchivedFiles: FC<IProps> = (props) => {
  const { dataGetOne, control, setValue } = props;

  const archivedFiles = dataGetOne?.userDocuments?.filter(
    (doc) => doc.status === 200,
  );

  // @ts-ignore
  return archivedFiles?.length > 0 ? (
    <Wrapper>
      <p className="title">Archived</p>
      <FlexWrapper>
        {archivedFiles?.map((m) => {
          return (
            <FileWrapper>
              <UploadImage
                accept={acceptType}
                disabled
                frontDelete={false}
                name="labor_contract_file_id"
                watch={m?.fileStorageItem}
                image={m?.fileStorageItem?.full_url}
                filename={m?.fileStorageItem?.name}
                control={control}
                setValue={setValue}
                text="Max size 100mb"
                label={
                  STAFF_FILE_TYPES[m?.type as keyof typeof STAFF_FILE_TYPES]
                }
                iconPr={{ size: 50, color: bgColors.pop }}
              />
            </FileWrapper>
          );
        })}
      </FlexWrapper>
    </Wrapper>
  ) : null;
};

export default ArchivedFiles;
