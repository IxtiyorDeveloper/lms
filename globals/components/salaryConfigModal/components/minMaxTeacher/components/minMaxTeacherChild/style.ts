import styled from "@emotion/styled";

export const Wrapper = styled.div<{ isActive: boolean }>`
  display: ${(props) => (!props.isActive ? "none" : "unset")};
`;
