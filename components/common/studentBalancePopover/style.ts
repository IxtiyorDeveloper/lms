import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div`
  display: flex;
  width: 371px;
  padding: 8px;
  flex-direction: column;
  align-items: flex-end;
  gap: 8px;
  border-radius: 8px;
  color: white;

  .card {
    display: flex;
    padding: 12px;
    align-items: center;
    gap: 8px;
    align-self: stretch;
    border-radius: 8px;
    background: ${bgColors.blueGray};

    .ant-segmented {
      background: ${bgColors.sceptreBlue} !important;
    }

    .t-white {
      color: ${textColors.white}!important;
    }

    .child {
      display: flex;
      padding: 12px;
      flex-direction: column;
      justify-content: center;
      align-items: flex-start;
      //gap: 8px;
      align-self: stretch;
      border-radius: 8px;
      background: ${bgColors.dark};
      margin-top: 8px;

      .item {
        display: flex;
        justify-content: space-between;
        width: 100%;
        align-items: center;
        border-bottom: 1px solid ${bgColors.blueGray};
        padding: 10px 0;
        .month {
          color: ${textColors.white};
          font-size: ${fontSizes.f14};
          font-weight: 500;
          letter-spacing: 0.5px;
        }
      }

      .item:first-child {
        padding-top: 4px !important;
      }
      .item:last-child {
        border-bottom: 0 !important;
      }
    }
  }

  .info {
    display: flex;
    flex-direction: column;
    gap: 8px;
    justify-content: center;

    .price {
      font-size: 14px;
      font-weight: 700;
    }

    .flex {
      display: flex;
      gap: 4px;
    }
  }
`;

export const Container = styled.div``;

export const PaymentWrapper = styled.div<{ type: "green" | "red" | "yellow" }>`
  display: flex;
  white-space: nowrap;
  border-radius: 4px;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  background-color: ${(props) =>
    props.type == "green"
      ? bgColors.midori
      : props.type == "red"
      ? bgColors.pop
      : props.type == "yellow"
      ? bgColors.primary
      : bgColors.pop};
  padding: 2px 4px;
  gap: 6px;
  color: ${(props) =>
    props.type !== "yellow" ? textColors.white : textColors.black};
  font-size: ${fontSizes.f10};
  font-weight: 600;
  letter-spacing: -0.1px;
  height: 16px;
`;
