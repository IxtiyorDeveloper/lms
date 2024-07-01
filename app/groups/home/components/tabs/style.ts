import styled from "@emotion/styled";
import { fontSizes } from "styles/theme";

export const TabSection = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 10px;
  width: 100%;
  z-index: 4;
  height: 100%;
  font-size: ${fontSizes.f12};
  padding: 11px 14px;
  line-height: 15px;
  letter-spacing: -0.01rem;
  border-radius: 6px;
  font-weight: 600;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Flex = styled.div`
  display: flex;
  justify-content: flex-start;
  gap: 10px;
  align-items: center;
`;
