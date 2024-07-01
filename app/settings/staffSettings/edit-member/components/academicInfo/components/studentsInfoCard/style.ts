import styled from "@emotion/styled";

export const InfoCard = styled.div`
  padding: 16px;
  padding-right: 0;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.16);
  display: flex;
  flex-direction: column;
  cursor: pointer;
  justify-content: space-between;
  height: 100%;
  width: 100%;
  gap: 8px;
  position: relative;
  .abs {
    position: absolute;
    right: -6.142px;
    top: -5px;
    border-radius: 29.87px;
    background: #e92857;
    display: flex;
    padding: 4px 6px;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    gap: 7.468px;
    color: #fcfcfd;
    font-size: 14px;
    font-style: normal;
    font-weight: 700;
    line-height: 11.948px; /* 85.343% */
    letter-spacing: -0.14px;
  }
  .title {
    color: #8a92a6;
    font-size: 16px;
  }

  .value {
    font-weight: 600;
    font-size: 20px;
    color: #232d42;
  }
  .row {
    display: flex;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    padding-right: 20px;
    gap: 2px;
  }
  .img {
    width: 56px;
    height: 56px;
    background: #ffffff;
    box-shadow: 0px 8px 24px rgba(149, 157, 165, 0.16);
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    position: relative;
  }
  .bg {
    position: absolute;
    background: #ffcf00;
    width: 16.429px;
    height: 16.429px;
    flex-shrink: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 3px;
    border-radius: 50%;
    right: -5px;
    bottom: -5px;
  }
  .skeleton_title {
    
  }
`;
