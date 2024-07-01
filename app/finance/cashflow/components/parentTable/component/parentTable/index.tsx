import React, { memo, useEffect } from "react";
import { AntdTable } from "components";
import { useTableExpand } from "hooks";
import { ParentRow } from "../rows/parentRow";
import ChildTable from "../table";
import { Wrapper } from "./style";
import { useSalaryMain } from "hooks";
import { useRouter } from "next/router";
import _ from "lodash";
import moment from "moment";
import { useQueryClient } from "@tanstack/react-query";
import { queryKeys } from "constants/queryKeys";
import { ICashFlow } from "types";

const CashFlowParentTable = memo(
  ({
    e,
    total,
    bool,
    without_avans,
  }: {
    e: any;
    total: any;
    bool: boolean;
    without_avans: boolean;
  }) => {
    const router = useRouter();
    const queryClient = useQueryClient();
    const { onRowClick, expandedRowKeys } = useTableExpand();

    const renderRowSubComponent = React.useCallback(
      ({ row }: any) => {
        return (
          <ChildTable row={row} total={total} without_avans={without_avans} />
        );
      },
      [without_avans],
    );

    const { data: salaryData } = useSalaryMain({
      query_params: {
        year: router.query.year,
        month: router.query.month,
        expand:
          "user.userProfile,rbacRole.department,aggregatedComponents.subTypeLabel,actualSalary.isGiven,rbacRoleShift",
        is_given: "no",
      },
      enabled:
        (e.key == 100 &&
          bool &&
          moment().format("YYYY") == router.query.year &&
          moment().format("MM") == router.query.month) ||
        false,
    });

    useEffect(() => {
      if (e.key == 100 && bool) {
        const values = _.values(_.groupBy(salaryData, (e) => e.department?.id));
        queryClient.setQueriesData<ICashFlow[]>(
          [queryKeys.cash_flow],
          (data) => {
            return data?.map((e) => {
              if (e.key == 100) {
                let total_amount = 0;
                const children = e.children;
                values.map((i) => {
                  let card = 0;
                  let cash = 0;
                  let a: any = [];
                  i.map((e) => {
                    e.assignments?.map((e) => {
                      card += +(e.actualSalary?.card || 0);
                      cash += +(e.actualSalary?.cash || 0);
                      a.push({
                        id: null,
                        description: null,
                        payment_form: 100,
                        amount:
                          +(e.actualSalary?.card || 0) +
                          +(e.actualSalary?.cash || 0),
                        color: null,
                        orderedBy: null,
                        receivedBy: (e as any).user,
                        createdBy: {
                          id: 73088,
                          username: "sardor.finance",
                          email: "a@gmail.com",
                          status: 100,
                          created_at: "2022-05-20 15:47:22",
                          updated_at: "2023-11-05 20:00:29",
                          userProfile: {
                            user_id: 73088,
                            firstname: "Sardorbek",
                            middlename: null,
                            lastname: "Qosimov",
                            locale: "ru-RU",
                            gender: null,
                            description: null,
                            bio: null,
                            dob: null,
                          },
                          balance: null,
                        },
                        branch: {
                          id: 13,
                          name: "Back Office",
                          address: null,
                          landmark: null,
                          latitude: null,
                          longitude: null,
                          description: null,
                          status: 100,
                          region_id: 1,
                        },
                        expense_group_id: 3763,
                        expenseCategory: {
                          id: 13,
                          key: 100,
                          order: 1,
                          name: "SALARY",
                          color: null,
                          type: 100,
                          parent_id: null,
                        },
                        created_at: "2023-10-31 18:00:00",
                        updated_at: "2023-10-31 18:00:00",
                        expenseLinks: [],
                        expenseFiles: [],
                      });
                    });
                  });
                  total_amount += cash + card;
                  children.push({
                    key: 200,
                    with_department: false,
                    name: i[0].department.name,
                    id: i[0].department.id,
                    detailedAmount: [
                      {
                        payment_form: "200",
                        amount: card,
                      },
                      {
                        payment_form: "100",
                        amount: cash,
                      },
                    ],
                    total_amount: cash + card,
                    color: "",
                    children: [],
                    assignments: a,
                  } as any);
                });
                return {
                  ...e,
                  total_amount,
                  children,
                };
              }
              return e;
            });
          },
        );
      }
    }, [salaryData, bool]);
    return (
      <Wrapper>
        <AntdTable
          columns={ParentRow(e, total, expandedRowKeys, without_avans)}
          dataSource={e.children || []}
          expandable={{
            expandedRowRender: (record: any) =>
              renderRowSubComponent({ row: { original: record } }),
            expandedRowKeys,
          }}
          pagination={false}
          onRow={(record, rowIndex) => {
            return {
              onClick: () => {
                onRowClick({ id: record?.id });
              },
            };
          }}
          rowClassName={(record, index, indent) => {
            return expandedRowKeys?.includes(record?.id) ? "lemon" : "";
          }}
        />
      </Wrapper>
    );
  },
);

export default CashFlowParentTable;
