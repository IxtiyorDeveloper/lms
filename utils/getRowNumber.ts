import Router from "next/router";
export function getRowNumber(props: any) {
  const page = Number(Router?.query?.page) || 1;
  const pageSize = (page - 1) * Number(Router.query?.pageSize || 20);
  return pageSize + (props?.row?.index + 1 || props?.index + 1);
}
