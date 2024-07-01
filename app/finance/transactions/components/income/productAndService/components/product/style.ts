import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const CellNameWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.blueGray};

  .image {
    border-radius: 50%;
  }
  p {
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    max-width: 220px;
    cursor: pointer;
  }
`;
