import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";
export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  .icon {
    padding: 10px;
    cursor: pointer;
  }
`;
export const OperatorId = styled.div`
  display: flex;
  gap: 20px;
  padding-left: 20px;
  .id {
    font-weight: 500;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }
  .operator-id {
    font-weight: 700;
    font-size: ${fontSizes.f12};
    line-height: 1.5;
    letter-spacing: -0.01em;
    color: ${textColors.blueGray};
  }
`;
export const StatusType = styled.div<{ is_active: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 4px 10px;
  background: ${({ is_active }) =>
    is_active ? textColors.midori : textColors.pepper};
  border-radius: 8px;
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 1.5;
  letter-spacing: -0.01em;
  color: ${textColors.white};
  width: fit-content;
`;
