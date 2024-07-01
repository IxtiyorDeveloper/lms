import React from "react";
import { ButtonWrapper } from "./style";
import { ArrowRightTopSvg, PlusSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Button } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import Link from "next/link";
import { Enum } from "globals/components/sourceModal";

const RightChildButtons = () => {
  const dispatch = useDispatch();

  const handleOpenCreateTaskModal = () => {
    dispatch(
      toggleModal({
        key: "createTask",
        data: {
          data: {
            type: Enum.create,
          },
          open: true,
        },
      })
    );
  };

  return (
    <ButtonWrapper>
      <Link href="/tasks/category">
        <Button className="category-btn">
          Category <ArrowRightTopSvg />
        </Button>
      </Link>
      <Button onClick={handleOpenCreateTaskModal}>
        <PlusSvg /> Create
      </Button>
    </ButtonWrapper>
  );
};

export default RightChildButtons;
