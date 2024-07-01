import React, { Fragment, useEffect } from "react";
import { FormWrapper, Wrapper } from "../../style";
import { Button, ErrorLabel, PlusSvg, UploadImage, XIconSvg } from "components";
import { useFieldArray } from "react-hook-form";
import { bgColors } from "styles/theme";
import { IFile, TBranch } from "types";

interface IProps {
  control: any;
  setValue: any;
  errors: any;
  data?: TBranch;
}
const ExtraMedia = ({ control, setValue, errors, data }: IProps) => {
  const images = data?.branchFiles;
  const { fields, append, remove, update } = useFieldArray({
    name: "branchFiles",
    control,
  });

  useEffect(() => {
    images?.map((e, index) => {
      update(index, e.fileStorageItem?.id);
      setValue(`branchFiles.${index}`, e?.fileStorageItem?.id);
    });
  }, [images]);

  return (
    <Fragment>
      <FormWrapper style={{ display: "grid", gridTemplateColumns: "1fr 1fr" }}>
        <Wrapper>
          <UploadImage
            label="Cover media"
            name="cover_file_id"
            control={control}
            setValue={setValue}
            image={data?.coverFile?.full_url}
          />
        </Wrapper>
        {fields.map((fields, index) => {
          const a = images?.[index]?.fileStorageItem?.full_url;

          return (
            <Wrapper>
              <UploadImage
                label="Extra media"
                name={`branchFiles.${index}`}
                control={control}
                setValue={setValue}
                image={a}
              />
              {index !== 0 && (
                <div
                  onClick={(e) => {
                    e.stopPropagation();
                    remove(index);
                  }}
                  className="remove"
                >
                  <XIconSvg color={bgColors.white} width={16} height={16} />
                </div>
              )}
            </Wrapper>
          );
        })}
        <ErrorLabel
          error={errors?.branchFiles?.message || errors?.cover_file_id?.message}
        />
      </FormWrapper>
      <FormWrapper>
        <Button onClick={() => append({})} icon={<PlusSvg />}>
          Add
        </Button>
      </FormWrapper>
    </Fragment>
  );
};

export default ExtraMedia;
