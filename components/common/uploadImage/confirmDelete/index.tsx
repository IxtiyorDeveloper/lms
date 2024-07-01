import React from "react";
import { ActionModal } from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { ControllerRenderProps, FieldValues, useForm } from "react-hook-form";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { EDeleteProjectFile } from "types/uploadFile";
import {
  useDeleteFile,
  useDeleteHRFile,
  useDeleteTaskFile,
} from "hooks/useFile";
import { DeleteSvg } from "components";

const ConfirmFileDeleteModal = ({
  setValue,
  setUrl,
  name,
  deleteProjectFile,
}: {
  setValue: any;
  setUrl: any;
  name: any;
  deleteProjectFile: any;
}) => {
  const dispatch = useDispatch();

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const {
    confirmFileDelete: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const path = data?.path;
  const fields: ControllerRenderProps<FieldValues, string> = data?.fields;
  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "confirmFileDelete",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const deleteFile = useDeleteFile({
    onSuccess: (data: any) => {
      setValue(name, "");
      setUrl("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const deleteHRFile = useDeleteHRFile({
    onSuccess: (data: any) => {
      setValue(name, "");
      setUrl("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const deleteTaskFile = useDeleteTaskFile({
    onSuccess: (data: any) => {
      setValue(name, "");
      setUrl("");
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });
  const onDeleteSubmit = () => {
    if (deleteProjectFile === EDeleteProjectFile.hr) {
      deleteHRFile.mutate({
        query_params: {
          path,
        },
      });
    } else {
      if (deleteProjectFile === EDeleteProjectFile.task) {
        deleteTaskFile.mutate({
          query_params: {
            path,
          },
        });
      }
      deleteFile.mutate({
        query_params: {
          path,
        },
      });
    }
  };

  return (
    <ActionModal
      control={control}
      handleSubmit={handleSubmit}
      handleClose={() => handleClose()}
      open={open}
      onSubmit={onDeleteSubmit}
      iconBlur={bgColors.dark}
      buttonStyles={{ color: textColors.blueGray }}
      blurColor={bgColors.pop}
      label="Reason *"
      boxShadow="0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #F87C84"
      icon={<DeleteSvg width={50} height={50} />}
      buttonLoading={
        deleteFile?.isLoading ||
        deleteHRFile.isLoading ||
        deleteTaskFile.isLoading
      }
      text={
        <div>
          <p>Are you sure to delete this file ?</p>
        </div>
      }
      cancelButtonText="No"
      submitButtonText="Yes"
    />
  );
};

export default ConfirmFileDeleteModal;
