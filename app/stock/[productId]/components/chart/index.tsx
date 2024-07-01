import React, { FC } from "react";
import { Container, ProductFor, TabItem, Wrapper } from "./style";
import {
  Button,
  RecieveSvg,
  RevertSvg,
  TransferSvg,
  UpdateSvg,
  EditSvg,
  FreeSvg,
} from "components";
import { bgColors, textColors } from "styles/theme";
import { Image } from "antd";
import Product from "./components/product";
import ByBranches from "./components/byBranches";
import Collapse from "./components/collapse";
import ByAll from "./components/byAll";
import { IStockPage, IStockProduct } from "types";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { IUIStore } from "store/slices/modals/type";
import { StockProductType } from "constants/stock";
import Segmented from "../../../../../components/common/segmented";
import { AdministrativeSvg, FlowSvg } from "@jasurbekyuldashov/lms-web-icons";
import { useRouter } from "next/router";
import TransactionTab from "./components/transaction";

const buttonStyle = {
  display: "flex",
  padding: "8px 16px",
  justifyContent: "center",
  alignItems: "center",
  gap: "8px",
  height: "37px",
  color: textColors.white,
};

interface IProps {
  data?: IStockProduct;
  pageData?: IStockPage;
}
const Chart: FC<IProps> = ({ data, pageData }) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleEdit = () => {
    dispatch(
      toggleModal({
        key: "stockProduct",
        data: {
          data: data || {},
          open: true,
        },
      }),
    );
  };

  const handleClickActions = (key: keyof IUIStore) => {
    dispatch(
      toggleModal({
        key,
        data: {
          data: data || {},
          open: true,
        },
      }),
    );
  };

  const bool = !router.query.tabId || router.query.tabId == "1";
  return (
    <Container>
      <Wrapper>
        <div className="info">
          <div className="product">
            <Image
              src={data?.cover_photo ?? "/noimage.png"}
              width={70}
              height={70}
              style={{ borderRadius: "6px", objectFit: "contain" }}
            />
            <div className="column">
              <div className="flex">
                <Product pageData={pageData} data={data} />
                <div className="edit" onClick={() => handleEdit()}>
                  <EditSvg />
                </div>
              </div>
              <div className="flex shop">{data?.category?.name}</div>
              <div className="flex">
                <div className="type">Product type:</div>
                <ProductFor
                  isCompany={data?.type?.toString() == StockProductType.Company}
                />
                <div>{data?.isStationary && <FreeSvg />}</div>
              </div>
            </div>
          </div>
          <div className="buttons">
            {data?.buttonActions?.canArrival && (
              <div>
                <Button
                  style={{ ...buttonStyle, background: bgColors.midori }}
                  icon={<RecieveSvg color={bgColors.white} />}
                  onClick={() => handleClickActions("stockArrival")}
                >
                  Arrival
                </Button>
              </div>
            )}
            {data?.buttonActions?.canDeparture && (
              <div>
                <Button
                  style={{ ...buttonStyle, background: bgColors.pop }}
                  icon={<UpdateSvg color={bgColors.white} />}
                  onClick={() => handleClickActions("stockDeparture")}
                >
                  Departure
                </Button>
              </div>
            )}
            {data?.buttonActions?.canTransfer && (
              <div>
                <Button
                  style={{ ...buttonStyle, background: bgColors.royal }}
                  icon={
                    <TransferSvg
                      color={bgColors.white}
                      width={18}
                      height={18}
                    />
                  }
                  onClick={() => handleClickActions("stockTransfer")}
                >
                  Transfer
                </Button>
              </div>
            )}
            {data?.buttonActions?.canChange && (
              <div>
                <Button
                  style={{ ...buttonStyle, background: bgColors.orange }}
                  icon={<RevertSvg color={bgColors.white} />}
                  onClick={() => handleClickActions("stockChange")}
                >
                  Change
                </Button>
              </div>
            )}
          </div>
        </div>
      </Wrapper>
      <Wrapper>
        <Segmented
          initValue={(router.query.tabId as string) || "1"}
          options={[
            {
              label: (
                <TabItem bool={bool}>
                  <AdministrativeSvg
                    color={bool ? bgColors.dark : bgColors.soulfulBlue}
                  />
                  Condition
                </TabItem>
              ),
              children: null,
              value: "1",
            },
            {
              label: (
                <TabItem bool={!bool}>
                  <FlowSvg
                    color={!bool ? bgColors.dark : bgColors.soulfulBlue}
                  />
                  Transaction
                </TabItem>
              ),
              children: null,
              value: "2",
            },
          ]}
          routerKey="tabId"
        />
        {bool ? (
          <div className="flex-container">
            <ByBranches data={data} pageData={pageData} />
            <ByAll data={data} />
          </div>
        ) : (
          <TransactionTab pageData={pageData} />
        )}
        <Collapse data={data} pageData={pageData} />
      </Wrapper>
    </Container>
  );
};

export default Chart;
