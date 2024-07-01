import styled from "@emotion/styled";
import { fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.div<{ isTeacherAndSupport: boolean }>`
  display: flex;
  justify-content: ${(props) =>
    props.isTeacherAndSupport ? "space-between" : "flex-end"};
`;

export const Right = styled.div`
  display: flex;
  gap: 12px;
`;
export const MenuWrapper = styled.div``;
export const Flex = styled.div`
  display: flex;
  gap: 6px;
`;
export const Date = styled.div`
  color: ${textColors.blueGray};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 600;
  line-height: normal;
  letter-spacing: -0.12px;
`;
export const Label = styled.div`
  color: ${textColors.pepper};
  font-size: ${fontSizes.f12};
  font-style: normal;
  font-weight: 500;
  line-height: normal;
  letter-spacing: -0.12px;
`;
