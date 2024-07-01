import Image from "next/image";
import styled from "@emotion/styled";
import { Typography } from "@mui/material";

import { TMenuItemStyled, TStyledImage } from "./type";
import { bgColors, fontSizes } from "styles/theme";

export const LogoContainer = styled.div`
  padding: 20px;
  height: 74px;
`;

export const Divider = styled.div`
  opacity: 0.1;
  border: 0.5px solid ${bgColors.white};
  height: 0;
`;

export const MenuContainer = styled.div`
  padding: 20px 0;
`;

export const MenuItemStyled = styled.div`
  display: flex;
  height: 36px;
  width: ${(props: TMenuItemStyled) => (props.width ? props.width : "180px")};
  border-radius: 6px;
  color: ${bgColors.white};
  transition: 0.3s;
  margin: 9px 20px;
  align-items: center;
  justify-content: space-between;
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: rgba(179, 179, 179, 0.1);
    cursor: pointer;
  }

  .title {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 1.2;
  }

  .verticalDivider {
    width: 2px;
    height: 100px;
  }

  &:hover .title {
    font-weight: 600;
    transition: 0.5s;
  }
`;

export const StyledImage = styled(Image)`
  transform: rotate(${(props: TStyledImage) => (!props.open ? "0" : "90deg")});
  margin-right: 13px;
  transition: 0.5s;
`;

export const MenuTextStyled = styled(Typography)`
  font-weight: 400;
  font-size: ${fontSizes.f14};
  line-height: 1.2;
  letter-spacing: -0.01em;
  color: ${bgColors.white}!important;
  text-overflow: ellipsis;
  overflow-x: hidden;
  white-space: nowrap;
`;
