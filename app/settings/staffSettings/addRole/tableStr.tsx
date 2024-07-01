import { Cell, DeleteSvg, EditSvg, TableHeading } from "components";
import styled from "@emotion/styled";
import { ShiftDepartmentModal } from "./index";

interface IProps {
  handleOpen: (type: ShiftDepartmentModal, id?: number) => void;
  handleClickEditShift: (key: any) => void;
}

export const COLUMNS = ({ handleOpen, handleClickEditShift }: IProps) => {
  return [
    {
      title: <TableHeading padding>Name</TableHeading>,
      dataIndex: "name",
      disableFilters: true,
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    {
      title: <TableHeading padding>Working days</TableHeading>,
      dataIndex: "working_days",
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    {
      title: <TableHeading padding>Working hours</TableHeading>,
      dataIndex: "working_hours",
      render: (value: any, record: any, index: number) => {
        return <Cell>{value}</Cell>;
      },
    },
    {
      title: (
        <TableHeading
          style={{ alignItems: "flex-end", justifyContent: "flex-end" }}
        >
          Actions
        </TableHeading>
      ),
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => {
        return (
          <Cell style={{ width: "80px", justifyContent: "flex-end" }}>
            <Div>
              <div
                className="item"
                onClick={() => handleClickEditShift(record)}
              >
                <EditSvg width="16px" height="16px" />
              </div>
              <div
                className="item"
                onClick={() => handleOpen("deleteMethod", record)}
              >
                <DeleteSvg width="16px" height="16px" />
              </div>
            </Div>
          </Cell>
        );
      },
    },
  ];
};

const Div = styled.div`
  display: flex;
  width: 80px;
  align-items: center;
  justify-content: center;

  .item {
    width: 40px;
    height: 40px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`;
