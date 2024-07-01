import React, { useEffect } from "react";
import { AntdModal, Button, Input, MySelect, SmsTemplateSvg } from "components";
import { Wrapper, Buttons } from "./style";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import {
  useCronSms,
  useGetOneSmsTemplates,
  useSaveSmsTemplate,
  useUpdateSmsTemplate,
} from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { Spin } from "antd";
import { calcCharAndSmsCount } from "utils/functions/smsCalculator";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

const CreateTemplateModal = () => {
  const router = useRouter();
  const open = router.query.createTemplateModal === "true";
  const {
    handleSubmit,
    reset,
    watch,
    control,
    clearErrors,
    formState: { errors },
    setError,
    setValue,
  } = useForm<any>();

  const handleClose = () => {
    // setOpen(false);
    reset({});
    const query = router.query;
    delete query.createTemplateModal;
    delete query.createTemplateModalId;
    router.replace({
      pathname: router.pathname,
      query: query,
    });
  };

  const {
    isLoading,
    data: projectNames,
    isRefetching,
  } = useCronSms({
    query_params: {
      project: router.query?.tabKey || "LMS",
    },
  });

  const queryClient = useQueryClient();

  const saveSmsTemplate = !!router.query.createTemplateModalId
    ? useUpdateSmsTemplate({
        onSuccess: () => {
          toast.success("Template updated");
          queryClient.invalidateQueries([queryKeys.sms_template]);
          handleClose();
        },
        onError: (err) => {
          validationErrorHandler({
            err,
            showToast: false,
            setError,
            formHookMainField: false,
          });
        },
      })
    : useSaveSmsTemplate({
        onSuccess: () => {
          toast.success("Template created!");
          queryClient.invalidateQueries([queryKeys.sms_template]);
          handleClose();
        },
        onError: (err) => {
          validationErrorHandler({
            err,
            showToast: false,
            setError,
            formHookMainField: false,
          });
        },
      });

  const { isInitialLoading, data } = useGetOneSmsTemplates({
    id: router.query.createTemplateModalId,
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("text", data.text);
      // @ts-ignore
      setValue("project", data?.project);
    }
  }, [data, projectNames]);

  const onSubmit = (data: any) => {
    saveSmsTemplate.mutate({
      ...data,
      project: data?.project,
      model_type: 500,
      id: router.query.createTemplateModalId,
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, router.query]);

  const sms = calcCharAndSmsCount(watch("text"));

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={340}>
      <Spin spinning={isInitialLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div style={{ marginBottom: "20px" }}>
              <Input
                name="name"
                label="Title"
                placeholder="Type here..."
                control={control}
                error={errors?.name?.message}
              />
            </div>

            <Input
              name="text"
              label="Text"
              type="textarea"
              placeholder="Type here..."
              control={control}
              error={errors?.text?.message}
              suffix={
                <div className="sms_container" style={{ marginTop: "16px" }}>
                  <SmsTemplateSvg />
                  <div
                    style={{
                      display: "flex",
                      flex: 1,
                      justifyContent: "center",
                    }}
                  >
                    {sms.char_count} Letters = {sms.sms_count} SMS
                  </div>
                </div>
              }
            />

            <div style={{ marginTop: "20px" }}>
              <MySelect
                name="project"
                control={control}
                options={projectNames?.projects.map((a) => {
                  return { label: a, value: a };
                })}
                label="Project"
                placeholder="Select"
                error={errors?.project?.message}
              />
            </div>
            <Buttons>
              <Button onClick={handleClose} className="cancel">
                Cancel
              </Button>
              <Button type="submit" className="save">
                Save
              </Button>
            </Buttons>
          </Wrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CreateTemplateModal;
