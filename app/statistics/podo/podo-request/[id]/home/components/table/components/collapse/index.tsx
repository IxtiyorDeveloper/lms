import React from "react";
import { Spin } from "antd/lib";
import {
  Wrapper,
  GroupName,
  Title,
  GroupCount,
  Divider,
  EventWrapper,
  LevelWrapper,
  Level,
  ParentLevel,
  Row,
} from "./style";
import Router, { useRouter } from "next/router";
import moment from "moment/moment";
import { useRequestReviewerGroups } from "hooks";
import { EPodoGroupStatus, IPodoReview } from "types/statistics/podoRequest";
import { Tooltip } from "antd";

const statusColl = {
  [EPodoGroupStatus.DONE]: {
    text: "Done",
  },
  [EPodoGroupStatus.NOT_DONE]: {
    text: "Not done",
  },
};

const Collapse = ({ row, width }: { row: IPodoReview; width?: number }) => {
  const router = useRouter();
  const { query } = router;
  const id = router.query?.id;
  const { data, isLoading } = useRequestReviewerGroups({
    query_params: {
      expand:
        "group.lessonDay,group.lessonTime,group.level.parent,group_status,groupStatus",
      id,
      reviewer_id: row?.reviewer?.id,
      ...query,
    },
  });

  return (
    <Spin spinning={isLoading}>
      <Wrapper style={{ width: `${width}px` }}>
        <Row>
          {data?.map((e, index) => {
            const groupStatus = e.groupStatus;
            return (
              <div className="item item-green" key={index}>
                <GroupName>
                  <Tooltip title={e.group?.name}>
                    <Title href={`/groups/${e.group_id}`}>
                      {e.group?.name}
                    </Title>
                  </Tooltip>
                  <GroupCount isRed={groupStatus == EPodoGroupStatus.NOT_DONE}>
                    {statusColl[groupStatus]?.text}
                  </GroupCount>
                </GroupName>
                <Divider />
                <EventWrapper>
                  <span className="day">{e?.group?.lessonDay?.name}</span>
                  <span className="time">
                    {moment(e?.group?.lessonTime?.time, "HH:mm:ss").format(
                      "HH:mm"
                    )}
                  </span>
                </EventWrapper>
                <LevelWrapper>
                  <ParentLevel>{e?.group?.level?.parent?.name}</ParentLevel>
                  <Level>{e?.group?.level?.name}</Level>
                </LevelWrapper>
              </div>
            );
          })}
        </Row>
      </Wrapper>
    </Spin>
  );
};

export default Collapse;
