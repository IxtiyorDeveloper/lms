import React, { forwardRef, useImperativeHandle, useState } from "react";
import { AntdModal, Button } from "components";
import { PodoSvg } from "@jasurbekyuldashov/lms-web-icons";
import { Wrapper } from "./style";
import { bgColors } from "styles/theme";

interface IProps {
  setValue: any;
  watch: any;
  name: any;
}

const StrictConfirmationModal = forwardRef(({}: IProps, ref) => {
  const [open, setOpen] = useState(false);

  useImperativeHandle(ref, () => ({
    setOpen,
  }));

  return (
    <AntdModal width={320} centered open={open}>
      <Wrapper>
        <div className="icon">
          <PodoSvg width={50} height={50} color={bgColors.orange} />
        </div>
        <div className="info">
          Are you sure turn on strict?
          <br />
          It reduces the number of recommended groups for this student.
        </div>
        <div className="flex">
          <Button
            className="cancel"
            bgColor={bgColors.wildSand}
            style={{ width: "100%" }}
          >
            Cancel
          </Button>
          <Button
            className="save"
            type="submit"
            // buttonLoading={formSave.isLoading}
          >
            Save
          </Button>
        </div>
      </Wrapper>
    </AntdModal>
  );
});

export default StrictConfirmationModal;
