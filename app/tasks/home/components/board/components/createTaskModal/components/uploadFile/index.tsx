import React, { FC } from "react";
import { UploadImage } from "components";
import { MinusWrapper, PlaceholderWrapper } from "./style";
import { CirclePlusSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { acceptFileType } from "./conf";
import { EDeleteProjectFile, EFileDirection } from "types/uploadFile";

interface IProps {
  field: any;
  isViewOnly?: boolean;
  control: any;
  index: number;
  errors: any;
  setValue: () => void;
  watch: any;
  action: "create" | "update";
  removeFile: (index: number) => void;
  fileFields: any;
}

const UploadFile: FC<IProps> = ({
  field,
  isViewOnly = false,
  control,
  index,
  errors,
  setValue,
  watch,
  action,
  removeFile,
  fileFields,
}) => {
  return (
    <div className="row" onClick={(e) => e.stopPropagation()} key={field.id}>
      <UploadImage
        isViewOnly={isViewOnly}
        deleteProjectFile={EDeleteProjectFile.task}
        fileDirection={EFileDirection.task}
        control={control}
        name={`root.files[${index}].file`}
        error={errors?.root?.file?.message}
        setValue={setValue}
        height="110px"
        isNecessaryAllFields
        text="Add"
        frontDelete={true}
        isVideoPreview={watch()?.root.files?.[index]?.file?.type?.startsWith(
          "video/"
        )}
        watch={`root.files[${index}].file`}
        image={
          watch()?.root.files?.[index]?.file?.full_url ||
          watch()?.root.files?.[index]?.file?.url
        }
        filename={watch()?.root.files?.[index]?.file?.name}
        action={action || "create"}
        canCheckFileType
        accept={acceptFileType}
        placeholder={
          <PlaceholderWrapper style={{ userSelect: "none" }} draggable={false}>
            {fileFields.length !== 1 && (
              <MinusWrapper
                onClick={(e) => {
                  e.stopPropagation();
                  removeFile(index);
                }}
              >
                -
              </MinusWrapper>
            )}
            <CirclePlusSvg
              className="plus"
              color={bgColors.primary}
              height={24}
              width={24}
            />
          </PlaceholderWrapper>
        }
      />
    </div>
  );
};

export default UploadFile;
