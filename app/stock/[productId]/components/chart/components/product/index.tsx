import React, { FC, useMemo, useState } from "react";
import { Content, Wrapper } from "./style";
import { Popover } from "antd";
import { bgColors } from "styles/theme";
import { Button, ArrowSvg } from "components";
import { IStockPage, IStockProduct } from "types";
import { useRouter } from "next/router";
import { Arrow } from "app/ranking/home/components/table/style";

interface IProps {
  data?: IStockProduct;
  pageData?: IStockPage;
}
const Product: FC<IProps> = ({ data }) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const onSelectVariation = (id: number) => {
    router.replace({
      pathname: router.pathname,
      query: {
        ...router.query,
        variation_id: id,
      },
    });
  };

  const name = useMemo(() => {
    let name = "";
    data?.variations.map((e) => {
      router.query?.variation_id == e.id?.toString() &&
        e.options.map((e, index) => {
          const property = data?.properties.find((i) => i.id == e.property_id);
          const a = property?.options?.find((i) => e.option_id == i.id);
          name += `${property?.name}: ${a?.name}${index == 0 ? ", " : ""}`;
        });
    });
    return name;
  }, [data, router.query]);

  return (
    <Wrapper>
      <Popover
        destroyTooltipOnHide
        placement="bottom"
        content={
          <Content>
            <div className="title">Select options</div>
            <div className="items">
              {data?.allVariations?.map((e) => {
                return (
                  <div
                    key={Math.random() + "asdasd"}
                    className={`item ${
                      router.query.variation_id == e.id?.toString()
                        ? "active"
                        : ""
                    }`}
                    onClick={() => onSelectVariation(e.id)}
                  >
                    {e.options.map((e) => {
                      const property = data?.allProperties.find(
                        (i) => i.id == e.property_id,
                      );
                      const a = property?.allOptions?.find(
                        (i) => e.option_id == i.id,
                      );
                      return (
                        <div className="text">
                          {property?.name}: <div>{a?.name}</div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
            <Button
              onClick={() =>
                router.replace({
                  pathname: router.pathname,
                  query: {
                    ...router.query,
                    variation_id: undefined,
                  },
                })
              }
              style={{ width: "100%", marginTop: "8px" }}
            >
              By product
            </Button>
          </Content>
        }
        arrow={false}
        open={open}
        onOpenChange={() => setOpen(false)}
        trigger="click"
      >
        <div onClick={() => setOpen(!open)} className="active">
          <div className="flex">
            {data?.name} <div className="name">{name}</div>
          </div>
          <div className="arrow">
            <Arrow className="arrow-c" isOpen={open}>
              <ArrowSvg color={bgColors.yourShadow} width={14} height={14} />
            </Arrow>
          </div>
        </div>
      </Popover>
    </Wrapper>
  );
};

export default Product;
