import React from "react";
import { Flex, MenuWrapper, Right, Wrapper, Date, Label } from "./style";
import { Button, Segmented, EditSvg } from "components";
import { useRouter } from "next/router";
import { bgColors, textColors } from "styles/theme";
import { ITopType } from "./type";
import { menu } from "./components/menu";
import moment from "moment";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { queryKeys } from "constants/queryKeys";
import {
  EPotentialFailRequestAction,
  EPotentialFailStaffType,
} from "types/potentialFail/potentialFailRequest";

const TopComponent = ({ data }: ITopType) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const initValue = router.query?.staff_type?.toString();

  const isTeacherAndSupport =
    data?.staff_type == EPotentialFailStaffType.TEACHER_AND_SUPPORT;

  const deadline = moment(data?.deadline).format("DD MMM HH:mm");
  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "potentialFailRequest",
        data: {
          data: {
            action: EPotentialFailRequestAction.UPDATE,
            staff_type: data?.staff_type,
            deadline: data?.deadline,
            id: data?.id,
            queryKeys: [queryKeys.admin_academic_potential_fail_requests],
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
