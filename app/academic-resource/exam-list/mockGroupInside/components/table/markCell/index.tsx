import React, { Fragment } from "react";
import {
  CellWrapper,
  Container,
  EResult,
  MaxPoint,
  Flex,
  Numbered,
} from "./style";
import { Controller } from "react-hook-form";
import { InputNumber } from "components";
import { EnumExamAbs } from "constants/exam";
import Bool from "./bool";
import { IExamComponent, IExamPart, IExamPermissions } from "types/exam/exam";
import { bgColors } from "styles/theme";
import PointCell from "./components/point";

export interface IObj {
  [key: string | number]: IExamComponent;
}

const MarkCell = ({
  control,
  exam_parts,
  value,
  component,
  permissions,
  record,
  current,
}: {
  control: any;
  exam_parts: IObj;
  value: any;
  component: IExamComponent;
  permissions?: IExamPermissions | undefined;
  record: any;
  current: IExamPart;
}) => {
  const per = (value || []).filter(
    (p: any) => p.component_id === component.id
  )?.[0];
  const isHas =
    permissions?.marking.find((e) => e.component_id == component.id)?.can ||
    false;

  const disabled =
    record?.process?.data?.attendance.find(
      (item: any) => current.config.id == item.id
    )?.status !== EnumExamAbs.ATTENDED;

  const label = `${component.label.toLocaleLowerCase()}-${
    record?.id
  }-${exam_parts[component.id]?.id}`;

  return (
    <>
      {isHas ? (
        <Container disabled={disabled}>
          {/*<p style={{ textAlign: "center", marginLeft: "-10px" }}>*/}
          {/*  {exam_parts[component.id]?.max_point}*/}
          {/*</p>*/}
          {exam_parts[component.id]?.id && (
            <Fragment>
              <Controller
                control={control}
                name={`bool-${label}`}
                defaultValue={disabled}
                render={() => {
                  return <Fragment></Fragment>;
                }}
              />
              <Bool control={control} name={`bool-${label}`} value={disabled} />
              <Flex>
                <InputNumber
                  name={`${label}`}
                  control={control}
                  max={exam_parts[component.id]?.max_point}
                  min={0}
                  disabled={disabled}
                  colorBgContainer={bgColors.white}
                  lineHeight={1.2}
                  className="e-result"
                />
                <MaxPoint disabled={disabled}>
                  {exam_parts[component.id]?.max_point}
                </MaxPoint>
              </Flex>
            </Fragment>
          )}
        </Container>
      ) : (
        <CellWrapper disabled={disabled} permission={isHas}>
          <EResult>
            <PointCell per={per} component={component} record={record} />
            {exam_parts[component.id]?.id && (
              <Fragment>
                <Controller
                  control={control}
                  name={`bool-${label}`}
                  defaultValue={disabled}
                  render={() => {
                    return <Fragment></Fragment>;
                  }}
                />
                <Bool
                  control={control}
                  name={`bool-${label}`}
                  value={disabled}
                />
              </Fragment>
            )}
          </EResult>
        </CellWrapper>
      )}
    </>
  );
};

export default MarkCell;
