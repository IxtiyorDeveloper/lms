import React, { useState } from "react";
import { Count, Hr, Sector, Title, Wrapper, Bottom, Box } from "./style";
import { useRouter } from "next/router";
import moment from "moment/moment";
import { IOverall } from "./type";
import { fixedNumber } from "utils/functions/fixedNumber";
import { generateMockExamData } from "./generateData";
import { Popover, Spin } from "antd";
import { bgColors, textColors } from "styles/theme";
import { XMoreInfoIcon } from "@jasurbekyuldashov/lms-web-icons";
import { MyLink } from "components";
import InfoComponent from "./info";

const OverallMock = ({ counts, isLoading }: IOverall) => {
  const router = useRouter();
  const [open, setOpen] = useState(false);

  const date = moment(
    router.query.date || moment().format("YYYY-MM"),
    "YYYY-MM"
  );

  const month = date.format("MM");
  const year = date.format("YYYY");

  const data = generateMockExamData({ year, month, router, counts });

  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        <div>
          <Sector>
            <Count>{data[0].count}</Count>
            <Bottom>
              <Title>{data[0].title}</Title>
            </Bottom>
          </Sector>
        </div>
        <div>
          <Sector>
            <Count style={{ color: data[1].color }}>{data[1].count}</Count>
            <Bottom>
              <Title>{data[1].title}</Title>
              <Box style={{ color: data[1].color }}>
                {fixedNumber(data[1].percentage)}%
              </Box>
            </Bottom>
            <Hr />
          </Sector>
        </div>
        <div>
          <Sector>
            <Count style={{ color: data[2].color }}>{data[2].count}</Count>
            <Bottom>
              <Title>{data[2].title}</Title>
              <Box style={{ color: data[2].color }}>
                {fixedNumber(data[2].percentage)}%
              </Box>
            </Bottom>
            <Hr />
          </Sector>
        </div>
        <div>
          <Sector>
            <Count style={{ color: data[3].color }}>{data[3].count}</Count>
            <Bottom>
              <Title>{data[3].title}</Title>
              <Box style={{ color: data[3].color }}>
                {fixedNumber(data[3].percentage)}%
              </Box>
            </Bottom>
            <Hr />
          </Sector>
        </div>
        <div>
          <Sector>
            <Count style={{ color: data[4].color }}>{data[4].count}</Count>
            <Bottom>
              <Title>{data[4].title}</Title>
              <Box style={{ color: textColors.harrison }}>
                {fixedNumber(data[4].percentage)}%
              </Box>
            </Bottom>
            <Hr />
          </Sector>
        </div>
        <div>
          <Sector>
            <Count style={{ color: data[5].color }}>{data[5].count}</Count>
            <Bottom>
              <Title>{data[5].title}</Title>
              <Box style={{ color: textColors.harrison }}>
                {fixedNumber(data[5].percentage)}%
              </Box>
            </Bottom>
            <Hr />
          </Sector>
        </div>
        <MyLink href={{ pathname: router.pathname, query: router.query }}>
          <Sector>
            <Count style={{ color: data[5].color }}>{counts?.average}</Count>
            <Bottom>
              <Title>Average score</Title>
              <Box>
                <Popover
                  open={open}
                  trigger="hover"
                  onOpenChange={(e) => setOpen(e)}
                  content={InfoComponent({ open })}
                  color={bgColors.dark}>
                  <XMoreInfoIcon color={bgColors.harrison} />
                </Popover>
              </Box>
            </Bottom>
            <Hr />
          </Sector>
        </MyLink>
      </Wrapper>
    </Spin>
  );
};

export default OverallMock;
