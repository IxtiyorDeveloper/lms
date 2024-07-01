import React, { useMemo } from "react";
import {
  ArchivedTabSvg,
  FillStarSvg,
  StarSvg,
  StopSvg,
  StudyingSvg,
  Segmented,
  TimeWaitingSvg,
  TransferSvg,
  RedBadgeTitle,
  DollarSvg,
} from "components";
import { ChildWrapper, TableWrapper } from "./style";
import TableComponent from "../table";
import {
  TAB_ARCHIVED,
  TAB_NEW_STUDENT_ATTENDED,
  TAB_NEW_STUDENT_NOT_ATTENDED,
  TAB_STOPPING,
  TAB_STUDYING,
  TAB_TRANSFERRING,
  TAB_WAITING,
} from "constants/studentBalance";
import { useRouter } from "next/router";
import { useAllStudentBalance } from "hooks";
import { bgColors } from "styles/theme";
import _ from "lodash";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const TableSide = () => {
  const router = useRouter();
  const { isLoading, isPreviousData, data } = useAllStudentBalance({
    ...router.query,
    branch: router.query?.branch_id,
    tab_id: router.query.tab_id || TAB_WAITING,
  });

  const menu = useMemo(
    () => [
      {
        label: (
          <ChildWrapper>
            <p>Waiting</p>
            <span className="badge grotesk">{data?.tabs?.[TAB_WAITING]}</span>
          </ChildWrapper>
        ),
        icon: <TimeWaitingSvg />,
        value: TAB_WAITING.toString(),
      },
      {
        label: (
          <ChildWrapper>
            <p>Not attended</p>
            <span className="badge grotesk">
              {data?.tabs?.[TAB_NEW_STUDENT_NOT_ATTENDED]}
            </span>
          </ChildWrapper>
        ),
        icon: <StarSvg />,
        value: TAB_NEW_STUDENT_NOT_ATTENDED.toString(),
      },
      {
        label: (
          <ChildWrapper>
            <p>Attended</p>
            <span className="badge grotesk">
              {data?.tabs?.[TAB_NEW_STUDENT_ATTENDED]}
            </span>
          </ChildWrapper>
        ),
        icon: <FillStarSvg />,
        value: TAB_NEW_STUDENT_ATTENDED.toString(),
      },
      {
        label: (
          <ChildWrapper>
            <p>Studying</p>
            <span className="badge grotesk">{data?.tabs?.[TAB_STUDYING]}</span>
          </ChildWrapper>
        ),
        icon: <StudyingSvg />,
        value: TAB_STUDYING.toString(),
      },
      {
        label: (
          <ChildWrapper>
            <p>Transferring</p>
            <span className="badge grotesk">
              {data?.tabs?.[TAB_TRANSFERRING]}
            </span>
          </ChildWrapper>
        ),
        icon: <TransferSvg color={bgColors.yourShadow} />,
        value: TAB_TRANSFERRING.toString(),
      },
      {
        label: (
          <ChildWrapper>
            <p>Stopping</p>
            <span className="badge grotesk">{data?.tabs?.[TAB_STOPPING]}</span>
          </ChildWrapper>
        ),
        icon: <StopSvg color={bgColors.yourShadow} />,
        value: TAB_STOPPING.toString(),
      },
      {
        label: (
          <ChildWrapper>
            <p>Archived</p>
            <span className="badge grotesk">{data?.tabs?.[TAB_ARCHIVED]}</span>
          </ChildWrapper>
        ),
        icon: <ArchivedTabSvg />,
        value: TAB_ARCHIVED.toString(),
      },
    ],
    [data?.tabs],
  );
  const balance = (data as any)?.balance;
  return (
    <TableWrapper>
      <div className="badge-wrap">
        <RedBadgeTitle
          title="Student balance"
          count={_.sum(_.map(data?.tabs, (value) => +value))}
        />
        <div className="total-wrap">
          <div>{toCurrencyFormat(balance as number) ?? 0}</div>
          <div className="dollar">
            <DollarSvg width={6} height={10} />
          </div>
        </div>
      </div>
      <div className="thin-tab">
        <Segmented
          options={menu}
          routerKey="tab_id"
          initValue={
            router.query?.tab_id?.toString() || TAB_WAITING?.toString()
          }
        />
      </div>
      <TableComponent
        data={data?.list}
        name={+router.query?.tab_id! || TAB_WAITING}
        isLoading={isLoading || isPreviousData}
        pagination={{
          current: data?.meta?.currentPage,
          total: data?.meta?.totalCount,
        }}
      />
    </TableWrapper>
  );
};

export default TableSide;
