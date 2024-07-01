import { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneInput, Wrapper } from "./style";
import { CircleXSvg, ErrorLabel, FilesSvg, UploadSvg } from "components";
import { Controller, useFieldArray } from "react-hook-form";
import { TUploadImage } from "./type";
import { useAnyUploadImage } from "hooks/useFile";
import { Flex, Spin } from "antd";
import { validationErrorHandler } from "utils";
import { bgColors } from "styles/theme";
import { EFileDirection } from "../../../types/uploadFile";

function MultipleFileUpload({
  control,
  name,
  disabled,
  error,
  setValue,
  height = "198px",
  label,
  required,
  text,
  deleteProjectFile,
  fileDirection,
  placeholder,
  watch,
}: TUploadImage & { fileDirection?: EFileDirection }) {
  const { remove } = useFieldArray({
    control,
    name,
  });

  const onDrop = useCallback(async (acceptedFiles: any) => {
    try {
      const formData = new FormData();
      acceptedFiles.map((r: any) => {
        formData.append("file", r);
      });
      if (fileDirection) formData.append("url", fileDirection);

      fileUpload.mutate(formData);
    } catch (e: any) {}
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    multiple: true,
  });

  const fileUpload = useAnyUploadImage({
    onSuccess: (data: any) => {
      setValue(name, [
        ...(watch(name) ?? []),
        {
          url: data?.url,
          name: data.name,
          file_storage_item_id: data.id,
        },
      ]);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const data = watch(name) as any[];

  return (
    <Wrapper>
      {label && <label htmlFor={name}>{label}</label>}
      <Flex gap={10} align="center" wrap="wrap">
        <DropzoneInput {...getRootProps()} style={{ height: height }}>
          <input {...getInputProps()} disabled={disabled} />
          {placeholder || <UploadSvg />}
          <p className="desc">{text || "Upload your file(s)"}</p>
        </DropzoneInput>

        {data?.map((item: any, index) => (
          <Controller
            key={index}
            control={control}
            name={`${name}[${index}].file_storage_item_id`}
            render={({ field }) => (
              <Spin spinning={fileUpload.isLoading}>
                <div className="file-upload">
                  {isDragActive ? (
                    <p className="desc">Drop the files here ...</p>
                  ) : (
                    <div className="current">
                      <div
                        className="delete"
                        onClick={() => {
                          remove(index);
                        }}>
                        <CircleXSvg
                          width={12}
                          height={12}
                          color={bgColors.pop}
                        />
                      </div>
                      <div className="content">
                        <FilesSvg width={24} height={24} />
                        <p>{item?.name}</p>
                      </div>
                    </div>
                  )}
                </div>
              </Spin>
            )}
          />
        ))}
        {error && <ErrorLabel error={error} />}
      </Flex>
    </Wrapper>
  );
}

export default MultipleFileUpload;
