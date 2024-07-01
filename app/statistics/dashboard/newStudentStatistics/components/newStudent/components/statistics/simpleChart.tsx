import React, { FC } from "react";
import { Tooltip as AntToolTip } from "antd";
import { CardWrapper, Wrapper } from "./style";
import StatisticsCard from "../../../../../components/statisticsCard";
import { StudentSvg } from "@jasurbekyuldashov/lms-web-icons";

const SimpleChart: FC<{
  attend: any;
  notAttend: any;
}> = ({ attend, notAttend }) => {
  return (
    <Wrapper>
      <StatisticsCard full>
        <div className="flex-filter-info">
          <div className="by_amount">By amount</div>
          <div className="card">
            <div>
              <StudentSvg width={20} height={20} />
            </div>
            <div>{+attend + +notAttend || 0}</div>
            <div className="student">Student</div>
          </div>
        </div>
        <CardWrapper educational={notAttend} productAndService={attend}>
          <div className="bar-chart">
            <div className="cash">
              <div className="title1 left">
                <p>{notAttend || 0}</p>
                <p className="secondary">Not attended</p>
              </div>
              <AntToolTip placement="top" title={<p>{notAttend}</p>}>
                <div className="bar"></div>
              </AntToolTip>
            </div>
            <div className="card">
              <div className="title1 right">
                <p>{attend || 0}</p>
                <p className="secondary">Attended</p>
              </div>
              <AntToolTip placement="top" title={<p>{attend}</p>}>
                <div className="bar"></div>
              </AntToolTip>
            </div>
          </div>
        </CardWrapper>
      </StatisticsCard>
    </Wrapper>
  );
};

export default SimpleChart;
