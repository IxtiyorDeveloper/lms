import React from "react";
import { Container, Row, Title, Wrapper, Top, Box } from "./style";
import { ITimeline } from "./type";
import { AntdRate, Quill } from "components";
import { EFieldType } from "types/observation";

const Contents = ({ control, aspects, tab, handleSave }: ITimeline) => {
  const isOneEditor = aspects?.aspects?.length == 1;
  return (
    <Wrapper>
      {aspects?.aspects?.map((item, index) => {
        return (
          <Row
            key={`${index}_${tab}`}
            className={isOneEditor ? "single" : "multiple"}
          >
            <Top>
              <Title>
                <img src={item?.icon} alt="icon" height={24} />{" "}
                {item?.key_label}
              </Title>
              {aspects?.type == EFieldType.Rating && (
                <Box>
                  <AntdRate
                    debouncedFunction={handleSave}
                    allowHalf
                    name={`rate_${tab}_${item?.key}`}
                    control={control}
                  />
                </Box>
              )}
            </Top>
            <Container>
              <Quill
                debouncedFunction={handleSave}
                name={`input_${tab}_${item?.key}`}
                control={control}
              />
            </Container>
          </Row>
        );
      })}
    </Wrapper>
  );
};

export default Contents;
