import styled from "@emotion/styled";

export const Wrapper = styled.div`
  width: 100%;

  .flex {
    display: flex;
  }
`;

export const Content = styled.div`
  width: 100%;
  margin-top: 20px;
  overflow: hidden;
`;

export const Leads = styled.div`
  width: 100%;
  z-index: 4;
  height: 100%;
  padding: 11px 0 11px 14px;
  border-radius: 6px;
  font-weight: 600;
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
