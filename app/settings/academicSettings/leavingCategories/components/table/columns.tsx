import {
  ActionsWrapper,
  CellNameWrapper,
  HeaderCell,
  TeacherLostWrapper,
} from "./style";
import React, { useMemo } from "react";
import { DeleteSvg, EditSvg } from "components";
import { bgColors } from "styles/theme";
import { EffectTypes, ILeavingCategory } from "types/leavingCategory";
import { TActions, TModal } from "./index";
import { getRowNumber } from "utils/getRowNumber";
import { usePageDataMemo } from "hooks";

const Columns = ({
  data,
  handleOpen,
}: {
  data: ILeavingCategory[] | undefined;
  handleOpen: (arg: { action?: TActions; id?: number; type: TModal }) => void;
}) => {
  const selects = usePageDataMemo();
  return useMemo(() => {
    return [
      {
        accessor: "name",
        Footer: "name",
        Header: <HeaderCell>Name</HeaderCell>,
        Cell: (props: any) => {
          const id = getRowNumber(props);
          return (
            <CellNameWrapper>
              <span className="index">{id}</span>
              <span className="name">{props.value}</span>
            </CellNameWrapper>
          );
        },
      },
      {
        accessor: "effect_type",
        Footer: "teacher_lost",
        Header: <HeaderCell>Affect status</HeaderCell>,
        Cell: (props: any) => {
          const type = props?.value;
          return (
            <div>
              <TeacherLostWrapper
                color={
                  type === EffectTypes.S100
                    ? bgColors.pepper
                    : bgColors.serengeti
                }
              >
                {type === EffectTypes.S100 ? "Unaffected" : "Affected"}
              </TeacherLostWrapper>
            </div>
          );
        },
      },
      {
        accessor: "id",
        Footer: "actions",
        Header: <HeaderCell>Actions</HeaderCell>,
        Cell: (props: any) => {
          return (
            <ActionsWrapper>
              <div
                className="box"
                onClick={() =>
                  handleOpen({
                    action: "update",
                    id: props.value,
                    type: "leavingCategory",
                  })
                }
              >
                <EditSvg color={bgColors.midori} />
              </div>
              <div
                className="box"
                onClick={() =>
                  handleOpen({
                    id: props.value,
                    type: "deleteMethod",
                  })
                }
              >
                <DeleteSvg color={bgColors.pop} width={18} height={18} />
              </div>
            </ActionsWrapper>
          );
        },
      },
    ];
  }, [data, selects.lang]);
};

export default Columns;
