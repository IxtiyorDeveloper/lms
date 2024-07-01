import React, { FC } from "react";
import {
  Body,
  DateTime,
  Description,
  Header,
  HistoryDetails,
  NoHistoryWrapper,
  Title,
  Wrapper,
} from "./style";
import { ISingleTask, ITaskEnums } from "types";
import TaskStatus from "../../../taskStatus";
import Item from "../item";
import CreatedByView from "../../../myTasks/components/createdByView";
import moment from "moment";

interface IProps {
  singleTask?: ISingleTask;
  taskEnums?: ITaskEnums;
}

const History: FC<IProps> = (props) => {
  const { singleTask, taskEnums } = props;

  return (
    <Wrapper>
      <Title>History</Title>
      {singleTask?.history.length === 0 ? (
        <NoHistoryWrapper>
          <img src="/no-history.svg" alt="no history" />
        </NoHistoryWrapper>
      ) : (
        <>
          {singleTask?.history.map((item) => {
            return (
              <HistoryDetails>
                <Header>
                  <TaskStatus
                    taskEnums={taskEnums}
                    statusNumber={item?.status}
                  />
                  <DateTime>
                    {moment(item?.datetime).format("DD MMM, HH:mm")}
                  </DateTime>
                </Header>
                <Body>
                  <Description>
                    <Item
                      text="Comment"
                      data={item.description}
                      styles={{ marginBottom: 0 }}
                    />
                  </Description>
                </Body>
                <CreatedByView profilePic={item.avatar} createdBy={item.user} />
              </HistoryDetails>
            );
          })}
        </>
      )}
    </Wrapper>
  );
};

export default History;
