import React, { FC, useEffect, useMemo, useState } from "react";
import Column from "./columns";
import { AntdTable } from "components";
import { sortStudents } from "app/groups/[groupId]/components/administrativeTab/sortStudents";
import { useForm } from "react-hook-form";
import { sortStudentList } from "./sortStudents";
import { useExamPermissions } from "hooks";
import { useRouter } from "next/router";
import { IExamComponent, IExamPart, IExamStudent, IMockExamDataGroupStudents } from "types/exam/exam";

interface ITableC {
  data?: IMockExamDataGroupStudents[] | undefined;
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

  const { data: examPermissionData } = useExamPermissions({
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

  const { control, watch, setValue } = useForm();

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
      data?.map((student) => {
        labels?.map((label: string) => {
          if (label !== "id") {
            studentsL.push({
              key: `${label}-${student.id}-${exam_part[label]?.id}`,
              value: student?.studentProfile?.mockExam?.dataResult?.components?.filter(
                (r: any) => exam_part[label]?.id === r?.component_id
              )[0]?.point,
            });
          }
        });
      });
      studentsL?.map((obj: any) => setValue(obj.key, obj.value));
    }
  }, [data, exam_part]);

  return (
    <form>
      <AntdTable
        dataSource={sortStudentList(data)}
        columns={Column(
          groupContacts,
          control,
          exam_parts,
          parts || [],
          examPermissionData
        )}
        loading={loading}
      />
    </form>
  );
};

export default TableC;
