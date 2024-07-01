import React, { FC } from "react";
import {
  Anchor,
  Card,
  FooterPdf,
  IconWrap,
  JOWrapper,
  LogoSide,
  NoneDiv,
  PDFWrapper,
} from "./style";
import moment from "moment/moment";
import Image from "next/image";
import { useInitialData } from "hooks";
import {
  AnalystSvg,
  MailSvg,
  PhoneSvg,
} from "@jasurbekyuldashov/lms-web-icons";
import { bgColors } from "styles/theme";

interface IProps {
  targetRef: any;
  footerRef: React.Ref<HTMLDivElement>;
  date: string;
  fullName: string;
  data: any;
  type: string;
}

const Document: FC<IProps> = (props) => {
  const { type, targetRef, date, fullName, data, footerRef } = props;
  const { data: initialData } = useInitialData();

  return (
    <NoneDiv>
      {type === "da" && (
        <PDFWrapper ref={targetRef}>
          <p className="top-text">
            Директору <br /> {initialData?.company?.detail?.director}
          </p>
          <p className="text">{moment(date).format("DD.MM.YYYY")}</p>
          <h1 className="title">Заявление</h1>
          <p className="text-t">
            Я, {data?.fullName}, прошу Вас освободить меня занимаемой должности
            в с {moment(date).format("DD.MM.YYYY")} по собственному желанию.
          </p>
          <p>
            {fullName}___________________{moment(date).format("DD.MM.YYYY")}
          </p>
        </PDFWrapper>
      )}
      {type === "do" && (
        <JOWrapper ref={targetRef}>
          <LogoSide>
            <Image
              src="/logo/verticalLogo.svg"
              alt="vertical internation"
              width={120}
              height={80}
              className="logo"
            />
          </LogoSide>
          <div className="padding-wrapper">
            <p className="text-date">{moment(date).format("DD.MM.YYYY")}</p>
            <h1 className="title">Приказ &#8470; _____</h1>
            <h1 className="title">Об увольнении:</h1>
            <p className="text">
              1. C {moment(date).format("DD.MM.YYYY")} года освободить{" "}
              {data?.fullName} от занимаемой должности по собственному желанию
              сотрудника.
            </p>
            <p className="text mb-max">
              2. Основание: Заявление {data?.fullName}.
            </p>
            <p>
              <b>Директор: {initialData?.company?.detail?.director}</b>
              ___________________
            </p>
          </div>
          <FooterPdf ref={footerRef}>
            <Card>
              <IconWrap>
                <MailSvg color={bgColors.primary} />
              </IconWrap>
              <Anchor href={initialData?.company?.detail?.website}>
                {initialData?.company?.detail?.website}
              </Anchor>
            </Card>
            <Card>
              <IconWrap>
                <PhoneSvg color={bgColors.primary} />
              </IconWrap>
              <Anchor href={`tel:+998${initialData?.company?.detail?.phone}`}>
                +998{initialData?.company?.detail?.phone}
              </Anchor>
            </Card>
            <Card>
              <IconWrap>
                <AnalystSvg color={bgColors.primary} />
              </IconWrap>
              <Anchor href={`mailto:${initialData?.company?.detail?.email}`}>
                {initialData?.company?.detail?.email}
              </Anchor>
            </Card>
          </FooterPdf>
        </JOWrapper>
      )}
    </NoneDiv>
  );
};

export default Document;
