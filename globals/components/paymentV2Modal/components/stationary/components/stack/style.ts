import styled from "@emotion/styled";

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
`;

export const Item = styled.div<{ index: number; max: number }>`
  width: 70px !important;
  height: 80px;
  margin-right: -${(props) => props.index * 12}px;
  transition: margin 0.3s;
  -webkit-transition: margin 0.3s;
  scale: ${(p) => 1 - 0.1 * p.index};
  border-radius: 1.231px;
  //box-shadow: -2px 0 6px 0 rgba(0, 0, 0, 0.16);

  &:hover {
    transition: scale 0.3s;
    scale: 1;
    margin-left: 0;
    z-index: 10000;
  }
`;
