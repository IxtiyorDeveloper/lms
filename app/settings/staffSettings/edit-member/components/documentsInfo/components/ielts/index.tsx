import React from "react";
import { Wrapper } from "./style";
import { IELTS, ScoreWrapper, Title } from "./style";
import { MySelect, UploadImage } from "components";
import { ieltsOptions } from "../../../../../components/registering/candidateCreate/defaultValue";
import { IStaffViewPageInfoData } from "types/staffSettings";
import { Control, FieldValues, UseFormWatch } from "react-hook-form";

const IeltsFiles = ({
  dataGetOne,
  control,
  setValue,
  watch,
  acceptType,
}: {
  dataGetOne: IStaffViewPageInfoData | undefined;
  control: Control<FieldValues, any>;
  setValue: any;
  watch: UseFormWatch<FieldValues>;
  acceptType: {
    "image/*": never[];
    "application/pdf": string[];
    "application/vnd.ms-excel": string[];
    "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": string[];
    "audio/*": never[];
    "video/*": never[];
    "application/msword": string[];
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document": string[];
  };
}) => {
  return (
    <Wrapper>
      <IELTS>
        <Title>IELTS</Title>
        <ScoreWrapper>
          <div>
            <MySelect
              name="ielts_score"
              control={control}
              placeholder="Score"
              label="Degree"
              defaultValue={dataGetOne?.staff?.ielts_score?.toString()}
              style={{ marginBottom: "10px" }}
              options={ieltsOptions}
            />
            <UploadImage
              accept={acceptType}
              name="ielts_file_id"
              control={control}
              watch={watch()?.ielts_file_id?.fileStorageItem}
              image={watch()?.ielts_file_id?.fileStorageItem?.full_url}
              filename={watch()?.ielts_file_id?.fileStorageItem?.name}
              setValue={setValue}
              text="Max size 100mb"
              label="IELTS Certificate"
              iconPr={{ size: 50 }}
            />
          </div>
        </ScoreWrapper>
      </IELTS>
    </Wrapper>
  );
};

export default IeltsFiles;
