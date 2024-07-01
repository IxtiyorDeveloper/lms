import styled from "@emotion/styled";
import Link from "next/link";
import { fontSizes, textColors } from "styles/theme";

export const TabSection = styled(Link)`
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
  min-height: 48px;
  overflow: hidden;
`;

export const Label = styled.div`
  width: 100%;
  height: 22px;
  display: flex;
  justify-content: space-between;
  gap: 10px;
  align-items: center;
  font-weight: 600;
  p {
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
`;

export const Count = styled.div`

  .ant-badge-count {
    box-shadow: none !important;
  }
`;
