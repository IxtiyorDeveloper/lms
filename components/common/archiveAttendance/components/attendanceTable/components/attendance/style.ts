import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const AttendanceWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: 100%;
  cursor: pointer;
  .full {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
`;

export const Unavailable = styled.div`
  width: 100%;
  height: 100%;
  background-color: ${bgColors.whiteSmoke};
  min-height: 59px;
  .inner {
    width: 100%;
    height: 100%;
  }
`;

export const ATWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${bgColors.transparent};
  overflow: hidden;
  gap: 9px;

  .icon {
    height: 26px;
    cursor: pointer;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.7;
    }
  }
`;

export const AbsentWrapper = styled.div``;

export const AbsContent = styled.div`
  padding: 10px;
`;

export const BtWr = styled.div`
  margin-top: 10px;
  display: flex;
  justify-content: flex-end;
  .button {
    padding: 3px 10px;
    min-height: unset;
  }
`;

export const AbsFlex = styled.div`
  position: relative;
  display: flex;
  padding: 10px 10px 0 10px;
  gap: 6px;
  .icon {
    position: absolute;
    right: 15px;
  }
`;

export const InsideAr = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${bgColors.transparent};
  border-radius: 114px;
  overflow: hidden;
  gap: 9px;
  padding: 6px;

  .icon {
    height: 30px;
    cursor: pointer;
    position: relative;
    &:hover {
      opacity: 0.8;
    }
    &:active {
      opacity: 0.7;
    }
  }
`;

export const Right = styled.div`
  h3 {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: ${textColors.black};
  }

  p {
    font-weight: 500;
    font-size: ${fontSizes.f10};
    line-height: 1.2;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }
`;
