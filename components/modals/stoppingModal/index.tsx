import * as React from "react";
import {
  AntdModal,
  Button,
  Input,
  MySelect,
  PodoSvg,
  Radios,
} from "components";
import {
  ModalTitle,
  Wrapper,
  ButtonWrapper,
  FlexWrapper,
  PriceBox,
  IconWrapper,
} from "./style";
import { TStoppingModal } from "./type";
import { bgColors, textColors } from "styles/theme";
import DatePicker from "../../antd/datePicker";
import { toCurrencyFormat } from "utils/toCurrencyFormat";

const StoppingModal = ({
  handleClose,
  errors,
  open,
  price,
  priceStatus = "danger",
  control,
  handleSubmit,
  onSubmit,
  watch,
}: TStoppingModal) => {
  const bgColor = {
    danger: bgColors.pepper,
    success: bgColors.sadet,
    warning: bgColors.primary,
  };

  const shColor = {
    danger: bgColors.fond,
    success: bgColors.pepper,
    warning: bgColors.primary,
  };

  const icon = {
    danger: (
      <IconWrapper>
        <PodoSvg width={18} height={18} color={bgColors.white} /> NOT PAID
      </IconWrapper>
    ),
    success: bgColors.pepper,
    warning: bgColors.primary,
  };

  return (
    <AntdModal
      open={open.stoppingModal}
      onCancel={handleClose}
      centered
      width={520}
    >
      <ModalTitle> Stopping</ModalTitle>
      {price && (
        <>
          <PriceBox
            style={{
              width: "100%",
              background: bgColor[priceStatus],
              boxShadow: `inset 0 0 8px ${shColor[priceStatus]}`,
            }}
          >
            {icon[priceStatus]} {toCurrencyFormat(price)}
          </PriceBox>
        </>
      )}
      <form onSubmit={handleSubmit(onSubmit)}>
        {price && (
          <>
            <Wrapper>
              <DatePicker
                label="Finish date"
                name="time"
                error={errors}
                control={control}
              />
            </Wrapper>
          </>
        )}
        <Wrapper>
          <MySelect
            label="Stopping category"
            name="stopping_category"
            control={control}
            options={[]}
          />
        </Wrapper>
        <Wrapper>
          <Input
            placeholder="Type here..."
            name="reason"
            control={control}
            label="Reason"
            type="textarea"
          />
        </Wrapper>
        <Wrapper>
          <Radios
            control={control}
            name="check"
            options={[
              { label: "Waiting list", value: true },
              { label: "Archived", value: false },
            ]}
          />
        </Wrapper>
        {!watch("check") ? (
          <div style={{ padding: "90px 0" }}></div>
        ) : (
          <>
            <FlexWrapper>
              <Wrapper>
                <MySelect
                  label="Course"
                  name="course"
                  control={control}
                  options={[]}
                />
              </Wrapper>
              <Wrapper>
                <MySelect
                  label="Group type"
                  name="group_type"
                  control={control}
                  options={[]}
                />
              </Wrapper>
            </FlexWrapper>
            <FlexWrapper>
              <Wrapper>
                <MySelect
                  label="Level"
                  name="level"
                  control={control}
                  options={[]}
                />
              </Wrapper>
              <Wrapper>
                <MySelect
                  label="Sub level"
                  name="sub_level"
                  control={control}
                  options={[]}
                />
              </Wrapper>
            </FlexWrapper>
            <FlexWrapper>
              <Wrapper>
                <DatePicker
                  label="Days"
                  name="days"
                  error={errors}
                  control={control}
                />
              </Wrapper>
              <Wrapper>
                <DatePicker
                  label="Time"
                  name="time"
                  error={errors}
                  control={control}
                />
              </Wrapper>
            </FlexWrapper>
            <FlexWrapper>
              <Wrapper>
                <MySelect
                  label="Branch"
                  name="branch"
                  control={control}
                  options={[]}
                />
              </Wrapper>
            </FlexWrapper>
            <FlexWrapper style={{ marginBottom: "30px" }}>
              <Wrapper>
                <Input
                  placeholder="Type here..."
                  name="select"
                  control={control}
                  label="Comment"
                  type="textarea"
                />
              </Wrapper>
            </FlexWrapper>
          </>
        )}
        <ButtonWrapper>
          <Button
            onClick={handleClose}
            textColor={textColors.yourShadow}
            bgColor={bgColors.wildSand}
          >
            Cancel
          </Button>
          <Button type="submit">Save</Button>
        </ButtonWrapper>
      </form>
    </AntdModal>
  );
};
export default StoppingModal;
