import { Controller } from "react-hook-form";
import { Wrapper } from "./style";
import { Label } from "../input/style";
import ErrorLabel from "../errorLabel";
import { Swiper, SwiperSlide } from "swiper/react";
import {
  Card,
  CardBody,
  CardImageWrapper,
} from "globals/components/transactionModal/style";
import { CardImage } from "../index";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import * as React from "react";
import { IProduct } from "types";
import { FC } from "react";
import { Type } from "./type";
import { Empty, Tooltip } from "antd";
import SwiperCore, { Mousewheel } from "swiper";

SwiperCore.use([Mousewheel]);
const ProductList: FC<Type> = ({
  data,
  name,
  control,
  label,
  required = false,
  error,
}) => {
  return (
    <Wrapper required={label ? false : required}>
      <Label required={required} htmlFor={name}>
        {label}
      </Label>
      {!!data?.length ? (
        <Controller
          name={name}
          control={control}
          render={({ field }) => {
            return (
              <Swiper
                slidesPerView={3.5}
                spaceBetween={60}
                style={{ paddingRight: "29px" }}
                autoHeight={true}
                mousewheel={{ forceToAxis: true }}
                navigation={{
                  prevEl: ".swiper-button-prev",
                  nextEl: ".swiper-button-next",
                }}
              >
                {data?.map((product, index: number) => {
                  const active = field.value == product?.id;
                  return (
                    <SwiperSlide
                      key={index}
                      onClick={() => field.onChange(product?.id)}
                      className="stretch"
                      id="current-slide"
                    >
                      <Card isActive={active}>
                        <CardImageWrapper>
                          <CardImage src={product?.cover_photo} width="100%" />
                        </CardImageWrapper>
                        <CardBody>
                          <Tooltip
                            destroyTooltipOnHide
                            title={product?.name}
                            trigger="click"
                            getPopupContainer={() =>
                              document.getElementById("current-slide") as any
                            }
                          >
                            <h4>{product?.name}</h4>
                          </Tooltip>
                          <Tooltip
                            destroyTooltipOnHide
                            getPopupContainer={() =>
                              document.getElementById("current-slide") as any
                            }
                            title={product?.price}
                            trigger="click"
                          >
                            <p className="price">
                              {toCurrencyFormat(+product?.price)}
                            </p>
                          </Tooltip>
                        </CardBody>
                      </Card>
                    </SwiperSlide>
                  );
                })}
                <div className="swiper-button-prev"></div>
                <div className="swiper-button-next"></div>
              </Swiper>
            );
          }}
        />
      ) : (
        <Empty />
      )}

      <ErrorLabel error={error} />
    </Wrapper>
  );
};

export default ProductList;
