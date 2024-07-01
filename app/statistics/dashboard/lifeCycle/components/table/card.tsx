import React from "react";
import { CardWrapper, Flex } from "./style";
import {
  CircleImage,
  DoubleArrowSvg,
  PenSvg,
  ScenarioSvg,
  XMoreInfoIcon,
} from "components";
import { ILifeCyclePageData, LifeCycle } from "types/lifeCycle";
import moment from "moment";
import { DATE_FORMAT_HH_mm_ss_YYYY_MM_DD } from "constants/dates";
import { TStatuses } from "types";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";

const Card = ({
  data,
  pageData,
}: {
  data: LifeCycle;
  pageData: ILifeCyclePageData | undefined;
}) => {
  const dispatch = useDispatch();
  const fullName = data?.createdBy?.userProfile?.firstname
    ? `${data?.createdBy?.userProfile?.firstname} ${data?.createdBy?.userProfile?.lastname}`
    : "-";
  const scenario = Object.entries(pageData?.models.models || {}).filter(
    ([key, value]) => value?.includes(data?.scenario)
  );
  return (
    <CardWrapper>
      <Flex>
        <div className="p-info">
          <div className="cr-by">
            <PenSvg />
            <p>Created by</p>
          </div>
          {data?.createdBy?.userProfile ? (
            <div className="box">
              {data?.createdBy?.userProfile?.avatar && (
                <CircleImage
                  width={20}
                  height={20}
                  src={data?.createdBy?.userProfile?.avatar}
                />
              )}
              <p>{fullName}</p>
            </div>
          ) : (
            "-"
          )}
        </div>
        <div className="date">
          {moment(data?.datetime).format(DATE_FORMAT_HH_mm_ss_YYYY_MM_DD)}
        </div>
      </Flex>
      <Flex className="mt18">
        <div className="left">
          <div className="label">
            <ScenarioSvg />
            <p>Scenario</p>
          </div>
          <div className="actions">
            {scenario?.map((item) => {
              return (
                <div className="type">
                  {
                    pageData?.models?.groups?.[
                      item?.[0] as unknown as TStatuses
                    ]
                  }
                </div>
              );
            })}
            <DoubleArrowSvg width={14} height={14} />
            <div className="act">
              {pageData?.scenarios?.[data?.scenario as TStatuses]}
            </div>
          </div>
        </div>
        <div
          onClick={() =>
            dispatch(
              toggleModal({
                key: "lifeCycle",
                data: {
                  data: {
                    user_id: data?.id,
                  },
                  open: true,
                },
              })
            )
          }
          className="more-info"
        >
          <XMoreInfoIcon />
        </div>
      </Flex>
      {data?.record && (
        <div className="audio">
          <audio controls>
            <source src={data?.record} type="audio/mpeg" />
          </audio>
        </div>
      )}

      <div className="note-wrapper">
        <p className="label">Note</p>
        <div className="note">{data?.description}</div>
      </div>
    </CardWrapper>
  );
};

export default Card;
