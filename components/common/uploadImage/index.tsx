import React, { useCallback, useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { DropzoneCustom, Label, FileWrapper, FileNamer } from "./style";
import {
  DownloadSvg,
  ErrorLabel,
  FilesSvg,
  UploadSvg,
  DeleteSvg,
  XIconSvg,
} from "components";
import {
  Controller,
  ControllerRenderProps,
  FieldValues,
} from "react-hook-form";
import { TUploadImage } from "./type";
import {
  useDeleteFile,
  useDeleteHRFile,
  useDeleteTaskFile,
  useUploadFile,
} from "hooks/useFile";
import { Spin, Image, Modal } from "antd";
import { bgColors } from "styles/theme";
import { handleDownload } from "utils/handleDownload";
import { validationErrorHandler } from "utils";
import { EDeleteProjectFile, EFileDirection } from "types/uploadFile";
import { IconWrapper, Text } from "../actionModal/style";
import { isImageFunc } from "utils/imageTest";

export enum Enum {
  create = "create",
  update = "update",
}

const checkFileType = async (image: string | null | undefined) => {
  try {
    if (image) {
      const response = await fetch(image as string, { method: "HEAD" });
      const contentType = response.headers.get("content-type");
      return contentType?.startsWith("image/");
    }
  } catch (error) {}
};

function UploadImage({
  control,
  name,
  disabled,
  error,
  setValue,
  height = "198px",
  image,
  label,
  required,
  placeholder,
  text,
  isNecessaryAllFields = false,
  watch,
  action,
  filename,
  isVideo = false,
  isVideoPreview = false,
  accept = { "image/*": [] },
  isViewOnly = false,
  canCheckFileType = false,
  deleteProjectFile,
  fileDirection,
  clearError,
  frontDelete = false,
  iconPr,
  onClear,
  isCircle,
}: TUploadImage & {
  fileDirection?: EFileDirection;
}) {
  const [modal, contextHolder] = Modal.useModal();
  const [isImage, setIsImage] = useState(true);
  const [file, setFile] = useState<any>(null);
  const [url, setUrl] = useState(image);

  const fileUpload = useUploadFile({
    onSuccess: (data: any) => {
      if (data?.hasOwnProperty("files")) {
        // setPath(data?.files?.[0]?.path);
        setValue(
          name,
          isNecessaryAllFields ? data?.files?.[0] : data?.files?.[0]?.id,
        );
        if (!!error && !!clearError) clearError(name);
        setUrl(data?.files?.[0]?.url);
      } else {
        // setPath(data?.path);
        setValue(name, isNecessaryAllFields ? data : data?.id);
        if (!!error && !!clearError) clearError(name);
        setUrl(data?.url);
      }
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const onDrop = useCallback(async (acceptedFiles: any) => {
    try {
      const formData = new FormData();
      setFile(acceptedFiles);
      acceptedFiles.map((eventFile: any) => {
        if (eventFile.type.startsWith("image/")) {
          setIsImage(true);
        } else {
          setIsImage(false);
        }
        formData.append("file", eventFile);
        if (fileDirection) formData.append("url", fileDirection);
      });
      fileUpload.mutate(formData);
    } catch (e: any) {}
  }, []);

  const { getRootProps, getInputProps, isDragActive, acceptedFiles } =
    useDropzone({
      onDrop,
      accept,
      multiple: false,
      maxFiles: 1,
    });
  const deleteFile = useDeleteFile({
    onSuccess: (data: any) => {
      setValue(name, "");
      if (!!error && !!clearError) clearError(name);
      setUrl("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const deleteHRFile = useDeleteHRFile({
    onSuccess: (data: any) => {
      setValue(name, "");
      if (!!error && !!clearError) clearError(name);
      setUrl("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const deleteTaskFile = useDeleteTaskFile({
    onSuccess: (data: any) => {
      setValue(name, "");
      if (!!error && !!clearError) clearError(name);
      setUrl("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const confirmDelete = () => {
    if (deleteProjectFile === EDeleteProjectFile.hr) {
      deleteHRFile.mutate({
        query_params: {
          path: url,
        },
      });
    } else if (deleteProjectFile === EDeleteProjectFile.task) {
      deleteTaskFile.mutate({
        query_params: {
          path: url,
        },
      });
    } else if (deleteProjectFile === EDeleteProjectFile.stock) {
      deleteFile.mutate({
        project: "stock",
        action: "admin_delete_file",
        query_params: {
          path: url,
        },
      });
    } else {
      deleteFile.mutate({
        query_params: {
          path: url,
        },
      });
    }
  };
  const handleRemove = (
    e: any,
    path: string,
    field: ControllerRenderProps<FieldValues, string>,
  ) => {
    e.stopPropagation();
    if (frontDelete) {
      field.onChange("");
      setUrl("");
    } else {
      modal.confirm({
        title: (
          <IconWrapper>
            <IconWrapper>
              <div className="svg">
                <DeleteSvg width={50} height={50} />
              </div>
              <div
                className="blur"
                style={{
                  backgroundColor: bgColors.pop,
                }}
              />
            </IconWrapper>
          </IconWrapper>
        ),
        icon: null,
        content: <Text>Are you sure to delete this file</Text>,
        okText: "Confirm",
        cancelText: "Cancel",
        onOk: confirmDelete,
      });
    }
  };

  useEffect(() => {
    if (action === Enum.create) {
      if (!watch) {
        setUrl(undefined);
      }
    }
  }, [watch, action]);

  useEffect(() => {
    setUrl(image);
    setFile(null);
    if (isVideoPreview) {
      setIsImage(false);
    } else {
      setIsImage(true);
    }

    if (action === "update" && canCheckFileType) {
      checkFileType(image).then((res) => {
        setIsImage(!!res);
      });
    }

    if (canCheckFileType) {
      checkFileType(image).then((res) => {
        setIsImage(!!res);
      });
    }
  }, [image, action]);

  return (
    <React.Fragment>
      {contextHolder}
      <Controller
        name={name}
        control={control}
        render={({ field }) => {
          const newUrl = url || (field.value?.length > 0 ? field.value : null);
          const pathname = url?.split?.("/").slice(3).join("/");
          return (
            <Spin spinning={fileUpload.isLoading}>
              <div {...(isViewOnly ? {} : getRootProps({}))}>
                {label && (
                  <Label required={required!} htmlFor={name}>
                    {label}
                  </Label>
                )}
                <input {...getInputProps()} disabled={disabled} />
                <DropzoneCustom
                  isCircle={isCircle}
                  onChange={field.onChange}
                  style={{ height: height }}
                  unselectable="on"
                  className="dropzone"
                >
                  {!newUrl &&
                    (placeholder || (
                      <UploadSvg
                        width={iconPr?.size || 24}
                        height={iconPr?.size || 24}
                        color={iconPr?.color}
                      />
                    ))}
                  {isDragActive ? (
                    <p className="desc">Drop the files here ...</p>
                  ) : newUrl ? (
                    <div className="current">
                      <div
                        className="abs"
                        onClick={(event) => {
                          event.stopPropagation();
                          if (!!onClear) {
                            onClear({
                              event,
                              path:
                                field.value?.path ?? field.value ?? pathname,
                              field,
                              setUrl,
                            });
                          } else {
                            handleRemove(
                              event,
                              field.value?.path ?? field.value ?? pathname,
                              field,
                            );
                          }
                        }}
                      >
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
                        }}
                      >
                        <DownloadSvg
                          width={20}
                          height={20}
                          color={bgColors.white}
                        />
                      </div>
                      {isImage ? (
                        <div
                          onClick={(e) => {
                            e.stopPropagation();
                          }}
                          className="img-wr-in-up"
                        >
                          {isImageFunc(url) ? (
                            <Image
                              src={
                                url ||
                                (field.value.length > 0 ? field.value : null)
                              }
                              style={{
                                objectFit: "cover",
                                objectPosition: "center",
                              }}
                              width="100%"
                              height="100%"
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                            />
                          ) : (
                            <div className="file-wr-in-up">
                              <FilesSvg
                                width={iconPr?.size || 24}
                                height={iconPr?.size || 24}
                                color={iconPr?.color}
                              />
                              <FileNamer>
                                12322gh 332543425fdbv g hcvbfd b {filename}
                              </FileNamer>
                            </div>
                          )}
                        </div>
                      ) : (
                        <FileWrapper>
                          {isVideoPreview && (
                            <video
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              width="100%"
                              height={height}
                              controls
                              src={
                                url ||
                                (field.value.length > 0 ? field.value : null)
                              }
                            ></video>
                          )}
                          {!isVideoPreview && (
                            <FilesSvg
                              width={iconPr?.size || 24}
                              height={iconPr?.size || 24}
                              color={iconPr?.color}
                            />
                          )}
                          <p>
                            {action === "update" && !file
                              ? filename
                              : file?.[0]?.path}
                          </p>
                        </FileWrapper>
                      )}
                    </div>
                  ) : (
                    <p className="desc">{text || "Upload image"}</p>
                  )}
                </DropzoneCustom>
              </div>
            </Spin>
          );
        }}
      />
      <ErrorLabel error={error} />
    </React.Fragment>
  );
}

export default UploadImage;
