import React, { useEffect, useMemo, useState } from "react";
import {
  AntdModal,
  Button,
  CircleImage,
  SmsTemplateSvg,
  Segmented,
  Input,
} from "components";
import {
  Content,
  Wrapper,
  Buttons,
  UserInfo,
  ChildWrapper,
  VacancyName,
} from "./style";
import { Flex, Spin } from "antd";
import { useForm } from "react-hook-form";
import {
  useGetHRInitialData,
  useSendSmsPageData,
  useSendSmsToCandidate,
} from "hooks";
import _ from "lodash";
import { ICandidate } from "types";
import { toast } from "react-toastify";
import { TemplateMenu } from "./menu";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";
import { useDispatch, useSelector } from "react-redux";
import SelectPhoneNumber from "./selectPhoneNumber";
import { calcCharAndSmsCount } from "utils/functions/smsCalculator";

const CandidateSMSModal = () => {
  const dispatch = useDispatch();
  const {
    candidateSMS: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);
  const candidate = redux_data?.candidate as ICandidate;

  const {
    handleSubmit,
    reset,
    watch,
    control,
    formState: { errors },
    setError,
    clearErrors,
    setValue,
    getValues,
  } = useForm();

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        data: {
          open: false,
          data: {},
        },
        key: "candidateSMS",
      })
    );
  };
  const [change, setChange] = useState<number>(0);
  const { data: initialData } = useGetHRInitialData({
    enabled: open,
  });

  const { data: pageData } = useSendSmsPageData({
    open,
    query_params: {
      project: "HR",
    },
  });

  const send = useSendSmsToCandidate({
    onSuccess: () => {
      toast.success("Sms sent");
      handleClose();
    },
    onError: (err) => {
      validationErrorHandler({
        err,
        setError,
        showToast: true,
        formHookMainField: false,
      });
    },
  });

  const onSubmit = (data: any) => {
    const selectPhones = _.map(data.types, (key, val) => {
      return { key, val: +(val as string) };
    })
      .filter((e) => e.key && e.val)
      .map((e) => e.val);

    send.mutate({
      query_params: {
        id: candidate?.id,
      },
      body: {
        text: data?.text,
        phone_type_list: selectPhones,
        template_id: data?.template_id,
      },
    });
  };

  const templates = useMemo(() => {
    return [pageData?.templates.own, pageData?.templates.company];
  }, [pageData?.templates]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors();
        if (name === "text") {
          setValue("template_id", null);
        }
        if (name === "template_id") {
          setValue(
            "text",
            [...(templates[0] || []), ...(templates[1] || [])].filter(
              (a) => a?.id === getValues("template_id")
            )[0]?.text
          );
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, templates]);

  const sms = calcCharAndSmsCount(watch("text"));

  useEffect(() => {
    setValue("template_id", false);
    setValue("text", "");
  }, [change]);

  return (
    <AntdModal
      open={open}
      onCancel={handleClose}
      centered
      width={540}
      padding="20px">
      <Spin spinning={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">Send SMS</div>
            <UserInfo>
              <CircleImage
                width={60}
                height={60}
                alt="placeholderImage"
                src={candidate?.candidateAvatar?.url ?? "/user.svg"}
              />
              {candidate && (
                <Flex gap={6} vertical>
                  <h4>
                    {candidate?.first_name} {candidate?.last_name}
                  </h4>
                  <VacancyName>{candidate?.vacancy?.title}</VacancyName>
                </Flex>
              )}
            </UserInfo>

            <Content>
              <SelectPhoneNumber
                control={control}
                errors={errors}
                phoneTypes={initialData?.candidatePhoneType}
                phone={candidate?.candidatePhoneNumbers}
              />

              <ChildWrapper m="0" p="0">
                <div className="input-header">
                  <div className="sms_container" style={{ marginTop: "16px" }}>
                    <SmsTemplateSvg />
                    <div
                      style={{
                        display: "flex",
                        flex: 1,
                        justifyContent: "center",
                      }}>
                      {sms.sms_count} SMS = {sms.char_count} Letters
                    </div>
                  </div>
                </div>

                <Input
                  name="text"
                  type="textarea"
                  placeholder="Type here..."
                  control={control}
                  error={errors?.text?.message}
                />
              </ChildWrapper>

              <div style={{ paddingTop: "10px" }}>
                <Segmented
                  initValue="0"
                  options={TemplateMenu({
                    templates,
                    control,
                    errors,
                  })}
                  onChange={setChange}
                />
              </div>
            </Content>

            <Buttons>
              <Button onClick={handleClose} className="cancel">
                Cancel
              </Button>
              <Button
                type="submit"
                className="save"
                buttonLoading={send.isLoading}>
                Send
              </Button>
            </Buttons>
          </Wrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default CandidateSMSModal;
