import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TableWrapper = styled.div`
  background: ${bgColors.white};
  border-top: 1px solid ${bgColors.whiteSmoke};
`;

export const LeftWrapper = styled.div`
  display: flex;
  gap: 15px;
`;
export const SwitchWrapper = styled.div`
  display: flex;
  height: 100%;
  width: auto;
`;
export const ButtonWrapper = styled.div`
  padding: 20px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
  display: flex;
  gap: 10px;
`;

export const TabWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 9px;
  font-weight: 700;
`;

export const HeaderCell = styled.p`
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 1;
  letter-spacing: -0.01em;
  color: ${textColors.paleSky};
  width: 100%;
  padding: 16px 0;
`;

export const CellNameWrapper = styled.div`
  min-width: 700px;
  align-items: center;
  display: flex;
  color: ${textColors.sceptreBlue} !important;

  .divider {
    background: #ffcf00;
    border-radius: 0 5px 5px 0;
    width: 3px;
    margin-left: -13px;
    margin-right: 13px;
  }

  .index {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 1.2;
    letter-spacing: -0.01em;
  }

  .image {
    margin-left: 21px;
  }

  .name {
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    margin-left: 14px;
    align-self: center;
    white-space: nowrap;
  }
`;

export const TeacherLostWrapper = styled.span<{ color?: string }>`
  padding: 4px 6px;
  border-radius: 4px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  background: ${(props) => props.color || bgColors.pop};
  color: ${textColors.white};
`;

export const ActionsWrapper = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
  max-width: 150px;
  height: 52px;
  .box {
    height: 100%;
    padding: 0 4px;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
  }
`;
