import styled from "@emotion/styled";
import { bgColors, fontSizes } from "styles/theme";

export const ActionWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

export const Action = styled.div`
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 28px;
  width: 28px;
  border: 1px solid ${bgColors.purpleCrystal};
  border-radius: 50%;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  padding: 14px;
  border-bottom: 1px solid ${bgColors.whiteSmoke};
`;

export const DepartmentWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  .name {
    font-size: ${fontSizes.f12};
    font-weight: 600;
  }
`;

export const RatingSide = styled.div`
  &
    :where(.css-dev-only-do-not-override-1b3mqjz).ant-rate
    .ant-rate-star:not(:last-child) {
    margin-inline-end: 0 !important;
  }
`;

export const RateWrapper = styled.div`
  scale: 0.7;
  margin-left: -20px;
  display: flex;
  align-items: center;
  gap: 5px;

  & > ins {
    text-decoration: unset;
  }
`;

export const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 40px;
  width: 40px;
  border-radius: 50%;
  background: linear-gradient(90deg, #ff5858 0%, #f09819 100%);
`;

export const Icon = styled.img`
  width: 20px;
`;
