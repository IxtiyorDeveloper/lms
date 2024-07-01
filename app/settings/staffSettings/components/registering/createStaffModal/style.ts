import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ItemWrapper = styled.div`
  width: 100%;
  margin-bottom: 20px;
  .pointer {
    cursor: pointer;
  }
`;

export const Flex = styled.div`
  display: flex;
  gap: 10px;
`;

export const Label = styled.p`
  padding: 0;
  margin: 0 0 10px 0;
`;

export const TypeWrapper = styled.div`
  display: flex;
  gap: 10px;
  justify-content: space-between;
`;

export const Type = styled.div`
  width: 100%;
  cursor: pointer;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 60px;
  font-weight: 600;
  border-radius: 6px;
`;

export const Title = styled.h1`
  font-size: ${fontSizes.f14};
  font-weight: 700;
  line-height: 1.5;
  margin-bottom: 16px;
`;
