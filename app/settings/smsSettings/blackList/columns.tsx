import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import React, { useMemo } from "react";
import { Exclusions, Flex, PhoneNumber } from "./style";
import formatPhoneNumber from "utils/phoneNumberFormatter";
import { bgColors } from "styles/theme";
import { Popover } from "antd";

const Columns = (
  handleOpenModal: (id: number) => void,
  setModals: any,
  modals: any,
  data: any
) => {
  const colors = [
    bgColors.midori,
    bgColors.orange,
    bgColors.pop,
    bgColors.yourShadow,
  ];
  return useMemo(() => {
    return [
      {
        title: <TableHeading padding>Student</TableHeading>,
        dataIndex: ["user", "userProfile"],
        render: (value: any, record: any, index: number) => {
          return <Cell>{value.firstname + " " + value.lastname}</Cell>;
        },
      },
      {
        title: <TableHeading>Project</TableHeading>,
        dataIndex: "project",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Numbers</TableHeading>,
        dataIndex: ["config", "keys"],
        render: (value: any, record: any, index: number) => {
          const cases = record?.config;
          return (
            <Cell style={{ width: "200px", padding: "10px 0" }}>
              <PhoneNumber>
                {cases.map((e: any, index: number) => (
                  <React.Fragment key={e.phone_number}>
                    <Popover
                      destroyTooltipOnHide
                      placement="bottom"
                      content={() => (
                        <Exclusions>
                          {e?.auto_sms?.map((a: string) => {
                            return (
                              <span
                                className="phone"
                                style={{ backgroundColor: colors[index] }}
                              >
                                {a}
                              </span>
                            );
                          })}
                        </Exclusions>
                      )}
                    >
                      <span
                        className="phone"
                        style={{ backgroundColor: colors[index] }}
                      >
                        {formatPhoneNumber(e.phone_number)}
                      </span>
                    </Popover>
                  </React.Fragment>
                ))}
              </PhoneNumber>
            </Cell>
          );
        },
      },
      {
        title: <TableHeading>Description</TableHeading>,
        dataIndex: "description",
        render: (value: any, record: any, index: number) => {
          return <Cell>{value}</Cell>;
        },
      },
      {
        title: <TableHeading>Action</TableHeading>,
        dataIndex: "action",
        render: (value: any, record: any, index: number) => {
          return (
            <Flex>
              <EditSvg onClick={() => handleOpenModal(record.user_id)} />
              <DeleteSvg
                width={20}
                height={20}
                onClick={() =>
                  setModals({
                    ...modals,
                    deleteAction: {
                      isOpen: true,
                      data: record,
                    },
                  })
                }
              />
            </Flex>
          );
        },
      },
    ];
  }, [data]);
};

export default Columns;
