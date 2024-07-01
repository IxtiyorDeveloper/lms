import styled from "@emotion/styled";

export const Container = styled.div`
  .content {
    display: flex;
    padding: 20px 0;
    height: 400px;
  }
  .side {
    display: flex;
    align-items: center;
    justify-content: center;
    position: -webkit-sticky;
    position: sticky;
    top: 10px;
    width: 140px;
    height: 140px;
    color: #fff;
    background: #30b298;
  }
`;
