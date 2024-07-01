import React, { FC, useEffect, useState } from "react";
import { Item, Wrapper } from "./style";
import {
  AntdModal,
  Button,
  MySelect,
  InputNumber,
  Input,
  ThinArrowRight,
  TransferSvg,
} from "components";
import { useForm } from "react-hook-form";
import { toggleModal, useAppSelector } from "store";
import { useDispatch } from "react-redux";
import { Divider, Image, Radio, Spin } from "antd";
import {
  useStockPageData,
  useStockProductArrival,
  useUnitStatusInfo,
} from "hooks";
import { validationErrorHandler } from "utils";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { bgColors, textColors } from "styles/theme";
import { ProductFor } from "../../../../[productId]/components/chart/style";
import { IStockProduct } from "types";
import _ from "lodash";
import { IPropsStockActionModal } from "../../index";
import { StockProductType } from "constants/stock";

const buttonStyle = {
  borderRadius: "10px",
};

const TransferModal: FC<IPropsStockActionModal> = ({
  shouldBeInvalidateKeys,
}) => {
  const { control, watch, handleSubmit, setError, clearErrors, reset } =
    useForm();

  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const { data, isLoading } = useStockPageData({});
  const {
    stockTransfer: { open, data: modalData },
  } = useAppSelector((state) => state.modals);
  const product = modalData as IStockProduct;
  const [radioValue, setRadioValue] = useState<"100" | "200" | "300">();
  const handleClose = () => {
    reset();
    setRadioValue(undefined);
    dispatch(
      toggleModal({
        key: "stockTransfer",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const save = useStockProductArrival({
    onSuccess: () => {
      toast.success(`Success!`);
      handleClose();
      // queryClient.invalidateQueries([queryKeys.admin_category_index]);
      // queryClient.invalidateQueries([queryKeys.admin_page_data]);
      shouldBeInvalidateKeys?.map((e) => {
        queryClient.invalidateQueries([e]);
      });
    },
    onError: (err) => {
      validationErrorHandler({ err, setError });
    },
  });

  const onSubmit = (data: any) => {
    save.mutate({
      action: "admin_action_transfer",
      body: {
        ...data,
        unit_status: radioValue,
        product_id: product.id,
        properties: _.map(data?.properties, (value, key) => {
          return (
            value && {
              property_id: key?.split("/")?.[0],
              option_id: value,
            }
          );
        }).filter((e) => !!e),
      },
    });
  };

  useEffect(() => {
    const subscription = watch((value, { type }) => {
      if (type === "change") {
        clearErrors();
      }
    });
    return () => subscription.unsubscribe();
  }, [watch]);

  const locationId = watch("location_id");

  const units = locationId
    ? product?.locations?.find((e) => e.location_id == locationId)?.units
    : product.units;

  const watchAll = watch();
  const { data: unitsCount } = useUnitStatusInfo({
    query_params: {
      ...watchAll,
      product_id: product.id,
    },
    body: {
      properties: _.map(watchAll?.properties, (value, key) => {
        return (
          value && {
            property_id: key?.split("/")?.[0],
            option_id: value,
          }
        );
      }).filter((e) => !!e),
    },
  });
  const all =
    (unitsCount?.["100"] || 0) +
    (unitsCount?.["200"] || 0) +
    (unitsCount?.["300"] || 0);

  return (
    <AntdModal
      padding="0"
      open={open}
      width={520}
      destroyOnClose
      onCancel={handleClose}
    >
      <Spin spinning={isLoading}>
        <Wrapper>
          <div className="p">
            <div className="title">
              <TransferSvg color={bgColors.royal} width={18} height={18} />
              Transfer
            </div>
            <div className="product">
              <Image
                src={product.cover_photo || "/noimage.png"}
                width={70}
                height={60}
                style={{ borderRadius: "3px" }}
              />
              <div className="column">
                <div className="name">{product.name}</div>
                <div className="flex shop">{product?.category?.name}</div>
                <div className="flex mt">
                  <div className="type">Product type:</div>
                  <ProductFor
                    isCompany={
                      product?.type?.toString() == StockProductType.Company
                    }
                  />
                  <div className="ml">
                    All count: <div className="count">{all}</div>
                  </div>
                </div>
              </div>
            </div>
            <Divider orientationMargin={0} />
            <div className="body">
              {product?.properties?.map((e) => {
                return (
                  <div>
                    <MySelect
                      name={`properties.${e.id}/option_id`}
                      control={control}
                      label={e.name}
                      placeholder="Select"
                      options={e?.options?.map((e) => {
                        return {
                          label: e.name,
                          value: e.id,
                        };
                      })}
                    />
                  </div>
                );
              })}
              <div className="flex-c">
                <MySelect
                  name="location_id"
                  control={control}
                  label="Location from"
                  placeholder="Select"
                  options={data?.locations?.map((e) => {
                    return {
                      label: e.name,
                      value: e.id,
                    };
                  })}
                />
                <ThinArrowRight
                  width={48}
                  height={32}
                  color={bgColors.deep}
                  style={{ marginTop: 24 }}
                />
                <MySelect
                  name="next_location_id"
                  control={control}
                  label="Location to"
                  placeholder="Select"
                  options={data?.locations?.map((e) => {
                    return {
                      label: e.name,
                      value: e.id,
                    };
                  })}
                />
              </div>
              <div>
                <div className="label">Departure unit status</div>
                <div className="selects">
                  <Item
                    onClick={() => setRadioValue("100")}
                    isActive={radioValue == "100"}
                  >
                    <div className="flex">
                      <div className="circle" />
                      <div>Active</div>
                      <div>
                        <Radio checked={radioValue == "100"} />
                      </div>
                    </div>
                    <div className="flex">
                      <div></div>
                      <div className="count">{unitsCount?.["100"] || 0}</div>
                      <div></div>
                    </div>
                  </Item>
                  <Item
                    onClick={() => setRadioValue("200")}
                    isActive={radioValue == "200"}
                  >
                    <div className="flex">
                      <div className="circle second-circle" />
                      <div>Recovery</div>
                      <div>
                        <Radio checked={radioValue == "200"} />
                      </div>
                    </div>
                    <div className="flex">
                      <div></div>
                      <div className="count">{unitsCount?.["200"] || 0}</div>
                      <div></div>
                    </div>
                  </Item>
                  <Item
                    onClick={() => setRadioValue("300")}
                    isActive={radioValue == "300"}
                  >
                    <div className="flex">
                      <div className="circle third-circle" />
                      <div>Broken</div>
                      <div>
                        <Radio checked={radioValue == "300"} />
                      </div>
                    </div>
                    <div className="flex">
                      <div></div>
                      <div className="count">{unitsCount?.["300"] || 0}</div>
                      <div></div>
                    </div>
                  </Item>
                </div>
              </div>
              <div>
                <InputNumber
                  name="count"
                  control={control}
                  label="Amount (Count)"
                  placeholder="Type here..."
                  max={units?.[radioValue as keyof typeof units] || 0}
                />
              </div>
              <div>
                <Input
                  name="note"
                  control={control}
                  rows={3}
                  placeholder="Type here..."
                  label="Note"
                  type="textarea"
                />
              </div>
            </div>
          </div>
          <div className="buttons">
            <div></div>
            <div className="btns">
              <Button
                style={{
                  ...buttonStyle,
                  background: bgColors.wildSand,
                  color: textColors.soulfulBlue,
                }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                buttonLoading={save.isLoading}
                type="submit"
                style={{ ...buttonStyle }}
                onClick={handleSubmit(onSubmit)}
              >
                Save
              </Button>
            </div>
          </div>
        </Wrapper>
      </Spin>
    </AntdModal>
  );
};

export default TransferModal;
