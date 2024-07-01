import * as React from "react";
import { AntdModal, Button } from "components";
import { TModal } from "./type";
import { Buttons, Content } from "./style";
import { Input } from "components";
import { bgColors, textColors } from "styles/theme";

const StyledModal = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
  control,
  errors,
}: TModal) => {
  return (
    <AntdModal open={open} onCancel={handleClose} centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          <Input
            label="Name"
            name="name"
            control={control}
            placeholder="Type here..."
            error={errors?.name?.message}
          />
          <Input
            label="Title"
            name="title"
            control={control}
            placeholder="Type here..."
            error={errors?.name?.message}
          />
        </Content>
        <Buttons>
          <Button
            style={{
              width: "100%",
              height: "44px",
              color: textColors.yourShadow,
              boxShadow: "inset 0 2px 6px rgba(252, 252, 253, 0.8)",
              backgroundColor: bgColors.wildSand,
            }}
            onClick={handleClose}
            className="cancel"
          >
            Cancel
          </Button>
          <Button
            style={{
              width: "100%",
              height: "44px",
              color: textColors.dark,
              boxShadow:
                "0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #FFE866",
            }}
            type="submit"
            className="save"
          >
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};
export default StyledModal;
