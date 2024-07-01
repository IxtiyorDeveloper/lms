import React from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { ECashBoxProduct, IProductAndService, IStockProduct } from "types";
import {
  Bottom,
  Content,
  Dot,
  List,
  MainPrice,
  Name,
  Price,
  CWr,
  Row,
  Col,
} from "./style";

const types = {
  [ECashBoxProduct.PRODUCT]: "Product",
  [ECashBoxProduct.SERVICES]: "Services",
  [ECashBoxProduct.OTHER]: "Other",
};

const ProductAndServiceContent = ({
  productAndServiceFields,
  products,
  selects,
}: {
  productAndServiceFields: IProductAndService;
  products: IStockProduct[] | undefined;
  selects: any;
}) => {
  return (
    <CWr>
      <Row>
        {Object.entries(productAndServiceFields).map(([key, value], index) => {
          const type = types?.[key as unknown as keyof typeof types];
          if ((key as unknown as ECashBoxProduct) == ECashBoxProduct.SERVICES) {
            const sum = value?.reduce((acc, cur) => {
              return acc + +cur?.amount;
            }, 0);
            return (
              <Col key={index}>
                <Bottom>
                  <p className="name">{type}</p>
                  <MainPrice>{toCurrencyFormat(sum)}</MainPrice>
                  <ul>
                    {value?.map((v, i) => {
                      const s = selects?.services?.find(
                        (ser: { id: number }) => ser.id == v?.id,
                      );
                      return (
                        <li key={i}>
                          <List>
                            <Dot />
                            <Content>
                              <Name>{s?.name}</Name>
                              <Price>{toCurrencyFormat(+v?.amount)}</Price>
                            </Content>
                          </List>
                        </li>
                      );
                    })}
                  </ul>
                </Bottom>
              </Col>
            );
          }
          if ((key as unknown as ECashBoxProduct) == ECashBoxProduct.PRODUCT) {
            const sum = value?.reduce((acc, cur) => {
              return acc + +cur?.amount;
            }, 0);
            return (
              <Col key={index}>
                <Bottom>
                  <p className="name">{type}</p>
                  <MainPrice>{toCurrencyFormat(sum)}</MainPrice>
                  <ul>
                    {value?.map((v, i) => {
                      const p = products?.find(
                        (ser: { id: number }) => ser.id == v?.id,
                      );
                      return (
                        <li key={i}>
                          <List>
                            <Dot />
                            <Content>
                              <Name>{p?.name}</Name>
                              <Price>{toCurrencyFormat(+v?.amount)}</Price>
                            </Content>
                          </List>
                        </li>
                      );
                    })}
                  </ul>
                </Bottom>
              </Col>
            );
          }

          if ((key as unknown as ECashBoxProduct) == ECashBoxProduct.OTHER) {
            const sum = value?.reduce((acc, cur) => {
              return acc + +cur?.amount;
            }, 0);
            return (
              <Col key={index}>
                <Bottom>
                  <p className="name">{type}</p>
                  <MainPrice>{toCurrencyFormat(sum)}</MainPrice>
                  <ul>
                    {value?.map((v, i) => {
                      return (
                        <li key={i}>
                          <List>
                            <Dot />
                            <Content>
                              <Name>{v?.comment}</Name>
                              <Price>{toCurrencyFormat(+v?.amount)}</Price>
                            </Content>
                          </List>
                        </li>
                      );
                    })}
                  </ul>
                </Bottom>
              </Col>
            );
          }
        })}
      </Row>
    </CWr>
  );
};

export default ProductAndServiceContent;
