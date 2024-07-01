import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  margin: 0 40px;
  background-color: ${bgColors.white};
  border-radius: 12px;

  & table * {
    font-size: ${fontSizes.f12};
  }

  .flex {
    display: flex;
    justify-content: center;
    width: 180px;
    align-items: center;
    gap: 10px;
    padding: 10px 0;

    .badge {
      background-color: ${bgColors.pop};
      padding: 0 4px;
      border-radius: 40px;
      color: ${textColors.white};
      margin-left: 10px;
    }
  }

  .stats {
    list-style: none;
    display: flex;
    align-items: center;
    gap: 15px;
    font-size: ${fontSizes.f10};
    font-weight: 500;
    margin-left: 20px;

    li {
      display: flex;
      align-items: center;
      gap: 4px;
      text-transform: lowercase !important;
    }

    li span {
      color: ${textColors.yourShadow};
    }

    li .dot {
      height: 8px;
      width: 8px;
      border-radius: 50%;
      background: ${bgColors.black};
    }
  }
`;
