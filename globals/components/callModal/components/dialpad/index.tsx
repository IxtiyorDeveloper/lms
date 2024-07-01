import React, { Fragment, useCallback, useEffect } from "react";
import { Spin } from "antd";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";

import { Wrapper } from "./style";
import { useCallUserFilter } from "../hook";
import { useCallUserList } from "hooks/useCall";
import UserCard, { IProps } from "../userCard";
import NumberKeyboard from "../numberKeyboard";
import PhoneContainer from "../phoneContainer";
import CallHeader from "../header";
import env from "utils/env";
import { startCall } from "utils/call";

const DialPad = () => {
  const { control, getValues, setValue, watch } = useForm();

  const phone = watch("phone_number");

  const { data, isFetching } = useCallUserList({
    enabled: phone?.length === 13,
    query_params: {
      phone_number: phone,
    },
  });

  const users = useCallUserFilter(data);

  const onCallButtonPress = () => {
    try {
      startCall(
        `sip:${(getValues("phone_number") as string).slice(4)}@${env.pbxUrl}`
      );
    } catch (e) {
      toast.error("Something went wrong!");
    }
  };

  const onClickNumber = useCallback(
    (value: string) => {
      const a = `${phone || "+998"}${value}`;
      a.length <= 13 && setValue("phone_number", a);
    },
    [phone]
  );

  useEffect(() => {
    const listener = (event: any) => {
      if (event.code === "Enter" || event.code === "NumpadEnter") {
        onCallButtonPress();
        event.preventDefault();
      }
    };
    document.addEventListener("keydown", listener);
    return () => {
      document.removeEventListener("keydown", listener);
    };
  }, []);

  return (
    <Fragment>
      <CallHeader />
      <Wrapper>
        <Spin spinning={isFetching}>
          <div className="user">
            {(users.length > 0 ? users : [{}]).map((r) => {
              return (
                <UserCard
                  className={
                    (users?.length || 1) === 1 ? "minWidth100" : "user_item"
                  }
                  user={r as IProps["user"]}
                  count={users?.length || 1}
                />
              );
            })}
          </div>
        </Spin>
        <PhoneContainer
          changeCall={() => ({})}
          control={control}
          phoneName="phone_number"
        />
        <NumberKeyboard
          onCallButtonPress={onCallButtonPress}
          onClickNumber={onClickNumber}
        />
      </Wrapper>
    </Fragment>
  );
};

export default DialPad;
