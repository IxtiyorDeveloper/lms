import * as React from "react";
import { TModal } from "./type";
import { Buttons, Content, IconWrapper, Text } from "./style";
import { AntdModal, Button, Input, StudentCard } from "components/index";
import { bgColors } from "styles/theme";

const ActionModal = ({
  open,
  onSubmit,
  icon,
  text,
  blurColor,
  handleClose,
  boxShadow,
  handleSubmit,
  type,
  control,
  label,
  vertical,
  errors,
  cancelButtonText,
  submitButtonText,
  buttonStyles,
  buttonLoading,
  iconBlur,
  width,
  student,
  nameKey,
  component = () => <></>,
}: TModal) => {
  return (
    <AntdModal width={width || 340} open={open} onCancel={handleClose} centered>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Content>
          {icon && (
            <IconWrapper>
              <div className="svg">{icon}</div>
              <div
                className="blur"
                style={{
                  backgroundColor: iconBlur ?? blurColor ?? bgColors.primary,
                }}
              />
            </IconWrapper>
          )}
          <Text>{text}</Text>
          {student && (
            <div className="card">
              <StudentCard data={student} nameKey={nameKey} />
            </div>
          )}
        </Content>
        {component(control, errors)}
        {type && (
          <Input
            name="comment"
            control={control}
            label={label}
            type={type}
            error={errors?.comment?.message}
          />
        )}

        <Buttons vertical={vertical}>
          <Button
            className="cancel"
            onClick={handleClose}
            style={{
              backgroundColor: bgColors.wildSand,
              width: "100%",
            }}
          >
            {cancelButtonText || "Cancel"}
          </Button>
          <Button
            className="save"
            type="submit"
            buttonLoading={buttonLoading}
            style={{
              backgroundColor: blurColor ?? bgColors.primary,
              boxShadow: boxShadow,
              width: "100%",
              ...buttonStyles,
            }}
          >
            {submitButtonText || "Delete"}
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};
export default ActionModal;

ActionModal.defaultProps = {
  handleSubmit: () => () => {},
};
