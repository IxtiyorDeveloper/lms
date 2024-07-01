import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const AmountWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 600;
  color: ${textColors.blueGray};
`;

export const ProductWrapper = styled.div`
  color: ${textColors.sceptreBlue};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  letter-spacing: -0.12px;

  .flex {
    display: flex;
    gap: 8px;
  }

  .info {
    align-self: center;
  }

  .item {
    display: flex;
    gap: 6px;

    .property {
      color: ${textColors.sadet};
      font-weight: 500;
    }
  }

  .count {
    margin-left: 20px;
    align-self: center;
  }
`;

export const DateTimeWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 600;
  color: ${textColors.blueGray};
`;

export const CellNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;

  .group_name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    color: ${textColors.blueGray};
    &:hover {
      text-decoration: underline;
    }
  }
  .image {
    border-radius: 50%;
  }
`;

export const TransferWrapper = styled.div`
  display: flex;
  width: 30px;
  height: 30px;
  padding: 6px;
  justify-content: center;
  align-items: center;
  gap: 8px;
  flex-shrink: 0;
  border-radius: 24px;
  background: ${bgColors.brilliance};
  border: 1px solid ${bgColors.purpleCrystal};
  align-self: center;
  cursor: pointer;
`;
