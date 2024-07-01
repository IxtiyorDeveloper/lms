import React, { FC } from "react";
import { GroupWrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import Student from "../student";
import { usePaymentStatisticsGroup } from "hooks";
import { Flex } from "../../style";
import { Empty, Spin, Tooltip } from "antd";
import { IContacts } from "types/contact";
import SwiperCore, { Mousewheel } from "swiper";
import { NextLink } from "components";
import moment from "moment";
import { useRouter } from "next/router";
import { groupColors } from "layout/header/style";
import { groupStatusIdentifier } from "utils/groupStatusIdentifier";
import { checkIfCurrentMonth } from "utils/checkCurrentMonth";
import { titleIdentifier } from "./components/titleIdentifier";

SwiperCore.use([Mousewheel]);
const StudentsList: FC<any> = ({ row, width }) => {
  const router = useRouter();
  const { data: statisticsGroup, isLoading } = usePaymentStatisticsGroup({
    query_params: {
      user_id: row?.original?.user_id,
      year: moment(
        router.query?.date ?? moment().format("YYYY-MM"),
        "YYYY-MM",
      ).format("YYYY"),
      month: moment(
        router.query?.date ?? moment().format("YYYY-MM"),
        "YYYY-MM",
      ).format("MM"),
      expand:
        "realPayedContacts.student.currentGroupContact,groupType,total_amount,realPayedContacts.transferredToWithMonth.group,course,realPayedContacts.actualTransfersWithMonth.group,realPayedContacts.user.userProfile.avatar.children,realPayedContacts.user.fullName,realPayedContacts.group",
    },
  });
  const isPaymentDisabled = checkIfCurrentMonth(router.query?.date?.toString());

  return (
    <Spin spinning={isLoading}>
      <Flex style={{ width: `${width}px` }}>
        {!!statisticsGroup?.length ? (
          <div className="groups">
            {statisticsGroup?.map((group) => {
              return (
                <GroupWrapper key={group.id}>
                  <div className="group-header">
                    <div className="group-info">
                      <NextLink
                        href={`/groups/${group.id}`}
                        disabled={!group.id}
                      >
                        <Tooltip destroyTooltipOnHide title={group?.name}>
                          <h2 className="group-title">{group?.name}</h2>
                        </Tooltip>
                      </NextLink>
                      <Tooltip title={titleIdentifier({ group })}>
                        <div
                          className="studying"
                          style={
                            groupColors[
                              groupStatusIdentifier({
                                group,
                              }) as keyof typeof groupColors
                            ]
                          }
                        >
                          {groupStatusIdentifier({ group })}
                        </div>
                      </Tooltip>
                    </div>

                    <p className="group-name">
                      {group?.groupType?.name}{" "}
                      <span
                        className={`grotesk ${
                          group.realPayedContacts?.every(
                            (contact) =>
                              +(contact?.actualPayment?.debt || 0) === 0,
                          )
                            ? "green"
                            : "red"
                        }`}
                      >
                        {group?.realPayedContacts?.length}
                      </span>
                    </p>
                  </div>
                  <div className="group-body">
                    {group.realPayedContacts
                      ?.slice()
                      .sort((x, y) => {
                        return (
                          (y.actualPayment?.balance || 0) -
                          (x.actualPayment?.balance || 0)
                        );
                      })
                      .sort((x, y) => {
                        return (
                          (x.actualPayment?.debt || 0) -
                          (y.actualPayment?.debt || 0)
                        );
                      })
                      .map((student: IContacts, index: number) => (
                        <Student
                          data={student}
                          key={`index_${index}`}
                          id={index + 1}
                          isPaymentDisabled={isPaymentDisabled}
                        />
                      ))}
                  </div>
                  <div className="group-footer">
                    <p className="group-foot">Total</p>
                    <p className="group-sum grotesk">
                      {toCurrencyFormat(+group?.total_amount ?? 0)}
                    </p>
                  </div>
                </GroupWrapper>
              );
            })}
          </div>
        ) : (
          <div className="center">
            <Empty />
          </div>
        )}
      </Flex>
    </Spin>
  );
};

export default StudentsList;
