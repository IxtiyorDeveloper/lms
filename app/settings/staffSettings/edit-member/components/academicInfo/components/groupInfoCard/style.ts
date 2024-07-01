import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { GroupInfoCardType } from "./type";

export const CardWrapper = styled.div`
  padding: 10px 14px;
  border-radius: 8.9px;
  background: ${bgColors.white};
  box-shadow: 0px 1.77994px 3.55987px -0.88997px rgba(0, 0, 0, 0.07),
    0px 3.55987px 5.33981px -0.88997px rgba(0, 0, 0, 0.12);
  min-height: 72px;
  p {
    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f14};
  }
  .percent {
    color: ${textColors.dark};
    font-size: 10.68px;
    font-style: normal;
    font-weight: 600;
  }
`;

export const IconWrapper = styled.div<{ type: GroupInfoCardType }>`
  width: 32px;
  height: 32px;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ type }) => {
    switch (type) {
      case GroupInfoCardType.DONE:
        return "linear-gradient(180deg, #62B97B 0%, #74E296 100%)";
      case GroupInfoCardType.NOT_DONE:
        return "linear-gradient(180deg, #EF3F3F 0%, #FF7373 100%)";
    }
  }};
`;
