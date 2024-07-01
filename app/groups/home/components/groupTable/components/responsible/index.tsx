import React from "react";
import { Wrapper } from "./style";
import { Cell, CellFlex, Content, Title } from "./style";
import { IGroup } from "types";
import { AddNewForNewDaySvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { DeleteSvg } from "@jasurbekyuldashov/lms-web-icons";
import { queryKeys } from "constants/queryKeys";

const Responsible = ({ record }: { record: IGroup }) => {
  const dispatch = useDispatch();
  const responsible = record?.responsible;

  const name = responsible?.userProfile?.firstname
    ? responsible?.userProfile?.firstname +
      " " +
      responsible?.userProfile?.lastname
    : "-";

  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "responsibleStaff",
        data: {
          data: {
            id: record?.id,
            queryKeys: [queryKeys.admin_group_index],
          },
          open: true,
        },
      }),
    );
  };
  const handleDelete = () => {
    dispatch(
      toggleModal({
        key: "deleteResponsible",
        data: {
          data: {
            id: record?.id,
            queryKeys: [queryKeys.admin_group_index],
          },
          open: true,
        },
      }),
    );
  };

  if (responsible)
    return (
      <Wrapper>
        <Cell>
          <CellFlex>
            <Content>
              <Title>
                {name}
                <div className="icon" onClick={handleDelete}>
                  <DeleteSvg />
                </div>
              </Title>
            </Content>
          </CellFlex>
        </Cell>
      </Wrapper>
    );
  else {
    return (
      <Wrapper>
        <Cell onClick={handleOpen}>
          <AddNewForNewDaySvg />
        </Cell>
      </Wrapper>
    );
  }
};

export default Responsible;
