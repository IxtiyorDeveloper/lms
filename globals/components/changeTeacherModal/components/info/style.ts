import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  margin-top: 20px;

  .item {
    border-radius: 12px;
    border: 1px solid ${bgColors.purpleCrystal};
    background: ${bgColors.whiteSmoke};
    padding: 14px;

    .childs {
      display: flex;
      margin-top: 23px;
      gap: 3px;
      align-items: center;

      .child {
        display: flex;
        width: 276px;
        padding: 12px;
        flex-direction: column;
        justify-content: center;
        align-items: flex-start;
        gap: 24px;
        border-radius: 10px;
        background: ${bgColors.brilliance};
        box-shadow: 0px 1px 4px 0px rgba(0, 0, 0, 0.05);

        .info {
          display: flex;
          border-radius: 6px;
          background: ${bgColors.whiteSmoke};
          padding: 12px 35px 12px 14px;
          width: 100%;
          align-items: center;
          gap: 14px;
          color: ${textColors.blueGray};
          font-size: 14px;
          font-weight: 500;
          letter-spacing: -0.14px;
        }

        .no-name {
          color: ${textColors.sadet};
        }
      }
    }
  }
`;
