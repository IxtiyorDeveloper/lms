import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneCustom, Label } from "./style";
import { DownloadSvg, ErrorLabel, FilesSvg, UploadSvg, XIconSvg } from "components";
import { Controller } from "react-hook-form";
import { TUploadImage } from "./type";
import { useAnyUploadImage } from "hooks/useFile";
import { Spin } from "antd";
import { bgColors } from "styles/theme";
import { validationErrorHandler } from "utils";
import { EFileDirection } from "../../../types/uploadFile";
import { handleDownload } from "utils/handleDownload";

function UploadFile({
  control,
  name,
  disabled,
  error,
  setValue,
  height = "198px",
  file,
  label,
  required,
  placeholder,
  text,
  fileDirection,
  multiple = false,
  maxFiles = 1,
  onSuccess,
  className,
}: TUploadImage & { fileDirection?: EFileDirection }) {
  const [url, setUrl] = useState(file?.full_url);
  const [filename, setFilename] = useState(file?.name);

  const fileUpload = useAnyUploadImage({
    onSuccess: (data: any) => {
      if (onSuccess) {
        onSuccess(data);
      } else {
        setValue(name, data.id);
      }
      setUrl(data.url);
      setFilename(data.name);
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
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
    multiple,
    maxFiles,
  });
  useEffect(() => {
    if (!!file) {
      setUrl(file?.full_url);
      setFilename(file?.name);
    }
  }, [file]);

  return (
    <React.Fragment>
      <Controller
        control={control}
        render={({ field }) => {
          const newUrl = url || (field.value?.length > 0 ? field.value : null);
          return (
            <Spin spinning={fileUpload.isLoading}>
              <div {...getRootProps({})}>
                {label && (
                  <Label required={required!} htmlFor={name}>
                    {label}
                  </Label>
                )}
                <input {...getInputProps()} disabled={disabled} />
                <DropzoneCustom
                  onChange={field.onChange}
                  style={{ height: height }}
                  newUrl={newUrl}
                  className={className}>
                  {!newUrl && (placeholder || <UploadSvg />)}
                  {isDragActive ? (
                    <p className="desc">Drop the files here ...</p>
                  ) : newUrl ? (
                    <div className="current">
                      <div
                        className="abs"
                        onClick={(event) => {
                          event.stopPropagation();
                          field.onChange("");
                          setUrl("");
                        }}>
                        <XIconSvg
                          width={30}
                          height={30}
                          color={bgColors.white}
                        />
                      </div>
                      <div
                        className="download"
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDownload(url);
                        }}>
                        <DownloadSvg
                          width={30}
                          height={30}
                          color={bgColors.white}
                        />
                      </div>
                      <div className="content">
                        <FilesSvg width={32} height={32} />
                        <p>{filename}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="desc">{text || "Upload your file(s)"}</p>
                  )}
                </DropzoneCustom>
              </div>
            </Spin>
          );
        }}
        name={name}
      />
      {error && <ErrorLabel error={error} />}
    </React.Fragment>
  );
}

export default UploadFile;
