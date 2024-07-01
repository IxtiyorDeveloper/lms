import React, { useEffect } from "react";
import { Buttons, Content, Wrapper } from "./style";
import { Button, ErrorLabel, MySelect } from "components";
import { useForm } from "react-hook-form";
import {
  useOneLeadConfigSmsTemplateList,
  usePageData,
  useUpdateLeadConfig,
} from "hooks";
import _ from "lodash";
import MessageEnter from "./components/messageEnter";
import { bgColors, textColors } from "styles/theme";
import { useSaveLeadConfig } from "hooks/useLeadConfig";
import { toast } from "react-toastify";
import Router, { useRouter } from "next/router";
import { Spin } from "antd";
import { validationErrorHandler } from "utils";

const LeadCreateTemplate = () => {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    watch,
    setValue,
  } = useForm();

  const { data } = usePageData();
  const save = (!!router.query.id ? useUpdateLeadConfig : useSaveLeadConfig)?.({
    onSuccess: () => {
      Router.back();
      toast.success("Config saved");
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

  const { data: oneSms, isInitialLoading: isLoading } =
    useOneLeadConfigSmsTemplateList({
      id: router.query.id,
    });

  const onSubmit = (formData: any) => {
    save.mutate({
      ...formData,
      name: data?.sms?.smsDeliveryScenarioEnums[formData.scenario],
    });
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  useEffect(() => {
    if (!!oneSms) {
      setValue("id", router.query.id);
      setValue("scenario", `${oneSms.scenario}`);
      setValue("name", oneSms.name);
      setValue("text", oneSms.text);
    }
  }, [oneSms]);

  return null;

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Content>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div>
              <MySelect
                name="scenario"
                control={control}
                placeholder="Select scenario"
                options={_.map(
                  data?.lead?.leadTemplateScenarioEnums,
                  (value, key) => {
                    return {
                      label: value,
                      value: key,
                    };
                  }
                )}
                error={errors?.scenario?.message}
              />
            </div>
            <MessageEnter data={data?.lead.variables} control={control} />
            <ErrorLabel
              error={errors?.name?.message || errors?.text?.message}
            />
            <Buttons>
              {!!router.query.id && (
                <Button
                  style={{
                    height: "44px",
                    color: textColors.yourShadow,
                    boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                    backgroundColor: bgColors.wildSand,
                  }}
                  className="cancel"
                  onClick={() => router.back()}
                >
                  Cancel
                </Button>
              )}
              <Button
                style={{
                  height: "44px",
                  color: textColors.dark,
                  boxShadow:
                    "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
                }}
                type="submit"
                className="save"
                buttonLoading={save.isLoading}
              >
                Save
              </Button>
            </Buttons>
          </form>
        </Content>
      </Wrapper>
    </Spin>
  );
};

export default LeadCreateTemplate;
