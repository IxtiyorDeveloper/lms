import React, { FC } from "react";
import { ModalProps } from "antd/lib/modal";
import { StyledModal } from "./style";
import { ConfigProvider } from "antd";

interface Interface {
  padding?: string;
}

const ModalComponent: FC<ModalProps & Interface> = ({
  children,
  width = 340,
  padding = "20px 24px",
  ...props
}) => {
  return (
    <ConfigProvider theme={{ token: { motionUnit: 0.05 } }}>
      <StyledModal
        padding={padding}
        footer={null}
        // centered
        closable={false}
        {...props}
        width={width}
      >
        {children}
      </StyledModal>
    </ConfigProvider>
  );
};

export default ModalComponent;
