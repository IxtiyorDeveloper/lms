import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 0 40px;
  padding: 20px 16px;
  background: ${bgColors.white};
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  border-radius: 8px;

  .title {
    font-weight: 700;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    margin-bottom: 30px;
  }
`;

export const Flex = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const PhoneNumber = styled.p`
  display: flex;
  flex-wrap: wrap;
  gap: 5px;

  & .phone {
    color: ${textColors.white};
    padding: 2px 4px;
    border-radius: 5px;
    background-color: ${bgColors.midori};
  }
`;

export const Exclusions = styled.div`
  padding: 10px;
  display: flex;
  gap: 3px;
  max-width: 400px;
  flex-wrap: wrap;

  .phone {
    color: ${textColors.white};
    padding: 2px 4px;
    border-radius: 5px;
    background-color: ${bgColors.midori};
    font-size: ${fontSizes.f10};
    font-weight: 600;
  }
`;
