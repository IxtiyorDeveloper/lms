import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const GroupWrapper = styled.div`
  background-color: ${bgColors.brilliance};
  border: 1px solid ${bgColors.white};
  box-shadow: 1px 1px 4px rgba(0, 0, 0, 0.14);
  padding: 20px 10px 10px 10px;
  border-radius: 12px;

  .students {
    list-style: none;
    max-height: 300px;
    overflow: auto;
    padding-top: 10px;

    li {
      display: flex;
      gap: 10px;
      align-items: center;
      padding: 12px 0;
      border-bottom: 1px solid ${bgColors.whiteSmoke};

      .index {
        color: ${textColors.yourShadow};
        font-weight: 600;
      }

      .student-name {
        font-size: ${fontSizes.f12};
        font-weight: 600;
        color: ${textColors.sceptreBlue};
      }
    }
  }

  .title {
    margin-bottom: 14px;
    font-size: ${fontSizes.f12};
    font-weight: 700;
  }

  .details {
    display: flex;
    justify-content: space-between;
    list-style: none;
    padding: 10px;
    background-color: ${bgColors.whiteSmoke};
    border-radius: 6px;
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.yourShadow};

    li {
      display: flex;
      align-items: center;
      gap: 10px;
    }
  }
`;
