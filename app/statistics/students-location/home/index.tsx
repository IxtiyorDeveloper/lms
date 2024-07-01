import React from "react";
import {
  FilterWrapper,
  Wrapper,
  Content,
  Top,
  Right,
  MapContent,
  MContainer,
} from "./style";
import FilterComponent from "./components/filter";
import { RedBadgeTitle, Segmented } from "components";
import YandexMap from "./components/map/map";
import Location from "./components/map";

const StudentsLocation = () => {
  const menu = [
    {
      label: "All location",
      value: "100",
    },
    {
      label: "Home location",
      value: "200",
    },
    {
      label: "Study/work location",
      value: "300",
    },
  ];
  return (
    <Wrapper>
      <FilterWrapper>
        <FilterComponent />
      </FilterWrapper>
      <Content>
        <Top>
          <RedBadgeTitle title="Locations" count="10345" />
          <Right>
            <Segmented routerKey="tab" options={menu} />
          </Right>
        </Top>
        <MapContent>
          <MContainer>
            <YandexMap />
          </MContainer>
        </MapContent>
      </Content>
    </Wrapper>
  );
};

export default StudentsLocation;
