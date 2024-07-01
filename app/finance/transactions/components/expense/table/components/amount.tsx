import React, { useState } from "react";
import { Popover } from "antd";
import { AmountWrapper, CellNameWrapper, PopoverContent } from "../style";
import { toCurrencyFormat } from "utils/toCurrencyFormat";
import { toggleModal } from "store";
import { EditSvg } from "components";
import { bgColors } from "styles/theme";
import { useDispatch } from "react-redux";

const Amount = ({ value, record }: { value: any; record: any }) => {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const handleOpenChange = (newOpen: boolean) => {
    setOpen(newOpen);
  };
  return (
    <Popover
      trigger="click"
      open={open}
      onOpenChange={handleOpenChange}
      content={<PopoverContent>{toCurrencyFormat(value)}</PopoverContent>}
      destroyTooltipOnHide
    >
      <AmountWrapper>
        <CellNameWrapper>
          <p className="amount">{toCurrencyFormat(value)}</p>
          {record?.buttonActions?.divide && (
            <div
              className="icon"
              onClick={(event) => {
                event.stopPropagation();
                if (open) {
                  setOpen(false);
                }
                if (record?.buttonActions?.divide)
                  dispatch(
                    toggleModal({
                      key: "divideExpense",
                      data: {
                        data: {
                          row: record,
                        },
                        open: true,
                      },
                    })
                  );
              }}
            >
              <EditSvg color={bgColors.blueGray} />
            </div>
          )}
        </CellNameWrapper>
      </AmountWrapper>
    </Popover>
  );
};

export default Amount;
