import styled from "@emotion/styled";
import { bgColors, borders, fontSizes, textColors } from "styles/theme";

export const Wrapper = styled.form`
  width: 100%;
  max-width: 340px;
  position: absolute;
  transform: translate(-50%, -50%);
  left: 50%;
  top: 50%;
  padding: 20px;
  background: #ffffff;
  box-shadow: 0 40px 64px -12px rgba(0, 0, 0, 0.08),
    0 0 14px -4px rgba(0, 0, 0, 0.05), 0 32px 48px -8px rgba(0, 0, 0, 0.1);
  border-radius: ${borders.b10};
  outline: none !important;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;

  & .vertical {
    flex-direction: column;
  }
`;

export const Buttons = styled.div<{ vertical?: boolean }>`
  display: flex;
  gap: 10px;
  margin-top: 30px;
  flex-direction: ${({ vertical }) => (vertical ? "column-reverse" : "row")};

  .cancel {
    width: 100%;
    height: 44px;
    color: ${textColors.yourShadow};
    box-shadow: inset 0 2px 6px rgba(252, 252, 253, 0.8);
  }

  .save {
    width: 100%;
    height: 44px;
    color: ${textColors.blueGray};
  }
`;
export const IconWrapper = styled.div`
  width: fit-content;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-inline: auto;
  position: relative;
  .svg {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .blur {
    position: absolute;
    width: 26px;
    height: 26px;
    left: 50%;
    top: 26px;
    filter: blur(30px);
    background: ${textColors.deep};
  }
`;
export const Text = styled.div`
  width: 100%;
  font-weight: 500;
  font-size: ${fontSizes.f12};
  line-height: 20px;
  text-align: center;
  letter-spacing: -0.01em;
  color: ${textColors.dark};
  margin-top: 10px;
`;
export const SecondWrapper = styled.div`
  .img {
    width: 100%;
    display: flex;
    justify-content: center;
  }
  p {
    text-align: center;
  }
`;

export const Inner = styled.div<{
  required: boolean;
  error: boolean;
}>``;

export const Label = styled.label<{ required: boolean }>`
  font-size: ${fontSizes.f12};
  position: relative;
  color: ${textColors.dark};
  margin-bottom: 9px;
  font-weight: 500;
  line-height: 15px;
  letter-spacing: -0.01em;
`;
export const TypeContent = styled.div`
  background: transparent;
  border-radius: ${borders.b6};
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
  gap: 4px;
  margin-top: 27px;
`;
export const Box = styled.div`
  background: ${bgColors.brilliance};
  box-shadow: inset 0 0 10px rgba(0, 0, 0, 0.06);
  border: 2px solid transparent;
  border-radius: 6px;
  padding: 24px 5px;
  position: relative;
  overflow: hidden;
  min-width: 150px;
  display: flex;
  align-items: center;
  flex-direction: column;
  cursor: pointer;
  max-width: 230px;

  .title {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
  }
  .lessons {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 1.2;
    text-align: center;
    letter-spacing: -0.01em;
    color: ${textColors.brotherBlue};
  }
  .dates {
    font-weight: 500;
    font-size: ${fontSizes.f14};
    line-height: 17px;
    letter-spacing: -0.01em;
    color: ${textColors.dark};
    margin-top: 6px;
  }
  .abs {
    position: absolute;
    height: 4px;
    background: #6084ff;
    border-radius: 2px;
    bottom: 5px;
    left: 5px;

    width: calc(100% - 10px);
  }
`;
