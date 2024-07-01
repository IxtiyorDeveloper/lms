import styled from "@emotion/styled";
import Link from "next/link";
import { fontSizes, textColors } from "styles/theme";

export const StyledLink = styled(Link)`
  margin-left: 7px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  color: ${textColors.blueGray};
  &:hover {
    text-decoration: underline;
  }
`;

export const StyledLinkWithOutLink = styled.div`
  margin-left: 7px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  color: ${textColors.blueGray};
  &:hover {
    text-decoration: underline;
  }
`;
