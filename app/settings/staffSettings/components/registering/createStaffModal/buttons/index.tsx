import React, { FC } from "react";
import { CreateStaffJobType } from "constants/settings";
import { Button } from "components";
import { ButtonWrapper } from "./style";
import { useRouter } from "next/router";
import { ITypeStaffWorkingStatus } from "../../../../../../../types/staffSettings";
import { activateStaff } from "../../../../../../../hooks";

interface IProps {
  typeIndex: number;
  handleOpenDocGenerate: (t: "ja" | "jo" | "lc") => void;
  handleCancel: () => void;
  createStaff: any;
  activateStaff: any;
}

const Buttons: FC<IProps> = (props) => {
  const router = useRouter();

  const {
    typeIndex,
    handleOpenDocGenerate,
    handleCancel,
    createStaff,
    activateStaff,
  } = props;

  return (
    <ButtonWrapper>
      <div className="docs">
        {typeIndex === CreateStaffJobType.official && (
          <>
            <Button
              className="btn-secondary"
              onClick={() => handleOpenDocGenerate("ja")}
            >
              Generate (JA)
            </Button>
            <Button
              className="btn-secondary"
              onClick={() => handleOpenDocGenerate("jo")}
            >
              Generate (JO)
            </Button>
          </>
        )}
        <Button
          className="btn-secondary"
          onClick={() => handleOpenDocGenerate("lc")}
        >
          Generate (LC)
        </Button>
      </div>
      <div className="docs">
        <Button onClick={handleCancel} className="btn-secondary">
          Cancel
        </Button>
        <Button
          type="submit"
          buttonLoading={createStaff?.isLoading || activateStaff?.isLoading}
        >
          {Number(router.query?.status) === ITypeStaffWorkingStatus.ARCHIVED
            ? "Active"
            : "Create"}
        </Button>
      </div>
    </ButtonWrapper>
  );
};

export default Buttons;
