import React from "react";
import {
  ArrowSvg,
  CalendarAmazonSvg,
  VacationPalmSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Button, CircleImage } from "components";
import {
  ChildrenP,
  CustomPopover,
  ContentWrapper,
  Wrap,
  HeadSide,
  BadgeWrapper,
  BodySide,
  DepartmentTitle,
  BadgeStatistic,
  Department,
  Staff,
  Flex,
} from "./style";
import moment from "moment";
import { useGetActiveVacation } from "hooks";
import Branches from "./branches";

const ActualVacationHoldersPopover = () => {
  const {data, isLoading} = useGetActiveVacation();

  return (
    <Wrap>
      <CustomPopover
        trigger="click"
        placement="bottomRight"
        content={() => (
          <ContentWrapper>
            <HeadSide>
              <BadgeWrapper>
                <VacationPalmSvg width={8} height={10} color={bgColors.white}/>{" "}
                <span>{data?.count} staff on vacation</span>
              </BadgeWrapper>
              <p className="date">
                <CalendarAmazonSvg color={bgColors.white}/>{" "}
                {moment(new Date()).format("DD MMM YYYY")}
              </p>
            </HeadSide>
            <BodySide>
              {data?.data.map(department => {

                return (
                  <Department key={department.department.id}>
                    <DepartmentTitle>
                      <span className="title">{department.department.name}</span>
                      <BadgeStatistic>{department.staffs.length}</BadgeStatistic>
                    </DepartmentTitle>
                    {department.staffs.map(staff => {
                      const activeVacationFromDate = moment(staff.activeVacation.from_date).format("DD MMM");
                      const activeVacationToDate = moment(staff.activeVacation.to_date).format("DD MMM");
                      const fullName = `${staff.user.userProfile?.firstname} ${staff.user.userProfile?.lastname}`;
                      const branches = staff.user.rbacAssignment?.rbacAssignmentBranches;

                      return (
                        <Staff key={staff.user_id}>
                          <CircleImage height={40} src={staff.user.userProfile?.avatar} width={40}/>
                          <Flex>
                            <div>
                              <p className="full-name">{fullName}</p>
                              <p className="date-period">{activeVacationFromDate} - {activeVacationToDate}</p>
                            </div>
                            <div className="role-branch">
                              <p className="role-name">{department.role.name}</p>
                              <p className="branch-name">{branches?.length === 0 ? "No branch" : <Branches data={branches} />}</p>
                            </div>
                          </Flex>
                        </Staff>
                      )
                    })}
                  </Department>
                )
              })}
            </BodySide>
          </ContentWrapper>
        )}
      >
        <ChildrenP>
          <Button className="midori">
            <VacationPalmSvg height={12} width={14} color={bgColors.white}/>{" "}
            <ArrowSvg color={bgColors.white} height={5} width={8}/>
          </Button>
        </ChildrenP>
      </CustomPopover>
    </Wrap>
  );
};

export default ActualVacationHoldersPopover;
