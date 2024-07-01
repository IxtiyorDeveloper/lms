import styled from "@emotion/styled";

export const Wrapper = styled.div`
  .container {
    position: relative;
    //width: 100%;
    //height: 100vh;
  }
  .years {
    display: block;
    position: absolute;
    //width: 150px;
    //height: 150px;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    background: #1c1e2e;
    z-index: 999;
    border-radius: 100%;
    text-align: center;
  }
  .years:before {
    content: "";
    position: absolute;
    top: -17px;
    left: -17px;
    bottom: -17px;
    right: -17px;
    border-radius: 100%;
    border-right: 3px dotted #000;
    border-bottom: 3px dotted #000;
    border-top: 3px dotted transparent;
    border-left: 3px dotted transparent;
    transform: rotate(-45deg);
  }
  .years:after {
    content: "";
    position: absolute;
    top: -17px;
    left: -17px;
    bottom: -17px;
    right: -17px;
    border-radius: 100%;
    border-left: 3px dotted #dfbc82;
    border-top: 3px dotted #dfbc82;
    border-bottom: 3px dotted transparent;
    border-right: 3px dotted transparent;
    transform: rotate(-45deg);
  }
`;
