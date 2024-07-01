import React, { useMemo, useState } from "react";
import { Wrapper, Content, Box, Inner, PopoverWrapper } from "./style";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, {
  A11y,
  Autoplay,
  Controller,
  EffectCoverflow,
  Navigation,
  Pagination,
} from "swiper";
import { TSource } from "types";
import Image from "next/image";
import { Popover, Spin } from "antd";
import { DeleteSvg, EditSvg } from "components";
import { textColors } from "styles/theme";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";

SwiperCore.use([
  Navigation,
  Pagination,
  EffectCoverflow,
  Autoplay,
  Controller,
  A11y,
]);
const Source = ({
  data,
  isLoading,
}: {
  data?: TSource[];
  isLoading: boolean;
}) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState<number | null>(null);

  const handleEdit = ({
    item,
    event,
  }: {
    item: TSource;
    event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  }) => {
    event.stopPropagation();
    setOpen(null);
    dispatch(
      toggleModal({
        key: "source",
        data: {
          data: {
            type: "update",
            id: item?.id,
          },
          open: true,
        },
      })
    );
  };
  const handleDelete = ({
    item,
    event,
  }: {
    item: TSource;
    event: React.MouseEvent<HTMLDivElement, MouseEvent>;
  }) => {
    event.stopPropagation();
    setOpen(null);
    dispatch(
      toggleModal({
        key: "deleteSource",
        data: {
          data: {
            id: item?.id,
          },
          open: true,
        },
      })
    );
  };
  const handleOpenChange = (id: number, event: boolean) => {
    if (event) setOpen(id);
    else setOpen(null);
  };

  const content = ({ item }: { item: TSource }) => {
    return (
      <PopoverWrapper>
        <div className="row" onClick={(event) => handleEdit({ item, event })}>
          <EditSvg color={textColors.yourShadow} width={16} height={16} />
          <p>Edit</p>
        </div>
        <div className="row" onClick={(event) => handleDelete({ item, event })}>
          <DeleteSvg height={16} width={16} />
          <p>Delete</p>
        </div>
      </PopoverWrapper>
    );
  };

  const sort = useMemo(() => {
    return data?.sort((a, b) => {
      let orderA = a.order ?? Infinity;
      let orderB = b.order ?? Infinity;

      return orderA - orderB;
    });
  }, [data]);

  return (
    <Wrapper>
      <Spin spinning={isLoading}>
        <Content>
          <Swiper slidesPerView="auto" spaceBetween={25}>
            {sort?.map((item, index) => {
              return (
                <SwiperSlide key={item.id}>
                  <Inner>
                    <Box key={index}>
                      {/*{<item.icon width={35} height={35} />}*/}
                      <Popover
                        destroyTooltipOnHide
                        trigger="click"
                        content={content({ item })}
                        placement="top"
                        open={item.id == open}
                        onOpenChange={(event) =>
                          handleOpenChange(item.id, event)
                        }>
                        <div className="dots">...</div>
                      </Popover>
                      <Image
                        src={item?.iconFile?.full_url || "/student/image.png"}
                        width={50}
                        height={50}
                        alt={item?.name}
                      />
                      <p>{item.name}</p>
                    </Box>
                  </Inner>
                </SwiperSlide>
              );
            })}
          </Swiper>
        </Content>
      </Spin>
    </Wrapper>
  );
};

export default Source;
