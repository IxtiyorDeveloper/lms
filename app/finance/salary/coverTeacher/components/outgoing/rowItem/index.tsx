import React, { FC } from "react";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { CircleImage, DeleteSvg, EditSvg } from "components";
import { ICoverTeacher } from "types/finance/salary";
import { Tooltip } from "antd";

const RowItem: FC<{
  cover: ICoverTeacher;
  editable?: boolean;
  mainId?: number;
  replaced?: boolean;
}> = ({ cover, editable, mainId, replaced }) => {
  const url = cover?.salary?.receiver?.userProfile?.avatar;
  const full_name =
    cover?.salary?.receiver?.userProfile?.firstname +
    " " +
    cover?.salary?.receiver?.userProfile?.lastname;
  const amount = cover?.value;
  const handleOpenModal = () => {};
  const handleDeleteOpen = () => {};
  return (
    <div className={`item ${!editable ? "edit" : ""}`}>
      <div className="profile">
        <CircleImage
          src={url}
          alt="avatar"
          width={41}
          height={41}
          className="img"
        />
        <p className="name">{full_name}</p>
      </div>
      <Tooltip
        destroyTooltipOnHide
        title={cover.description}
        placement="topLeft"
      >
        <p className="description">{cover.description}</p>
      </Tooltip>
      <p className={`success ${replaced ? "red" : ""}`}>
        {toCurrencyFormat(Math.abs(amount))}
      </p>
      {editable ? (
        <div className="icons">
          <div className="icon" onClick={handleOpenModal}>
            <EditSvg />
          </div>
          <div className="icon" onClick={handleDeleteOpen}>
            <DeleteSvg />
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default RowItem;
