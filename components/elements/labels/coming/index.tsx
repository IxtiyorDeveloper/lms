import React, { FC, useEffect, useMemo } from "react";
import { LabelWrapper, Wrapper } from "./style";
import { TIcon } from "types";
import { ComingSvg, DatePicker } from "components";
import {
  DATE_FORMAT_YYYY_MM_DD,
  DATE_FORMAT_YYYY_MM_DD_HH_mm,
} from "constants/dates";
import { Container } from "../willPay/style";
import { useForm } from "react-hook-form";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Tooltip } from "antd";

interface Interface {
  date: string;
}

const date = new Date();
date.setHours(12, 0, 0, 0);
const ComingCircle: FC<TIcon> = ({
  size,
  label,
  onChange,
  isOpen,
  defaultValue,
  showTime = false,
  hasCalendar = false,
  isHasReset = false,
  renderExtraButtons,
}) => {
  const s = useMemo(() => (size === "small" ? "17.37" : "22.01"), [size]);
  const { control, handleSubmit, watch } = useForm<Interface>();
  const onSubmit = (data: Interface) => {
    if (onChange) {
      onChange(data.date);
    }
  };
  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change" && name === "date") {
        if (onChange) {
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

  const bool = isHasReset ? isHasReset || !isOpen : !isOpen;

  return (
    <Tooltip
      destroyTooltipOnHide
      title={userFullNameCreator(defaultValue?.createdBy)}
      trigger="hover"
    >
      <Container
        size={size}
        bigger={!!isOpen && !!label}
        onClick={(event) => {
          if (!isHasReset) {
            if (hasCalendar) {
              handleClick(event);
            } else {
              onChange && onChange(new Date());
            }
          }
        }}
      >
        <Wrapper clicked={!!isOpen} size={size}>
          <ComingSvg width={s} height={s} />
          {hasCalendar && bool && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <DatePicker
                control={control}
                name="date"
                format={
                  showTime
                    ? DATE_FORMAT_YYYY_MM_DD_HH_mm
                    : DATE_FORMAT_YYYY_MM_DD
                }
                valueFormat={
                  showTime
                    ? DATE_FORMAT_YYYY_MM_DD_HH_mm
                    : DATE_FORMAT_YYYY_MM_DD
                }
                className="abs"
                showTime={showTime}
                disableOnBlur
                renderExtraFooter={renderExtraButtons}
              />
            </form>
          )}
        </Wrapper>
        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default ComingCircle;
