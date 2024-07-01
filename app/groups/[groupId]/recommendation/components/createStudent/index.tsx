import React from "react";
import { bgColors } from "styles/theme";
import { useRouter } from "next/router";

import { CreateStudentWrapper } from "./style";
import { BanUserSvg, Button, MailSvg, PlusSvg } from "components";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

const CreateStudent = () => {
  const route = useRouter();
  return (
    <CreateStudentWrapper>
      <CheckPermission permission={[COMPONENTS_VIEWS.can_create_user]}>
        <Button
          icon={<PlusSvg />}
          onClick={() => route.push("/student/create-student")}
        >
          <span style={{ marginLeft: "4px" }}>Create Student</span>
        </Button>
      </CheckPermission>
      <div className="box">
        <Button
          onClick={() => route.push("/student/banned-students")}
          icon={<BanUserSvg />}
          style={{
            backgroundColor: bgColors.wildSand,
          }}
        >
          <span className="bannedText" style={{ marginLeft: "4px" }}>
            Ban Students
          </span>
        </Button>
        <Button icon={<MailSvg />} />
      </div>
    </CreateStudentWrapper>
  );
};

export default CreateStudent;
