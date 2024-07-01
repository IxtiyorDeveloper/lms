import * as React from "react";
import { ShiftModal } from "./type";
import { Buttons, Content } from "./style";
import { AntdModal, AntdSwitch, Button, ErrorLabel, Input } from "components";
import { bgColors } from "styles/theme";
import { Grid, Stack } from "@mui/material";
import Table from "./shiftTable";
import { useEffect, useMemo } from "react";

export const data = [
  {
    day: "Monday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Tuesday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Wednesday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Thursday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Friday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Saturday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
  {
    day: "Sunday ",
    action: 0,
    from: "07:30",
    to: "20:00",
  },
];

const ShiftModal = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
  control,
  errors,
  watch,
  getValues,
  reset,
}: ShiftModal) => {
  const columns = useMemo(
    () => [
      {
        Header: "Days",
        accessor: "day",
        Footer: "Days",
      },
      {
        Header: "Actions",
        accessor: "action",
        Footer: "Actions",
        Cell: (props: any) => {
          return (
            <Stack direction="row" alignItems="center">
              <AntdSwitch
                style={{ width: "10px" }}
                control={control}
                name={`${props.row.index + 1}`}
              />
            </Stack>
          );
        },
      },
      {
        Header: "From",
        accessor: "from",
        Footer: "from",
      },

      {
        Header: "To",
        accessor: "to",
        Footer: "to",
      },
    ],
    []
  );

  useEffect(() => {
    if (!open) {
      reset();
    }
  }, [open]);
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={520}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing="14px">
          <Grid item xl={12} md={12} sm={12}>
            <Input
              label="Shift name"
              name="shift_name"
              control={control}
              placeholder="Type here..."
              error={errors?.shift_name?.message}
            />
          </Grid>
          <Grid item xl={12} md={12} sm={12}>
            <Content>
              <Table
                columns={columns}
                data={data}
                styles={{ flex: 1 }}
                control={control}
                watch={watch}
                getValues={getValues}
                errors={errors}
              />
            </Content>
            <ErrorLabel error={errors?.times?.message} />
          </Grid>
        </Grid>
        <Buttons>
          <Button
            style={{ backgroundColor: bgColors.wildSand, width: "100%" }}
            className="cancel"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="save" type="submit" style={{ width: "100%" }}>
            Save
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};
export default ShiftModal;
