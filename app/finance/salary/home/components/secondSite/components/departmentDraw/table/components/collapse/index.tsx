import React, { useEffect, useMemo, useState } from "react";
import { Bottom, Card, Container, Wrapper } from "./style";
import { IAggregated } from "types/finance/salary";
import { SalaryEnums, SalarySubTypeEnums, TAssignment } from "types";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { useForm } from "react-hook-form";
import { useCreateSalaryComponent } from "hooks";
import { toast } from "react-toastify";
import { IStore, setSalary, toggleModal } from "store";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import moment from "moment";
import { addSalaryComponent } from "utils/updateSalaryInfo";
import { validationErrorHandler } from "utils";
import { generateArray } from "./components/generateArray";
import { generateSalaryCells } from "./components/generateSalaryCells";
import TopComponent from "./components/top";
import LabelsComponent from "./components/label";
import { LineThrough } from "./type";
import { expand } from "constants/finance/salary";

const title = {
  [SalaryEnums.PENALTY]: "Add penalty",
  [SalaryEnums.TAX]: "Add tax",
  [SalaryEnums.CORRECTION]: "Add correction",
};
const Collapse = ({
  data,
  row,
}: {
  data: IAggregated[];
  row: { original: TAssignment };
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  const [open, setOpen] = useState<string | undefined>(undefined);
  const { control, handleSubmit, reset } = useForm();

  const { data: mainSalary } = useSelector((state: IStore) => state.salary);

  const { fixed, kpi, bonus, correction, penalty, tax } = useMemo(() => {
    return generateSalaryCells({ data });
  }, [data]);

  const createSalaryComponent = useCreateSalaryComponent({
    onSuccess: () => {
      toast.success("Success");
      reset({});
    },
    onError: (err) => {
      validationErrorHandler({ err });
    },
  });

  const tempArray = generateArray({
    bonus,
    correction,
    fixed,
    kpi,
    penalty,
    tax,
  });
  const isGiven: boolean = row?.original?.isGiven;

  const onSubmit = ({
    data,
    type,
    sub_type,
  }: {
    data: any;
    type: SalaryEnums;
    sub_type: SalarySubTypeEnums;
  }) => {
    setOpen(undefined);
    createSalaryComponent.mutate(
      {
        query_params: {
          salary_id: row?.original?.id,
          expand,
        },
        body: {
          year: moment(router?.query?.date)?.year(),
          month: moment(router?.query?.date).format("MM"),
          type,
          sub_type,
          description: data?.description,
          value: data?.amount,
        },
      },
      {
        onSuccess: (result) => {
          dispatch(
            setSalary(
              addSalaryComponent({
                assignmentId: row?.original?.id,
                component: result,
                mainSalary,
              }),
            ),
          );
        },
      },
    );
  };
  const handleDelete = (id: number | null, type: SalaryEnums) => {
    dispatch(
      toggleModal({
        key: "correction",
        data: {
          data: {
            correctionId: id,
            assignmentId: row?.original?.id,
            type,
            data: tempArray
              ?.find((arr) => arr.type === type)
              ?.labels?.find((item) => item.id == id),
          },
          open: true,
        },
      }),
    );
  };
  const handleOpenChange = (type: SalaryEnums, open: boolean) => {
    if (open) setOpen(`${row.original?.id}_${type}`);
    else {
      setOpen(undefined);
    }
  };

  return (
    <Container>
      <Wrapper>
        {tempArray?.map((obj, key) => {
          const overall = obj?.labels?.reduce((acc, curr) => {
            if (curr?.status == LineThrough.active) return acc + curr?.value;
            else return acc;
          }, 0);

          const front = obj.type === SalaryEnums.PENALTY && overall ? "-" : "";

          return (
            <Card key={key}>
              <TopComponent
                control={control}
                createSalaryComponent={createSalaryComponent}
                handleOpenChange={handleOpenChange}
                handleSubmit={handleSubmit}
                isGiven={isGiven}
                obj={obj}
                onSubmit={onSubmit}
                open={open}
                row={row}
                setOpen={setOpen}
                title={title}
              />
              <LabelsComponent
                handleDelete={handleDelete}
                isGiven={isGiven}
                obj={obj}
                row={row}
                front={front}
              />
              <Bottom>
                {front}
                {toCurrencyFormat(overall)}
              </Bottom>
            </Card>
          );
        })}
      </Wrapper>
    </Container>
  );
};

export default Collapse;
