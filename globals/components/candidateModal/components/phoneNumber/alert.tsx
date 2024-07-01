import React, { useState } from "react";
import {
  AlertWrapper,
  IconWrapper,
  LifeCycleWrapper,
  PhoneNumberWrapper,
} from "../../style";
import { separatePhoneNumber } from "utils/phoneNumberFormatter";
import {
  CanNotAddSvg,
  HaveButCanAddSvg,
  LifeCycleTimeSvg,
  MergeSvg,
} from "components";
import {
  CandidateStatus,
  CandidateStatusLabel,
  RejectionType,
} from "constants/hr";
import { Alert, Flex } from "antd";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { ICandidate } from "types";

const Alerts = ({
  phone,
  candidate,
  order,
  stage,
  status,
}: {
  phone: string;
  candidate?: ICandidate | undefined;
  order: number | string | undefined;
  stage: string | undefined;
  status: boolean | undefined;
}) => {
  const dispatch = useDispatch();

  const handleClickLifecycle = (candidate: ICandidate | undefined) => {
    dispatch(
      toggleModal({
        key: "candidateLifecycle",
        data: {
          data: {
            candidate,
          },
          open: true,
        },
      })
    );
  };

  const handleClickMerge = (candidate: ICandidate | undefined) => {
    dispatch(
      toggleModal({
        key: "mergeCandidate",
        data: {
          data: {
            candidate,
          },
          open: true,
        },
      })
    );
  };

  return (
    <div>
      {status &&
        candidate?.status !== CandidateStatus.BANNED &&
        candidate?.status !== CandidateStatus.REJECTED && (
          <AlertWrapper>
            <Alert
              message={
                <PhoneNumberWrapper type="info" className="phone">
                  {separatePhoneNumber(phone)}
                </PhoneNumberWrapper>
              }
              description={
                <PhoneNumberWrapper
                  type="info"
                  style={{
                    maxWidth: 350,
                  }}>
                  is belongs to
                  <a
                    target="_blank"
                    href={`/hr?status=${candidate?.status}&stage=${candidate?.stage}&vacancy_id=${candidate?.vacancy.id}&roundedTabIndex=${order}&id=${candidate?.id}`}>
                    {` ${candidate?.first_name} ${candidate?.last_name} `}
                  </a>
                  in Schedule:
                  <b>
                    (
                    {candidate?.status === CandidateStatus.CANDIDATE
                      ? stage
                      : CandidateStatusLabel[
                          candidate?.status as keyof typeof CandidateStatusLabel
                        ]}
                    )
                  </b>
                </PhoneNumberWrapper>
              }
              type="info"
              showIcon
              icon={<HaveButCanAddSvg width={34} height={34} />}
            />
            <LifeCycleWrapper
              type="info"
              onClick={() => handleClickLifecycle(candidate)}>
              <div className="box">
                <IconWrapper>
                  <LifeCycleTimeSvg />
                </IconWrapper>
                <p>Lifecycle</p>
              </div>
            </LifeCycleWrapper>
          </AlertWrapper>
        )}

      {status &&
        (candidate?.status === CandidateStatus.BANNED ||
          candidate?.status === CandidateStatus.REJECTED) && (
          <AlertWrapper>
            <Alert
              message={
                <PhoneNumberWrapper type="error" className="phone">
                  {separatePhoneNumber(phone)}
                </PhoneNumberWrapper>
              }
              description={
                <PhoneNumberWrapper type="error">
                  is belongs to
                  <a
                    target="_blank"
                    href={`/hr?status=${candidate?.status}&vacancy_id=${candidate?.vacancy.id}&id=${candidate?.id}&roundedTabIndex=${order}`}>
                    {` ${candidate?.first_name} ${candidate?.last_name} `}
                  </a>
                  in
                  <b>
                    (Rejected:{" "}
                    {candidate?.rejection_type === RejectionType.OFFLINE
                      ? "offline"
                      : "online"}{" "}
                    rejected
                    {candidate?.status === CandidateStatus.BANNED &&
                      " - banned"}
                    )
                  </b>
                </PhoneNumberWrapper>
              }
              type="error"
              showIcon
              icon={<CanNotAddSvg width={34} height={34} />}
            />
            <LifeCycleWrapper type="error">
              <Flex gap={10}>
                <div
                  className="box"
                  onClick={() => handleClickLifecycle(candidate)}>
                  <IconWrapper>
                    <LifeCycleTimeSvg />
                  </IconWrapper>
                  <p>Lifecycle</p>
                </div>
                <div
                  className="box"
                  onClick={() => handleClickMerge(candidate)}>
                  <IconWrapper>
                    <MergeSvg />
                  </IconWrapper>
                  <p>Merge</p>
                </div>
              </Flex>
            </LifeCycleWrapper>
          </AlertWrapper>
        )}
    </div>
  );
};

export default Alerts;
