import * as React from "react";
import {
  Wrapper,
  Buttons,
  Content,
  Title,
  Box,
  Flex,
  Repeat,
  BoxTitle,
} from "./style";
import {
  AntdModal,
  Button,
  Input,
  InputNumber,
  UploadFile,
  Switch,
  TabSelect,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  useCallTemplatePageData,
  useCreateTemplate,
  useTemplate,
  useUpdateTemplate,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { useEffect } from "react";
import { queryKeys } from "constants/queryKeys";
import { validationErrorHandler } from "utils";
import { TemplateSchema } from "validation/callSettings/template";
import {
  generateKeyOptions,
  reverseTransformKeys,
  transformKeys,
} from "utils/callTemplate/generateKeyOptions";
import { TParams } from "types";

export enum Enum {
  create = "create",
  update = "update",
}

export interface Interface {
  name: string;
  url: string;
  delay: number | string;
  default: string;
  max_attempt: number;
  is_repeat: boolean;
  attempt_interval: number;
  dial_pads: TParams;
}

const CallTemplateModal = () => {
  const dispatch = useDispatch();
  const queryClient = useQueryClient();

  const {
    templateModal: { data, open },
  } = useSelector((state: IStore) => state.modals);
  const type = data?.type;
  const id = data?.id;

  const { data: template, isFetching } = useTemplate({
    query_params: {
      id,
    },
  });
  const { data: callPageData, isLoading } = useCallTemplatePageData();

  const createTemplate = useCreateTemplate({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_get_call_template]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const updateTemplate = useUpdateTemplate({
    onSuccess: () => {
      queryClient.invalidateQueries([queryKeys.admin_get_call_template]);
      toast.success("Success");
      handleClose();
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    reset,
    control,
    setValue,
    watch,
  } = useForm<Interface>({
    resolver: yupResolver(TemplateSchema),
  });

  const handleClose = () => {
    reset({
      name: undefined,
      url: undefined,
      delay: undefined,
      default: undefined,
      max_attempt: undefined,
      is_repeat: undefined,
      attempt_interval: undefined,
    });
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "templateModal",
      })
    );
  };
  const onSubmit = (data: Interface) => {
    const dial_pads = transformKeys(data?.dial_pads);
    if (type === Enum.create) {
      createTemplate.mutate({
        body: {
          ...data,
          dial_pads,
        },
      });
    }
    if (type === Enum.update) {
      updateTemplate.mutate({
        body: {
          ...data,
          dial_pads,
        },
        query_params: {
          id,
        },
      });
    }
  };

  useEffect(() => {
    if (type === Enum.update && template) {
      setValue("name", template?.name);
      setValue("url", template?.url);
      setValue("delay", template?.delay);
      setValue("default", template?.default?.toString());
      setValue("max_attempt", template?.max_attempt);
      setValue("is_repeat", template?.is_repeat);
      setValue("attempt_interval", template?.attempt_interval);
      setValue("dial_pads", reverseTransformKeys(template.dial_pads));
    }
  }, [open, template, type]);
  const onSuccess = (data: any) => {
    setValue("url", data?.url);
  };

  const file =
    type === Enum.update
      ? {
          name: template?.name,
          full_url: template?.url,
        }
      : undefined;

  const options = generateKeyOptions({ callPageData });

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Wrapper>
        <Spin spinning={isFetching || isLoading}>
          <form onSubmit={handleSubmit(onSubmit)}>
            <Content>
              <Title>Create manual call template</Title>
              <Box>
                <Input
                  label="Template name"
                  name="name"
                  control={control}
                  error={errors?.name?.message}
                  colorBgContainer={bgColors.white}
                />
                <UploadFile
                  name="url"
                  label="Audio file"
                  control={control}
                  setValue={setValue}
                  error={errors?.url?.message}
                  onSuccess={onSuccess}
                  file={file}
                  className="file-wrapper"
                  text="Upload file"
                  height="76px"
                />
                <Flex>
                  <InputNumber
                    label="Recall attempt"
                    name="max_attempt"
                    control={control}
                    error={errors?.max_attempt?.message}
                    colorBgContainer={bgColors.white}
                  />
                  <InputNumber
                    label="Recall interval"
                    name="attempt_interval"
                    control={control}
                    error={errors?.attempt_interval?.message}
                    colorBgContainer={bgColors.white}
                    suffix={<div className="suffix">Hour</div>}
                  />
                </Flex>
                <Repeat>
                  <Switch
                    name="is_repeat"
                    label="Notify Candidate"
                    control={control}
                    size="small"
                  />
                  <Flex>
                    <InputNumber
                      label="Hold time"
                      name="delay"
                      control={control}
                      error={errors?.delay?.message}
                      colorBgContainer={bgColors.white}
                      suffix={<div className="suffix">Sec</div>}
                    />
                    <TabSelect
                      label="Forward to"
                      name="default"
                      control={control}
                      error={errors?.default?.message}
                      colorBgContainer={bgColors.white}
                      popupMatchSelectWidth={false}
                      options={options}
                      disabled={!!watch("is_repeat")}
                    />
                  </Flex>
                </Repeat>
              </Box>
              <Box>
                <BoxTitle>Select shortcuts for this template</BoxTitle>
                <Flex>
                  <TabSelect
                    label="Key 1"
                    name="dial_pads.one"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 2"
                    name="dial_pads.two"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 3"
                    name="dial_pads.three"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                </Flex>
                <Flex>
                  <TabSelect
                    label="Key 4"
                    name="dial_pads.four"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 5"
                    name="dial_pads.five"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 6"
                    name="dial_pads.six"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                </Flex>
                <Flex>
                  <TabSelect
                    label="Key 7"
                    name="dial_pads.seven"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 8"
                    name="dial_pads.eight"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 9"
                    name="dial_pads.nine"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                </Flex>
                <Flex>
                  <TabSelect
                    label="Key *"
                    name="dial_pads.astr"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key 0"
                    name="dial_pads.zero"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                  <TabSelect
                    label="Key #"
                    name="dial_pads.sharp"
                    control={control}
                    colorBgContainer={bgColors.white}
                    popupMatchSelectWidth={false}
                    options={options}
                    style={{ maxWidth: "140px" }}
                  />
                </Flex>
              </Box>
            </Content>
            <Buttons>
              <Button
                style={{
                  width: "100%",
                  height: "44px",
                  color: textColors.yourShadow,
                  boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                  backgroundColor: bgColors.wildSand,
                  borderRadius: 8,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                style={{
                  width: "100%",
                  height: "44px",
                  color: textColors.dark,
                  borderRadius: 8,
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
                }}
                type="submit"
                buttonLoading={
                  updateTemplate.isLoading || createTemplate.isLoading
                }
              >
                Save
              </Button>
            </Buttons>
          </form>
        </Spin>
      </Wrapper>
    </AntdModal>
  );
};
export default CallTemplateModal;
