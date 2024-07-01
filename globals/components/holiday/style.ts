import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

export const Buttons = styled.div`
  display: flex;
  gap: 10px;
  margin-top: 50px;
  justify-content: flex-end;

  .cancel {
    padding: 10px 24px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }

  .save {
    padding: 10px 24px;
    color: ${textColors.dark};
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1), inset 0 4px 6px #ffe866;
  }
`;
export const InputNumberWrapper = styled.div`
  display: flex;
  gap: 10px;
`;
export const ImageWrapper = styled.div`
  position: relative;
  height: fit-content;
  background: linear-gradient(
    360deg,
    #fff199 6.53%,
    rgba(252, 252, 253, 0) 100%
  );
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.06);
  padding: 20px 16px 0 16px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;

  & img {
    position: relative;
    height: 520px;
  }

  & img::after {
    content: "";
    position: absolute;
    display: block;
  }
`;

export const SMS = styled.div`
  position: absolute;
  top: 25%;
  left: 30%;
  z-index: 99;
  background: #e4e3e6;
  padding: 7px;
  border-radius: 8px;
  width: 35%;
  box-shadow: 1px 0 10px ${bgColors.purpleCrystal};
  font-size: ${fontSizes.f9};

  &::before {
    content: "";
    position: absolute;
    display: inline-block;
    height: 18px;
    width: 8px;
    background: #e4e3e6;
    bottom: -3px;
    left: -2%;
    border-bottom-right-radius: 10px;
  }

  &::after {
    content: "";
    position: absolute;
    display: inline-block;
    height: 18px;
    width: 7px;
    background: white;
    bottom: 0;
    left: -3.5%;
    border-bottom-right-radius: 10px;

    @media (min-width: 1250px) and (max-width: 1540px) {
      left: -6%;
    }
  }
`;
export const TimeWrapper = styled.div`
  background: ${bgColors.white};
  box-shadow: inset 0 0 40px rgba(0, 0, 0, 0.06);
  border-radius: ${borders.b6};
  padding: 20px;
  .rows {
    margin-top: 24px;
    display: flex;
    flex-direction: column;
    gap: 16px;
  }
`;
export const TimeRow = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  .switch {
    display: flex;
    justify-content: flex-start;
    gap: 10px;
    width: 50%;
    .switch-wrapper {
      width: fit-content;
    }
    .day {
      width: 100%;
    }
  }
  .times {
    width: 50%;
    display: flex;
    justify-content: flex-end;
    gap: 10px;
  }
`;
