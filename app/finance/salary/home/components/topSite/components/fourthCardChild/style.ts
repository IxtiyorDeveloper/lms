import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 8px;
  padding: 10px;

  .orange-card {
    padding: 20px;
    background: linear-gradient(180.12deg, #fa791d 52.24%, #fdbf76 121.78%);
    border-radius: 6px;
    text-align: center;
    color: ${textColors.white};
  }

  .midori-card {
    padding: 20px;
    background: linear-gradient(180deg, #44b26b 51.56%, #91e79e 131.7%);
    border-radius: 6px;
    text-align: center;
    color: ${textColors.white};
  }

  .number {
    font-size: ${fontSizes.f12};
    font-family: "Space Grotesk", sans-serif !important;
    font-weight: 500;
    margin-top: 10px;
  }

  .text {
    font-size: ${bgColors.white};
    font-weight: 600;
  }
`;
