import styled from "@emotion/styled";

export const Wrapper = styled.div`
  overflow: hidden;
  max-width: 210px;
  display: flex;
  gap: 8px;
  align-items: center;

  .branch {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }
`;
