import styled from "@emotion/styled";

export const Wrapper = styled.div`
  overflow-x: hidden;

  .rounded-tab {
    min-height: 45px;
    width: 100%;
  }
`;

export const TabNameWrapper = styled.p`
  overflow-x: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;

  @media (max-width: 1350px) {
    width: 100px;
  }
`;

export const TabVisibility = styled.div`
  .popoverless {
    display: block;
  }

  .popover {
    display: none;
  }

  @media (max-width: 1350px) {
    .popoverless {
      display: none;
    }

    .popover {
      display: block;
    }
  }
`;

export const TabWrap = styled.span`
  padding: 5px 10px;
`;
