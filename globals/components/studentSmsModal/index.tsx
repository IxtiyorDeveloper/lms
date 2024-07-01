import React, { useEffect, useMemo, useState } from "react";
import {
  AntdModal,
  Button,
  CheckBox,
  CircleImage,
  ComeSvg,
  ErrorLabel,
  Input,
  ParentsSvg,
  PaymentInfo,
  Radios,
  SmsEditSvg,
  SmsStarSvg,
  SmsTemplateSvg,
  Segmented,
} from "components";
import {
  Content,
  Wrapper,
  Buttons,
  CheckWrapper,
  PersonalInfo,
  PhotoWrapper,
  UserInfo,
  ChildWrapper,
} from "./style";
import { bgColors } from "styles/theme";
import { Divider, Empty, Spin } from "antd";
import { useForm } from "react-hook-form";
import {
  ParentsPhone,
  MainPhone,
  HomePhone,
  OtherPhone,
} from "constants/phoneTypes";
import { ProfileWrapper } from "../groupSmsModal/style";
import {
  useGetOneStudent,
  useLead,
  useSendSmsAll,
  useSendSmsPageData,
} from "hooks";
import { toast } from "react-toastify";
import _ from "lodash";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { calcCharAndSmsCount } from "utils/functions/smsCalculator";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { validationErrorHandler } from "utils";

export enum PersonalInfoType {
  lead = "lead",
  student = "student",
}

