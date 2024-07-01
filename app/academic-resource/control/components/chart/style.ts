import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";
import { HexToRgbA } from "utils/hexToRgba";

export const Wrapper = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 10px;
  .title-stat {
    color: ${textColors.blueGray};
    text-align: center;
    font-size: ${fontSizes.f12};
    font-weight: 700;
    line-height: 20px;
    letter-spacing: -0.12px;
  }

  .progress {
    width: 65%;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    border: 0.5px solid ${bgColors.whiteSmoke};
    background: ${bgColors.white};

    .tabPanelP {
      margin-top: auto;
    }
  }

  .pie {
    width: 35%;
    box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.05);
    border-radius: 12px;
    border: 0.5px solid ${bgColors.whiteSmoke};
    background: ${bgColors.white};

    .title {
      color: ${textColors.blueGray};
      font-size: ${fontSizes.f12};
      font-weight: 700;
      line-height: 20px;
      letter-spacing: -0.12px;
      padding: 20px;
    }
  }

  .userWrapper {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 10px;
    padding: 10px 20px;
    margin-top: 10px;
  }

  .button-title {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 4px;

    color: ${textColors.soulfulBlue};
    font-size: ${fontSizes.f10};
    font-weight: 600;
    letter-spacing: -0.1px;
  }
`;

export const UserItem = styled.div<{ color: string }>`
  display: flex;
  padding: 8px;
  gap: 8px;
  cursor: pointer;
  color: ${textColors.dark};
  text-align: center;
  font-size: 12px;
  font-weight: 500;
  letter-spacing: -0.12px;

  .flex {
    display: flex;
    gap: 4px;
    align-items: center;
    color: #777e90;
    font-size: ${fontSizes.f10};
    font-weight: 600;
    letter-spacing: -0.1px;

    .color {
      width: 5px;
      height: 5px;
      flex-shrink: 0;
      background: ${(props) => props.color};
      border-radius: 50%;
    }
  }

  &:hover {
    transition: 0.3s;
    background: ${(props) => HexToRgbA(props.color, 0.08)};
    border-radius: 6px;
    box-shadow: 0 0 1px 0 ${(props) => HexToRgbA(props.color, 0.08)} inset;

    .flex {
      color: black;
    }
  }
`;
