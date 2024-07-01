import React, { useMemo, useState } from "react";
import { CardWrapper, Card } from "./style";
import { IStore, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { BranchSvg, FreshmanSvg, RegisteredSvg, TWalletSvg } from "components";
import { bgColors } from "styles/theme";
import {
  useClientStaff,
  useFreshmanList,
  useLeadLists,
  usePageDataMemo,
} from "hooks";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { expand } from "app/statistics/dashboard/freshmanLost/freshman/expand";
import moment from "moment";
import { IActualSalary } from "types/finance/salary";
import { DATE_FORMAT_YYYY_MM_DD } from "constants/dates";
import { Spin } from "antd";
import { funcCheckPermission } from "utils";
import { COMPONENTS_VIEWS } from "constants/permissions";

export enum ProfileCardEnums {
  SALARY = "salary",
  BRANCH = "branch",
  FRESHMAN = "freshman",
  REGISTERED = "registered",
}

const Cards = () => {
  const user = useSelector((state: IStore) => state.user.user);
  const selects = usePageDataMemo();
  const dispatch = useDispatch();

  const [permissions, setPermissions] = useState({
    lead: true,
    freshman: true,
  });

  const can_see_lead = funcCheckPermission([COMPONENTS_VIEWS.can_see_lead]);
  const can_see_dashboard_own_student_flow = funcCheckPermission([
    COMPONENTS_VIEWS.can_see_dashboard_own_student_flow,
  ]);
  const handleClick = ({
    type,
    clickable,
  }: {
    type: ProfileCardEnums;
    clickable: boolean;
  }) => {
    if (clickable) {
      if (type == ProfileCardEnums.SALARY) {
        dispatch(
          toggleModal({
            key: "profileSalary",
            data: {
              data: {},
              open: true,
            },
          })
        );
      }
      if (type == ProfileCardEnums.REGISTERED) {
        dispatch(
          toggleModal({
            key: "registeredLead",
            data: {
              data: {
                id: user?.id,
              },
              open: true,
            },
          })
        );
      }
      if (type == ProfileCardEnums.FRESHMAN) {
        dispatch(
          toggleModal({
            key: "freshmanForProfile",
            data: {
              data: {
                id: user?.id,
              },
              open: true,
            },
          })
        );
      }
    }
  };

  const {
    data: freshman,
    isInitialLoading: isFreshmanLoading,
    isPreviousData: isFreshmanPrevious,
  } = useFreshmanList({
    enabled: can_see_dashboard_own_student_flow,
    toast_off: true,
    query_params: {
      created_by: user?.id,
      month: moment().format("MM"),
      year: moment().format("YYYY"),
      expand,
    },
    onError: (err: any) => {
      if (err.status === 403) {
        setPermissions({
          ...permissions,
          freshman: false,
        });
      }
    },
  });

  const {
    data: actualSalary,
    isInitialLoading,
    isPreviousData,
  } = useClientStaff({
    query_params: {
      month: moment().format("MM"),
      year: moment().format("YYYY"),
      expand: "aggregatedComponents",
    },
  });

  const currenMonth = moment();
  const startOfMonth = moment().startOf("month");

  const {
    isInitialLoading: isRegisteredLoading,
    isPreviousData: isRegisteredPreviousData,
    data: registered,
  } = useLeadLists({
    enabled: can_see_lead,
    toast_off: true,
    query_params: {
      start_date: startOfMonth.format(DATE_FORMAT_YYYY_MM_DD),
      end_date: currenMonth.format(DATE_FORMAT_YYYY_MM_DD),
      updated_by: user?.id,
      status: 400,
    },
    onError: (err: any) => {
      if (err.status === 403)
        setPermissions({
          ...permissions,
          lead: false,
        });
    },
  });

  const data = actualSalary as unknown as IActualSalary;

  const cards = useMemo(() => {
    return [
      {
        svg: <TWalletSvg />,
        label: "Salary",
        result: `${toCurrencyFormat(data?.total_salary)}`,
        color: bgColors.midori,
        type: ProfileCardEnums.SALARY,
        clickable: true,
      },
      {
        svg: <BranchSvg />,
        label: "Branch",
        result: selects.branch?.find(
          (br) => br.value == user?.defaultBranches?.[0]
        )?.label,
        color: bgColors.royal,
        type: ProfileCardEnums.BRANCH,
      },
      {
        svg: <FreshmanSvg />,
        label: "Freshman",
        result:
          permissions.freshman && can_see_dashboard_own_student_flow
            ? freshman?.meta?.totalCount
            : "N/A",
        color: bgColors.orange,
        type: ProfileCardEnums.FRESHMAN,
        clickable: permissions.freshman,
      },
      {
        svg: <RegisteredSvg />,
        label: "Registered lead",
        result:
          permissions.lead && can_see_lead
            ? registered?.meta?.totalCount
            : "N/A",
        color: bgColors.primary,
        type: ProfileCardEnums.REGISTERED,
        clickable: permissions.lead,
      },
    ];
  }, [
    user,
    selects.args.isLoading,
    data,
    freshman?.meta?.totalCount,
    registered?.meta?.totalCount,
    permissions,
  ]);

  return (
    <Spin
      spinning={
        isInitialLoading ||
        isPreviousData ||
        isFreshmanLoading ||
        isFreshmanPrevious ||
        isRegisteredLoading ||
        isRegisteredPreviousData
      }
    >
      <CardWrapper>
        {cards?.map((item, index) => {
          return (
            <Card
              key={index}
              color={item.color}
              onClick={() =>
                handleClick({ type: item.type, clickable: !!item.clickable })
              }
            >
              <div className="circle">{item.svg}</div>
              <div className="bottom">
                <p className="label">{item.label}</p>
                <p className="result">{item.result}</p>
              </div>
            </Card>
          );
        })}
      </CardWrapper>
    </Spin>
  );
};

export default Cards;
