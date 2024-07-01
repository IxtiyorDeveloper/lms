import React, { FC } from "react";
import { Button } from "components";
import { DownloadSvg } from "@jasurbekyuldashov/lms-web-icons";
import { textColors } from "styles/theme";
import { TopSide, Title } from "./style";
import { useDispatch } from "react-redux";
import { toggleModal } from "store";
import { IStaffViewPageInfoData } from "types/staffSettings";

interface IProps {
  dataOneStaff?: IStaffViewPageInfoData;
}

const FormTopSide: FC<IProps> = (props) => {
  const dispatch = useDispatch();

  const { dataOneStaff } = props;

  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "generateCandidateDetails",
        data: {
          data: {
            ...dataOneStaff,
          },
          open: true,
        },
      })
    );
  };

  return (
    <TopSide>
      <Title>Candidate form</Title>
      <Button
        onClick={handleOpen}
        className="btn-info"
        style={{ padding: "0 8px" }}
      >
        {" "}
        Generate pdf
      </Button>
    </TopSide>
  );
};

export default FormTopSide;
