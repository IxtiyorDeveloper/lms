import React from "react";
import { Wrapper, Flex, ItemWrapper, ButtonWrapper } from "./style";
import { CreateStaffJobType } from "constants/settings";
import { Files } from "../../style";
import { Button, UploadImage, PlusSvg } from "components";
import { bgColors } from "styles/theme";
import { INonOfficial } from "./type";
import { DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { useFieldArray } from "react-hook-form";

const NonOfficialFiles = ({
  dataGetOne,
  control,
  setValue,
  watch,
  acceptType,
}: INonOfficial) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "other",
  });
  return (
    <Wrapper>
      {dataGetOne?.staff?.job_type === CreateStaffJobType.nonOfficial && (
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

export default NonOfficialFiles;
