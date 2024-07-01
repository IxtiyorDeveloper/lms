import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";

export const Wrapper = styled.ul`
  list-style: none;
  text-align: right;
`;

export const ListWrapper = styled.li`
  font-size: ${fontSizes.f12};
  font-weight: 500;

  & > span {
    font-size: ${fontSizes.f10};
  }

  &:last-child {
    display: flex;
    justify-content: flex-end;
    align-items: center;
  }
`;
