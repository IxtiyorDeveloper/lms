import React, { FC } from "react";
import { Wrapper } from "./style";
import {
  CircleImage,
  BachelourSvg,
  CircleXSvg,
  GroupBgSvg,
  PercentSvg,
  ProgressOneLineSvg,
  WritingHandSvg,
  ClassASvg,
  ClassBSvg,
  ClassCSvg,
} from "components";
import { IRanking, IRankingChart } from "types";
import { getNumberWithSuffix } from "utils/functions/numberSuffix";
import moment from "moment";

interface IProps {
  data?: IRanking;
  lastMonth?: IRankingChart;
  bool?: boolean;
  reason?: string;
}

const ProfileInfo: FC<IProps> = ({ data, lastMonth, bool = false, reason }) => {
  return (
    <Wrapper bool={bool}>
      <div className="container p-24">
        <div className="image">
          <CircleImage
            width={!bool ? 140 : 180}
            height={!bool ? 140 : 180}
            src={data?.mentor?.userProfile?.avatar?.full_url}
          />
          <div className="type">
            {data?.class == 100 ? (
              <ClassASvg />
            ) : data?.class == 200 ? (
              <ClassBSvg />
            ) : (
              <ClassCSvg />
            )}
          </div>
        </div>
        <div className="name">{data?.mentor?.userProfile?.fullName}</div>
        <div className="divider" />
        <div className="info">
          <div>Ranking</div>
          <div className="bold">
            {reason ||
              getNumberWithSuffix({ number: data?.order ? +data?.order : 0 })}
          </div>
        </div>
        <div className="info">
          <div>Month</div>
          <div className="bold">{moment(data?.month, "MM").format("MMMM")}</div>
        </div>
      </div>
      <div className="container w-100 grid p-20">
        <div className="card">
          <div className="icon gray">
            <BachelourSvg />
          </div>
          <div>
            <div className="title">Students</div>
            <div className="percent">{data?.student_count || 0}</div>
          </div>
        </div>
        <div className="card">
          <div className="icon green">
            <PercentSvg />
          </div>
          <div>
            <div className="title">Ranking percent</div>
            <div className="month">(Current month)</div>
            <div className="percent">{data?.overall || 0}%</div>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <ProgressOneLineSvg />
          </div>
          <div>
            <div className="title">Last month</div>
            <div className="percent">{lastMonth?.overall || 0}%</div>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <WritingHandSvg />
          </div>
          <div>
            <div className="title">Number of exam</div>
            <div className="percent">{data?.exam_group_count || 0}</div>
          </div>
        </div>
        <div className="card">
          <div className="icon">
            <CircleXSvg />
          </div>
          <div>
            <div className="title">Fails</div>
            <div className="percent">{data?.exam_failed_count || 0}</div>
          </div>
        </div>
        <div className="card">
          <div className="icon green">
            <GroupBgSvg />
          </div>
          <div>
            <div className="title">Number of group</div>
            <div className="percent">{data?.real_group_count || 0}</div>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default ProfileInfo;
