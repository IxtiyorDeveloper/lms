import React from "react";
import { Flex, ItemWrapper, Wrapper, Container, ButtonWrapper } from "./style";
import { CreateStaffJobType } from "constants/settings";
import { Files } from "../../style";
import { Button, UploadImage, PlusSvg } from "components";
import { bgColors } from "styles/theme";
import { useFieldArray } from "react-hook-form";
import { DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { IOfficialType } from "./type";
import {
  FILES_TYPES,
  REQUIRED_DOCUMENTS,
  REQUIRED_DOCUMENTS_BY_STATUS,
  STAFF_FILE_TYPES,
} from "types/staffSettings";

const OfficialFiles = ({
  dataGetOne,
  control,
  setValue,
  watch,
  acceptType,
}: IOfficialType) => {
  const { fields, append, remove } = useFieldArray({
    control,
    name: "other",
  });

  const docsListAsAnObject: any = {};

  dataGetOne?.userDocuments?.map((obj) => {
    docsListAsAnObject[obj.type] = obj;
  });

  const args = (str: string) => {
    console.log(str);
    const label =
      STAFF_FILE_TYPES[
        FILES_TYPES[
          str as keyof typeof FILES_TYPES
        ] as keyof typeof STAFF_FILE_TYPES
      ];

    const labelEdited = label?.split(" ").join("_").toLocaleLowerCase();

    return {
      key: str,
      accept: acceptType,
      name: `${labelEdited}_file_id`,
      watch: watch()?.[`${labelEdited}_file_id`]?.fileStorageItem,
      image: watch()?.[`${labelEdited}_file_id`]?.fileStorageItem?.full_url,
      filename: watch()?.[`${labelEdited}_file_id`]?.fileStorageItem?.name,
      control: control,
      setValue: setValue,
      text: "Max size 100mb",
      label: label,
      iconPr: { size: 50, color: bgColors.pop },
    };
  };

  const isArchivedOfficial = dataGetOne?.staff_status === 400;

  return (
    <Wrapper>
      <p className="title">Active</p>
      {dataGetOne?.staff?.job_type && (
        <Container>
          {dataGetOne.staff_status === 200 ? (
            <Files>
              {REQUIRED_DOCUMENTS[
                dataGetOne?.staff?.job_type as keyof typeof REQUIRED_DOCUMENTS
              ].map((str) => {
                const arg = args(str);
                return <UploadImage {...arg} />;
              })}
              {fields?.map((item, index) => {
                return (
                  <ItemWrapper key={item?.id}>
                    <UploadImage
                      accept={acceptType}
                      name={`other[${index}].file`}
                      control={control}
                      frontDelete
                      setValue={setValue}
                      label={`${index + 1} - Other file`}
                      watch={watch()?.other[index]?.file?.fileStorageItem}
                      image={
                        watch()?.other[index]?.file?.fileStorageItem?.full_url
                      }
                      filename={
                        watch()?.other[index]?.file?.fileStorageItem?.name
                      }
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
          ) : isArchivedOfficial ? (
            <Files>
              {REQUIRED_DOCUMENTS[
                dataGetOne?.staff?.job_type as keyof typeof REQUIRED_DOCUMENTS
              ].map((str) => {
                const arg = args(str);
                return <UploadImage {...arg} />;
              })}
              {CreateStaffJobType.official === dataGetOne?.staff.job_type
                ? REQUIRED_DOCUMENTS_BY_STATUS.WORK_TYPE_NON_WORKING.map(
                    (str) => {
                      const arg = args(str);
                      return <UploadImage {...arg} />;
                    },
                  )
                : null}
            </Files>
          ) : null}
        </Container>
      )}
    </Wrapper>
  );
};

export default OfficialFiles;
