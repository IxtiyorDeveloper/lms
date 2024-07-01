import React, {FC} from "react";
import {InfoCardWrapper} from "./style";
import {IPropsInfo} from "./type";
import {toCurrencyFormat} from "utils/toCurrencyFormat";

const InfoCard: FC<IPropsInfo> = ({title, amount, child}) => {
  return (
    <InfoCardWrapper>
      <div className='first'>
        <h3 className='title'>{title}</h3>
        <p className='amount grotesk'>{toCurrencyFormat(amount)}</p>
      </div>
      <div>
        {child}
      </div>
    </InfoCardWrapper>
  );
};

export default InfoCard;
