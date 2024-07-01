import React, { FC } from "react";
import { INoteModal } from "./type";
import { AntdModal, Button, Input } from "components";
import { Grid } from "@mui/material";
import { Flex } from "./style";
import { bgColors } from "styles/theme";

const NoteModal: FC<INoteModal> = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
  control,
}) => {
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={340}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing="14px">
          <Grid item xl={12} md={12} sm={12}>
            <Input name="note" control={control} type="textarea" />
          </Grid>
        </Grid>
        <Flex>
          <Button
            style={{ width: "100%" }}
            className="cancel"
            bgColor={bgColors.purpleCrystal}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="delete" style={{ width: "100%" }} type="submit">
            Save
          </Button>
        </Flex>
      </form>
    </AntdModal>
  );
};

export default NoteModal;
