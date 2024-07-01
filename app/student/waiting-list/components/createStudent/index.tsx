import React, { FC } from "react";
import { Box } from "@mui/material";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";

import { CreateStudentWrapper } from "./style";
import {
  BanUserSvg,
  Button,
  FilesSvg,
  MailSvg,
  PlusSvg,
  RedBadgeTitle,
} from "components";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { CallSvg } from "@jasurbekyuldashov/lms-web-icons";

const CreateStudent: FC<{ count?: number }> = ({ count }) => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <CreateStudentWrapper display="flex" p="20px">
      <RedBadgeTitle title="Waiting list" count={count} />
      <Box ml="auto" display="flex" gap="10px">
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_see_banned_students]}
        >
          <Button
            onClick={() => router.push("/student/banned-students")}
            icon={<BanUserSvg />}
            style={{
              backgroundColor: bgColors.wildSand,
            }}
          >
            <span className="bannedText" style={{ marginLeft: "4px" }}>
              Ban Students
            </span>
          </Button>
        </CheckPermission>
        <CheckPermission permission={[COMPONENTS_VIEWS.can_export_phone_list]}>
          <Button
            icon={<FilesSvg width={20} height={20} color={bgColors.black} />}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "redListDownload",
                  data: {
                    data: {
                      filter: "student",
                      search: { ...router.query, status: 100 },
                    },
                    open: true,
                  },
                }),
              );
            }}
          />
        </CheckPermission>
        <CheckPermission permission={[COMPONENTS_VIEWS.can_call_user]}>
          <Button
            icon={<CallSvg width={20} height={20} color={bgColors.white} />}
            style={{
              backgroundColor: bgColors.midori,
            }}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "autoCall",
                  data: {
                    data: {
                      filter: "student",
                      search: { ...router.query, status: 100 },
                    },
                    open: true,
                  },
                }),
              );
            }}
          />
        </CheckPermission>
        <CheckPermission
          permission={[COMPONENTS_VIEWS.can_send_sms_to_waiting_list_students]}
        >
          <Button
            icon={<MailSvg width={20} height={20} />}
            onClick={() => {
              dispatch(
                toggleModal({
                  key: "groupSms",
                  data: {
                    data: {
                      filter: "student",
                      search: { ...router.query, status: 100 },
                    },
                    open: true,
                  },
                }),
              );
            }}
          />
        </CheckPermission>
        <CheckPermission permission={[COMPONENTS_VIEWS.can_create_user]}>
          <Button
            icon={<PlusSvg />}
            onClick={() => router.push("/student/create-student")}
          >
            <span style={{ marginLeft: "4px" }}>Create Student</span>
          </Button>
        </CheckPermission>
      </Box>
    </CreateStudentWrapper>
  );
};

export default CreateStudent;
