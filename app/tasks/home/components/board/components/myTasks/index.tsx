import React, { FC, useEffect } from "react";
import { BoardWrapper } from "./style";
import { useGetTasks } from "hooks";
import { ETaskState, ETaskStatus, ITaskEnums, TaskUserType } from "types";
import { useRouter } from "next/router";
import { useInView } from "react-intersection-observer";
import { generateLoadings, generateQuery, generateTabs } from "./utils";
import StatusCard from "./components/statusCard";
import { Spin } from "antd";

export interface IProps {
  userType: TaskUserType;
  dataEnums?: ITaskEnums;
}

const MyTasks: FC<IProps> = (props) => {
  const router = useRouter();

  const { ref: openedRef, inView: openedInView } = useInView();
  const { ref: doneRef, inView: doneInView } = useInView();
  const { ref: checkedRef, inView: checkedInView } = useInView();
  const { ref: rejectedRef, inView: rejectedInView } = useInView();

  const queries = generateQuery({ router, userType: props.userType });
  const processing = router.query?.processing;

  const {
    data: openedTasks,
    isLoading: isOpenedLoading,
    fetchNextPage: fetchNextPageOpened,
    isFetchingNextPage: isFetchingNextPageOpened,
    hasNextPage: hasNextPageOpened,
  } = useGetTasks(
    {
      query_params: {
        status: ETaskStatus.OPENED,
        state: processing ? ETaskState.ON_PROCESS : null,
        ...queries,
      },
    },
    "opened_tasks"
  );

  const {
    data: doneTasks,
    isLoading: isDoneLoading,
    fetchNextPage: fetchNextPageDone,
    isFetchingNextPage: isFetchingNextPageDone,
    hasNextPage: hasNextPageDone,
  } = useGetTasks(
    {
      query_params: {
        status: ETaskStatus.DONE,
        ...queries,
      },
    },
    "done_tasks"
  );

  const {
    data: checkedTasks,
    isLoading: isCheckedLoading,
    fetchNextPage: fetchNextPageChecked,
    isFetchingNextPage: isFetchingNextPageChecked,
    hasNextPage: hasNextPageChecked,
  } = useGetTasks(
    {
      query_params: {
        status: ETaskStatus.CHECKED,
        ...queries,
      },
    },
    "checked_tasks"
  );

  const {
    data: rejectedTasks,
    isLoading: isRejectedLoading,
    fetchNextPage: fetchNextPageRejected,
    isFetchingNextPage: isFetchingNextPageRejected,
    hasNextPage: hasNextPageRejected,
  } = useGetTasks(
    {
      query_params: {
        status: ETaskStatus.REJECTED,
        ...queries,
      },
    },
    "rejected_tasks"
  );

  const tabs = generateTabs({
    checkedRef,
    checkedTasks,
    doneRef,
    doneTasks,
    openedRef,
    openedTasks,
    rejectedRef,
    rejectedTasks,
  });

  const loadings = generateLoadings({
    hasNextPageOpened,
    hasNextPageDone,
    hasNextPageChecked,
    hasNextPageRejected,
    isFetchingNextPageOpened,
    isFetchingNextPageDone,
    isFetchingNextPageChecked,
    isFetchingNextPageRejected,
  });

  useEffect(() => {
    if (openedInView) {
      fetchNextPageOpened().then();
    }
    if (doneInView) {
      fetchNextPageDone().then();
    }
    if (checkedInView) {
      fetchNextPageChecked().then();
    }
    if (rejectedInView) {
      fetchNextPageRejected().then();
    }
  }, [openedInView, doneInView, checkedInView, rejectedInView]);

  return (
    <Spin
      spinning={
        isOpenedLoading ||
        isDoneLoading ||
        isCheckedLoading ||
        isRejectedLoading
      }
    >
      <BoardWrapper>
        {tabs?.map((item, index) => {
          const title = props.dataEnums?.TaskStatusEnum[`${item.status}`];
          const color =
            props.dataEnums?.TaskStatusColorEnum[`${item.status}`]?.ACTIVE_BOX!;
          return (
            <StatusCard
              color={color}
              title={title}
              item={item}
              loadings={loadings}
              userType={props.userType}
              ref={item.ref}
            />
          );
        })}
      </BoardWrapper>
    </Spin>
  );
};

export default MyTasks;
