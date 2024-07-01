import React from "react";
import { Flex, MenuWrapper, Right, Wrapper, Date, Label } from "./style";
import { Button, Segmented, EditSvg } from "components";
import { useRouter } from "next/router";
import { bgColors, textColors } from "styles/theme";
import { ITopType } from "./type";
import { menu } from "./components/menu";
import { EPodoRequestAction, EStaffType } from "types/statistics/podoRequest";
import moment from "moment";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { queryKeys } from "constants/queryKeys";

const TopComponent = ({ data }: ITopType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initValue = router.query?.staff_type?.toString();

  const isTeacherAndSupport =
    data?.staff_type == EStaffType.TEACHER_AND_SUPPORT;

  const deadline = moment(data?.deadline).format("DD MMM HH:mm");
  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "podoRequest",
        data: {
          data: {
            action: EPodoRequestAction.UPDATE,
            staff_type: data?.staff_type,
            deadline: data?.deadline,
            lesson_day_id: data?.lessonDay?.id,
            type: data?.type,
            id: data?.id,
            queryKeys: [queryKeys.admin_statistics_podo_request],
          },
          open: true,
        },
      }),
    );
  };

  return (
    <Wrapper isTeacherAndSupport={isTeacherAndSupport}>
      {isTeacherAndSupport && (
        <MenuWrapper>
          <Segmented
            options={menu}
            routerKey="staff_type"
            initValue={initValue}
          />
        </MenuWrapper>
      )}
      <Right>
        <Button bgColor={bgColors.whiteSmoke} textColor={textColors.blueGray}>
          <Flex>
            <Label>Deadline:</Label>
            <Date>{deadline}</Date>
          </Flex>
        </Button>
        <Button
          bgColor={bgColors.deep}
          textColor={textColors.white}
          icon={<EditSvg color={bgColors.white} />}
          onClick={handleOpen}
        >
          Edit report
        </Button>
      </Right>
    </Wrapper>
  );
};

export default TopComponent;
