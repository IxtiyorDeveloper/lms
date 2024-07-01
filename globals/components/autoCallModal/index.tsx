import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  AntdModal,
  Button,
  CheckBox,
  ComeSvg,
  ErrorLabel,
  ParentsSvg,
  RedBadgeTitle,
} from "components";
import {
  Content,
  Wrapper,
  Buttons,
  CheckWrapper,
  ProfileWrapper,
  AudioList,
  AudioContainer,
} from "./style";
import { bgColors } from "styles/theme";
import { Empty } from "antd";
import { useForm } from "react-hook-form";
import { ChildWrapper } from "app/settings/academicSettings/createCourse/style";
import { useRouter } from "next/router";
import { useAutoCallStudents, useCallMetrics, useCallPageData } from "hooks";
import {
  ParentsPhone,
  MainPhone,
  HomePhone,
  OtherPhone,
} from "constants/phoneTypes";
import Radios from "components/common/radio";
import { toast } from "react-toastify";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { ISmsPhoneTypeCount } from "types";
import { validationErrorHandler } from "utils";
import { pauseAudio } from "../../../utils/audio/pauseAudio";

const AutoCallModal = () => {
  const ref = useRef<any>();

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
    autoCall: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);

  const { filter, group_id, extra, search } = redux_data;

  const [countData, setCountData] = useState<ISmsPhoneTypeCount>({
    phones: {},
    user_count: 0,
  });

  const { data: pageData } = useCallPageData({
    open,
  });
  const templates = pageData?.templates?.company;

  const handleClose = () => {
    reset({});
    if (templates)
      for (let i = 0; i < templates?.length; i++) {
        pauseAudio(`auto-call-audio-${i}`);
      }
    dispatch(
      toggleModal({
        key: "autoCall",
        data: {
          data: {},
          open: false,
        },
      }),
    );
  };

  const callStudents = useAutoCallStudents({
    onSuccess: () => {
      toast.success("Success");
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

  const checkCount = useCallMetrics({
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

    const query = router?.query;

    callStudents.mutate({
      query_params: {
        filter,
      },
      body: {
        search: {
          ...(extra ?? {}),
          ...(search ?? {}),
          user_id: ids,
          ...query,
          left_units_count_to:
            query?.left_units_count_to === "∞"
              ? undefined
              : query?.left_units_count_to,
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
  };

  useEffect(() => {
    if (open) {
      const query = router?.query;
      checkCount.mutate({
        body: {
          filter,
          search: {
            ...(extra ?? {}),
            ...(search ?? {}),
            group_id,
            ...query,
            left_units_count_to:
              query?.left_units_count_to === "∞"
                ? undefined
                : query?.left_units_count_to,
          },
          phone_types: _.map(getValues("types"), (key, val) => {
            return { key, val: +(val as string).slice(1, 10) };
          })
            .filter((e) => e.key)
            .map((e) => e.val),
        },
      });
    }
  }, [open]);

  const types = watch("types");
  const allCountCall = () => {
    let sum = 0;
    _.map(countData?.phones, (value, key) => {
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

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered width={820}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Wrapper>
          <div className="title">Make a call {`(${allCountCall()})`}</div>
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
                        <span>
                          Main ({countData?.phones?.[MainPhone] ?? 0})
                        </span>
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
                          Parents ({countData?.phones?.[ParentsPhone] ?? 0})
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
                        <span>
                          Home ({countData?.phones?.[HomePhone] ?? 0})
                        </span>
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
                          Other ({countData?.phones?.[OtherPhone] ?? 0})
                        </span>
                      </CheckWrapper>
                    </CheckBox>
                  </div>
                )}
            </div>
            <ErrorLabel error={errors?.phone_types?.message} />
            <AudioList>
              <RedBadgeTitle
                count={templates?.length}
                title="Audio templates"
              />
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
                {templates?.length === 0 ? (
                  <div className="empty-wrapper">
                    <Empty description={null} />
                  </div>
                ) : null}
                {templates?.map((template, index) => {
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
                        options={[
                          {
                            value: template.id,
                            label: (
                              <AudioContainer>
                                <p>{template?.name}</p>
                                <audio controls id={`auto-call-audio-${index}`}>
                                  <source
                                    src={template?.url}
                                    type="audio/mpeg"
                                  />
                                </audio>
                              </AudioContainer>
                            ),
                          },
                        ]}
                        error={errors?.template_id?.message}
                      />
                    </ProfileWrapper>
                  );
                })}
              </ChildWrapper>
            </AudioList>
          </Content>
          <Buttons>
            <Button onClick={handleClose} className="cancel">
              Cancel
            </Button>
            <Button
              type="submit"
              className="save"
              buttonLoading={callStudents.isLoading}
            >
              Send
            </Button>
          </Buttons>
        </Wrapper>
      </form>
    </AntdModal>
  );
};

export default AutoCallModal;
