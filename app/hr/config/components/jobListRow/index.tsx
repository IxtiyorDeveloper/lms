import { toggleModal } from "store";
import { VacancyStatus } from "./type";
import { useDispatch } from "react-redux";
import { AntdSwitch, EditSvg } from "components";
import { Control, FieldValues } from "react-hook-form";

import { Wrapper } from "./style";

const JobListRow = ({
  id,
  index,
  title,
  control,
  status,
  department_id,
}: {
  id?: number;
  index: number;
  title?: string;
  control?: Control<FieldValues>;
  status?: number | null;
  department_id?: number;
}) => {
  const dispatch = useDispatch();
  const handleClick = () => {
    dispatch(
      toggleModal({
        key: "vacancyConfig",
        data: {
          data: {
            role_id: id,
            role_name: title,
            department_id,
          },
          open: true,
        },
      })
    );
  };
  return (
    <Wrapper>
      <div className="col_item">
        <div className="index">{index}</div>
        <h4>{title}</h4>
      </div>
      <div className="col_item col_item_right">
        <AntdSwitch
          name={id?.toString() || ""}
          control={control}
          disabled={!status}
          defaultValue={status == VacancyStatus.ACTIVE}
        />
        <span className="edit_icon" onClick={handleClick}>
          <EditSvg />
        </span>
      </div>
    </Wrapper>
  );
};

export default JobListRow;
