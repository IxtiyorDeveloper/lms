import React from "react";
import { Box, Top } from "./style";
import { Button, RedBadgeTitle, PlusSvg } from "components";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import Table from "./components/table";
import { IObservationSection } from "./type";

const ObservationSection = ({ data }: IObservationSection) => {
  const dispatch = useDispatch();
  const handleOpen = () => {
    dispatch(
      toggleModal({
        key: "createObservation",
        data: {
          data: {
            data,
            type: data?.type,
            mentor_id: data?.base_mentor_id,
          },
          open: true,
        },
      }),
    );
  };

  const observations = data?.observations;
  const type = data?.type;

  return (
    <Box>
      <Top>
        <RedBadgeTitle title="Observation" count={observations?.length} />
        <Button onClick={() => handleOpen()}>
          <PlusSvg /> Create
        </Button>
      </Top>
      <Table observations={observations} isLoading={false} type={type} />
    </Box>
  );
};

export default ObservationSection;
