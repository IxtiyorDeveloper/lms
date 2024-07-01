import React, { FC } from "react";
import { ButtonsWrapper, TitleWrapper, Wrapper } from "./style";
import { Button } from "components";
import { CallSvg, FilledSmsSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Badge, Spin } from "antd";

interface IProps {
  data?: any;
  isLoading: boolean;
}

const HeadTable: FC<IProps> = (props) => {
  const { data, isLoading } = props;

  const totalCount = Object.values(data || {}).reduce(
    //   @ts-ignore
    (acc, curr) => +acc + +curr,
    0,
  );

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <TitleWrapper>
          <p className="title">Referrals</p>
          {/* @ts-ignore */}
          <Badge overflowCount={9999999} count={totalCount || 0} />
        </TitleWrapper>
        <ButtonsWrapper>
          <Button
            icon={<CallSvg width={18} height={18} />}
            bgColor={bgColors.midori}
          />
          <Button
            icon={<FilledSmsSvg width={18} height={18} />}
            bgColor={bgColors.primary}
          />
        </ButtonsWrapper>
      </Wrapper>
    </Spin>
  );
};

export default HeadTable;
