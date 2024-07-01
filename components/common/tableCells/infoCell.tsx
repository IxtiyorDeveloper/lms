import moment from "moment";
import React, { useMemo } from "react";
import { CellGroupInfo, Flex } from "./style";
import { DATE_FORMAT_HH_mm, DATE_FORMAT_HH_mm_ss } from "constants/dates";
import Link from "next/link";
import { NewSvg } from "components";
import { STATE_OPENING } from "constants/groupStatus";
import { GROUP_MENTOR_100 } from "constants/groupMentors";

const InfoCell = (props: any) => {
  const group = useMemo(
    () =>
      props.row.original?.group ??
      props.row.original?.lastGroup ??
      props.row.original?.lastStudentFlow?.group ??
      props.row.original?.currentGroupContact?.group ??
      props.row.original?.groupContact?.group,
    [props.row.original]
  );
  const value = props.value;
  const data = useMemo(
    () =>
      value?.groupMentors?.find((e: any) => e.type === GROUP_MENTOR_100)?.user,
    [value]
  );
  const full_name = data?.userProfile
    ? `${data?.userProfile?.firstname} ${data?.userProfile?.lastname}`
    : "-";
  return (
    <Flex>
      {!!value && group?.state.toString() == STATE_OPENING.toString() && (
        <div className="abs">
          <NewSvg width={24} height={24} />
        </div>
      )}

      {!!value ? (
        <Link href={`/groups/${group?.id}`}>
          <CellGroupInfo>
            <div className="row">
              <div className="group">{value?.name}</div>
              <div className="type">{value?.groupType?.name}</div>
            </div>
            <div className="row alignCenter">
              <div className="left">
                <p>{full_name}</p>
              </div>
              <div className="right">
                {moment(value?.lessonTime?.time, DATE_FORMAT_HH_mm_ss).format(
                  DATE_FORMAT_HH_mm
                )}
              </div>
            </div>
            <div className="row">
              <div className="left">{value?.room?.branch?.name}</div>
              <div className="right">{value?.lessonDay?.name}</div>
            </div>
            <div className="row">
              <div className="left">{value?.level?.parent?.name}</div>
              <div className="right">{value?.level?.name}</div>
            </div>
          </CellGroupInfo>
        </Link>
      ) : (
        <div>-</div>
      )}
      {props.groupCount}
    </Flex>
  );
};
export default InfoCell;
