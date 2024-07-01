import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const DepartmentName = styled.p`
  font-size: ${fontSizes.f12};
  font-weight: 600;
`;

export const Wrapper = styled.div`
  position: relative;
  border: 1px solid ${bgColors.hat}50;
  border-radius: 8px;
  .staff_icon {
    position: relative;
    width: fit-content;
    margin: 0 auto;
  }
  a {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 3px;
    &:hover {
      color: ${textColors.dark};
    }
  }
`;

export const Badge = styled.span`
  background: ${bgColors.pepper};
  color: ${textColors.white};
  font-size: ${fontSizes.f10};
  line-height: ${fontSizes.f16};
  font-weight: 700;
  border-radius: 40px;
  padding: 2px 6px;
`;

export const StaffWrapper = styled.div`
  position: relative;
  padding: 10px 16px;
  text-align: center;
  background-color: ${bgColors.white};
  transition: 0.3s;
  cursor: pointer;
  border-radius: 10px;

  width: 170px;

  &:hover {
    box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
      0px 0px 14px -4px rgba(0, 0, 0, 0.05),
      0px 32px 48px -8px rgba(0, 0, 0, 0.1);
  }
`;

export const StarsWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 4px;
`;

export const DropMenu = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;
