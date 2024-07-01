import React, { FC } from "react";
import {
  Anchor,
  Card,
  FooterPdf,
  IconWrap,
  JORWrapper,
  JOWrapper,
  LCWrapper,
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
import { rolesById } from "./rolesById";

interface IProps {
  targetRef: any;
  footerRef: React.Ref<HTMLDivElement>;
  date: string;
  fullName: string;
  roleName: string;
  data: any;
  fullData?: any;
  type: string;
}

const Document: FC<IProps> = (props) => {
  const {
    type,
    targetRef,
    date,
    fullName,
    roleName,
    data,
    footerRef,
    fullData,
  } = props;
  const { data: initialData } = useInitialData();

  return (
    <NoneDiv>
      {type === "ja" && (
        <PDFWrapper ref={targetRef}>
          <p className="top-text">
            Директору <br /> {initialData?.company?.detail?.director}
          </p>
          <p className="text">{moment(date).format("DD.MM.YYYY")}</p>
          <h1 className="title">Заявление</h1>
          <p className="text-t">
            {"   "}Я, {data?.fullName}, прошу Вас принять на работу на{" "}
            {roleName}а в с {moment(date).format("DD.MM.YYYY")}. С должностным
            уставом, правилами внутреннего распорядка и условиями трудового
            договора ознакомлен(а).
          </p>
          <p>{fullName}___________________</p>
        </PDFWrapper>
      )}
      {type === "jo" && (
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
            <h1 className="title">Приказ &#8470; HR ____</h1>
            <h1 className="sub-title">О Приеме на работу:</h1>
            <p className="text">
              1. C {moment(date).format("DD.MM.YYYY")} года принять {fullName}{" "}
              на работу на должность {roleName}а. Заработную плату назначить
              согласно штатного расписания.
            </p>
            <p className="text mb-max">
              2. Основание: Трудовой договор и Заявление {fullName}
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
      {type === "jor" && (
        <JORWrapper ref={targetRef}>
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
            <h1 className="title">Приказ &#8470; HR ____</h1>
            <h1 className="sub-title">Об изменении должности:</h1>
            <p className="text">
              C {moment(date).format("DD.MM.YYYY")} года изменить должность{" "}
              {fullName} на должность {roleName}. Заработную плату назначить
              согласно штатного расписания.
            </p>
            <p className="text mb-max">
              2. Основание: Трудовой договор и Заявление {fullName}
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
        </JORWrapper>
      )}
      {type === "lc" && (
        <LCWrapper ref={targetRef}>
          {rolesById[(fullData.roleId || "1") as keyof typeof rolesById](
            fullData,
            date
          )}
        </LCWrapper>
      )}
    </NoneDiv>
  );
};

export default Document;
