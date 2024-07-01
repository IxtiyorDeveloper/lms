import * as React from "react";
import { DeleteModal } from "./type";
import {
  BackDropWrapper,
  Buttons,
  TextDeleteWrapper,
  TrashWrapper,
} from "./style";
import { AntdModal, Button, DeleteThreeSvg } from "components";
import { Grid } from "@mui/material";

const DeleteModal = ({
  handleClose,
  open,
  onSubmit,
  handleSubmit,
}: DeleteModal) => {
  return (
    <AntdModal open={open} onCancel={handleClose} centered width={340}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <Grid container spacing="14px">
          <Grid item xl={12} md={12} sm={12}>
            <TrashWrapper>
              <div className="relative">
                <BackDropWrapper></BackDropWrapper>
                <div className="absolute">
                  <DeleteThreeSvg height={53} width={53} />
                </div>
              </div>
            </TrashWrapper>
            <TextDeleteWrapper>
              <p>
                Are you sure? <br />
                This property will be deleted for everyone
              </p>
            </TextDeleteWrapper>
          </Grid>
        </Grid>
        <Buttons>
          <Button
            style={{ width: "100%" }}
            className="cancel"
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button className="delete" style={{ width: "100%" }} type="submit">
            Delete
          </Button>
        </Buttons>
      </form>
    </AntdModal>
  );
};
export default DeleteModal;
