import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneCustom } from "./style";
import { ErrorLabel, ImageUploadSvg } from "components";
import { Controller } from "react-hook-form";
import file from "api/file";
import { TUploadImage } from "components/common/uploadImage/type";

function UploadImage({ control, name, disabled, error }: TUploadImage) {
  const onDrop = useCallback(async (acceptedFiles: any) => {
    try {
      const formData = new FormData();
      formData.append("file", acceptedFiles[0]);
      await file.uploadImage(formData);
    } catch (e: any) {}
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    onDrop,
    accept: { "image/*": [] },
    multiple: false,
    maxFiles: 1,
  });

  return (
    <React.Fragment>
      <Controller
        control={control}
        render={({ field }) => {
          return (
            <div {...getRootProps({})}>
              <input {...getInputProps()} />
              <DropzoneCustom onChange={field.onChange}>
                <ImageUploadSvg />
                <p className="desc">Upload image</p>
              </DropzoneCustom>
            </div>
          );
        }}
        name={name}
      />
      {error && <ErrorLabel error={error} />}
    </React.Fragment>
  );
}

export default UploadImage;
