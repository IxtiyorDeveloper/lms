import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  padding: 16px;
  background: ${bgColors.whiteSmoke};
  border-radius: 12px;
  width: 25%;
`;
export const List = styled.div`
  margin-top: 16px;
`;
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 6px;
`;
export const FieldWrapper = styled.div`
  padding: 8px 14px;
  background: #ffffff;
  border: 1px solid #e6e8ec;
  border-radius: 6px;
  display: flex;
  width: 100%;

  &.active {
    border-radius: 6px;
    background: #fff199;
    border: 1px solid #ffe866;
    box-shadow: inset 0px 0px 8px #ffdf3f;
  }
`;
export const Icon = styled.div``;
export const Title = styled.p`
  font-weight: 600;
  font-size: 12px;
  line-height: 1.2;
  color: ${textColors.blueGray};
`;
export const Left = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
  flex: 1;
`;
export const Right = styled.div``;
