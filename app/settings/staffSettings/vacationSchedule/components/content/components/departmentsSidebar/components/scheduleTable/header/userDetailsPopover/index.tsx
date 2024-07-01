import React, { FC, useEffect, useState } from "react";
import {
  BodySide,
  ContentWrapper,
  Flex,
  Grid,
  RolesName,
  Staff,
} from "./style";
import { CircleImage, PhoneCell } from "components";
import {
  GroupsToRightSvg,
  LocationSvg,
  PhoneSvg,
  RoomSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { useGetAssignmentView, usePageDataMemo } from "hooks";
import { GROUP_FORM_GROUP, GROUP_FORM_INDIVIDUAL } from "constants/groupForms";
import { Spin } from "antd";
import { ALL_BRANCH, NO_BRANCH, WITH_BRANCH } from "constants/branch";

interface IProps {
  assignment: any;
}

export enum EGroupCountsByTime {
  morning = 100,
  evening = 200,
}

export const EBranchByType = {
  [NO_BRANCH]: "No branch",
  [ALL_BRANCH]: "All branch",
  [WITH_BRANCH]: "With branch",
};

const UserDetailsPopover: FC<IProps> = (props) => {
  const { assignment } = props;

  const { branch } = usePageDataMemo();

  const { data, isLoading } = useGetAssignmentView({
    query_params: {
      id: assignment?.id,
    },
  });

  const fullName = `${data?.user?.userProfile?.firstname} ${data?.user?.userProfile?.lastname}`;

  const branches = data?.user?.roomBranches;

  const branchesFiltered = branches?.map((br: any) => {
    return branch?.filter((oBranch: any) => br == oBranch.value);
  });

  const branchNames = branchesFiltered?.map((b: any) => {
    return b[0]?.label;
  });

  const assignmentRooms = data?.user?.rooms;

  const branchType = data?.branch_type;

  const rooms = Array.isArray(assignmentRooms)
    ? assignmentRooms?.length > 0
      ? assignmentRooms[0]
      : "No specific room"
    : Object.values(assignmentRooms || {})?.join(", ");

  const groupCountByShift = data?.groupCountsByTime;
  const groupCountByType = data?.groupCounts;

  const roleName = data?.user?.rbacAssignment?.rbacRole?.name;

  return (
    <ContentWrapper>
      <Spin spinning={isLoading}>
        <BodySide>
          <Staff>
            <div className="flex">
              <CircleImage
                src={data?.user?.userProfile?.avatar}
                height={40}
                width={40}
              />
              <Flex>
                <div>
                  <p className="full-name">{fullName}</p>
                  <div className="flex-group-counts">
                    <RolesName>
                      Individual{" "}
                      {groupCountByType &&
                        groupCountByType[GROUP_FORM_INDIVIDUAL]}
                    </RolesName>
                    <RolesName>
                      Group{" "}
                      {groupCountByType && groupCountByType[GROUP_FORM_GROUP]}
                    </RolesName>
                  </div>
                </div>
              </Flex>
            </div>
            <RolesName>{roleName}</RolesName>
          </Staff>
          <Grid>
            <Staff className="column">
              <div className="title-side">
                <LocationSvg height={12} width={12} /> <span>Branch</span>
              </div>
              <p className="name-f">
                {branchType
                  ? branchType !== WITH_BRANCH
                    ? EBranchByType[branchType as keyof typeof EBranchByType]
                    : branchNames?.length === 0
                      ? "No Branch"
                      : branchNames?.join(`, `)
                  : "-"}
              </p>
            </Staff>
            <Staff className="column">
              <div className="title-side">
                <RoomSvg color={bgColors.white} height={12} width={12} />{" "}
                <span>Rooms</span>
              </div>
              <p className="name-f">{rooms}</p>
            </Staff>
            <Staff className="column">
              <div className="title-side">
                <PhoneSvg height={12} width={12} color={bgColors.white} />{" "}
                <span>Phone number</span>
              </div>
              <PhoneCell value={data?.user?.userPhones} />
            </Staff>
            <Staff className="column">
              <div className="title-side">
                <GroupsToRightSvg color={bgColors.white} /> <span>Groups</span>
              </div>
              <div className="flex-group-counts">
                <RolesName>
                  Morning{" "}
                  {groupCountByShift &&
                    groupCountByShift[EGroupCountsByTime.morning]}
                </RolesName>
                <RolesName>
                  Evening{" "}
                  {groupCountByShift &&
                    groupCountByShift[EGroupCountsByTime.evening]}
                </RolesName>
              </div>
            </Staff>
          </Grid>
        </BodySide>
      </Spin>
    </ContentWrapper>
  );
};

export default UserDetailsPopover;
