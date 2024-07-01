import React from "react";
import { CheckWrapper, SwiperWrapper } from "./style";
import {
  FriendPhone,
  HomePhone,
  MainPhone,
  OtherPhone,
  ParentsPhone,
  SecondPhone,
  SiblingPhone,
  SpousePhone,
} from "constants/phoneTypes";
import { ComeSvg } from "components";
import { CheckBox, ErrorLabel } from "components";
import { ICandidatePhone } from "types";
import { Swiper, SwiperSlide } from "swiper/react";

const SelectPhoneNumber = ({
  phoneTypes,
  control,
  errors,
  phone,
}: {
  phoneTypes:
    | {
        value: number;
        label: string;
      }[]
    | undefined;
  control: any;
  errors: any;
  phone: ICandidatePhone[];
}) => {
  const phoneIcon = (type: number) =>
    ({
      [MainPhone]: <img src="/main.png" alt="main" />,
      [SecondPhone]: <img src="/second.png" alt="second" />,
      [SpousePhone]: <img src="/spouse.png" alt="spouse" />,
      [HomePhone]: <img src="/home.png" alt="home" />,
      [OtherPhone]: <img src="/other.png" alt="other" />,
      [ParentsPhone]: <img src="/phone/parents.png" alt="parents" />,
      [SiblingPhone]: <img src="/sibling.png" alt="sibling" />,
      [FriendPhone]: <img src="/friend.png" alt="friend" />,
    }[type]);
  
  return (
    <div>
      <SwiperWrapper className="flex">
        <Swiper
          spaceBetween={14}
          slidesPerView={4}
          navigation={{
            prevEl: ".swiper-button-prev",
            nextEl: ".swiper-button-next",
          }}
          style={{ padding: "10px" }}>
          {phoneTypes?.map((item) => {
            const isPhone = phone?.find((p) => p.type === item.value);
            return (
              <SwiperSlide key={item.value}>
                <div className="check">
                  <CheckBox
                    name={`types.${item.value}`}
                    control={control}
                    disabled={!isPhone}
                    className="checkBox">
                    <CheckWrapper>
                      <div className="icon">{phoneIcon(item.value)}</div>
                      <h4>{item.label}</h4>
                      {/* <p>{separatePhoneNumber(isPhone?.phone_number!)}</p> */}
                    </CheckWrapper>
                  </CheckBox>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </SwiperWrapper>
      <ErrorLabel error={errors?.phone_types?.message} />
    </div>
  );
};

export default SelectPhoneNumber;
