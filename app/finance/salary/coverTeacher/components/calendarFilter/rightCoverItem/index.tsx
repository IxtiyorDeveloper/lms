import React, { FC, useEffect, useMemo, useState } from "react";
import { Wrapper } from "./style";
import { CircleImage, CircleSmsSvg, DollarSvg, Input } from "components";
import { IRightCoverItem } from "./type";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { Popover } from "antd";
import PopoverComponent from "../popover";
import { bgColors } from "styles/theme";
import { EWhoCovered } from "../../type";
import { StyledContent } from "../leftCoverItem/style";
import { useForm } from "react-hook-form";
import { useCoverTeacherChangeDescription } from "hooks";
import { ICoverTeacherComponent } from "types/finance/salary";
import { validationErrorHandler } from "utils";

const RightCoverItem: FC<IRightCoverItem> = ({
  cover,
  isFirst,
  isLast,
  mainCover,
}) => {
  const [open, setOpen] = useState(false);
  const full_name = cover?.user?.userProfile
    ? cover?.user?.userProfile?.firstname +
      " " +
      cover?.user?.userProfile?.lastname
    : cover?.user?.username;

  const amount = useMemo(() => {
    return cover?.user_covers?.reduce((acc, cur) => {
      return acc + (parseFloat(cur?.pair?.value) || 0);
    }, 0);
  }, [cover?.user_covers]);

  const has_money_operation = useMemo(() => {
    return cover?.user_covers?.some(
      (user) => user?.pair?.data?.has_money_operation
    );
  }, [cover?.user_covers]);

  const { control, setValue, handleSubmit, watch } = useForm();

  const changeDescription = useCoverTeacherChangeDescription({
    onSuccess: () => {},
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  useEffect(() => {
    if (cover.user_covers) {
      for (let i = 0; i < cover.user_covers?.length; i++) {
        const currentCover = cover.user_covers?.[i];
        setValue(
          `${currentCover?.pair?.data?.group?.id}`,
          currentCover?.pair?.description
        );
      }
    }
  }, [cover]);

  const onSubmit = (data: any) => {};
  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  const onBlur = ({
    event,
    item,
  }: {
    event: React.FocusEvent<HTMLInputElement, Element>;
    item: ICoverTeacherComponent;
  }) => {
    changeDescription.mutate({
      query_params: {
        id: item?.pair?.id,
      },
      body: {
        description: watch()?.[item?.pair?.data?.group?.id],
      },
    });
  };

  return (
    <Wrapper isLast={!!isLast} isFirst={!!isFirst}>
      <div className="profile">
        <div className="image-custom">
          <CircleImage
            src={cover?.user?.userProfile?.avatar}
            alt="avatar"
            width={41}
            height={41}
            className="img"
          />
          <div
            className={`icon ${has_money_operation ? "active" : "inactive"}`}
          >
            <DollarSvg color={bgColors.white} />
          </div>
        </div>
        <p className="name">{full_name}</p>
      </div>

      <div className="gr-wr">
        <Popover
          content={() =>
            PopoverComponent({
              groups: cover?.user_covers,
              type: EWhoCovered.COVERED,
              mainCover,
            })
          }
          placement="bottomLeft"
          destroyTooltipOnHide
        >
          <div className="groups">{cover?.user_covers?.length}</div>
        </Popover>
      </div>
      <div className="description">
        <Popover
          open={open}
          onOpenChange={handleOpenChange}
          content={() => (
            <form onSubmit={handleSubmit(onSubmit)}>
              <StyledContent>
                <p className="title">Create note</p>
                <div className="container">
                  {cover.user_covers?.map((item, itemIndex) => {
                    return (
                      <div className="editor" key={`${itemIndex}`}>
                        <Input
                          name={`${item?.pair?.data?.group?.id}`}
                          control={control}
                          placeholder="description"
                          type="textarea"
                          rows={8}
                          onBlur={(event) => onBlur({ event, item })}
                        />
                      </div>
                    );
                  })}
                </div>
              </StyledContent>
            </form>
          )}
          trigger="click"
          placement="bottomRight"
          destroyTooltipOnHide
        >
          <div className="sms">
            <CircleSmsSvg />
          </div>
        </Popover>
      </div>
      <p className={`amount grotesk ${amount > 0 ? "plus" : "zero"}`}>
        {amount > 0 ? "+" : ""} {toCurrencyFormat(amount)}
      </p>
    </Wrapper>
  );
};

export default RightCoverItem;
