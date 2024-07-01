import React, { FC, useMemo, useState } from "react";
import { Card, SwiperWrapper, Wrapper } from "./style";
import { Collapse as AntdCollapse } from "antd";
import AntdBadge from "components/common/antdBadge";
import { ArrowSvg } from "components";
import { bgColors } from "styles/theme";
import { IStockPage, IStockProduct } from "types";
import { useRouter } from "next/router";
import { Arrow } from "app/ranking/home/components/table/style";

interface IProps {
  data?: IStockProduct;
  pageData?: IStockPage;
}
const Collapse: FC<IProps> = ({ data }) => {
  const [index, setIndex] = useState<any>();
  const router = useRouter();

  const count = useMemo(() => {
    let count = 0;
    data?.variations.map((e) => {
      if (router.query?.variation_id != e.id?.toString()) {
        count += e.options.length || 0;
      }
    });

    return count;
  }, [data, router]);

  if (count == 0) {
    return null;
  }

  return (
    <Wrapper>
      <AntdCollapse onChange={(e) => setIndex(e[0])}>
        <AntdCollapse.Panel
          header={
            <div className="panel-header">
              Product options
              <Arrow isOpen={index === "1"}>
                <ArrowSvg width={14} height={14} color={bgColors.soulfulBlue} />
              </Arrow>
            </div>
          }
          showArrow={false}
          key="1"
        >
          <SwiperWrapper
            navigation={{
              prevEl: ".swiper-button-prev",
              nextEl: ".swiper-button-next",
            }}
            spaceBetween={20}
            slidesPerView="auto"
            mousewheel={{ forceToAxis: true }}
          >
            {data?.variations.map((e) => {
              if (router.query?.variation_id == e.id?.toString()) {
                return null;
              }
              let count = 0;
              count +=
                (e?.units?.["100"] || 0) +
                (e?.units?.["200"] || 0) +
                (e?.units?.["300"] || 0);
              return (
                <Card isPc={true}>
                  <div className="img">
                    {e.options.map((e) => {
                      const property = data?.allProperties.find(
                        (i) => i.id == e.property_id
                      );
                      const a = property?.allOptions?.find(
                        (i) => e.option_id == i.id
                      );
                      return (
                        <div className="items">
                          <div>{property?.name}:</div>
                          <div className="count">{a?.name}</div>
                        </div>
                      );
                    })}
                    <AntdBadge content={count} />
                  </div>
                  <div className="counts">
                    <div className="item">
                      <div className="title">
                        <div className="circle" />
                        <div>Active</div>
                      </div>
                      <div className="amount">{e?.units?.["100"]}</div>
                    </div>
                    <div className="item">
                      <div className="title">
                        <div className="circle second-circle" />
                        <div>Recovery</div>
                      </div>
                      <div className="amount">{e?.units?.["200"]}</div>
                    </div>
                    <div className="item">
                      <div className="title">
                        <div className="circle third-circle" />
                        <div>Broken</div>
                      </div>
                      <div className="amount">{e?.units?.["300"]}</div>
                    </div>
                  </div>
                </Card>
              );
            })}
            <div className="swiper-button-prev"></div>
            <div className="swiper-button-next"></div>
          </SwiperWrapper>
        </AntdCollapse.Panel>
      </AntdCollapse>
    </Wrapper>
  );
};

export default Collapse;
