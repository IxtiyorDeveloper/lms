import styled from "@emotion/styled";
import { Flex } from "antd";
import { bgColors } from "styles/theme";

export const MarkWrapper = styled(Flex)`
  display: inline-flex;
  border: 1px solid #e5e9eb;
  border-radius: 10px;
  padding: 16px 12px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  color: ${bgColors.white};
  background: ${bgColors.inDark};
`;
