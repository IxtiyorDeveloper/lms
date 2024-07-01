import React, { FC, useState } from "react";
import {
  ButtonsWrapper,
  PaintWrapper,
  PopoverC,
  Wrapper,
  Container,
} from "./style";
import { TIcon } from "types";
import { Button, ColorSelect, PaintSvg } from "components";
import { useForm } from "react-hook-form";
import { bgColors, textColors } from "styles/theme";
import { userFullNameCreator } from "utils/userFullNameCreator";
import { Tooltip } from "antd";
import { UserLabel, UserLabelTest } from "types/userLabel";
import { studentRowColors } from "../../../../constants/colors";

interface Interface extends TIcon {
  onSubmit: (color: string) => void;
  colored?: boolean;
  defaultValue?: UserLabel;
  defaultColor?: string;
  customButton?: React.ReactNode;
  isSubmit?: boolean;
  name?: string;
  createdBy?: string;
  colors?: {
    color: string;
  }[];
}

const ComingCircle: FC<Interface> = ({
  size,
  defaultValue,
  onSubmit,
  isOpen,
  colored = false,
  customButton,
  isSubmit = true,
  name = "color",
  defaultColor,
  createdBy,
  colors,
}) => {
  const [open, setOpen] = useState(false);
  const [clicked, setClicked] = useState(colored);
  const s = size === "small" ? "22" : "30.01";

  const { control, handleSubmit, getValues } = useForm();

  const onSubmitFunc = (data: any) => {
    const objectNames = name.split(".");
    let value: any = data;
    objectNames.forEach((element, index) => {
      value = value?.[element];
    });

    onSubmit(value);
    setOpen(false);
  };

  const onReset = () => {
    onSubmit("");
  };
  const handleChange = (newValue: boolean) => {
    if (!colored) {
      setOpen(newValue);
    }
  };
  const handleRemoveColor = () => {
    if (colored) {
      onSubmitFunc({ color: "" });
    }
  };

  const handleClose = () => {
    if (!isSubmit) {
      onSubmitFunc(getValues());
    }
  };
  return (
    <Tooltip
      title={createdBy || userFullNameCreator(defaultValue?.createdBy)}
      trigger="hover"
      destroyTooltipOnHide
    >
      <Container>
        <PopoverC
          destroyTooltipOnHide
          color={bgColors.white}
          style={{ padding: "0", background: "white" }}
          trigger="click"
          open={open}
          onOpenChange={handleChange}
          placement="bottomRight"
          content={
            <PaintWrapper onSubmit={handleSubmit(onSubmitFunc)}>
              <ColorSelect
                colorStyle={{ boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)" }}
                contentStyle={{
                  border: "none",
                  gap: "10px",
                  gridTemplateColumns: "1fr 1fr 1fr 1fr",
                  boxShadow: "none",
                }}
                wrapperStyle={{
                  backgroundColor: "white",
                  border: "none",
                  padding: "10px",
                }}
                name={name}
                heightColor={28}
                control={control}
                colors={colors ?? studentRowColors}
                defaultColor={defaultColor}
              />
              <ButtonsWrapper>
                <Button
                  onClick={onReset}
                  style={{ fontWeight: "500", padding: 0, width: "100%" }}
                  bgColor={bgColors.whiteSmoke}
                  textColor={textColors.yourShadow}
                >
                  Reset
                </Button>
                <Button
                  onClick={handleClose}
                  type={isSubmit ? "submit" : "button"}
                  style={{ fontWeight: "500", padding: 0, width: "100%" }}
                >
                  Save
                </Button>
              </ButtonsWrapper>
            </PaintWrapper>
          }
        >
          {customButton ?? (
            <Wrapper
              onClick={() => setClicked(!clicked)}
              clicked={isOpen}
              size={size}
            >
              <PaintSvg
                width={s}
                height={s}
                onClick={() => handleRemoveColor()}
              />
            </Wrapper>
          )}
        </PopoverC>
      </Container>
    </Tooltip>
  );
};

export default ComingCircle;
ComingCircle.defaultProps = {
  size: "small",
};
