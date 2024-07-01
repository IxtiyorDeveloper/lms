import styled from "@emotion/styled";

export const ModalBody = styled.div``;
export const Content = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 44px;
  color: #23262f;
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 500;
  .icon {
    border-radius: 10px;
    backdrop-filter: blur(16px);
    position: relative;
    .merge_icon {
      top: 50%;
      left: 50%;
      position: absolute;
      transform: translate(-50%, -50%);
    }
  }
  button {
    width: 100%;
  }
`;
