import * as React from "react";
import { TModal } from "./type";
import { Wrapper, Buttons, Content } from "./style";
import { AntdModal, Button, ColorSelect, Input } from "components";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { useEffect } from "react";
import { extendedColors } from "constants/colors";

const ExpenseCategoryModal = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
  control,
  errors,
  type,
  data,
  setValue,
  isLoading,
}: TModal) => {
  useEffect(() => {
    if (open && type === "update") {
      setValue("name", data.name);
      setValue("color", data.color);
    }
  }, [open, type, data]);

  return (
    <AntdModal open={open} onCancel={handleClose} centered>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            Create category
            <Input
              label="Name"
              name="name"
              control={control}
              placeholder="Type here..."
              error={errors?.name?.message}
            />
            <ColorSelect
              colorStyle={{
                boxShadow: "0 0 4px rgba(0, 0, 0, 0.2)",
                borderRadius: "2px",
              }}
              contentStyle={{
                border: `1px solid ${bgColors.purpleCrystal}`,
                padding: "5px",
                gap: "5px",
                background: bgColors.yukon,
                gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
                boxShadow: "none",
              }}
              wrapperStyle={{
                backgroundColor: "white",
                border: "none",
                padding: 0,
              }}
              name="color"
              heightColor={36}
              label="Select Color"
              control={control}
              error={errors?.color?.message}
              colors={extendedColors}
            />
          </Content>
          <Buttons>
            <Button
              onClick={handleClose}
              style={{
                width: "100%",
                height: "44px",
                color: textColors.yourShadow,
                boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                backgroundColor: bgColors.wildSand,
                borderRadius: "8px",
              }}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "100%",
                height: "44px",
                color: textColors.dark,
                fontWeight: 600,
                fontSize: fontSizes.f14,
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
                borderRadius: "8px",
              }}
              type="submit"
              buttonLoading={isLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Wrapper>
    </AntdModal>
  );
};
export default ExpenseCategoryModal;
