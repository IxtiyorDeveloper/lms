import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { IInnerWrapper } from "./type";

export const Wrapper = styled.div`
  width: 100%;

  .action {
    position: absolute;
    right: 8px;
    display: flex;
    gap: 4px;
    z-index: 1000;
    border-radius: 5px;
    height: 28px;
    background: rgba(255, 255, 255, 0.5);
    align-self: center;
    align-items: center;
    justify-content: center;
    margin-right: 5px;
  }

  .actionItem {
    visibility: hidden;
    display: none;
    border: 1px solid ${bgColors.white};
  }

  .actionItemActive {
    visibility: visible;
    padding: 6px 2px -2px 2px;
  }
`;
export const InnerWrapper = styled.div<IInnerWrapper>`
  -webkit-user-select: none;
  -ms-user-select: none;
  user-select: none;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .end {
    display: flex;
    justify-content: flex-end;
  }

  .tabs {
    list-style: none;
    width: ${({ tabWidth }) => tabWidth};
    display: flex;
    gap: ${(props) => props.gap};
    border-bottom: ${({ isBorderBottom }) =>
      isBorderBottom ? `1px solid ${bgColors.whiteSmoke}` : "unset"};
    overflow: hidden;
    @media (max-width: 1150px) {
      overflow-x: auto;
      background: transparent;
    }
  }

  .tabs li {
    position: relative;
    cursor: pointer;
    width: ${({ isSimpleBtn }) => (isSimpleBtn ? "unset" : "25%")};
  }

  .tabs .tab {
    float: left;
    width: 100%;
    font-weight: 600;
    line-height: 15px;
    text-decoration: none;
    letter-spacing: -0.01em;
    font-size: ${fontSizes.f12};
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
    -moz-border-radius-topleft: 15px;
    -moz-border-radius-topright: 15px;
    -webkit-border-top-left-radius: 15px;
    -webkit-border-top-right-radius: 15px;
    padding: ${(props) => props.padding || "6px"};
    background: ${(props: any) =>
      props.style?.backgroundColor
        ? props.style?.backgroundColor
        : bgColors.purpleCrystal};
  }

  .tab svg {
    opacity: 0.5;
  }

  .active .tab svg {
    opacity: 1;
  }

  .tabs .active {
    z-index: 3;
  }

  .tab {
    color: ${(props) => props.textColor || textColors.blueGray};
  }

  .tabs .active .tab {
    background: ${(props) => props.tabBg || bgColors.white};
    color: ${(props) => props.activeTColor || textColors.blueGray};
  }

  .tabs li:before,
  .tabs li:after,
  .tabs li .tab:before,
  .tabs li .tab:after {
    position: absolute;
    bottom: 0;
  }

  .tabs li:last-child:after,
  .tabs li:last-child .tab:after,
  .tabs li:nth-of-type(1):before,
  .tabs li:nth-of-type(1) .tab:before,
  .tabs .active:after,
  .tabs .active:before,
  .tabs .active .tab:after,
  .tabs .active .tab:before {
    content: "";
  }

  .tabs .active:before,
  .tabs .active:after {
    background: ${(props) => props.activeTabBg || bgColors.white};
    z-index: 1;
  }

  .tabs li:before,
  .tabs li:after {
    background: ${(props) =>
      props.beforeColor
        ? props.beforeColor
        : props.bgColor || bgColors.primary};
    width: 10px;
    height: 10px;
  }

  .tabs li:before {
    left: -10px;
  }

  .tabs li:after {
    right: -10px;
  }

  .tabs li .tab:after,
  .tabs li .tab:before {
    width: 20px;
    height: 20px;
    -webkit-border-radius: 10px;
    -moz-border-radius: 10px;
    border-radius: 10px;
    background: ${({ beforeColor }) => beforeColor || bgColors.hat};

    /* Circles over squares */
    z-index: 2;
  }

  .tabs .active .tab:after,
  .tabs .active .tab:before {
    background-color: ${(props: any) =>
      props.style?.backgroundColor
        ? props.style?.backgroundColor
        : bgColors.purpleCrystal};
  }

  .tabs li:nth-of-type(1).active .tab:before,
  .tabs li:last-child.active .tab:after {
    background: ${({ beforeColor }) => beforeColor || bgColors.hat};
  }

  .tabs li .tab:before {
    left: -20px;
  }

  .tabs li .tab:after {
    right: -20px;
  }

  .tabs .active .tab .button {
    border-radius: ${borders.b6};
    display: flex;
    justify-content: ${({ tabsAlign }) =>
      tabsAlign === "center"
        ? "center"
        : tabsAlign === "left"
        ? "flex-start"
        : "flex-end"};
    align-items: center;
  }

  .tabs .tab .button {
    display: flex;
    border-radius: ${borders.b6};
    background-color: ${(props) => props.bgColor};
    justify-content: ${({ tabsAlign }) =>
      tabsAlign === "center"
        ? "center"
        : tabsAlign === "left"
        ? "flex-start"
        : "flex-end"};
    align-items: center;
  }

  .add {
    display: flex;
    align-items: center;
  }
`;
export const TabWrapper = styled.div`
  width: 100%;
`;
