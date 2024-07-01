import * as React from "react";
import { TModal } from "./type";
import { Wrapper, Buttons, Content } from "./style";
import { AntdModal, Button, Input, UploadImage } from "components";
import { bgColors, textColors } from "styles/theme";

const StyledModal = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
  control,
  errors,
  setValue,
}: TModal) => {
  return (
    <AntdModal open={open} onCancel={handleClose} centered>
      <Wrapper>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Content>
            <Input
              label="Name"
              name="name"
              control={control}
              placeholder="Your name"
              error={errors?.name?.message}
            />
            <UploadImage name="logo" control={control} setValue={setValue} />
          </Content>
          <Buttons>
            <Button
              style={{
                width: "100%",
                height: "44px",
                color: textColors.yourShadow,
                boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
                backgroundColor: bgColors.wildSand,
                borderRadius: 8,
              }}
              onClick={handleClose}
            >
              Cancel
            </Button>
            <Button
              style={{
                width: "100%",
                height: "44px",
                color: textColors.dark,
                borderRadius: 8,
                boxShadow:
                  "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
              }}
              type="submit"
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Wrapper>
    </AntdModal>
  );
};
export default StyledModal;
