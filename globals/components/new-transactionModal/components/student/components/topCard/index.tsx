import React, { useState } from "react";
import {
  DataContainer,
  Divider,
  Info,
  Main,
  Note,
  NoteContainer,
  Notes,
  Wrapper,
} from "./style";
import { CircleImage, DebounceSelect } from "components";
import { IOption } from "components/common/select/type";
import { fetchSearchFields } from "utils";
import { IContacts } from "types/contact";
import StudentSearchLabel from "./components/selectedStudent";
import { TabTeacherSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Popover } from "antd";

interface IProps {
  control: any;
  watch: any;
  errors: any;
  setValue: any;
  setActiveStudent: React.Dispatch<
    React.SetStateAction<(IContacts & { [p: string]: string }) | undefined>
  >;
  setOptions: React.Dispatch<React.SetStateAction<IOption[]>>;
  activeStudent: (IContacts & { [p: string]: string }) | undefined;
  options: IOption[];
}

const TopCard = ({
  control,
  errors,
  setValue,
  setActiveStudent,
  setOptions,
  activeStudent,
  options,
}: IProps) => {
  return (
    <Wrapper>
      <Info>
        <CircleImage width={75} height={75} src={activeStudent?.avatar_url} />
        <Main>
          <DebounceSelect
            isValue
            showSearch
            control={control}
            name="general.user_id"
            placeholder="At least 3 letters"
            fetchOptions={async (searchString) => {
              const options: IOption[] = await fetchSearchFields({
                search: searchString,
                labelShow: (active: IContacts) => {
                  return <StudentSearchLabel props={active} />;
                },
              });
              setOptions(options);
              return options;
            }}
            onSelect={(e) => {
              const student = options.find((i) => i.value == e);
              setActiveStudent(student?.additional);
              setValue("tools.student", student);
            }}
            error={(errors as any)?.general?.user_id?.message}
            optionLabelProp="labelShow"
          />
          <DataContainer>
            <div>{activeStudent?.branch_name || "Branch"}</div>
            <div>{activeStudent?.level_name || "Level"}</div>
            <div>{activeStudent?.group_name ?? "Group name"}</div>
            <div>
              {activeStudent?.teacher_firstname ? (
                <div className="flex">
                  <TabTeacherSvg
                    width={15}
                    height={15}
                    color={bgColors.soulfulBlue}
                  />
                  {`${activeStudent?.teacher_firstname} ${activeStudent?.teacher_lastname}`}
                </div>
              ) : (
                "Teacher name"
              )}
            </div>
          </DataContainer>
        </Main>
      </Info>
      <Divider />
      <Notes>
        <NoteContainer>
          <div>Student’s note</div>
          <div className="text">
            {activeStudent?.note ? (
              <Popover
                content={<Note full>{activeStudent?.note}</Note>}
                destroyTooltipOnHide
              >
                <Note>{activeStudent?.note}</Note>
              </Popover>
            ) : (
              "-"
            )}
          </div>
        </NoteContainer>
        <NoteContainer>
          <div>Group’s note</div>
          <div className="text">
            {activeStudent?.group_note ? (
              <Popover
                content={<Note full>{activeStudent?.group_note}</Note>}
                destroyTooltipOnHide
              >
                <Note>{activeStudent?.group_note}</Note>
              </Popover>
            ) : (
              "-"
            )}
          </div>
        </NoteContainer>
      </Notes>
    </Wrapper>
  );
};
export default TopCard;
