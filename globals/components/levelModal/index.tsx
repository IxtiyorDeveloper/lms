import * as React from "react";
import {
  Buttons,
  Content,
  DynamicFields,
  FieldWrapper,
  Plus,
  Row,
  Top,
} from "./style";
import {
  AntdModal,
  Button,
  DeleteSvg,
  GripSvg,
  Input,
  InputNumber,
  PlusSvg,
} from "components";
import { bgColors } from "styles/theme";
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd";
import { useFieldArray, useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useEffect } from "react";
import { useCreateLevel, useLevel, useUpdateLevel } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { yupResolver } from "@hookform/resolvers/yup";
import { CreateLevel } from "validation/level";
import { Spin } from "antd";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

export enum Enum {
  create = "create",
  update = "update",
}

const StyledModal = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const {
    levelModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const levelId = data?.levelId;
  const {
    data: level,
    isPreviousData,
    isInitialLoading: isLoading,
  } = useLevel({
    query_params: {
      id: levelId,
      expand: "children",
    },
  });
  const type = data?.type;

  const createLevel = useCreateLevel({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({
        general: {
          subLevel: [],
        },
      });
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const updateLevel = useUpdateLevel({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_course_view]);
      toast.success("Success");
      handleClose();
      reset({
        general: {
          subLevel: [],
        },
      });
    },
    onError: (err: any) => {
      validationErrorHandler({ err });
    },
  });
  const handleClose = () => {
    reset({
      general: {
        subLevel: undefined,
      },
    });

    dispatch(
      toggleModal({
        key: "levelModal",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const {
    control,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  }: any = useForm({
    defaultValues: {
      general: {
        subLevel: [],
      },
    },
    resolver: yupResolver(CreateLevel as any),
  });
  const { fields, append, remove, move, update } = useFieldArray({
    control,
    name: "general.subLevel",
  });
  const handleDrag = ({ source, destination }: any) => {
    if (destination) {
      move(source.index, destination.index);
    }
  };

  const onSubmit = (data: { general: any }) => {
    const { general } = data;
    const duration = +general?.duration * 30 * 86400;
    const subs = general?.subLevel?.map(
      (item: { id: string; name: string; duration: string }) => ({
        id: item.id,
        name: item?.name,
        duration: +item.duration * 30 * 86400,
      })
    );
    if (type === Enum?.create) {
      createLevel.mutate({
        query_params: {
          course_id: router?.query?.update_id,
        },
        body: {
          name: general?.name,
          duration,
          subs,
        },
      });
    }
    if (type === Enum?.update) {
      updateLevel.mutate({
        query_params: {
          id: levelId,
        },
        body: {
          name: general?.name,
          duration,
          subs,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update) {
      setValue("general", {
        name: level?.name,
        duration: level?.duration,
        subLevel: level?.children,
      });
      level?.children.map((e, index) => {
        update(index, {
          name: e?.name,
          duration: e?.duration,
          id: e?.id,
        });
      });
    }
    if (type === Enum.create) {
      for (let i = 0; i < 1000; i++) {
        fields.map((e) => {
          remove(i);
        });
      }
    }
  }, [open, level]);

  useEffect(() => {
    const subscription = watch(
      (value: { general: { subLevel: any[] } }, { name, type }: any) => {
        let acc = 0;
        if (value?.general?.subLevel?.length) {
          acc = value?.general?.subLevel.reduce((acc, cur) => {
            return acc + (cur?.duration || 0);
          }, 0);
        }
        const indexMatch = name?.match(/general\.subLevel\[(\d+)\]\.duration/);
        if (indexMatch) {
          const index = parseInt(indexMatch?.[1]);
          const subLevelName = watch(`general.subLevel[${index}].name`);
          setValue("general.duration", acc);
        }
      }
    );
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={520}
      title="Create Levels"
    >
      <Spin spinning={isLoading || isPreviousData}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <Top>
              <Input
                label="Name"
                name="general.name"
                control={control}
                placeholder="John"
                error={errors?.general?.name?.message}
              />
              <InputNumber
                label="Duration"
                name="general.duration"
                control={control}
                placeholder="John"
                disabled={watch("general.subLevel")?.length}
                error={errors?.general?.duration?.message}
              />
            </Top>
            <Plus
              onClick={() =>
                append({ name: undefined, duration: undefined, id: null })
              }
            >
              <PlusSvg color={bgColors.dark} width={16} height={16} />
            </Plus>
            <DynamicFields>
              <DragDropContext onDragEnd={handleDrag}>
                <Droppable droppableId="subLevel-items">
                  {(provided, snapshot) => (
                    <div {...provided.droppableProps} ref={provided.innerRef}>
                      {fields.map((item, index) => {
                        return (
                          <Draggable
                            key={`subLevel[${index}]`}
                            draggableId={`subLevel${index}`}
                            index={index}
                          >
                            {(provided) => (
                              <div
                                key={item.id}
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                              >
                                <FieldWrapper {...provided.dragHandleProps}>
                                  <div className="grip">
                                    <GripSvg />
                                  </div>
                                  <Row>
                                    <div className="num">{index + 1}</div>
                                    <div className="icon">
                                      <DeleteSvg
                                        onClick={() => {
                                          remove(index);
                                          if (
                                            watch()?.general?.subLevel
                                              ?.length === 0
                                          ) {
                                            setValue(
                                              "general.duration",
                                              undefined
                                            );
                                          }
                                        }}
                                      />
                                    </div>
                                  </Row>
                                  <Row>
                                    <Input
                                      label="Name"
                                      control={control}
                                      placeholder="John"
                                      name={`general.subLevel[${index}].name`}
                                      error={
                                        errors?.general?.subLevel?.[index]?.name
                                          ?.message
                                      }
                                    />
                                    <InputNumber
                                      label="Duration"
                                      name={`general.subLevel[${index}].duration`}
                                      control={control}
                                      placeholder="John"
                                      error={
                                        errors?.general?.subLevel?.[index]
                                          ?.duration?.message
                                      }
                                    />
                                  </Row>
                                </FieldWrapper>
                              </div>
                            )}
                          </Draggable>
                        );
                      })}

                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </DragDropContext>
            </DynamicFields>
          </Content>
          <Buttons>
            <Button
              className="cancel"
              onClick={handleClose}
              style={{
                backgroundColor: bgColors.wildSand,
              }}
            >
              Cancel
            </Button>
            <Button
              className="save"
              type="submit"
              buttonLoading={updateLevel.isLoading || createLevel.isLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};
export default StyledModal;
