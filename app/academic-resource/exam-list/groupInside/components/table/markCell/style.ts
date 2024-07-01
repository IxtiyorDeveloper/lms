import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

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
    display: flex;
    align-items: center;
    flex-wrap: wrap;
    gap: 5px;

    & span {
      padding: 2px 5px;
      border-radius: 5px;
      font-weight: 500;
      cursor: pointer;
    }

    .pass,
    .PASS {
      background-color: ${bgColors.midori};
      color: ${textColors.white};
    }

    .fail,
    .FAIL {
      background-color: ${bgColors.pop};
      color: ${textColors.white};
    }

    .cond,
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
export const Container = styled.div<{ disabled: boolean }>`
  background: ${(props) =>
    props.disabled ? bgColors.whiteSmoke : bgColors.white};
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 4px;
  padding: 3px;

  .ant-input-number {
    border: none !important;
  }
  .ant-input-number-input {
    padding: 2px 2px 2px 5px !important;
  }
  .ant-input-number-disabled {
    background: transparent !important;
  }
`;
export const EResult = styled.div``;
export const Numbered = styled.p`
  text-align: center;
`;
export const MaxPoint = styled.div<{ disabled: boolean }>`
  background: ${(props) =>
    props.disabled ? bgColors.purpleCrystal : bgColors.whiteSmoke};
  border-radius: 2px;
  font-style: normal;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  color: ${textColors.yourShadow};
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 3px 6px;
`;
export const Flex = styled.div`
  display: flex;
  .e-result {
    width: 35px !important;
  }
`;
