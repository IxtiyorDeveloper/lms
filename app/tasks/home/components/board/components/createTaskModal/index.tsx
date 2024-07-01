import React, { useEffect, useState } from "react";
import {
  AntdModal,
  AntdSwitch,
  Button,
  DatePicker,
  Input,
  MySelect,
} from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { SelectCategory } from "..";
import { useFieldArray, useForm } from "react-hook-form";
import {
  useCheckCanAssignMySelf,
  useCheckCanAssignResponsible,
  useCreateTask,
  usePageDataMemo,
  useResponsibleByFilter,
  useSingleTask,
  useUpdateTask,
} from "hooks";
import { AttachTitle, ButtonWrapper, FileWrapper, ItemForm } from "./style";
import { toast } from "react-toastify";
import { validationErrorHandler } from "utils";
import { useQueryClient } from "@tanstack/react-query";
import UploadFile from "./components/uploadFile";
import { defVals } from "./defaultValues";
import { Enum } from "globals/components/sourceModal";
import { Spin, Row, Col } from "antd";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";

const CreateTaskModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const options = usePageDataMemo();
  const [activeItem, setActiveItem] = useState<number | null>(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
    watch,
  }: any = useForm({
    defaultValues: defVals,
  });

  const { data: responsibleData, isLoading: isResponsibleDataLoading } =
    useResponsibleByFilter({
      query_params: {
        category_id: activeItem,
      },
    });

  const { data: canEdit } = useCheckCanAssignResponsible({
    query_params: {
      category_id: activeItem,
    },
  });

  const { data: canAssignMyself } = useCheckCanAssignMySelf({
    query_params: {
      category_id: activeItem,
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
    createTask: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const type = data?.type;
  const id = data?.id;
  const action = data?.action;
  const isViewOnly = data?.isViewOnly || false;

  const { data: task, isLoading } = useSingleTask({
    id,
  });

  const handleClose = () => {
    reset(defVals);
    setValue("root.data.branch_id", null);
    setValue("root.data.description", null);
    setActiveItem(null);
    dispatch(
      toggleModal({
        key: "createTask",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const createTask = useCreateTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opened_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["done_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["checked_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["rejected_tasks"] });
      handleClose();
      toast.success("Task Created!");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  const updateTask = useUpdateTask({
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["opened_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["done_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["checked_tasks"] });
      queryClient.invalidateQueries({ queryKey: ["rejected_tasks"] });
      handleClose();
      toast.success("Task Updated!");
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    if (type === Enum.update && task) {
      setActiveItem(task?.category?.id);
      setValue(
        "responsible_id",
        task.responsible.map((item) => item.id?.toString())
      );
      setValue("branch_id", task.branch_object.id + "");
      setValue("description", task.description);
      setValue("deadline", task.deadline);
      setValue(
        "root.files",
        task.taskFiles.map((file) => {
          return {
            file: file,
          };
        })
      );
      appendFile(1);
    }

    if (type === Enum.create) {
      setValue("root.files", []);
      appendFile(1);
    }
  }, [open, task, type]);

  const onSubmit = (result: any) => {
    const files = result.root.files?.map((file: any) => {
      if (file?.file) return file.file;
    });

    const readyData = {
      files: files.filter((f: any) => !!f),
      myself: !!result?.myself,
      category_id: activeItem,
      deadline: result.deadline,
      branch_id: +result.branch_id,
      description: result.description,
      responsible_ids: result?.responsible_id,
    };
    if (type === Enum.update)
      updateTask.mutate({
        query_params: {
          id: id,
        },
        body: readyData,
      });

    if (type === Enum.create) createTask.mutate({ body: readyData });
  };

  return (
    <AntdModal width={752} open={open} onCancel={handleClose}>
      <Spin
        spinning={
          type === Enum.update ? isLoading || isResponsibleDataLoading : false
        }
      >
        <h3>{type === Enum.create ? "Create Task" : "Update task"}</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <SelectCategory
            activeItem={activeItem}
            setActiveItem={setActiveItem}
          />
          <AttachTitle>Add attachment</AttachTitle>
          <FileWrapper>
            {fileFields?.map((field, index) => {
              return (
                <div key={field.id}>
                  <UploadFile
                    field={field}
                    control={control}
                    index={index}
                    isViewOnly={isViewOnly}
                    errors={errors}
                    setValue={setValue}
                    watch={watch}
                    action={action}
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
          </FileWrapper>
          <ItemForm>
            <Row gutter={16}>
              <Col span={canEdit ? 12 : 24}>
                <MySelect
                  label="Branch"
                  name="branch_id"
                  control={control}
                  options={options.branch}
                  placeholder="Select Branch"
                />
              </Col>
              {canEdit && (
                <Col span={12}>
                  <DatePicker
                    label="Set a deadline"
                    name="deadline"
                    control={control}
                    showTime
                    format={DATE_FORMAT_YYYY_MM_DD_HH_mm}
                    valueFormat={DATE_FORMAT_YYYY_MM_DD_HH_mm}
                  />
                </Col>
              )}
            </Row>
          </ItemForm>
          {canEdit && (
            <ItemForm>
              <MySelect
                mode="multiple"
                label="Responsible"
                name="responsible_id"
                control={control}
                options={responsibleData?.map((res: any) => {
                  return { value: res.id?.toString(), label: res.name };
                })}
                placeholder="Select"
              />
            </ItemForm>
          )}
          <ItemForm>
            <Input
              label="Description"
              type="textarea"
              rows={5}
              name="description"
              control={control}
              placeholder="Enter Text"
            />
          </ItemForm>
          {canAssignMyself && (
            <ItemForm>
              <AntdSwitch label="Myself" name="myself" control={control} />
            </ItemForm>
          )}
          <ButtonWrapper>
            <Button className="cancel" onClick={handleClose}>
              Cancel
            </Button>
            <Button
              buttonLoading={createTask.isLoading || updateTask.isLoading}
              type="submit"
              className="save"
            >
              Save
            </Button>
          </ButtonWrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateTaskModal;
