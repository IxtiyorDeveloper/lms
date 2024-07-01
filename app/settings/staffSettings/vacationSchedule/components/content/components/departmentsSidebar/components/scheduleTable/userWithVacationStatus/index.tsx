import React, { FC } from 'react';
import { CircleImage } from "components";
import { SrcInterface } from "components/common/circleImage";
import { VacationStatus } from "types/staffSettings/vacation";
import { bgColors } from "styles/theme";
import { OnVacationWrapper, WarningWrapper, Wrapper } from "./style";
import { VacationPalmSvg } from "@jasurbekyuldashov/lms-web-icons";

interface IProps {
  src?: SrcInterface;
  status: 100 | 200 | 300;
  onVacation?: boolean;
  size?: number;
}


const UserVacationStatus: FC<IProps> = (props) => {
  const {src, status, onVacation = false, size = 30} = props;

  const borderColor = {
    [VacationStatus.ok]: undefined,
    [VacationStatus.warning]: bgColors.primary,
    [VacationStatus.red]: bgColors.pop,
  }

  const icons = {
    [VacationStatus.ok]: <></>,
    [VacationStatus.warning]: <WarningWrapper><img src='/settings/staffSettings/warning.svg'
                                                   alt="warning"/></WarningWrapper>,
    [VacationStatus.red]: <WarningWrapper><img src='/settings/staffSettings/red.svg' alt="warning"/></WarningWrapper>,
  }

  return onVacation ? (
    <Wrapper>
      <CircleImage color={bgColors.midoriVacation} width={size} height={size} src={src}/>
      <OnVacationWrapper>
        <VacationPalmSvg height={9} width={8} color={bgColors.white}/>
      </OnVacationWrapper>
    </Wrapper>
  ) : (
    <Wrapper>
      <CircleImage color={borderColor[status]} width={size} height={size} src={src}/>
      {icons[status]}
    </Wrapper>
  );
};

export default UserVacationStatus;
