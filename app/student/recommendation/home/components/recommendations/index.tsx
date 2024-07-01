import React, { FC, useMemo, useState } from "react";
import { BigCard, BoxSvg } from "components";
import GridChild from "./gridChild";
import { IGroup } from "./type";
import NdChild from "./ndChild";
import { CaretRightOutlined } from "@ant-design/icons";
import { bgColors } from "styles/theme";
import { AntPanel, WrapperT, MainContainer } from "./style";
import { Collapse } from "antd";
import AddToGroupModal from "../addToGroup";
import { panelStyle } from "../../../../../settings/staffSettings/components/staff/components/departmentList";
import { IMatchGroup } from "types";
import { EStudentMatchType } from "types/student/waitingList";
import { getFullMatchGroups } from "./components/getFullMatchGroups";
import { getPartialMatchGroups } from "./components/getPartialMatchGroups";
import { generateFullGroups } from "./utils";
import { OneStudent } from "types/student";

const Recommendations: FC<{
  data?: IMatchGroup;
  student: OneStudent | undefined;
}> = ({ data, student }) => {
  const [count, setCount] = useState<{ [key: number]: number }>({});
  const [otherCounts, setOtherCounts] = useState({
    [EStudentMatchType.FULL]: 0,
    [EStudentMatchType.PARTIAL]: 0,
  });

  const [open, setOpen] = useState<{
    modal: any;
    group?: IGroup | null;
  }>({
    modal: { isOpen: false },
    group: null,
  });

  const handleClose = () => {
    setOpen({ ...open, modal: { isOpen: false } });
  };
  const handleOpen = (open: any, group?: IGroup) => {
    setOpen({ group: group, modal: open });
  };
  const fullMatch = data?.[EStudentMatchType.FULL];
  const partialMatch = data?.[EStudentMatchType.PARTIAL];

  const noMatch = data?.[EStudentMatchType.NO_MATCH];

  const fullGroups = useMemo<any[]>(() => {
    return generateFullGroups({ dataFullGroup: noMatch });
  }, [noMatch]);

  return (
    <MainContainer>
      <BigCard
        title="Fully matching groups"
        count={otherCounts[EStudentMatchType.FULL]}
        ndChild={
          <NdChild
            items={{ branch: true, level: true, day: true, time: true }}
          />
        }
        gridChild={(search: string) => (
          <>
            <GridChild
              setCount={(count) => {
                setOtherCounts((prevState) => {
                  return {
                    ...prevState,
                    [EStudentMatchType.FULL]: count,
                  };
                });
              }}
              setOpen={handleOpen}
              main={true}
              groups={getFullMatchGroups({ data: fullMatch })}
              search={search}
            />
          </>
        )}
      />
      <BigCard
        title="Partially matching groups"
        ndChild={<NdChild items={{ level: true }} />}
        count={otherCounts[EStudentMatchType.PARTIAL]}
        gridChild={(search: string) => (
          <>
            <GridChild
              setCount={(count) => {
                setOtherCounts((prevState) => {
                  return {
                    ...prevState,
                    [EStudentMatchType.PARTIAL]: count,
                  };
                });
              }}
              setOpen={handleOpen}
              main={true}
              groups={getPartialMatchGroups({
                data: partialMatch,
                student,
              })}
              search={search}
            />
          </>
        )}
      />
      <Collapse
        bordered={false}
        accordion
        expandIcon={({ isActive }) => (
          <CaretRightOutlined rotate={isActive ? 90 : 0} />
        )}
        style={{ background: bgColors.transparent }}
      >
        <AntPanel
          header={
            <WrapperT>
              <BoxSvg /> All other groups
            </WrapperT>
          }
          style={panelStyle}
        >
          {fullGroups.map((e, index) => {
            return (
              <BigCard
                title={`${e?.[0]?.levelName} ${e?.[0]?.subLevelName}`}
                count={count?.[index] || 0}
                gridChild={(search: string) => (
                  <GridChild
                    search={search}
                    setOpen={handleOpen}
                    groups={e}
                    setCount={(e: number) => {
                      setCount((count) => ({ ...count, [index]: e }));
                    }}
                  />
                )}
              />
            );
          })}
        </AntPanel>
      </Collapse>
      <AddToGroupModal
        open={open}
        handleClose={handleClose}
        setOpen={handleOpen}
      />
    </MainContainer>
  );
};

export default Recommendations;
