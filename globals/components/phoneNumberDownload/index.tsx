import React, { useEffect, useState } from "react";
import {
  AntdModal,
  Button,
  CheckBox,
  ComeSvg,
  ErrorLabel,
  ParentsSvg,
} from "components";
import { Content, Wrapper, Buttons, CheckWrapper } from "./style";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { useCheckSmsCount, useSendSmsPageData } from "hooks";
import {
  ParentsPhone,
  MainPhone,
  HomePhone,
  OtherPhone,
} from "constants/phoneTypes";
import _ from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { usePhoneListFileGenerator } from "hooks/useFile";
import { ISmsPhoneTypeCount } from "types";
import { useRouter } from "next/router";
import { validationErrorHandler } from "utils";

const PhoneNumberDownload = () => {
  const dispatch = useDispatch();
  const {
    handleSubmit,
    reset,
    control,
    formState: { errors },
    setError,
    setValue,
    getValues,
    watch,
  } = useForm();
  const router = useRouter();
  const {
    redListDownload: { data: redux_data, open },
  } = useSelector((state: IStore) => state.modals);
  const { filter, group_id, extra, search } = redux_data;
  const [countData, setCountData] = useState<ISmsPhoneTypeCount>({
    phones: {},
    user_count: 0,
  });

  const checkCount = useCheckSmsCount({
    onSuccess: (data: ISmsPhoneTypeCount) => {
      setCountData(data);
    },
    onError: (e: any) => {},
  });

  const handleClose = () => {
    reset({});
    dispatch(
      toggleModal({
        key: "redListDownload",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const { data: pageData } = useSendSmsPageData({
    open,
  });

  const send = usePhoneListFileGenerator({
    onSuccess: (data: string) => {
      handleClose();

      const link = document.createElement("a");
      link.href = data;
      const filename = data.split("/").pop();
      link.setAttribute("download", filename as string);
      document.body.appendChild(link);
      link.click();
      link.parentNode?.removeChild(link);
    },
    onError: (err: any) => {
      validationErrorHandler({
        err,
        showToast: true,
        setError,
        formHookMainField: false,
      });
    },
  });
  const onSubmit = (data: any) => {
    send.mutate({
      ...redux_data,
      phone_types: _.map(data.types, (value, key) => {
        if (value) {
          return key.slice(1);
        }
        return null;
      }).filter((e) => !!e),
    });
  };

  useEffect(() => {
    if (open) {
      setValue(`types.a${MainPhone}`, true);
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
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={false}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Wrapper>
            <div className="title">
              Download SMS phone list {`(${allCountSms()})`}
            </div>
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
                Download
              </Button>
            </Buttons>
          </Wrapper>
        </form>
      </Spin>
    </AntdModal>
  );
};

export default PhoneNumberDownload;
