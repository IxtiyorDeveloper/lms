import styled from "@emotion/styled";
import { bgColors } from "styles/theme";

export const Wrapper = styled.div`
    position: relative;
`;

export const OnVacationWrapper = styled.div`
    position: absolute;
    top: 22px;
    right: 0;
    z-index: 22;
    background-color: ${bgColors.midoriVacation};
    height: 16px;
    width: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
`;

export const WarningWrapper = styled.div`
    position: absolute;
    top: 16px;
    right: 0;
    z-index: 22;
`;
