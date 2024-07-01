import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Tick = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${bgColors.midori};
  border-radius: 50%;
`;

export const Wrapper = styled.div`
  display: flex;
  position: relative;

  .info {
    padding: 27px 0 0 190px;
    display: flex;
    flex-direction: column;
    gap: 10px;

    .p-full_name {
      color: ${textColors.blueGray};
      text-align: center;
      font-size: ${fontSizes.f20};
      font-style: normal;
      font-weight: 600;
      line-height: normal;
      letter-spacing: -0.2px;
    }

    .ph-row {
    }

    .role {
      border-radius: 20px;
      background: ${bgColors.primary};
      box-shadow: 0 0 2px 0 rgba(0, 0, 0, 0.25) inset;
      padding: 4px 8px 4px 4px;
      display: flex;
      gap: 6px;
      align-items: center;
      width: fit-content;

      .name {
        color: ${textColors.blueGray};
        text-align: center;
        font-size: ${fontSizes.f12};
        font-style: normal;
        font-weight: 600;
        line-height: normal;
        letter-spacing: -0.12px;
      }
    }
  }
`;
export const ImageContainer = styled.div`
  position: absolute;
  top: -32px;
  left: 30px;
  border-radius: 140px;
  border: 3px solid ${bgColors.brilliance};
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.25);
  .image {
    border-radius: 50%;
  }
`;
