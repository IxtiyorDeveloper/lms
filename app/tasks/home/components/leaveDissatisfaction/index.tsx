import React from "react";
import { AntdModal, Button, Input } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useQueryClient } from "@tanstack/react-query";
import { useChangeStatus } from "hooks";
import { queryKeys } from "constants/queryKeys";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { ButtonsWrapper, FileWrap, LabelAttachment } from "./style";
import { useFieldArray, useForm } from "react-hook-form";
import UploadFile from "../board/components/createTaskModal/components/uploadFile";
import { TaskModalEnums } from "types/tasks/modalEnums";

const titles = {
  [TaskModalEnums.Dissatisfaction]: "Dissatisfied",
  [TaskModalEnums.Reject]: "Reject this task",
  [TaskModalEnums.DONE]: "Make this task done",
};

const LeaveDissatisfactionModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  }: any = useForm({
    defaultValues: {
      root: {
        description: undefined,
        files: [
          {
            file: undefined,
          },
        ],
      },
    },
  });

  const {
    fields: fileFields,
    append: appendFile,
    remove: removeFile,
  } = useFieldArray({
    control,
    name: "root.files",
  });

  const {
    leaveDissatisfaction: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "leaveDissatisfaction",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const changeStatus = useChangeStatus({
    onSuccess: () => {
      reset();
      queryClient.invalidateQueries([queryKeys.task_index]).then();
      queryClient.invalidateQueries({ queryKey: ["opened_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["done_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["checked_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["rejected_tasks"] });
      queryClient.invalidateQueries({ queryKey: [queryKeys.task_view] });
      handleClose();
      toast.success("Status changed!");
      if (!!data?.fromView) {
        dispatch(
          toggleModal({
            key: "taskView",
            data: {
              data: {},
              open: false,
            },
          }),
        );
      }
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const onSubmit = (res: any) => {
    const files = res.root.files?.map((file: any) => {
      if (file?.file) return file.file;
    });

    changeStatus.mutate({
      body: {
        task_id: data?.task_id,
        state: data?.state,
        description: res.description,
        files: files.filter((f: any) => !!f),
      },
    });
  };

  return (
    <AntdModal
      zIndex={999999999}
      open={open}
      width={420}
      onCancel={handleClose}
    >
      <h2 style={{ marginBottom: "20px" }}>
        {titles[data?.modalType as keyof typeof titles]}
      </h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          name="description"
          control={control}
          type="textarea"
          rows={5}
          placeholder="Type here..."
          label="Your comment"
        />
        <LabelAttachment>Add attachment</LabelAttachment>
        <FileWrap>
          {fileFields?.map((field, index) => {
            return (
              <div key={field.id}>
                <UploadFile
                  field={field}
                  control={control}
                  index={index}
                  action="create"
                  isViewOnly={false}
                  errors={errors}
                  setValue={setValue}
                  watch={watch}
                  // appendFile={appendFile}
                  removeFile={removeFile}
                  fileFields={fileFields}
                />
              </div>
            );
          })}
          <Button
            onClick={() =>
              appendFile({
                file: undefined,
              })
            }
          >
            Add file
          </Button>
        </FileWrap>
        <ButtonsWrapper>
          <Button onClick={handleClose} className="btn-cancel">
            Cancel
          </Button>
          <Button buttonLoading={changeStatus.isLoading} type="submit">
            Submit
          </Button>
        </ButtonsWrapper>
      </form>
    </AntdModal>
  );
};

export default LeaveDissatisfactionModal;
