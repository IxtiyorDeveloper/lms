import styled from "@emotion/styled";
import { bgColors, borders } from "styles/theme";

export const ParentWrapper = styled.div`
  width: 100%;
`;

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
  width: 100%;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);
  border-radius: ${borders.b6};
`;

export const Container = styled.div`
  overflow: hidden;
  margin-top: 0;
  display: flex;
  align-items: center;
  position: relative;
  width: 33.33%;
  background: ${bgColors.yukon};
  border-radius: 6px;
  .abs {
    position: absolute;
    right: 5px;
    top: 0;
  }
`;
