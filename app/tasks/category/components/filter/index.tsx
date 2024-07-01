import React from "react";
import { Wrapper, RightSide } from "./style";
import { PlusSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Button, SelectMonth } from "components";
import moment from "moment";
import { DATE_FORMAT_MMMM_YYYY } from "constants/dates";
import { handleNavigateMonth } from "utils/handleNavigateMonth";
import { useRouter } from "next/router";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import CreateCategoryModal from "./createCategoryModal";
import Link from "next/link";

const Filter = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const initialValue = moment(Date.now()).format(DATE_FORMAT_MMMM_YYYY);

  return (
    <Wrapper>
      <Button
        onClick={() =>
          dispatch(
            toggleModal({
              key: "createTaskCategory",
              data: {
                data: {
                  action: "create",
                },
                open: true,
              },
            })
          )
        }
      >
        <PlusSvg /> Create
      </Button>
      <RightSide>
        <Link href="/tasks/category/archive">
          <Button className="secondary">Archive</Button>
        </Link>
        <SelectMonth
          initValue={initialValue}
          onChange={(e) =>
            handleNavigateMonth({ e, router, queryKey: ["year", "month"] })
          }
          nextMonthsCount={0}
        />
      </RightSide>
      <CreateCategoryModal />
    </Wrapper>
  );
};

export default Filter;
