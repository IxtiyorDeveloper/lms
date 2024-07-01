import React, { FC, useEffect } from "react";
import { CircleImage, PhoneCell } from "components";
import {
  Actions,
  PhoneNumber,
  RepositionSelects,
  RoleType,
  UserInfo,
  UserName,
} from "./style";
import StaffActions from "../../staffActions";
import {
  ChevronDownSvg,
  DoubleArrowSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors, textColors } from "styles/theme";
import { Dropdown, MenuProps } from "antd";
import { CreateStaffJobType } from "constants/settings";

interface IProps {
  data: any;
  type?: "other" | "reposition";
  roleType?: {
    role1: string;
    role2: string;
  };
  setRoleType?: (t: any) => void;
}

const UserDetails: FC<IProps> = (props) => {
  const {
    data,
    type = "other",
    roleType = { role1: "", role2: "" },
    setRoleType = () => {},
  } = props;

  const fullName = `${data?.user?.userProfile?.firstname} ${data?.user?.userProfile?.lastname}`;
  const imageSource = {
    full_url: data?.user?.userProfile?.avatar?.full_url,
    children: data?.user?.userProfile?.avatar?.children,
  };

  const items: MenuProps["items"] = [
    {
      key: "1",
      label: (
        <p
          onClick={() =>
            setRoleType({
              ...roleType,
              role2: CreateStaffJobType.nonOfficial,
            })
          }
        >
          Non Official
        </p>
      ),
    },
    {
      key: "2",
      label: (
        <p
          onClick={() =>
            setRoleType({
              ...roleType,
              role2: CreateStaffJobType.selfEmployment,
            })
          }
        >
          Self Employment
        </p>
      ),
    },
    {
      key: "3",
      label: (
        <p
          onClick={() =>
            setRoleType({
              ...roleType,
              role2: CreateStaffJobType.official,
            })
          }
        >
          Official
        </p>
      ),
    },
  ];

  useEffect(() => {
    setRoleType({
      ...roleType,
      role1:
        data?.staff?.job_type === null
          ? CreateStaffJobType.official
          : data?.staff?.job_type,
    });
  }, [data]);

  const typeSelect = {
    "100": {
      bgColor: bgColors.midori,
      color: textColors.white,
      text: "Official",
    },
    "200": {
      bgColor: bgColors.dark,
      color: textColors.white,
      text: "Non Official",
    },
    "300": {
      bgColor: bgColors.primary,
      color: textColors.blueGray,
      text: "Self Employed",
    },
  };

  return (
    <UserInfo>
      <CircleImage height={75} width={75} src={imageSource} />
      <div>
        <UserName>{fullName}</UserName>
        <PhoneNumber>
          <PhoneCell value={data?.user?.userPhones} />
        </PhoneNumber>
        {type === "reposition" ? (
          <RepositionSelects>
            <RoleType
              style={{
                backgroundColor:
                  typeSelect[roleType.role1 as keyof typeof typeSelect]
                    ?.bgColor,
                color:
                  typeSelect[roleType.role1 as keyof typeof typeSelect]?.color,
              }}
            >
              {typeSelect[roleType.role1 as keyof typeof typeSelect]?.text}
            </RoleType>
            <DoubleArrowSvg
              width={16}
              height={16}
              color={bgColors.yourShadow}
            />
            <Dropdown menu={{ items }}>
              <div>
                <RoleType
                  style={{
                    backgroundColor:
                      roleType.role2 === ""
                        ? bgColors.purpleCrystal
                        : typeSelect[roleType.role2 as keyof typeof typeSelect]
                            ?.bgColor,
                    color:
                      roleType.role2 === ""
                        ? textColors.yourShadow
                        : typeSelect[roleType.role2 as keyof typeof typeSelect]
                            ?.color,
                  }}
                >
                  {roleType.role2 === ""
                    ? "Select"
                    : typeSelect[roleType.role2 as keyof typeof typeSelect]
                        ?.text}{" "}
                  <ChevronDownSvg
                    color={
                      roleType.role2 === ""
                        ? textColors.yourShadow
                        : typeSelect[roleType.role2 as keyof typeof typeSelect]
                            ?.color
                    }
                  />
                </RoleType>
              </div>
            </Dropdown>
          </RepositionSelects>
        ) : null}
      </div>
      <Actions>
        <StaffActions data={data} activeActions={{ call: true, sms: true }} />
      </Actions>
    </UserInfo>
  );
};

export default UserDetails;
