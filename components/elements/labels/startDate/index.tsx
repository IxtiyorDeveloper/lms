import React, { FC, useEffect } from "react";
import { LabelWrapper, Wrapper } from "./style";
import { TIcon } from "types";
import { DatePicker, StartDateSvg } from "components";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { Container } from "../willPay/style";
import { useForm } from "react-hook-form";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Tooltip } from "antd";

interface Interface {
  date: string;
}

const StartDate: FC<TIcon> = ({
  size,
  label,
  defaultValue,
  isOpen,
  onChange,
}) => {
  const s = size === "small" ? "20.01" : "25";
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
          setTimeout(() => {
            onChange(value.date);
          }, 200);
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);
  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    if (isOpen && label && onChange) {
      event.stopPropagation();
      onChange(new Date());
    }
  };

  return (
    <Tooltip
      destroyTooltipOnHide
      title={userFullNameCreator(defaultValue?.createdBy)}
      trigger="hover"
    >
      <Container size={size} onClick={(event) => handleClick(event)}>
        <Wrapper clicked={!!isOpen} size={size}>
          <StartDateSvg width={s} height={s} />
          {!isOpen && (
            <form onSubmit={handleSubmit(onSubmit)}>
              <DatePicker
                control={control}
                name="date"
                format={DATE_FORMAT_YYYY_MM_DD}
                className="abs"
              />
            </form>
          )}
        </Wrapper>
        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default StartDate;

StartDate.defaultProps = {
  size: "medium",
};