const SelfSmsModal = () => {
  const dispatch = useDispatch();
  const {
    selfSms: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);
  const {
    user_id,
    filter,
    id,
    sent_field_name,
    type = PersonalInfoType.student,
  } = redux_data;
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
        key: "selfSms",
      })
    );
  };
  const [change, setChange] = useState<number>(0);

  const {
    isInitialLoading: isLeadLoading,
    isPreviousData: isLeadPrevious,
    data: lead,
  } = useLead({
    id: type === PersonalInfoType.lead ? id : undefined,
    expand: "currentGroupContact.group,user.userProfile.avatar.children",
    type: "update",
  });

  const {
    isInitialLoading: isLoading,
    isPreviousData,
    data,
  } = useGetOneStudent({
    id: user_id,
    expand: "currentGroupContact.group,user.userProfile.avatar.children",
    type: "update",
  });
  const user = useMemo(() => {
    if (type === PersonalInfoType.lead) {
      return lead
        ? {
            fullName: `${lead?.name}`,
            group: "No group",
            phoneNumber: `${formatPhoneNumber(
              lead.main_phone ||
                lead?.leadPhones?.find((e) => e.type == MainPhone)
                  ?.phone_number ||
                ""
            )}`,
            url: data?.user?.userProfile?.avatar,
          }
        : {};
    } else {
      return data
        ? {
            fullName: `${data?.user?.userProfile?.firstname} ${data?.user?.userProfile?.lastname}`,
            group: data?.currentGroupContact?.group?.name,
            phoneNumber: `${formatPhoneNumber(
              data?.user?.userPhones?.find((e) => e.type == MainPhone)
                ?.phone_number || ""
            )}`,
            url: data?.user?.userProfile?.avatar,
          }
        : {};
    }
  }, [data, lead]);

  const { data: pageData } = useSendSmsPageData({
    open,
  });
  const send = useSendSmsAll({
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
    send.mutate({
      query_params: {
        filter: filter,
      },
      body: {
        search: {
          [sent_field_name]: sent_field_name == "user_id" ? user_id : id,
        },
        range: "student",
        text: data?.text,
        type: data?.text ? 200 : 100,
        phone_types: _.map(data.types, (key, val) => {
          return { key, val: +(val as string).slice(1, 10) };
        })
          .filter((e) => e.key)
          .map((e) => e.val),
        template_id: data?.template_id,
        scenario_id: null,
      },
    });
  };

  const templates = useMemo(() => {
    return [pageData?.templates.own, pageData?.templates.company];
  }, [pageData?.templates]);

  const menu = useMemo(
    () => [
      {
        label: "My Template",
        icon: <SmsEditSvg />,
        children: (
          <ChildWrapper
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              backgroundColor: bgColors.whiteSmoke,
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            {!templates?.[0] || templates?.[0].length === 0 ? (
              <div className="empty-wrapper">
                <Empty description={null} />
              </div>
            ) : null}
            {templates?.[0]?.map((template, index) => {
              return (
                <ProfileWrapper
                  key={index}
                  style={{
                    backgroundColor: bgColors.transparent,
                    boxShadow: "none",
                    padding: "0",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                  }}
                >
                  <Radios
                    style={{
                      width: "100%",
                      boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
                      backgroundColor: bgColors.white,
                      borderRadius: "8px",
                    }}
                    left={false}
                    name="template_id"
                    control={control}
                    options={[{ value: template.id, label: template.text }]}
                    error={errors?.template_id?.message}
                  />
                </ProfileWrapper>
              );
            })}
          </ChildWrapper>
        ),
        value: "0",
      },
      {
        label: "Company Templates",
        icon: <SmsStarSvg />,
        children: (
          <ChildWrapper
            style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "14px",
              backgroundColor: bgColors.whiteSmoke,
              borderRadius: "8px",
              padding: "10px",
            }}
          >
            {templates?.[1]?.map((template, index) => {
              return (
                <ProfileWrapper
                  key={index}
                  style={{
                    backgroundColor: bgColors.transparent,
                    boxShadow: "none",
                    padding: "0",
                    flexDirection: "row-reverse",
                    alignItems: "flex-start",
                  }}
                >
                  <Radios
                    style={{
                      width: "100%",
                      boxShadow: "0 0 24px rgba(0, 0, 0, 0.05)",
                      backgroundColor: bgColors.white,
                      borderRadius: "8px",
                    }}
                    left={false}
                    name="template_id"
                    control={control}
                    options={[{ value: template.id, label: template.text }]}
                    error={errors?.template_id?.message}
                  />
                </ProfileWrapper>
              );
            })}
          </ChildWrapper>
        ),
        value: "1",
      },
    ],
    [templates]
  );

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
  }, [watch, data, templates]);
  const sms = calcCharAndSmsCount(watch("text"));

  useEffect(() => {
    setValue("template_id", false);
    setValue("text", "");
  }, [change]);
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin
        spinning={
          isLoading || isPreviousData || isLeadPrevious || isLeadLoading
        }
      >
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">Send SMS</div>
            <UserInfo>
              <PhotoWrapper>
                <CircleImage
                  width="100%"
                  height="100%"
                  src={user?.url}
                  alt="placeholderImage"
                />
              </PhotoWrapper>
              {data && (
                <PersonalInfo>
                  <p>{user?.fullName}</p>
                  <p>
                    <PaymentInfo
                      paymentDisabled={true}
                      user={data.currentGroupContact}
                      group={data.currentGroupContact?.group}
                    />
                  </p>
                  {user?.group && <p>{user?.group}</p>}
                </PersonalInfo>
              )}
            </UserInfo>
            <Divider />
            <Content>
              <div className="flex">
                {pageData &&
                  pageData.enums?.findIndex((e) => e?.enum === MainPhone) >
                    -1 && (
                    <div className="check">
                      <CheckBox
                        name={`types.a${MainPhone}`}
                        control={control}
                        className="checkBox"
                      >
                        <CheckWrapper>
                          <div>
                            <ComeSvg width="24px" height="24px" />
                          </div>
                          <span>Main</span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
                {pageData &&
                  pageData.enums?.findIndex((e) => e?.enum === ParentsPhone) >
                    -1 && (
                    <div className="check">
                      <CheckBox
                        name={`types.a${ParentsPhone}`}
                        control={control}
                        className="checkBox"
                      >
                        <CheckWrapper>
                          <div>
                            <ParentsSvg />
                          </div>
                          <span>Parents</span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
                {pageData &&
                  pageData.enums?.findIndex((e) => e?.enum === HomePhone) >
                    -1 && (
                    <div className="check">
                      <CheckBox
                        name={`types.a${HomePhone}`}
                        control={control}
                        className="checkBox"
                      >
                        <CheckWrapper>
                          <div>
                            <img src="/home.png" alt="home" />
                          </div>
                          <span>Home</span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
                {pageData &&
                  pageData.enums?.findIndex((e) => e?.enum === OtherPhone) >
                    -1 && (
                    <div className="check">
                      <CheckBox
                        name={`types.a${OtherPhone}`}
                        control={control}
                        className="checkBox"
                      >
                        <CheckWrapper>
                          <div>
                            <img src="/other.png" alt="addition" />
                          </div>
                          <span>Other</span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
              </div>
              <ErrorLabel error={errors?.phone_types?.message} />
              <Divider />
              <ChildWrapper m="0" p="0">
                <div className="input-header">
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
                </div>
                <Input
                  control={control}
                  type="textarea"
                  style={{
                    minHeight: "100px",
                    border: `1px solid ${bgColors.wildSand}`,
                    borderRadius: "6px",
                  }}
                  name="text"
                  rows={5}
                />
                <ErrorLabel error={errors?.template_id?.message} />
              </ChildWrapper>
              <div style={{ paddingTop: "10px" }}>
                <Segmented options={menu} initValue="0" onChange={setChange} />
              </div>
            </Content>
            <Buttons>
              <Button onClick={handleClose} className="cancel">
                Cancel
              </Button>
              <Button
                type="submit"
                className="save"
                buttonLoading={send.isLoading}
              >
                Send
              </Button>
            </Buttons>
          </Wrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default SelfSmsModal;
