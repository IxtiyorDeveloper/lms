import React from "react";
import {
  Cell,
  DeleteSvg,
  DownloadSvg,
  EditSvg,
  FilesSvg,
  TableHeading,
} from "components";
import { ActionsWrapper, NameWrapper, TypeWrapper, Download } from "./style";
import moment from "moment/moment";
import { DATE_FORMAT_CREATED_AT, DATE_FORMAT_SHOW_MMM } from "constants/dates";
import { bgColors } from "styles/theme";
import { ICompanyFile } from "types";
import { getRowNumber } from "utils/getRowNumber";
import Router from "next/router";
import { CheckPermission } from "utils/guard";
import { COMPONENTS_VIEWS } from "constants/permissions";

const Columns = ({
  handleOpen,
}: {
  handleOpen: (data: ICompanyFile) => void;
}) => {
  return [
    {
      title: (
        <TableHeading padding isId>
          Name
        </TableHeading>
      ),
      dataIndex: "name",
      width: "15%",
      render: (value: any, record: any, index: number) => {
        return (
          <NameWrapper>
            {getRowNumber({ index })}&nbsp; {value}
          </NameWrapper>
        );
      },
    },
    {
      title: <TableHeading>Type</TableHeading>,
      dataIndex: ["file", "name"],
      width: "40%",
      render: (value: any, record: any, index: number) => {
        return (
          <TypeWrapper>
            <FilesSvg />{" "}
            {record?.file?.path.slice(
              (record?.file?.path as string).indexOf(".") + 1
            )}
          </TypeWrapper>
        );
      },
    },
    {
      title: <TableHeading>Create date</TableHeading>,
      width: "15%",
      dataIndex: "date",
      render: (value: any, record: any, index: number) => (
        <Cell>
          {value &&
            moment(value, DATE_FORMAT_CREATED_AT).format(DATE_FORMAT_SHOW_MMM)}
        </Cell>
      ),
    },
    {
      title: <TableHeading>Actions</TableHeading>,
      width: "15%",
      dataIndex: "actions",
      render: (value: any, record: any, index: number) => {
        return (
          <ActionsWrapper>
            <CheckPermission
              permission={[COMPONENTS_VIEWS.can_manage_document_settings]}
            >
              <div
                style={{ display: "flex", gap: "20px", alignItems: "center" }}
              >
                <Download href={record?.file?.full_url} target={"download"}>
                  <DownloadSvg color={bgColors.deep} />
                </Download>
                <EditSvg
                  style={{ cursor: "pointer" }}
                  onClick={() => {
                    Router.replace({
                      pathname: Router.pathname,
                      query: {
                        ...Router.query,
                        addFile: true,
                        addFileId: record?.id,
                      },
                    });
                  }}
                />
                <DeleteSvg
                  style={{ cursor: "pointer" }}
                  onClick={() => handleOpen(record)}
                />
              </div>
            </CheckPermission>
          </ActionsWrapper>
        );
      },
    },
  ];
};

export default Columns;
