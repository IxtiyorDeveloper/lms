import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const ChevronWrapper = styled.div`
  padding: 6px 0;
`;

export const CurrentTime = styled.span`
  color: ${textColors.midori};
`;

export const DateWrapper = styled.div`
  background: ${bgColors.white};
  padding: 8px 10px;
  font-size: ${fontSizes.f12};
  border-radius: 18px;
  box-shadow: 0 1px 2px 0 #0000001a;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
`;

export const IconWrapper = styled.div<{ color: string }>`
  background: ${(props) => props.color};
  height: 34px;
  width: 34px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const TextWrapper = styled.div`
  background: ${bgColors.white};
  padding: 8px 10px;
  font-size: ${fontSizes.f12};
  border-radius: 18px;
  box-shadow: 0 1px 2px 0 #0000001a;
  font-weight: 600;
  display: flex;
  gap: 6px;
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

export const FlexDiv = styled.div`
  display: flex;
  gap: 4px;
`;

export const Wrap = styled.div`
  .label {
    margin: 0 20px 6px 20px;
  }

  margin-bottom: 8px;
`;

export const WrapperLen = styled.div`
  box-shadow: 0 1px 1px 0 #0000000f, 0 2px 4px 0 #0000000a inset;
  background: ${bgColors.whiteSmoke};
  margin: 0 20px;
  border-radius: 12px;
  display: flex;
  gap: 8px;
  padding: 10px;

  & .ant-steps-item-content {
    min-height: 37px !important;
  }

  & .ant-steps-item-description {
    padding-bottom: 0 !important;
  }
`;

export const WrapperStatus = styled.div`
  border-radius: 20px;
  padding: 0 4px;
  font-size: ${fontSizes.f12};
  font-weight: 500;
`;
