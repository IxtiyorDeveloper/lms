import styled from "@emotion/styled";
import { bgColors, borders, fontSizes } from "styles/theme";

export const Wrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0;
  gap: 14px;
`;
export const BoxWrapper = styled.div`
  width: 100%;
  display: flex;
  gap: 14px;
  overflow: hidden;
  cursor: pointer;
  height: 50%;

  .next-link {
    padding: 10px 0;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: ${bgColors.whiteSmoke};
    font-weight: 600;
    font-size: ${fontSizes.f12};
    line-height: 15px;
    letter-spacing: -0.01em;
    color: #353945;
    border-radius: ${borders.b6};
    position: relative;
    min-width: 70px;
  }
`;

export const Box = styled.div`
  padding: 10px 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: ${bgColors.whiteSmoke};
  font-weight: 600;
  font-size: ${fontSizes.f12};
  line-height: 15px;
  letter-spacing: -0.01em;
  color: #353945;
  border-radius: ${borders.b6};
  position: relative;
  min-width: 70px;
`;
export const ImageWrapper = styled.div``;
export const PhoneContainer = styled.div`
  padding: 6px 10px;
`;
export const Text = styled.p<{ secondary?: boolean }>`
  margin-top: 4px;
  overflow: hidden;
  display: inline-block;
  width: 90%;
  white-space: nowrap;
  text-overflow: ellipsis;
  text-align: center;

  ${(props) =>
    props.secondary
      ? `color: #6084ff; font-size: ${fontSizes.f10};  font-weight: 700;`
      : ``}
`;
export const Tick = styled.div`
  position: absolute;
  left: 4px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${bgColors.secondary};
`;
export const TickPopover = styled.div`
  width: 12px;
  height: 12px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: ${bgColors.midori};
  border-radius: 50%;
`;
export const Chevron = styled.div`
  position: absolute;
  right: 4px;
  top: 4px;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
