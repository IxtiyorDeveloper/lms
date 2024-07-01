import React, { Fragment, useCallback, useMemo } from "react";
import { Phone, Wrapper } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import _ from "lodash";
import { fontSizes } from "styles/theme";
import { CircleImage, CopySvg } from "components";
import { Spin, Tooltip } from "antd";
import formatPhoneNumber, { formatIpPhone } from "utils/phoneNumberFormatter";
import { toast } from "react-toastify";

interface IProps {
  data: { time: string; phone: string; lost: number; avatar?: any }[];
  withLabel?: boolean;
  withAvatar?: boolean;
  isLoading?: boolean;
  isPercent?: boolean;
  isAllRed?: boolean;
}

const BarChartV2 = ({
  data,
  isLoading = false,
  isPercent = true,
  isAllRed = false,
}: IProps) => {
  const max: number = useMemo(() => _.maxBy(data, "lost")?.lost || 0, [data]);

  const copyToClipboard = (phone: string | 0) => {
    if (!!phone)
      navigator.clipboard
        .writeText(phone)
        .then(() => {
          toast.info("Copied to clipboard");
        })
        .catch((err) => {
          toast.error(err.message);
        });
  };

  const render = useCallback(() => {
    return (
      <Fragment key={Math.random()}>
        {_.chunk(data, 15).map((item, index) => {
          return (
            <SwiperSlide
              key={Math.random()}
              style={{
                height: "100%",
                alignSelf: "flex-end",
                marginTop: "auto!important",
                paddingTop: "auto",
              }}
            >
              <div className="flex" style={{ marginTop: "auto" }}>
                {item.map((item, index) => (
                  <div key={Math.random()} className="element">
                    <Tooltip
                      destroyTooltipOnHide
                      title={
                        <div>
                          <div className="name">{item.time}</div>
                          <Phone
                            onClick={() =>
                              copyToClipboard(formatIpPhone(item.phone))
                            }
                          >
                            {formatPhoneNumber(item.phone)}
                            <CopySvg />
                          </Phone>
                        </div>
                      }
                    >
                      <CircleImage src={item.avatar} />
                      <div
                        style={{
                          fontWeight: 300,
                          fontSize: fontSizes.f10,
                          whiteSpace: "nowrap",
                        }}
                      >
                        {item.time?.split(" ")[0]}{" "}
                        {item.time?.split(" ")[1]?.slice(0, 1)}
                      </div>
                      <div
                        style={{
                          fontWeight: 600,
                          fontSize: fontSizes.f20,
                          textAlign: "center",
                        }}
                      >
                        {item.lost}
                        {isPercent ? "%" : ""}
                      </div>
                    </Tooltip>

                    <div
                      className={`swiper_element ${
                        item.lost < 80 || isAllRed ? "red" : ""
                      }`}
                      style={{
                        height: `${
                          item.lost === 0 ? 0 : (+item.lost * 180) / +max || 150
                        }px`,
                      }}
                    />
                  </div>
                ))}
              </div>
            </SwiperSlide>
          );
        })}
      </Fragment>
    );
  }, [data]);

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <Swiper
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
        >
          <div className="swiper">{render()}</div>
          <div className="swiper-button-prev"></div>
          <div className="swiper-button-next"></div>
        </Swiper>
      </Wrapper>
    </Spin>
  );
};

export default BarChartV2;
