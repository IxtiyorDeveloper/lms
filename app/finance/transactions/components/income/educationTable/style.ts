import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const AmountWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 600;
  color: ${textColors.blueGray};
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
