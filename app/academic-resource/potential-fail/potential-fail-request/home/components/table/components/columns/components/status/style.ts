import styled from "@emotion/styled";

export const Wrapper = styled.div<{ textColor: string }>`
  .ant-tag {
    display: flex;
    padding: 4px 6px;
    justify-content: center;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    color: ${(props) => props.textColor};
    font-size: 12px;
    font-style: normal;
    font-weight: 600;
    line-height: 20px; /* 166.667% */
    letter-spacing: -0.12px;
    width: fit-content;
  }
`;
