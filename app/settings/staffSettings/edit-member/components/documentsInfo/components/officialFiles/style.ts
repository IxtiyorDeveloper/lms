import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  .title {
    font-size: ${fontSizes.f14};
    font-weight: 600;
    margin: 10px 20px;
  }
`;

export const ItemWrapper = styled.div`
  margin-bottom: 20px;

  .pointer {
    cursor: pointer;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
`;
export const Container = styled.div`
  display: flex;
  width: 100%;
`;
export const ButtonWrapper = styled.div`
  height: 100%;
  display: flex;
  align-items: center;
`;
