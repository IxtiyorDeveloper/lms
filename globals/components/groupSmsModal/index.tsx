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
  ProfileWrapper,
  GridWrapper,
  FlexWrapper,
  CheckBoxWrap,
} from "./style";
import { bgColors } from "styles/theme";
import { Empty, Popover, Spin } from "antd";
import { useForm } from "react-hook-form";
import { ChildWrapper } from "app/settings/academicSettings/createCourse/style";
import { useRouter } from "next/router";
import {
  useCheckSmsCount,
  useGroup,
  useSendSmsAll,
  useSendSmsPageData,
} from "hooks";
import {
  ParentsPhone,
  MainPhone,
  HomePhone,
  OtherPhone,
} from "constants/phoneTypes";
import Radios from "components/common/radio";
import { toast } from "react-toastify";
import _ from "lodash";
import { statuses } from "constants/studentStatuses";
import { calcCharAndSmsCount } from "utils/functions/smsCalculator";
import { expand } from "./expand";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ISmsPhoneTypeCount } from "types";
import { validationErrorHandler } from "utils";
import { colors } from "layout/header/style";
import { studentStatusIdentifier } from "utils/studentStatusIdentifier";
import formatPhoneNumber from "utils/phoneNumberFormatter";

const GroupSmsModal = () => {
  const dispatch = useDispatch();
  const router = useRouter();
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
  const {
    groupSms: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);
  const { filter, group_id, extra, search } = redux_data;
  const [countData, setCountData] = useState<ISmsPhoneTypeCount>({
    phones: {},
    user_count: 0,
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "groupSms",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const { isInitialLoading: isLoading, data } = useGroup({
    id: group_id,
    expand,
  });
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
  const checkCount = useCheckSmsCount({
    onSuccess: (data: ISmsPhoneTypeCount) => {
      setCountData(data);
    },
    onError: (e: any) => {},
  });

  const onSubmit = (data: any) => {
    let ids: number[] = [];

    Object.keys(data?.sms_student_obj || {})?.map((key: string) => {
      if (data?.sms_student_obj?.[key]) {
        ids.push(Number(key?.slice(8, key?.length)));
      }
    });

    const { groupId, ...rest } = router?.query;

    if (data.text?.length > 0) {
      send.mutate({
        query_params: {
          filter,
        },
        body: {
          search: {
            ...(extra ?? {}),
            ...(search ?? {}),
            group_id,
            user_id: ids,
            ...rest,
            left_units_count_to:
              rest?.left_units_count_to === "∞"
                ? undefined
                : rest?.left_units_count_to,
          },
          text: data?.text,
          phone_types: _.map(data.types, (key, val) => {
            return { key, val: +(val as string).slice(1, 10) };
          })
            .filter((e) => e.key)
            .map((e) => e.val),
          template_id: data?.template_id,
          scenario_id: null,
        },
      });
    } else {
      setError("text", { message: "Message can not be blank" });
    }
  };

  const templates = useMemo(() => {
    return [pageData?.templates?.own, pageData?.templates?.company];
  }, [pageData]);

  const menu = useMemo(
    () => [
      {
        label: "My Template",
        icon: <SmsEditSvg />,
        value: "0",
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
            {templates?.[0]?.length === 0 || !templates?.[0] ? (
              <div className="empty-wrapper">
                <Empty description={null} />
              </div>
            ) : null}
            {templates?.[0]?.map((template, index) => {
              return (
                <ProfileWrapper
                  key={template.id}
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
                  />
                </ProfileWrapper>
              );
            })}
          </ChildWrapper>
        ),
      },
      {
        label: "Company Templates",
        icon: <SmsStarSvg />,
        value: "1",
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
            {templates?.[1]?.length === 0 || !templates?.[1] ? (
              <div className="empty-wrapper">
                <Empty description={null} />
              </div>
            ) : null}
            {templates?.[1]?.map((template, index) => {
              return (
                <ProfileWrapper
                  key={template.id}
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
      },
    ],
    [templates]
  );

  useEffect(() => {
    if (open) {
      const { groupId, ...rest } = router?.query;
      checkCount.mutate({
        filter,
        search: {
          ...(extra ?? {}),
          ...(search ?? {}),
          group_id,
          ...rest,
          left_units_count_to:
            rest?.left_units_count_to === "∞"
              ? undefined
              : rest?.left_units_count_to,
        },
        phone_types: _.map(getValues("types"), (key, val) => {
          return { key, val: +(val as string).slice(1, 10) };
        })
          .filter((e) => e.key)
          .map((e) => e.val),
      });
    }
  }, [open]);

  useEffect(() => {
    setValue(`types.a${MainPhone}`, true);
    setValue(`all_students`, true);
    data?.allContacts?.map((item) => {
      setValue(`students.${item.id}`, getValues("all_students"));
    });
    // const { groupId, ...rest } = router?.query;
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
        if (name === "all_students") {
          data?.allContacts?.map((item) => {
            setValue(`students.${item.id}`, getValues("all_students"));
          });
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, redux_data, templates, data, pageData]);

  const sms = calcCharAndSmsCount(watch("text"));

  const [change, setChange] = useState<string>("0");

  useEffect(() => {
    setValue("template_id", false);
    setValue("text", "");
  }, [change]);

  const types = watch("types");
  const allCountSms = () => {
    let sum = 0;
    _.map(countData.phones, (value, key) => {
      let bool = false;
      types &&
        Object.entries(types).map((e) => {
          if (e[1] && e[0] === `a${key}`) {
            bool = true;
          }
        });
      if (bool) sum += +value;
    });
    return sum;
  };

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={640}>
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">Send SMS {`(${allCountSms()})`}</div>
            <Content>
              <div className="flex">
                {pageData &&
                  pageData?.enums?.findIndex((e) => e?.enum === MainPhone) >
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
                          <span>Main ({countData.phones[MainPhone] ?? 0})</span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
                {pageData &&
                  pageData?.enums?.findIndex((e) => e?.enum === ParentsPhone) >
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
                          <span>
                            Parents ({countData.phones[ParentsPhone] ?? 0})
                          </span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
                {pageData &&
                  pageData?.enums?.findIndex((e) => e?.enum === HomePhone) >
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
                          <span>Home ({countData.phones[HomePhone] ?? 0})</span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
                {pageData &&
                  pageData?.enums?.findIndex((e) => e?.enum === OtherPhone) >
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
                          <span>
                            Other ({countData.phones[OtherPhone] ?? 0})
                          </span>
                        </CheckWrapper>
                      </CheckBox>
                    </div>
                  )}
              </div>
              <ErrorLabel error={errors?.phone_types?.message} />
              {group_id && (
                <>
                  <FlexWrapper className="flex">
                    <p className="title-w">
                      Students{" "}
                      <span className="status">
                        {data?.allContacts?.length}
                      </span>
                    </p>
                  </FlexWrapper>
                  <GridWrapper>
                    {data?.allContacts?.map((item) => {
                      return (
                        <ProfileWrapper
                          className="profile-extra-styles"
                          key={item.id}
                        >
                          <CheckBoxWrap>
                            <CheckBox
                              name={`sms_student_obj.student_${item?.user?.id}`}
                              control={control}
                            />
                          </CheckBoxWrap>
                          <div className="profile">
                            <div>
                              <CircleImage
                                height={34}
                                width={34}
                                src={item.user?.userProfile?.avatar}
                              />
                            </div>
                            <div>
                              <Popover
                                destroyTooltipOnHide
                                content={
                                  <span className="name">
                                    {item.user?.userProfile?.firstname +
                                      " " +
                                      item.user?.userProfile?.lastname}
                                  </span>
                                }
                              >
                                <span className="name-visible">
                                  {item.user?.userProfile?.firstname +
                                    " " +
                                    item.user?.userProfile?.lastname}
                                </span>
                              </Popover>
                              <span className="phone">
                                {formatPhoneNumber(
                                  item.user?.userPhones?.[0]?.phone_number!
                                )}
                              </span>
                              <Popover
                                destroyTooltipOnHide
                                content={
                                  <div className="studying-p">
                                    {
                                      // @ts-ignore
                                      statuses[
                                        // @ts-ignore
                                        item?.user?.student?.currentGroupContact
                                          ?.status || "unclear"
                                      ]
                                    }
                                  </div>
                                }
                              >
                                <div
                                  style={
                                    colors[
                                      studentStatusIdentifier(
                                        item?.user?.student
                                      ) as keyof typeof colors
                                    ]
                                  }
                                  className="studying"
                                >
                                  {
                                    // @ts-ignore
                                    statuses[
                                      // @ts-ignore
                                      item?.user?.student?.currentGroupContact
                                        ?.status || "unclear"
                                    ]
                                  }
                                </div>
                              </Popover>
                            </div>
                          </div>
                        </ProfileWrapper>
                      );
                    })}
                  </GridWrapper>
                </>
              )}
              <ChildWrapper m="0" p="0">
                <div className="input-header">
                  <div className="sms_container" style={{ marginTop: "16px" }}>
                    <SmsTemplateSvg />
                    <div className="sms-template-counter">
                      {sms.char_count} Letters = {sms.sms_count} SMS
                    </div>
                  </div>
                </div>
                <Input
                  control={control}
                  placeholder="Select template or type here..."
                  type="textarea"
                  style={{
                    minHeight: "100px",
                    border: `1px solid ${bgColors.wildSand}`,
                    borderRadius: "6px",
                  }}
                  name="text"
                  rows={5}
                />
                <ErrorLabel error={errors?.text?.message} />
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

export default GroupSmsModal;
