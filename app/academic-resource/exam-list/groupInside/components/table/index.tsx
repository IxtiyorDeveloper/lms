import React, { FC, useEffect, useMemo, useState } from "react";
import Column from "./columns";
import { AntdTable, Button } from "components";
import { sortStudents } from "app/groups/[groupId]/components/administrativeTab/sortStudents";
import { useForm } from "react-hook-form";
import { ButtonWrapper } from "./style";
import { sortStudentList } from "./sortStudents";
import { useChangeExamScore, useExamPermissions } from "hooks";
import { toast } from "react-toastify";
import { useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { IExamComponent, IExamPart, IExamStudent } from "types/exam/exam";
import { validationErrorHandler } from "utils";
import { queryKeys } from "constants/queryKeys";

interface ITableC {
  data?: IExamStudent[];
  loading?: boolean;
  parts?: IExamPart[];
  users?: any;
}

export interface IObj {
  [key: string | number]: IExamComponent;
}

const TableC: FC<ITableC> = ({ data = [], loading, parts, users }) => {
  const router = useRouter();
  const [exam_parts, setExamParts] = useState<IObj>({});
  const [exam_part, setExamPart] = useState<IObj>({});
  const queryClient = useQueryClient();

  const { data: examPermissionData, isLoading: examPIsLoading } =
    useExamPermissions({
      query_params: {
        id: router.query.groupExamId,
      },
      enabled: !!router.query.groupExamId,
    });

  useEffect(() => {
    const components: IExamComponent[] = [];
    const componentsObj: any = {};
    const componentsOb: any = {};
    parts?.filter((part) => {
      components.push(...(part?.config?.components || []));
    });
    components.map((component: IExamComponent) => {
      componentsObj[component.id] = {
        ...component,
      };
    });
    components.map((component: IExamComponent) => {
      componentsOb[component.label?.toLocaleLowerCase()] = {
        ...component,
      };
    });
    setExamParts(componentsObj);
    setExamPart(componentsOb);
  }, [parts]);

  const { control, watch, setValue, getValues, handleSubmit } = useForm();

  const groupContacts = useMemo(() => sortStudents(users?.list), [users]);

  useEffect(() => {
    const subscription = watch((value, { name, type }) => {
      if (type === "change") {
        setValue(name!, value[name!]);
      }
    });
    return () => subscription.unsubscribe();
  }, [data, exam_part, watch]);

  useEffect(() => {
    if (data && exam_part) {
      const studentsL: any = [];
      const labels = Object.keys(exam_part);
      data?.map((student, index) => {
        labels?.map((label: string) => {
          if (label !== "id") {
            studentsL.push({
              key: `${label}-${student.id}-${exam_part[label]?.id}`,
              value: student?.process.data.components?.filter(
                (r: any) => exam_part[label]?.id === r?.component_id
              )[0]?.point,
            });
          }
        });
      });
      studentsL?.map((obj: any) => setValue(obj.key, obj.value));
    }
  }, [data, exam_part]);

  // const changeScore = useChangeExamScore({
  //   onSuccess: () => {
  //     toast.success("Scores changed!");
  //     queryClient.invalidateQueries([queryKeys.group_exam_data]);
  //   },
  //   onError: (err) => {
  //     validationErrorHandler({ err });
  //   },
  // });

  const onSubmit = (formData: any) => {
    const dataArr: any[] = [];
    Object.keys(formData).map((s: string) => {
      const a = s.split("-");
      if (
        a[2] !== "undefined" &&
        Number.isInteger(formData[s]) &&
        !formData?.[`bool-${s}`]
      )
        dataArr.push({
          user_id: +a[1],
          component_id: +a[2],
          point: formData[s],
        });
    });
    // changeScore.mutate({
    //   body: {
    //     scores: dataArr,
    //   },
    //   query_params: {
    //     id: router.query?.groupExamId,
    //   },
    // });
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <AntdTable
        dataSource={sortStudentList(data)}
        columns={Column(
          groupContacts,
          control,
          exam_parts,
          parts || [],
          examPermissionData,
          onSubmit
        )}
        loading={loading}
      />
      {(examPermissionData?.attendance || [])?.find((e) => e.can)?.can &&
        (examPermissionData?.marking || [])?.find((e) => e.can)?.can && (
          <ButtonWrapper>
            <Button type="submit">Save</Button>
          </ButtonWrapper>
        )}
    </form>
  );
};

export default TableC;
