import React, { useEffect, useMemo, useState } from "react";
import {
  BranchFilterDotSvg,
  BranchFilterSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { Wrapper, Icon } from "./style";
import {
  FieldValues,
  useController,
  useForm,
  UseFormWatch,
} from "react-hook-form";
import { Popover } from "antd";
import BranchContent from "./components/branchContent";
import _ from "lodash";
import { checkForFiltered } from "./utils";

const BranchFilter = ({
  selects,
  topControl,
  mainWatch,
}: {
  selects: any;
  topControl: any;
  mainWatch: UseFormWatch<FieldValues>;
}) => {
  const [current, setCurrent] = useState<any>(null);
  const [open, setOpen] = useState(false);

  const { field } = useController({ control: topControl, name: "branch" });

  const { control, watch, setValue, handleSubmit } = useForm();

  const topBranch = mainWatch("branch");

  const branch = watch("branch")?.sort(
    (a: string | number, b: number) => +a - +b,
  );

  const branches = useMemo(() => {
    return selects?.branch
      ?.map((item: { value: any }) => item.value)
      ?.sort((a: string | number, b: number) => +a - +b);
  }, [selects]);

  const isFiltered = checkForFiltered({ branches, current });

  const formDiffers = !_.isEqual(branch, current);

  useEffect(() => {
    if (branches && current == null && topBranch?.length == 0) {
      setCurrent(branches);
    }
  }, [branches, topBranch]);

  useEffect(() => {
    if (!!current?.length && formDiffers) {
      field.onChange(current);
      setValue("branch", current);
    }
  }, [current, open]);

  const handleOpenChange = (newValue: boolean) => {
    setOpen(newValue);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleReset = () => {
    setValue("branch", branches);
    setCurrent(branches);
    field.onChange(branches);
    handleClose();
  };

  return (
    <Wrapper>
      <Popover
        content={() =>
          BranchContent({
            control,
            watch,
            selects,
            handleSubmit,
            handleReset,
            handleClose,
            setCurrent,
            field,
          })
        }
        open={open}
        onOpenChange={handleOpenChange}
        placement="bottomLeft"
        trigger="click"
      >
        <Icon>{isFiltered ? <BranchFilterDotSvg /> : <BranchFilterSvg />}</Icon>
      </Popover>
    </Wrapper>
  );
};

export default BranchFilter;
