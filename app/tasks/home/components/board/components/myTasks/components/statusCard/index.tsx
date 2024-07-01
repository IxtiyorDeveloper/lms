import React, { forwardRef } from "react";
import { CardHeader, StatusCardWrapper, CardBody } from "./style";
import TaskCard from "../taskCard";
import { ETaskState, ETaskStatus, IAllTasks, TaskUserType } from "types";
import { ProcessSvg } from "@jasurbekyuldashov/lms-web-icons";
import { AntdSwitch } from "components";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { bgColors } from "styles/theme";
import { handleFilterProcessing } from "../../utils";
import { Affix } from "antd";

interface IProps {
  item: {
    tab: number;
    ref: (node?: Element | null | undefined) => void;
    status: ETaskStatus;
    total: number;
    data: IAllTasks[] | undefined;
  };
  loadings: { 100: string; 500: string; 700: string; 900: string };
  color: string;
  title: string;
  userType: TaskUserType;
}

const StatusCard = forwardRef((props: IProps, ref: any) => {
  const router = useRouter();

  const { control } = useForm();

  return (
    <StatusCardWrapper>
      <Affix offsetTop={72}>
        <CardHeader color={props.color}>
          <div className="title">
            <p>{props.title}</p>
            <span>{props.item.total}</span>
          </div>
          {props.title?.toLocaleLowerCase() === "opened" && (
            <div className="process">
              <ProcessSvg height={24} width={24} />
              <AntdSwitch
                defaultValue={!!router.query?.processing}
                onChange={(e) =>
                  handleFilterProcessing({ switched: e, router })
                }
                name="processing"
                widthSwitch="20px"
                control={control}
              />
            </div>
          )}
        </CardHeader>
      </Affix>
      <CardBody>
        {props.item.data?.map((task, index) => {
          return task?.tasks?.map((singleTask, taskIndex) => {
            return (
              <TaskCard
                userType={props.userType}
                task={singleTask}
                key={index}
                taskId={index + 1}
                color={
                  singleTask.state === ETaskState.ON_PROCESS
                    ? bgColors.primary
                    : props.color
                }
              />
            );
          });
        })}
        <div ref={ref} className="loading-state">
          {props.loadings[props.item.status]}
        </div>
      </CardBody>
    </StatusCardWrapper>
  );
});

export default StatusCard;
