import React from "react";
import { Wrapper } from "./style";
import { TaskLink } from "./style";
import { toggleModal } from "store";
import { LinkSvg } from "components";
import { useDispatch } from "react-redux";
import { ITaskLinks } from "./type";
import { bgColors } from "styles/theme";
import { ITaskModel } from "types/finance/transactionExpense";

const AllLinks = ({ value, setOpen }: ITaskLinks) => {
  const dispatch = useDispatch();
  const handleOpen = ({ item }: { item: ITaskModel }) => {
    setOpen(false);
    dispatch(
      toggleModal({
        key: "taskView",
        data: {
          data: {
            id: item?.model_id,
          },
          open: true,
        },
      })
    );
  };
  return (
    <Wrapper>
      {value?.map((item, index) => {
        return (
          <TaskLink key={index} onClick={() => handleOpen({ item })}>
            <LinkSvg color={bgColors.white} />
            Open {item?.model_id}
          </TaskLink>
        );
      })}
    </Wrapper>
  );
};

export default AllLinks;
