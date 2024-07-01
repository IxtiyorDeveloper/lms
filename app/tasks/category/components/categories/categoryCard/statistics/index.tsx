import React, { FC } from "react";
import {
  ChartWrapper,
  CountsWrapper,
  Dot,
  FirstSide,
  Item,
  Wrapper,
} from "./style";
import { ITaskAdminTaskStatistics, ITaskEnums } from "types";
import RenderPieChart from "../pieChart";

interface IProps {
  data?: ITaskAdminTaskStatistics;
  taskEnums?: ITaskEnums;
}

const Statistics: FC<IProps> = (props) => {
  const { data, taskEnums } = props;

  return (
    <Wrapper>
      <CountsWrapper>
        {taskEnums?.TaskStatusValues?.map((status) => {
          return (
            <Item key={status}>
              <FirstSide>
                <Dot
                  color={taskEnums?.TaskStatusColorEnum[status]?.ACTIVE_BOX}
                />
                {taskEnums?.TaskStatusEnum[`${status}`]}{" "}
              </FirstSide>
              <span>{data![`${status}` as keyof typeof data]}</span>
            </Item>
          );
        })}
      </CountsWrapper>
      <ChartWrapper>
        <RenderPieChart
          isDataAvailable={() => {
            let total = 0;
            taskEnums?.TaskStatusValues.map((num) => {
              total += +data![`${num}` as keyof typeof data];
            });
            return total === 0;
          }}
          data={taskEnums?.TaskStatusValues.map((status) => {
            let total = 0;
            taskEnums?.TaskStatusValues.map((num) => {
              total += +data![`${num}` as keyof typeof data];
            });
            return {
              status: taskEnums?.TaskStatusEnum[`${status}`],
              number: +data![`${status}` as keyof typeof data],
              total: total,
              color: taskEnums?.TaskStatusColorEnum[status]?.ACTIVE_BOX,
            };
          })}
        />
      </ChartWrapper>
    </Wrapper>
  );
};

export default Statistics;
