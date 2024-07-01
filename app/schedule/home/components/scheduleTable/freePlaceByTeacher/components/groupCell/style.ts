import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";
import { css } from "@emotion/react";

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
export const Cell = styled.div`
  width: 100%;
  padding: 4px 5px;
  height: 100%;
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
export const TeacherCell = styled.div`
  width: 100%;
  height: 100%;
  padding: 4px;

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
      padding: 0 6px;

      p {
        color: ${textColors.white};
        white-space: nowrap;
        text-overflow: ellipsis;
        overflow: hidden;
      }

      .new {
        position: absolute;
        top: -8px;
        right: -8px;
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
    width: 100%;
    text-align: left;
    justify-content: flex-start;
  }

  .noGroup {
    width: 100%;
    opacity: 0;
    box-shadow: unset;

    &.invisible {
      opacity: 0;
    }
  }

  .fullPaid {
    width: 100%;
    background: ${bgColors.yourShadow};
    color: ${textColors.brilliance};
    text-align: left;
    justify-content: flex-start;

    &.invisible {
      opacity: 0;
    }
  }

  .full {
    width: 100%;
    background: ${bgColors.yourShadow};
    color: ${textColors.brilliance};
    text-align: left;
    justify-content: flex-start;

    &.invisible {
      opacity: 0;
    }
  }

  .notFull {
    width: 100%;
    background: ${bgColors.pop};
    color: ${textColors.white};
    text-align: left;
    justify-content: flex-start;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2),
      inset 4px 0 4px rgba(253, 136, 143, 0.7),
      inset -4px 0 4px rgba(253, 136, 143, 0.7),
      inset 0 -4px 4px rgba(253, 136, 143, 0.7),
      inset 0 4px 4px rgba(253, 136, 143, 0.7);

    &.invisible {
      opacity: 0;
    }
  }

  .noDesign {
    width: 100%;
    background: ${bgColors.transparent};
    box-shadow: unset;

    &.invisible {
      opacity: 0;
    }
  }

  .default {
    width: 100%;
    background: ${bgColors.whiteSmoke};
    color: ${bgColors.dark};
    box-shadow: unset;

    &.invisible {
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
export const TeacherContainer = styled.div<{ free_place: boolean }>`
  color: ${textColors.white};
  ${({ free_place }) =>
    free_place
      ? css`
          width: calc(100% - 30px);
        `
      : css`
          width: calc(100%);
        `}
}

.new {
  position: absolute;
  top: -8px;
  right: -8px;
}

.abs {
  position: absolute;
  right: 10px;
  top: 10px;
  background-color: ${bgColors.oregano};
  height: 20px;
  padding: 0 6px;
  min-width: 20px;
  border-radius: ${borders.b20};
  font-weight: 700;
  font-size: ${fontSizes.f12};
  line-height: 10px !important;
  letter-spacing: -0.01em;
  color: ${bgColors.white};
  display: flex;
  justify-content: center;
  align-items: center;
}
`;
