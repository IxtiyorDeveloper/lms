import React, { FC, useRef } from "react";
import { Wrapper, LabelWrapper, ChildWrapper } from "./style";
import { Input, Segmented, TransferShadowSvg } from "components";
import { useForm } from "react-hook-form";
import { SearchCallSvg } from "components";
import { useAllCallStaffs } from "hooks/useCall";
import { Spin } from "antd";
import StaffCard from "./components/staffCard";
import { CancelTokenSource } from "axios";
import GroupCard from "./components/groupsCard";
import OperatorCard from "./components/operatorCard";
import { bgColors } from "styles/theme";
import { useAppSelector } from "store";

interface IProps {
  rtcSession: any;
}

const TransferCall: FC<IProps> = ({ rtcSession }) => {
  const { control, watch, getValues } = useForm();
  const search = watch("search");
  const ref = useRef<CancelTokenSource>();
  const connectionConfig = useAppSelector(
    (state) => state.sip.connectionConfig
  );
  const setToken = (data: CancelTokenSource) => {
    ref.current = data;
  };
  const { data, isFetching } = useAllCallStaffs(
    {
      query_params: { search },
      enabled: search?.length > 2 && !!search,
    },
    ref.current,
    setToken
  );

  const menu = [
    {
      label: (
        <LabelWrapper>
          Groups{" "}
          <span className="badge">{(data && data?.groups?.length) || 0}</span>
        </LabelWrapper>
      ),
      value: "groups",
      children: (
        <ChildWrapper>
          {data &&
            data?.groups?.map((e: any) => {
              return <GroupCard group={e} />;
            })}
        </ChildWrapper>
      ),
    },
    {
      label: (
        <LabelWrapper>
          Operators{" "}
          <span className="badge">
            {(data && data?.operators?.length) || 0}
          </span>
        </LabelWrapper>
      ),
      value: "operators",
      children: (
        <ChildWrapper>
          {data &&
            data?.operators?.map((e: any, index: number) => {
              return <OperatorCard user={e} key={index} />;
            })}
        </ChildWrapper>
      ),
    },
    {
      label: (
        <LabelWrapper>
          Staff{" "}
          <span className="badge">{(data && data?.staff?.length) || 0}</span>
        </LabelWrapper>
      ),
      value: "staff",
      children: (
        <ChildWrapper>
          {data &&
            data?.staff?.map((e: any) => {
              return <StaffCard user={e} />;
            })}
        </ChildWrapper>
      ),
    },
  ];

  const transfer = (number: string) => {
    rtcSession?.refer(`sip:${number}@${connectionConfig?.server}`);
  };

  return (
    <Wrapper>
      <Input
        name="search"
        placeholder="Search"
        control={control}
        prefix={<SearchCallSvg />}
        suffix={
          <div
            className="transfer"
            onClick={() => transfer(getValues("search"))}
          >
            <TransferShadowSvg color={bgColors.white} />
          </div>
        }
        colorText="white"
      />
      <Spin spinning={isFetching}>
        <div className="staff_container">
          <Segmented dark options={menu} block initValue="groups" />
        </div>
      </Spin>
    </Wrapper>
  );
};

export default TransferCall;
