import React, { FC, useEffect } from "react";
import { Wrapper } from "./style";
import { TIcon } from "types";
import { Button, CallRequestSvg, DatePicker } from "components";
import { LabelWrapper } from "./style";
import { Container } from "../willPay/style";
import { useForm } from "react-hook-form";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Tooltip } from "antd";
import { DATE_FORMAT_YYYY_MM_DD_HH_mm } from "constants/dates";
import dayjs from "dayjs";

interface Interface {
  date: string;
}

const CallRequest: FC<TIcon> = ({
  size,
  label,
  onChange,
  isOpen,
  defaultValue,
  createdBy,
}) => {
  const s = size === "small" ? "17.37" : "22.01";
  const { control, handleSubmit, watch } = useForm<Interface>();
  const onSubmit = (data: Interface) => {
    if (onChange) {
      onChange(data.date);
    }
  };

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "date") {
        if (onChange && value.date) {
          onChange(value.date);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch, isOpen]);

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isOpen && label && onChange) {
      event.stopPropagation();
      onChange(new Date());
    }
  };

  return (
    <Tooltip
      title={createdBy || userFullNameCreator(defaultValue?.createdBy)}
      trigger="hover"
      destroyTooltipOnHide
    >
      <Container
        size={size}
        onClick={(event) => handleClick(event)}
        bigger={!!isOpen && !!label}
      >
        <Wrapper clicked={!!isOpen} size={size}>
          <CallRequestSvg width={s} height={s} />
          {!isOpen && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <DatePicker
                control={control}
                name="date"
                className="abs"
                format={DATE_FORMAT_YYYY_MM_DD_HH_mm}
                valueFormat={DATE_FORMAT_YYYY_MM_DD_HH_mm}
                showTime={{ defaultValue: dayjs("00:00", "HH:mm") }}
                disableOldDays
                disableOnBlur
              />
            </form>
          )}
        </Wrapper>
        {!!isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default CallRequest;
