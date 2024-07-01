import React from "react";
import { Wrapper } from "./style";
import { CreateStaffJobType } from "constants/settings";
import { Files } from "../../style";
import { Button, UploadImage } from "components";
import { bgColors } from "styles/theme";
import { ISelfEmployment } from "./type";
import { ButtonWrapper, Flex, ItemWrapper } from "../nonOfficialFiles/style";
import { DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { PlusSvg } from "components";
import { useFieldArray } from "react-hook-form";

const SelfEmploymentFiles = ({
  dataGetOne,
  control,
  setValue,
  watch,
  acceptType,
}: ISelfEmployment) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "other",
  });
  return (
    <Wrapper>
      {dataGetOne?.staff?.job_type === CreateStaffJobType.selfEmployment && (
        <Files>
          <UploadImage
            accept={acceptType}
            name="labor_contract_file_id"
            watch={watch()?.labor_contract_file_id?.fileStorageItem}
            image={watch()?.labor_contract_file_id?.fileStorageItem?.full_url}
            filename={watch()?.labor_contract_file_id?.fileStorageItem?.name}
            control={control}
            setValue={setValue}
            text="Max size 100mb"
            label="Labor Contract"
            iconPr={{ size: 50, color: bgColors.pop }}
          />
          <UploadImage
            accept={acceptType}
            name="self_employment_file_id"
            watch={watch()?.self_employment_file_id?.fileStorageItem}
            image={watch()?.self_employment_file_id?.fileStorageItem?.full_url}
            filename={watch()?.self_employment_file_id?.fileStorageItem?.name}
            control={control}
            setValue={setValue}
            text="Max size 100mb"
            label="Self Employment"
            iconPr={{ size: 50, color: bgColors.pop }}
          />
          {fields?.map((item, index) => {
            return (
              <ItemWrapper key={item?.id}>
                <UploadImage
                  accept={acceptType}
                  // image={a}
                  name={`other[${index}].file`}
                  control={control}
                  // clearError={clearErrors}
                  frontDelete
                  setValue={setValue}
                  label={`${index + 1} - Other file`}
                  watch={watch()?.other[index]?.file?.fileStorageItem}
                  image={watch()?.other[index]?.file?.fileStorageItem?.full_url}
                  filename={watch()?.other[index]?.file?.fileStorageItem?.name}
                  text="Max size 100mb"
                />
                {index !== 0 && (
                  <Flex
                    onClick={() => remove(index)}
                    style={{ justifyContent: "flex-end", marginTop: "5px" }}
                  >
                    <DeleteSvg />
                  </Flex>
                )}
              </ItemWrapper>
            );
          })}
          <ButtonWrapper>
            <Button
              onClick={() =>
                append({
                  file: undefined,
                })
              }
            >
              <PlusSvg />
            </Button>
          </ButtonWrapper>
        </Files>
      )}
    </Wrapper>
  );
};

export default SelfEmploymentFiles;
