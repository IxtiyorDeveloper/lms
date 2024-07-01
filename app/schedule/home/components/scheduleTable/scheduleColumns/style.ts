import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Heading = styled.div`
  width: 100%;
  background: #f4f5f6;
  border-radius: 6px 4px 4px 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 0;

  .room {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.sceptreBlue};
    overflow-x: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  .brilliance {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brilliance};
  }
`;

export const Content = styled.div`
  width: calc(100% - 25px);

  .group_name {
    display: block;
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    color: ${textColors.white};
  }

  .subLevel {
    font-size: ${fontSizes.f10};
    font-weight: 500;
    text-shadow: none;
    color: ${textColors.white};
    letter-spacing: 0.3px;
  }
`;
export const Cell = styled.div`
  width: 100%;
  padding: 4px 5px;
  height: 100%;
  position: relative;

  .bg {
    position: absolute;
    bottom: 1px;
    right: 1px;
    background: green;
    width: 90% !important;
    height: 80% !important;
  }

  button {
    outline: none !important;
    border: none;
    height: 100%;
    border-radius: ${borders.b4};
    cursor: pointer;
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
    position: relative;

    a {
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;

      p {
        color: ${textColors.white};
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .new {
        position: absolute;
        top: -10px;
        right: -10px;
        z-index: 2;
      }

      .hand {
        position: absolute;
        top: -8px;
        right: -8px;
        width: 24px;
        height: 24px;
        background: #e92857;
        box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
          inset 4px 0 4px rgba(253, 136, 143, 0.7),
          inset -4px 0 4px rgba(253, 136, 143, 0.7);
        border-radius: 50%;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 2;
      }
    }
  }

  .primary {
    background: ${bgColors.primary};
  }

  .noGroup {
    width: 100%;
    opacity: 0;
    box-shadow: unset;

    &.black-type {
      opacity: 0;
    }

    &.start {
      background: black;
    }

    &:hover {
      opacity: 0;
    }
  }

  .fullPaid {
    width: 100%;
    background: ${bgColors.secondary};
    color: ${textColors.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
      inset 4px 0 4px rgba(112, 208, 136, 0.6),
      inset -4px 0 4px rgba(112, 208, 136, 0.6),
      inset 0 -4px 4px rgba(112, 208, 136, 0.6),
      inset 0 4px 4px rgba(112, 208, 136, 0.6);

    &.black-type {
      background: ${bgColors.yourShadow};
      color: ${textColors.brilliance};
      box-shadow: none !important;

      &:hover {
        background: ${bgColors.yourShadow};
        color: ${textColors.brilliance};
      }
    }

    &:hover {
      background: ${bgColors.secondary};
    }
  }

  .full {
    width: 100%;
    background: ${bgColors.royal};
    color: ${textColors.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
      inset 4px 0 4px rgba(135, 165, 255, 0.4),
      inset -4px 0 4px rgba(135, 165, 255, 0.4),
      inset 0 -4px 4px rgba(135, 165, 255, 0.4),
      inset 0 4px 4px rgba(135, 165, 255, 0.4);

    &.black-type {
      background: ${bgColors.yourShadow};
      color: ${textColors.brilliance};
      box-shadow: none !important;

      &:hover {
        background: ${bgColors.yourShadow};
        color: ${textColors.brilliance};
      }
    }
  }

  .notFull {
    width: 100%;
    background: ${bgColors.pop};
    color: ${textColors.white};
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
      inset 4px 0 4px rgba(253, 136, 143, 0.7),
      inset -4px 0 4px rgba(253, 136, 143, 0.7),
      inset 0 -4px 4px rgba(253, 136, 143, 0.7),
      inset 0 4px 4px rgba(253, 136, 143, 0.7);

    &.black-type {
      //opacity: 0;
    }

    &.start {
      background: ${bgColors.secondary};
      color: ${textColors.white};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
        inset 4px 0 4px rgba(112, 208, 136, 0.6),
        inset -4px 0 4px rgba(112, 208, 136, 0.6),
        inset 0 -4px 4px rgba(112, 208, 136, 0.6),
        inset 0 4px 4px rgba(112, 208, 136, 0.6);
    }

    &.middle {
      background: ${bgColors.royal};
      color: ${textColors.white};
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
        inset 4px 0 4px rgba(135, 165, 255, 0.4),
        inset -4px 0 4px rgba(135, 165, 255, 0.4),
        inset 0 -4px 4px rgba(135, 165, 255, 0.4),
        inset 0 4px 4px rgba(135, 165, 255, 0.4);
    }
  }

  .noDesign {
    width: 100%;
    background: ${bgColors.transparent};
    box-shadow: unset;

    &.black-type {
      opacity: 0;
    }
  }

  .default {
    width: 100%;
    background: ${bgColors.whiteSmoke};
    color: ${bgColors.dark};
    box-shadow: unset;

    &.black-type {
      opacity: 0;
    }
  }

  .black {
    background: ${bgColors.sceptreBlue};
    color: ${textColors.brilliance};
  }

  .pale {
    background: ${bgColors.pale};
  }

  .whiteSmoke {
    background: ${bgColors.whiteSmoke};
  }
`;
export const Wrapper = styled.div`
  table {
    table-layout: fixed;
    border-radius: 0 !important;

    @media (max-width: 1224px) {
      table-layout: auto !important;
    }
  }

  @media (max-width: 1224px) {
    table {
      table-layout: auto;
      border-radius: 0 !important;
    }
  }
`;
export const Container = styled.div<{ isNewGroup?: boolean }>`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 0 10px 0 6px;
`;
export const Name = styled.div`
  display: flex;

  .parentLevel {
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    color: ${textColors.white};
    width: fit-content;
    max-width: 70%;
  }
  .slash {
    width: 10px;
  }
  .level {
    text-align: left;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
    position: relative;
    color: ${textColors.white};
    flex: 1;
  }
`;
export const Badge = styled.div`
  background-color: ${bgColors.oregano};
  width: 20px;
  height: 20px;
  border-radius: 50%;
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 10px !important;
  letter-spacing: -0.01em;
  color: ${bgColors.white};
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Flex = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.2;
  letter-spacing: -0.01em;
  cursor: pointer;
  padding: 6px;
  gap: 4px;
  align-items: center;

  &:hover {
    background: ${bgColors.spruce};
  }

  &.new {
    width: calc(100% - 55px);
  }
  &.old {
    width: calc(100% - 25px);
  }
  .gr-name {
    display: flex;
    gap: 5px;
    color: ${textColors.brilliance};
    position: relative;
    align-items: center;
    flex: 1;

    .gr-inner-name {
      overflow-x: hidden;
      white-space: nowrap;
      text-overflow: ellipsis;
    }
    span {
      color: ${textColors.anakiwa};
    }
  }
  .new-icon {
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .freePlace {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 2px 6px;
    width: fit-content;
    height: 16px;
    background: #218054;
    border-radius: 20px;
    color: ${textColors.brilliance};
    font-weight: 600;
    font-size: ${fontSizes.f10};
    letter-spacing: -0.01em;
  }
`;
