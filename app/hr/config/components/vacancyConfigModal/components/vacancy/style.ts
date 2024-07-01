import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const WrapperRoleName = styled.div`
  margin: 22px 0 20px;
`;
export const WrapperFormItem = styled.div`
  .label {
    font-size: ${fontSizes.f12};
    font-weight: 500;
    color: ${textColors.sceptreBlue};
  }
`;
export const FormItem = styled.div`
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.blueGray};
  background: ${bgColors.brilliance};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
`;

export const RoleName = styled.div`
  padding: 10px;
  border-radius: 6px;
  margin-top: 10px;
  font-size: ${fontSizes.f12};
  color: ${textColors.sadet};
  background: ${bgColors.cascading};
  border: 1px solid ${bgColors.purpleCrystal};
  box-shadow: 0 1px 4px 0 rgba(0, 0, 0, 0.05);
`;
export const Title = styled.div<{ distance?: number }>`
  font-weight: 600;
  font-size: ${fontSizes.f12};
  color: ${textColors.blueGray};
  margin-bottom: ${({ distance }) => (distance ? `${distance}px` : "0")};
`;

export const CollapseWrapper = styled.div`
  .collapse {
    border: none;
    background-color: ${bgColors.white};
    display: flex;
    flex-direction: column;
    gap: 6px;
    margin-bottom: 20px;
    .ant-collapse-item {
      border: 1px solid ${bgColors.purpleCrystal};
      border-radius: 6px !important;
    }
    .ant-collapse-header {
      padding: 10px !important;
    }
    .ant-collapse-item-active {
      border-radius: 6px !important;
      border: 1px solid ${bgColors.primary} !important;
    }
  }
`;

export const CollapseItemWrapper = styled.div`
  .col_item {
    display: flex;
    align-items: center;
    gap: 12px;
  }
  .panel_item {
    padding: 5px 10px;
    &:first-of-type {
      padding-top: 10px;
    }
    &:last-child {
      padding-bottom: 10px;
    }
  }
`;

export const SourceWrapper = styled.div`
  margin: 20px 0 40px;
`;
