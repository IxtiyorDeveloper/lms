import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div``;
export const CellFlex = styled.div`
  display: flex;
  gap: 23px;
  padding: 8px 6px;
`;
export const Cell = styled.div`
  cursor: pointer;
`;
export const Content = styled.div``;
export const Title = styled.div`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  display: flex;
  align-items: center;
  .icon {
    opacity: 0;
    cursor: pointer;
  }
  &:hover {
    .icon {
      opacity: 1;
    }
  }
`;
