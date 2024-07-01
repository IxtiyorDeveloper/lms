import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const HeaderCell = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
`;

export const AmountWrapper = styled.div`
  max-width: 120px;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
  cursor: pointer;
  font-size: ${fontSizes.f12};
  font-weight: 500;
  .next-link {
    text-decoration: underline;
  }
`;
export const AmountFlex = styled.div``;
export const PopoverContent = styled.p`
  padding: 10px;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  font-weight: 600;
`;

export const DateTimeWrapper = styled.div`
  font-size: ${fontSizes.f12};
  font-weight: 600;
  color: ${textColors.blueGray};
`;

export const CellNameWrapper = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.blueGray};
  a {
    display: flex;
    align-items: center;
    gap: 7px;
    &:hover {
      text-decoration: underline;
      color: ${textColors.blueGray};
    }
  }
  .amount {
    max-width: 90px;
    text-overflow: ellipsis;
    overflow-x: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  .image {
    border-radius: 50%;
  }

  .index {
    width: 7%;
  }

  .icon {
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    opacity: 0;
  }

  &:hover .icon {
    opacity: 1;
  }
`;
export const RowMark = styled.div<{ bgColor?: string }>`
  width: 5px;
  background: ${(props) => props.bgColor};
  border-radius: 0 5px 5px 0;
  min-height: 56px;
  display: flex;
`;
