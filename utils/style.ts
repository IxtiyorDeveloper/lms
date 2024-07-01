import styled from "@emotion/styled";

export const Flex = styled.div<{ gap?: string }>`
  display: flex;
  gap: ${(props) => props.gap};
  color: inherit;
  align-items: center;
`;
