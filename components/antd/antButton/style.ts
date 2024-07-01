import styled from "@emotion/styled";
import { css } from "@emotion/react";
import { Button } from "antd";
import { fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
`;
export const ImageWrapper = styled.div<{}>`
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const TextWrapper = styled.div<{}>`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  text-align: center;
  letter-spacing: -0.01em;
  color: #b1b5c4;
  text-transform: none !important;
`;
export const StyledButton = styled(Button)<{ isClickAnimation: boolean }>`
  ${({ isClickAnimation }) =>
    !isClickAnimation &&
    css`
      [ant-click-animating-without-extra-node="true"]::after {
        display: none !important;
      }
    `}
`;
