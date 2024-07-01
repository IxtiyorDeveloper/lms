import React, {
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from "react";
import { Note, PopoverContent, Wrapper } from "./style";
import { CircleImage, DebounceSelect } from "components";
import { IOption } from "components/common/select/type";
import { fetchSearchFields } from "utils";
import { IContacts } from "types/contact";
import StudentSearchLabel from "./components/selectedStudent";
import { Popover } from "antd";
import { useSelector } from "react-redux";
import { IStore } from "store";
import { MotSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

interface IProps {
  control: any;
  watch: any;
  errors: any;
  mot: any;
  setValue: any;
  activeStudent: (IContacts & { [p: string]: string }) | undefined;
  setActiveStudent: React.Dispatch<
    React.SetStateAction<(IContacts & { [p: string]: string }) | undefined>
  >;
}

const Student = forwardRef(
  (
    { control, errors, setValue, setActiveStudent, activeStudent, mot }: IProps,
    ref,
  ) => {
    const [options, setOptions] = useState<IOption[]>([]);
    const {
      paymentV2: { data, open },
    } = useSelector((state: IStore) => state.modals);

    useImperativeHandle(ref, () => ({
      clear: () => {
        setActiveStudent(undefined);
        setOptions([]);
      },
    }));

    useEffect(() => {
      if (open && data?.user) {
        async function getUser() {
          const options: IOption[] = await fetchSearchFields({
            user_id: data?.user?.user?.id,
            // search: `${data?.user?.user?.userProfile?.firstname || ""} ${
            //   data?.user?.user?.userProfile?.lastname || ""
            // }`,
            labelShow: (active: IContacts) => {
              return <StudentSearchLabel props={active} />;
            },
          });
          setOptions(options);
          const student = options?.find((i) => i.value == data?.user?.user?.id);
          setActiveStudent(student?.additional);
          setValue("tools.student", student);
          setValue("user_id", data?.user?.user?.id);
        }

        getUser();
      }
    }, [open, data]);

    return (
      <Wrapper>
        <div className="info">
          {mot ? (
            <div className="mot">
              <CircleImage
                width={75}
                height={75}
                src={activeStudent?.avatar_url || undefined}
              />
              <div className="img">
                <MotSvg
                  width={15}
                  height={12}
                  color={bgColors.white}
                  bgColor={bgColors.pop}
                />
              </div>
            </div>
          ) : (
            <CircleImage
              width={75}
              height={75}
              src={activeStudent?.avatar_url || undefined}
            />
          )}
          <div className="main">
            <DebounceSelect
              isValue
              showSearch
              control={control}
              name="user_id"
              placeholder="At least 3 letters"
              disabled={!!data?.user?.user}
              defaultUserId={data?.user?.user?.id}
              defaultOption={!!data?.user?.user ? options : undefined}
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
            <div className="data">
              <div>
                <Popover
                  content={
                    <PopoverContent>
                      {activeStudent?.branch_name}
                    </PopoverContent>
                  }
                  destroyTooltipOnHide
                >
                  {activeStudent?.branch_name || "Branch"}
                </Popover>
              </div>
              <div>
                <Popover
                  content={
                    <PopoverContent>{activeStudent?.level_name}</PopoverContent>
                  }
                  destroyTooltipOnHide
                >
                  {activeStudent?.level_name || "Level"}
                </Popover>
              </div>
              <div>
                <Popover
                  content={
                    <PopoverContent>{activeStudent?.group_name}</PopoverContent>
                  }
                  destroyTooltipOnHide
                >
                  {activeStudent?.group_name || "Group name"}
                </Popover>
              </div>
              <div>
                {activeStudent?.teacher_firstname ? (
                  <Popover
                    content={
                      <PopoverContent>
                        <div className="flex">
                          {`${activeStudent?.teacher_firstname} ${activeStudent?.teacher_lastname}`}
                        </div>
                      </PopoverContent>
                    }
                    destroyTooltipOnHide
                  >
                    {`${activeStudent?.teacher_firstname} ${activeStudent?.teacher_lastname}`}
                  </Popover>
                ) : (
                  "Teacher name"
                )}
              </div>
            </div>
          </div>
        </div>
        <div className="divider" />
        <div className="notes">
          <div className="note">
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
          </div>
          <div className="note">
            <div>Group’s note</div>
            <div className="text">
              {activeStudent?.group_note ? (
                <Popover
                  content={<Note full>{activeStudent?.group_note}</Note>}
                >
                  <Note>{activeStudent?.group_note}</Note>
                </Popover>
              ) : (
                "-"
              )}
            </div>
          </div>
        </div>
      </Wrapper>
    );
  },
);

export default Student;
