import styled from "@emotion/styled";
import { bgColors, textColors } from "styles/theme";

export const CellWrapper = styled.div<{
  isNScore?: boolean;
  permission?: boolean;
  disabled?: boolean;
}>`
  font-weight: 500;
  display: flex;
  width: ${(props) => (!props?.isNScore ? "80px" : "unset")};
  justify-content: ${(props) => (!props?.isNScore ? "center" : "flex-start")};
  align-items: center;
  flex-direction: ${(props) => (!props?.isNScore ? "row-reverse" : "unset")};
  border: ${({ permission }) =>
    permission ? `1px solid ${bgColors.purpleCrystal}` : "unset"};
  border-radius: 8px;
  padding-right: 5px;
  gap: 25px;
  text-align: center;

  & .ant-input-number-input {
    //padding: 1px !important;
  }

  .supervisor {
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .total {
    font-weight: 700;
  }

  .numbers {
    & div {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      border-radius: 6px;
      padding: 2px 4px;
      cursor: pointer;
      user-select: none;
      min-width: 100px;
      text-align: center;
      justify-content: center;
      font-size: 14px;
      font-weight: 600;
      line-height: 24px;
      letter-spacing: -0.006em;
    }

    .status_not_started {
      background-color: ${bgColors.sceptreBlue};
      color: ${textColors.white};
    }
    .status_in_progress {
      color: ${textColors.white};
      background: ${bgColors.deep};
    }
    .status_pass,
    .PASS {
      background-color: ${bgColors.midori};
      color: ${textColors.white};
    }

    .status_fail_not_icon,
    .FAIL {
      background-color: ${bgColors.pop};
      color: ${textColors.white};
    }

    .status_cond,
    .CONDITIONAL {
      background-color: #f6c344;
      color: ${textColors.sceptreBlue};
    }

    .abse,
    .ABS {
      background-color: #202325;
      color: ${textColors.white};
    }

    .max {
      min-width: 100px;
      text-align: center;
    }
  }

  .actions-wrapper {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  ${(props) => (props.disabled ? "opacity:0.4;" : "")}
`;
export const Wrapper = styled.div`
  box-shadow: 0 -1px 12px rgba(0, 0, 0, 0.16);
  background-color: ${bgColors.white};
`;

export const Part = styled.div`
  margin: 5px auto;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${bgColors.primary};
  height: 36px;
  width: 36px;
  border-radius: 50%;
  & + p {
    color: ${textColors.sceptreBlue};
  }
`;

export const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  padding: 20px;
`;
