import * as React from "react";
import { AntdModal, Button } from "components";
import { ModalTitle, ButtonWrapper } from "./style";
import { bgColors, textColors } from "styles/theme";
import { Spin } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import { useRef } from "react";
import ReactToPrint from "react-to-print";
import Check from "./components/check";

const PrintSalaryDetail = () => {
  const dispatch = useDispatch();

  const {
    printSalaryDetails: { data, open },
  } = useSelector((state: IStore) => state.modals);

  const handleClose = () => {
    dispatch(
      toggleModal({
        key: "printSalaryDetails",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };
  const componentRef = useRef();

  const renderPages = (assignments: any[]) => {
    const pageCount = assignments?.length;
    const pages = [];

    for (let i = 0; i < pageCount; i++) {
      pages.push(
        <div key={i} style={{ pageBreakAfter: "always" }}>
          <Check key={i} check={assignments[i]} roleName={data?.role?.name} />
        </div>
      );
    }

    return pages;
  };

  return (
    <AntdModal
      padding="0"
      open={open}
      onCancel={handleClose}
      centered
      width={520}
    >
      <Spin spinning={false}>
        <ModalTitle>Check preview</ModalTitle>
        <div style={{ height: "600px", overflowY: "auto" }}>
          <div ref={componentRef as any}>{renderPages(data?.assignments)}</div>
        </div>
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <ReactToPrint
            trigger={() => (
              <Button
                textColor={textColors.white}
                bgColor={bgColors.midori}
                type="submit"
              >
                Print
              </Button>
            )}
            content={() => componentRef.current as any}
            pageStyle={`@page {size: A5;}`}
            copyStyles={false}
          />
        </ButtonWrapper>
      </Spin>
    </AntdModal>
  );
};

export default PrintSalaryDetail;
