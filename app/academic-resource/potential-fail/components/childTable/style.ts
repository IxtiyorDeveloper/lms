import styled from "@emotion/styled";

export const Wrapper = styled.div<{ width: string }>`
  max-width: ${(props) => props.width};
  min-height: 165px;
  .swiper-slide {
    width: 200px !important;
  }
`;
