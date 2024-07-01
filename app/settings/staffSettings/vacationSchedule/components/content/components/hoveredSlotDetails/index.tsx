import React from "react";
import {
  ArrowSvg,
  CalendarESvg,
  CircleOutlineCheckSvg,
  CreateNoteSvg,
  DoubleArrowSvg,
  HiredDateSvg,
  VacationPalmSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";
import { Button, CircleImage } from "components";
import {
  ChildrenP,
  CustomPopover,
  ContentWrapper,
  Wrap,
  BodySide,
  Staff,
  Flex,
  Grid,
  BadgeWrapper,
} from "./style";
import moment from "moment/moment";

const SlotDetailsPopup = () => {
  return (
    <Wrap>
      <CustomPopover
        placement="bottom"
        content={() => (
          <ContentWrapper>
            <BodySide>
              <Staff>
                <CircleImage height={40} width={40} />
                <Flex>
                  <div>
                    <p className="full-name">John Doe</p>
                    <p className="date-period">
                      10 Jan, 2023 <DoubleArrowSvg height={14} width={14} /> 23
                      Jan, 2024
                    </p>
                  </div>
                  {/*<div className="role-branch">*/}
                  {/*  <p className="role-name">Administrator</p>*/}
                  {/*  <p className="branch-name">Xalqlar do'stligi</p>*/}
                  {/*</div>*/}
                </Flex>
              </Staff>
              <Grid>
                <Staff className="column">
                  <div className="title-side">
                    <CircleOutlineCheckSvg /> <span>Created by</span>
                  </div>
                  <p className="name-f">Bessie Cooper</p>
                </Staff>
                <Staff className="column">
                  <div className="title-side">
                    <CalendarESvg height={12} width={12} />{" "}
                    <span>Created date</span>
                  </div>
                  <p className="name-f">
                    {moment(new Date()).format("DD.MM.YYYY HH:mm")}
                  </p>
                </Staff>
                <Staff className="column">
                  <div className="title-side">
                    <HiredDateSvg /> <span>Hired date</span>
                  </div>
                  <p className="name-f">
                    {moment(new Date()).format("MMMM YYYY")}
                  </p>
                </Staff>
                <Staff className="column">
                  <div className="title-side">
                    <VacationPalmSvg height={12} width={12} />{" "}
                    <span>Vacation type</span>
                  </div>
                  <BadgeWrapper>
                    <div className="status">Early vacation</div>
                  </BadgeWrapper>
                </Staff>
              </Grid>
              <Staff className="column">
                <div className="title-side">
                  <CreateNoteSvg height={12} width={12} /> <span>Note</span>
                </div>
                <p className="name-f">No comment</p>
              </Staff>
            </BodySide>
          </ContentWrapper>
        )}
      >
        <ChildrenP>
          <Button className="midori">
            <VacationPalmSvg height={12} width={14} color={bgColors.white} />{" "}
            <ArrowSvg color={bgColors.white} height={5} width={8} />
          </Button>
        </ChildrenP>
      </CustomPopover>
    </Wrap>
  );
};

export default SlotDetailsPopup;
