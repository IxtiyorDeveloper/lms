import * as React from "react";
import { AntdModal, AntdSwitch, Button, MySelect } from "components";
import { TModal } from "./type";
import { Buttons, Content, ModalTitle } from "./style";
import { Input } from "components";
import { bgColors, textColors } from "styles/theme";
import { Spin } from "antd";
import { usePageDataMemo } from "hooks";

const CreateModal = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
  control,
  errors,
  buttonLoading,
  isLoading,
}: TModal) => {
  const selects = usePageDataMemo();
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <Spin spinning={isLoading}>
        <form onSubmit={handleSubmit(onSubmit)}>
          <ModalTitle>Create category</ModalTitle>
          <Content>
            <Input
              label="Name"
              name="general.name"
              control={control}
              placeholder="Type here..."
              error={errors?.general?.name?.message}
            />
            <MySelect
              label="Type"
              name="general.type"
              control={control}
              options={selects.leavingCategoryEnums}
              placeholder="Select"
              error={errors?.general?.type?.message}
            />
            <AntdSwitch
              name="general.effect_type"
              control={control}
              widthSwitch={20}
              label="Teacher lost"
              error={errors?.general?.effect_type?.message}
            />
          </Content>
          <Buttons>
            <Button
              style={{
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
              type="submit"
              className="save"
              buttonLoading={buttonLoading}
            >
              Save
            </Button>
          </Buttons>
        </form>
      </Spin>
    </AntdModal>
  );
};
export default CreateModal;
