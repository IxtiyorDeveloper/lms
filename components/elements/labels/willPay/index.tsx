import React, { FC, useEffect } from "react";
import { Wrapper, Container, WillPayWrapper } from "./style";
import { TIcon } from "types";
import { LabelWrapper } from "../callRequest/style";
import { bgColors } from "styles/theme";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { useForm } from "react-hook-form";
import { DatePicker, WillPaySvg } from "components";
import { Tooltip } from "antd";
import { userFullNameCreator } from "utils/userFullNameCreator";

interface Interface {
  date: string;
}

const WillPay: FC<TIcon> = ({
  size,
  isOpen,
  label,
  onChange,
  defaultValue,
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
        <WillPayWrapper size={size}>
          <Wrapper clicked={!!isOpen} size={size}>
            <WillPaySvg
              color={!!isOpen ? bgColors.eucalyptus : bgColors.sceptreBlue}
              width={s}
              height={s}
            />
          </Wrapper>
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
        </WillPayWrapper>

        {isOpen && label && <LabelWrapper size={size}>{label}</LabelWrapper>}
      </Container>
    </Tooltip>
  );
};

export default WillPay;
