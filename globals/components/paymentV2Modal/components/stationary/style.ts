import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  margin: 24px 20px;
  display: flex;
  padding: 10px;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
  align-self: stretch;
  border-radius: 8px;
  border: 1px solid ${bgColors.purpleCrystal};
  background: ${bgColors.brilliance};
  box-shadow: 0 1px 1px 0 rgba(0, 0, 0, 0.05);

  .title {
    display: flex;
    color: ${textColors.sceptreBlue};
    font-size: ${fontSizes.f14};
    font-weight: 500;
    letter-spacing: -0.14px;
    justify-content: space-between;
    width: 100%;

    .item {
      display: flex;
      align-items: center;
      gap: 10px;

      .name {
        display: flex;
        overflow: hidden;
        height: 21px;
        .svg {
          margin-top: -10px;
          margin-right: -4px;
          margin-left: -12px;
        }
      }
    }

    .secondary {
      color: ${textColors.soulfulBlue};
      font-size: 12px;
      font-weight: 500;
      letter-spacing: -0.12px;
    }
  }

  .cards {
    display: flex;
    width: 100%;
    justify-content: space-between;
    gap: 14px;
  }
`;
