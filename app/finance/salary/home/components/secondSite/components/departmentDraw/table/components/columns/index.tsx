import React from "react";
import {
  BadgeStarSvg,
  EditSvg,
  NoteEditPopover,
  UserProfile,
} from "components";
import { SalaryWrapper, Wrapper } from "./style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import {
  ISalaryMain,
  salaryFieldTypes,
  StaffStatus,
} from "types/finance/salary";
import { bgColors, textColors } from "styles/theme";
import { useForm } from "react-hook-form";
import { useUpdateSalaryMain } from "hooks";
import { toast } from "react-toastify";
import { IStore, setSalary, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { updateCardProperty } from "utils/updateSalaryInfo";
import { SalaryEnums, TAssignment } from "types";
import { validationErrorHandler } from "utils";
import FullSalary from "./components/fullSalary";
import { SUB_TYPE_COVER_TEACHER } from "constants/salary";
import { generateUserProfile } from "utils/generateUserProfile";
import { getYearsFromMonths } from "utils/getYearsFromMonths";
import GroupCounts from "./components/groupCounts";
import { expand } from "constants/finance/salary";

const styles = {
  given: {
    color: bgColors.midori,
    shadow: "inset 0 0 6px #91E79E",
    textColor: textColors.brilliance,
  },

  not_given: {
    color: bgColors.whiteSmoke,
    shadow: `inset 0 0 6px ${bgColors.purpleCrystal}`,
    textColor: textColors.slate,
  },
};

const AntdColumns = ({ data }: { data: ISalaryMain }) => {
  const { control, handleSubmit, reset } = useForm();
  const { data: mainSalary } = useSelector((state: IStore) => state.salary);

  const dispatch = useDispatch();

  const updateSalaryMain = useUpdateSalaryMain({
    onSuccess: () => {
      toast.success("Success");
      reset({});
    },
    onError: (err) => {},
  });

  const router = useRouter();

  const onSubmit = (id: string, comment: string, type: salaryFieldTypes) => {
    const cellElement = document.getElementById(`${type}_${id}`);

    let a: string | null;
    if (cellElement) {
      a = cellElement.textContent;
      cellElement.textContent = `${toCurrencyFormat(+comment)}`; // Update the index of the cell element
    }

    updateSalaryMain.mutate(
      {
        query_params: {
          expand,
          id,
        },
        body: {
          attribute: type,
          value: comment,
          year: moment(router?.query?.date)?.year(),
          month: moment(router?.query?.date).format("MM"),
        },
      },
      {
        onSuccess: (result) => {
          if (result) {
            dispatch(
              setSalary(
                updateCardProperty({
                  assignmentId: id,
                  result_assignment: result,
                  mainSalary,
                })
              )
            );
          }
        },
        onError: (err) => {
          if (cellElement) cellElement.textContent = a;
          validationErrorHandler({ err });
        },
      }
    );
  };
  const handleGive = ({ isGiven, row, event }: any) => {
    event.stopPropagation();
    if (!isGiven)
      dispatch(
        toggleModal({
          key: "salaryDetails",
          data: {
            data: {
              row: row,
              data,
            },
            open: true,
          },
        })
      );
  };
  // return useMemo(() => {
  return [
    {
      id: "sub_col_13a",
      dataIndex: "name",
      width: "20%",
      render: (props: any, record: TAssignment, index: any) => {
        const aggregatedComponents = record?.salaryComponents;

        const correction = aggregatedComponents?.filter(
          (item: { type: SalaryEnums }) => item.type === SalaryEnums.CORRECTION
        );

        const isSystemCorrection = correction?.every(
          (c: any) =>
            c.sub_type?.toString() == SUB_TYPE_COVER_TEACHER?.toString()
        );

        const { years } = getYearsFromMonths({ months: record?.experience });

        const color = correction?.length
          ? isSystemCorrection
            ? bgColors.primary
            : bgColors.red
          : undefined;

        const profileData = generateUserProfile({ index, props, record });

        return (
          <UserProfile
            props={profileData}
            isStudent={false}
            color={color}
            canGetOriginalToThumb={true}
            fullname={<GroupCounts record={record} />}
            abs={
              years > 0 ? (
                <div className="absn">
                  <BadgeStarSvg />
                  <p className="num">{years}</p>
                </div>
              ) : record?.staff_status == StaffStatus.STATUS_NEW ? (
                <div className="absn">
                  <BadgeStarSvg />
                  <p className="num_new">New</p>
                </div>
              ) : null
            }
          />
        );
      },
    },
    {
      dataIndex: "actualSalary",
      // title: <TableHeading padding>Salary</TableHeading>,
      width: "12%",
      render: (props: any, record: TAssignment, index: any) => {
        const total_salary = record?.total_salary;

        const type = record?.amount_status;

        return (
          <FullSalary
            record={record}
            type={type}
            total_salary={total_salary}
            data={data}
          />
        );
      },
    },
    {
      dataIndex: "actualSalary",
      width: "12%",
      // title: <TableHeading>Avans</TableHeading>,
      render: (props: any, record: TAssignment) => {
        const avans = +record?.avans;
        return <Wrapper>{toCurrencyFormat(avans || 0)}</Wrapper>;
      },
    },
    {
      dataIndex: "tax",
      // title: <TableHeading>Tax</TableHeading>,
      width: "12%",
      render: (props: any, record: any) => {
        const tax = record?.tax;
        return <Wrapper>{toCurrencyFormat(tax || 0)}</Wrapper>;
      },
    },
    {
      dataIndex: "penalty",
      // title: <TableHeading>Penalty</TableHeading>,
      width: "12%",
      render: (props: any, record: any) => {
        const penalty = record?.penalty;
        return <Wrapper>{toCurrencyFormat(penalty || 0)}</Wrapper>;
      },
    },
    {
      dataIndex: "card",
      // title: <TableHeading>Card</TableHeading>,
      width: "12%",
      render: (props: any, record: TAssignment) => {
        const id = record?.id;
        return (
          <Wrapper>
            <div className="editable">
              <p id={`card_${id}`} className="crd">
                {toCurrencyFormat(+record?.card ?? 0)}
              </p>
              {!record?.isGiven && (
                <div className="edit">
                  <NoteEditPopover
                    id={id}
                    control={control}
                    isToolTipDisabled
                    defaultValue={+record?.card}
                    isNode
                    name="card"
                    type="number"
                    content={<EditSvg color={bgColors.blueGray} />}
                    handleSubmit={handleSubmit}
                    onSubmit={(p: any) => {
                      onSubmit(
                        id?.toString(),
                        p?.[`card_${id}`],
                        salaryFieldTypes.CARD
                      );
                    }}
                    min={-100000000000}
                  />
                </div>
              )}
            </div>
          </Wrapper>
        );
      },
    },
    {
      dataIndex: "cash",
      // title: <TableHeading>Cash</TableHeading>,
      width: "12%",

      render: (props: any, record: TAssignment) => {
        return <Wrapper>{toCurrencyFormat(+record?.cash ?? 0)}</Wrapper>;
      },
    },
    {
      dataIndex: "action",
      // title: <TableHeading>Action</TableHeading>,
      width: "8%",
      render: (props: any, record: TAssignment) => {
        const isGiven = record?.isGiven;
        const row = record;
        return (
          <SalaryWrapper
            color={isGiven ? styles.given.color : styles.not_given.color}
            shadow={isGiven ? styles.given.shadow : styles.not_given.shadow}
            textColor={
              isGiven ? styles.given.textColor : styles.not_given.textColor
            }
            onClick={(event) => handleGive({ isGiven, row, event })}
            cursorPointer
          >
            {isGiven ? "GIVEN" : "NOT GIVEN"}
          </SalaryWrapper>
        );
      },
    },
  ];
  // }, [data, currentArgs]);
};

export default AntdColumns;
