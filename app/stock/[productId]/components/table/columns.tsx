import { ColumnGroupType, ColumnType } from "antd/lib/table/interface";
import {
  Cell,
  RecieveSvg,
  RevertSvg,
  TableHeading,
  UpdateSvg,
  TransferSvg,
  DeleteCircle,
  ThinArrowRight,
} from "components";
import React from "react";
import { getRowNumber } from "utils/getRowNumber";
import { bgColors } from "styles/theme";
import { Flex, Item } from "./style";
import moment from "moment";
import { IStockPage, IStockProduct } from "types";
import { DATE_FORMAT_CREATED_AT } from "constants/dates";
import { Popover } from "antd";

const unitStatus = {
  ["100"]: "Active",
  ["200"]: "Recovery",
  ["300"]: "Broken",
  ["400"]: "Ordered",
};

const types = {
  ["100"]: (
    <Item>
      <div>
        <RecieveSvg />
      </div>
      Arrival
    </Item>
  ),
  ["200"]: (
    <Item color={bgColors.pale}>
      <div>
        <UpdateSvg />
      </div>
      Departure
    </Item>
  ),
  ["500"]: (
    <Item color={bgColors.pale}>
      <div>
        <UpdateSvg />
      </div>
      Departure
    </Item>
  ),
  ["300"]: (
    <Item color={bgColors.sinter}>
      <div>
        <TransferSvg color={bgColors.deep} width={16} height={16} />
      </div>
      Transfer
    </Item>
  ),
  ["400"]: (
    <Item color={bgColors.bonnie}>
      <div>
        <RevertSvg />
      </div>
      Change
    </Item>
  ),
  ["600"]: (
    <Item color={bgColors.pale}>
      <div>
        <UpdateSvg />
      </div>
      Given
    </Item>
  ),
  ["700"]: (
    <Item color={bgColors.pale}>
      <div>
        <UpdateSvg />
      </div>
      Sold
    </Item>
  ),
};

interface IProps {
  data?: IStockPage;
  product?: IStockProduct;
  setOpen?: any;
}

export const columns = ({
  data,
  product,
  setOpen,
}: IProps): (ColumnGroupType<any> | ColumnType<any> | boolean)[] => {
  return [
    {
      title: (
        <TableHeading padding isId>
          Type of transaction
        </TableHeading>
      ),
      dataIndex: "type",
      render: (value, record, index) => {
        const id = getRowNumber({ index });
        return (
          <Cell>
            <div className="name">
              <div className="index">{id}</div>
              <div>{types?.[value as keyof typeof types]}</div>
            </div>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Created by</TableHeading>,
      dataIndex: ["createdBy", "username"],
      render: (value) => <Cell>{value}</Cell>,
    },
    {
      title: <TableHeading>Product option</TableHeading>,
      dataIndex: ["variation", "options"],
      render: (value) => {
        const c = value?.map((i: any) => {
          const a = product?.allProperties.find((e) => e.id == i?.property_id);
          const b = a?.allOptions?.find((e) => e.id == i?.option_id);
          return (
            <div>
              <span className="secondary-text">{a?.name}:</span> {b?.name}
            </div>
          );
        });
        return <Cell>{c}</Cell>;
      },
    },
    {
      title: <TableHeading>Created date & time</TableHeading>,
      dataIndex: ["created_at"],
      render: (value) => {
        const date = moment(value, DATE_FORMAT_CREATED_AT);

        return (
          <Cell>
            {date.format("DD MMM YYYY")}
            <div className="secondary-text">{date.format("HH:mm")}</div>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Location</TableHeading>,
      dataIndex: "locations",
      render: (value) => (
        <Cell>
          <Flex>
            {value?.map((i: number, index: number) => {
              return (
                <div>
                  {data?.locations?.find((e) => e.id == i)?.name}{" "}
                  {value?.length > 1 && index == 0 && (
                    <ThinArrowRight
                      width={20}
                      height={20}
                      color={bgColors.deep}
                    />
                  )}
                </div>
              );
            })}
          </Flex>
        </Cell>
      ),
    },
    {
      title: <TableHeading>Status</TableHeading>,
      dataIndex: "unitStatuses",
      render: (value, record) => {
        return (
          <Cell>
            <Flex>
              <Flex>
                {value?.map((i: string, index: number) => {
                  return (
                    <div>
                      {unitStatus?.[i as keyof typeof unitStatus]}{" "}
                      {value?.length > 1 && index == 0 && (
                        <ThinArrowRight
                          width={20}
                          height={20}
                          color={bgColors.deep}
                        />
                      )}
                    </div>
                  );
                })}
              </Flex>
            </Flex>
          </Cell>
        );
      },
    },
    {
      title: <TableHeading>Note</TableHeading>,
      dataIndex: "note",
      render: (value) => (
        <Cell
          style={{
            maxWidth: "200px",
          }}
        >
          <Popover
            content={
              <div
                style={{
                  whiteSpace: "unset",
                  padding: "8px",
                  textOverflow: "unset",
                  maxWidth: "250px",
                }}
              >
                {value}
              </div>
            }
          >
            <div className="secondary-text">{value}</div>
          </Popover>
        </Cell>
      ),
    },
    {
      title: <TableHeading>Amount</TableHeading>,
      dataIndex: "count",
      render: (value) => <Cell>{value}</Cell>,
    },
    {
      title: <TableHeading>Actions</TableHeading>,
      dataIndex: "buttonActions",
      render: (value, record) => (
        <Cell>
          <div className="flex">
            {value?.canDelete && (
              <DeleteCircle
                size="small"
                onClick={() => setOpen({ open: true, id: record.id })}
              />
            )}
          </div>
        </Cell>
      ),
    },
  ];
};
