import React, { FC } from "react";
import { Content, ImageWrapper, Wrapper } from "./style";
interface IBlog {
  title: string;
  type: string;
  date: string;
  place: string;
  url: string;
}
const Blog: FC<IBlog> = ({ title, type, date, place, url }) => {
  return (
    <Wrapper>
      <ImageWrapper style={{ backgroundImage: `url(${url})` }} />
      <Content>
        <div className="title">{title}</div>
        <div className="type">{type}</div>
        <div className="date">{date}</div>
        <div className="place">{place}</div>
      </Content>
    </Wrapper>
  );
};

export default Blog;
