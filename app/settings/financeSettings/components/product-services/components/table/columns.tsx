import React, { useMemo } from "react";
import {
  CellDescriptionWrapper,
  CellNameWrapper,
  HeaderCell,
  PriceWrapper,
  TextWrapper,
} from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { CircleImage, DeleteSvg, EditSvg, TableHeading } from "components";
import { bgColors } from "styles/theme";
import { getRowNumber } from "utils/getRowNumber";
import { productAndServiceEnums } from "constants/productAndService";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { Tooltip } from "antd";
import { queryKeys } from "constants/queryKeys";

const Columns = () => {
  const dispatch = useDispatch();
  return useMemo(() => {
    return [
      {
        dataIndex: "name",
        title: (
          <TableHeading padding isId>
            Name
          </TableHeading>
        ),
        render: (value: any, record: any, index: number) => {
          const name = value;
          const id = getRowNumber({ index });
          const image = record.iconFile;
          return (
            <CellNameWrapper
              style={{
                minWidth: "100px",
                alignItems: "center",
                minHeight: "45px",
                paddingLeft: "15px",
              }}
            >
              <div className="index">{id}</div>
              <div className="img-wr">
                <CircleImage
                  src={{
                    full_url: !!image?.base_url
                      ? `${image?.base_url}/${image?.path}`
                      : undefined,
                  }}
                  alt="student avatar"
                  className="image-inside"
                  placeholder="none"
                />
              </div>
              <Tooltip destroyTooltipOnHide title={name}>
                <div className="name">{name}</div>
              </Tooltip>
            </CellNameWrapper>
          );
        },
      },
      {
        dataIndex: "description",
        title: <HeaderCell>Description</HeaderCell>,
        render: (value: any, record: any, index: number) => {
          return (
            <Tooltip destroyTooltipOnHide title={value} placement="topLeft">
              <CellDescriptionWrapper>{value || "-"}</CellDescriptionWrapper>
            </Tooltip>
          );
        },
      },
      {
        dataIndex: "price",
        title: <HeaderCell>Price</HeaderCell>,
        render: (value: any, record: any, index: number) => {
          return <PriceWrapper>{toCurrencyFormat(value)}</PriceWrapper>;
        },
      },
      {
        dataIndex: "type",
        title: <HeaderCell>Product type</HeaderCell>,
        render: (value: any, record: any, index: number) => {
          return (
            <TextWrapper>
              {
                productAndServiceEnums.types?.[
                  value as keyof typeof productAndServiceEnums.types
                ]
              }
            </TextWrapper>
          );
        },
      },
      {
        dataIndex: "sell_place",
        title: <HeaderCell>Sell place</HeaderCell>,
        render: (value: any, record: any, index: number) => {
          return (
            <TextWrapper>
              {
                productAndServiceEnums.sellPlaces?.[
                  value as keyof typeof productAndServiceEnums.sellPlaces
                ]
              }
            </TextWrapper>
          );
        },
      },
      {
        dataIndex: "actions",
        title: <HeaderCell>Actions</HeaderCell>,
        render: (value: any, record: any, index: number) => {
          const data = record;
          return (
            <div style={{ display: "flex", gap: "10px", cursor: "pointer" }}>
              <div>
                <EditSvg
                  color={bgColors.midori}
                  onClick={() =>
                    dispatch(
                      toggleModal({
                        key: "productAndService",
                        data: {
                          data: { action: "update", id: data?.id },
                          open: true,
                        },
                      })
                    )
                  }
                />
              </div>

              <div
                onClick={() =>
                  dispatch(
                    toggleModal({
                      key: "deleteProductAndService",
                      data: {
                        data: {
                          id: data?.id,
                          queryKeys: [
                            queryKeys.admin_finance_product_and_service_index,
                          ],
                        },
                        open: true,
                      },
                    })
                  )
                }
              >
                <DeleteSvg color={bgColors.pop} />
              </div>
            </div>
          );
        },
      },
    ];
  }, []);
};

export default Columns;
