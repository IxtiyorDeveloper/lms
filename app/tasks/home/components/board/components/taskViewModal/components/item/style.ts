import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const ItemWrapper = styled.div`
  margin-bottom: 12px;
`;

export const Name = styled.p`
  font-size: ${fontSizes.f12};
  color: ${textColors.harrison};
  font-weight: 500;
`;

export const Data = styled.p`
  font-size: ${fontSizes.f14};
  color: ${textColors.inDark};
  font-weight: 500;
`;
