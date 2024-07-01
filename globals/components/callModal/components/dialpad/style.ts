import styled from "@emotion/styled";

export const Wrapper = styled.div`
  overflow: hidden;
  margin: 16px;

  ::-webkit-scrollbar {
    display: none;
  }

  .user {
    display: flex;
    gap: 16px;
    overflow: auto;

    ::-webkit-scrollbar {
      display: none;
    }

    .minWidth100 {
      min-width: 100%;
    }

    .user_item {
      min-width: 50%;
    }
  }
`;
