import React, { FC, useMemo } from "react";
import { BottomWrapper, DepartmentsWrapper, TableContainer } from "./style";
import { InputWithIcon, SearchSvg } from "components";
import { Control, FieldValues } from "react-hook-form";
import { filterDuplicate } from "utils/filterDuplicate";
import { Affix } from "antd";
import { ISalaryMain } from "types/finance/salary";
import { Anchor } from "antd";
import Sidebar from "./components/sidebar";
import DepartmentDraw from "./components/departmentDraw";

const SecondSite: FC<{
  control: Control<FieldValues, any>;
  data: ISalaryMain[] | undefined;
  args: any;
  isLoading?: boolean;
}> = ({ control, data, args, isLoading }) => {
  const sidebarItems: { children: ISalaryMain[] }[] = useMemo(() => {
    let d: any = [];
    let sidebar: any = [];
    if (data) {
      for (let i = 0; i < data?.length; i++) {
        d = [...d, data[i]?.department];
      }
      const temp = filterDuplicate(d);
      for (let i = 0; i < temp?.length; i++) {
        //sidebar uchun data yig'amiz children department bo'yicha filter qilamiz
        sidebar = [
          ...sidebar,
          {
            ...temp[i],
            num: data
              ?.filter((p) => p?.department?.id === temp[i]?.id)
              ?.reduce((acc, curr) => {
                return acc + curr?.assignments?.length;
              }, 0),
            children: data?.filter((p) => p?.department?.id === temp[i]?.id),
          },
        ];
      }
      return sidebar;
    }
  }, [data]);

  return useMemo(() => {
    return (
      <BottomWrapper>
        <div className="sidebar_container">
          <Affix offsetTop={90}>
            <DepartmentsWrapper>
              <div className="header">
                <p className="title-department">Departments</p>
              </div>
              <div className="body">
                <div className="search">
                  <InputWithIcon
                    icon={SearchSvg}
                    name="search"
                    control={control}
                    placeholder="Search"
                  />
                </div>
                <ul>
                  <Anchor affix={false} offsetTop={125}>
                    <Sidebar sidebarItems={sidebarItems} />
                    {/*{sidebarItems?.map((item, index) => {*/}
                    {/*  const { name, num } = item;*/}
                    {/*  return (*/}
                    {/*    <Link*/}
                    {/*      href={`#part-${index}`}*/}
                    {/*      key={index}*/}
                    {/*      title={*/}
                    {/*        <div key={index}>*/}
                    {/*          <li className="flex">*/}
                    {/*            <p className="name">{name}</p>*/}
                    {/*            <p className="num">{num}</p>*/}
                    {/*          </li>*/}
                    {/*        </div>*/}
                    {/*      }*/}
                    {/*    />*/}
                    {/*  );*/}
                    {/*})}*/}
                  </Anchor>
                </ul>
              </div>
            </DepartmentsWrapper>
          </Affix>
        </div>
        <TableContainer id="my-scroll-layout">
          <DepartmentDraw sidebarItems={sidebarItems} isLoading={isLoading} />
          {/*<TableWrapper>*/}
          {/*  {sidebarItems?.map((item, key) => {*/}
          {/*    return (*/}
          {/*      <div id={`part-${key}`} key={`part-${key}`}>*/}
          {/*        {item?.children?.map(*/}
          {/*          (tableData: ISalaryMain, assignmentIndex: number) => {*/}
          {/*            const shift_id = tableData?.shift*/}
          {/*              ? tableData?.shift?.id*/}
          {/*              : 0;*/}

          {/*            const part_id = `${tableData?.role?.id}_${shift_id}`;*/}

          {/*            return (*/}
          {/*              <div id={`part-${part_id}`}>*/}
          {/*                <TableComponent*/}
          {/*                  title={`Title ${key}`}*/}
          {/*                  count={key}*/}
          {/*                  index={`${key}${assignmentIndex}`}*/}
          {/*                  key={`${key}_${assignmentIndex}`}*/}
          {/*                  data={tableData}*/}
          {/*                />*/}
          {/*              </div>*/}
          {/*            );*/}
          {/*          },*/}
          {/*        )}*/}
          {/*      </div>*/}
          {/*    );*/}
          {/*  })}*/}
          {/*</TableWrapper>*/}
        </TableContainer>
      </BottomWrapper>
    );
  }, [sidebarItems, data]);
};
export default SecondSite;
