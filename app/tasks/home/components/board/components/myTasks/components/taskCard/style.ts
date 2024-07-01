import styled from "@emotion/styled";
import { bgColors, fontSizes, textColors } from "styles/theme";

export const TaskCardWrapper = styled.div`
  background: ${bgColors.white};
  cursor: pointer;
  border-radius: 8px;
  padding: 12px;
  overflow: hidden;
  box-shadow: 0 2px 2px 0 rgba(0, 0, 0, 0.08);
  margin-bottom: 16px;
`;

export const CardHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding-bottom: 12px;
  color: ${textColors.harrison};
  font-size: ${fontSizes.f14};
  font-weight: 500;
  border-bottom: 1px solid ${bgColors.skyLighter};
`;

export const StatusWrapper = styled.div`
  display: flex;
  align-items: center;
`;

export const IconProcessing = styled.div`
  background-color: ${bgColors.primary};
  display: flex;
  align-items: center;
  padding: 4px 6px;
  border-radius: 50px;
  margin-left: 4px;

  @keyframes rotateCircles {
    from {
      transform: rotate(0);
    }
    to {
      transform: rotate(360deg);
    }
  }

  .animation {
    animation: rotateCircles 4s linear infinite;
  }
`;

export const CardBody = styled.div`
  padding: 12px 0;
  border-bottom: 1px solid ${bgColors.skyLighter};

  .first-flex {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding-bottom: 12px;
    margin-bottom: 12px;
    border-bottom: 1px solid ${bgColors.skyLighter};
  }
`;

export const DescriptionView = styled.p`
  font-size: ${fontSizes.f14};
  line-height: 20px;
  font-weight: 500;
`;

export const CardFooter = styled.div``;
