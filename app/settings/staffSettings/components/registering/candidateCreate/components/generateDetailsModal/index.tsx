import React, { useRef } from "react";
import { AntdModal, Button } from "components";
import { useDispatch, useSelector } from "react-redux";
import { IStore, toggleModal } from "store";
import {
  ButtonWrap,
  Flex,
  ModalContent,
  SubTitle,
  TableWrapper,
} from "./style";
import Image from "next/image";
import generatePDF from "react-to-pdf";
import { useInitialData } from "hooks";
import { MainPhone } from "constants/phoneTypes";
import { DownloadSvg } from "@jasurbekyuldashov/lms-web-icons";
import { bgColors, textColors } from "styles/theme";

const GenerateDetailsModal = () => {
  const dispatch = useDispatch();
  const targetRef = useRef(null);

  const { data: initialData } = useInitialData();

  const {
    generateCandidateDetails: { data, open },
  } = useSelector((store: IStore) => store.modals);

  const handleCancel = () => {
    dispatch(
      toggleModal({
        key: "generateCandidateDetails",
        data: {
          data: {},
          open: false,
        },
      })
    );
  };

  const handleDownload = () => {
    generatePDF(targetRef, {
      filename: `${data?.userProfile?.firstname}-${data?.userProfile?.lastname}-info`,
    }).then(() => {
      handleCancel();
    });
  };

  return (
    <AntdModal width={700} open={open} onCancel={handleCancel}>
      <ButtonWrap>
        <Button
          bgColor={bgColors.deep}
          textColor={textColors.white}
          onClick={handleDownload}
        >
          <DownloadSvg color={textColors.white} height={14} /> Download file
        </Button>
      </ButtonWrap>
      <ModalContent ref={targetRef}>
        <SubTitle>Персональная информация</SubTitle>
        <Flex>
          <Image
            width={150}
            className="avatar"
            height={150}
            src={data?.userProfile?.avatar?.full_url}
            alt="Avatar"
          />
          <TableWrapper>
            <tbody>
              <tr>
                <td>Фамилия</td>
                <td>{data?.userProfile?.lastname}</td>
              </tr>
              <tr>
                <td>Имя</td>
                <td>{data?.userProfile?.firstname}</td>
              </tr>
              <tr>
                <td>Отчество</td>
                <td>{data?.userProfile?.middlename}</td>
              </tr>
              <tr>
                <td>Пол</td>
                <td>{data?.userProfile?.gender}</td>
              </tr>
              <tr>
                <td>Дата рождения</td>
                <td>{data?.userProfile?.dob}</td>
              </tr>
              <tr>
                <td>Семейное положение</td>
                <td>
                  {
                    initialData?.familyStatusList?.filter(
                      (status) => status.value === data?.staff?.family_status
                    )[0]?.label
                  }
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </Flex>
        <SubTitle>Данные паспорта / ID карты</SubTitle>
        <Flex>
          <TableWrapper>
            <tbody>
              <tr>
                <td>Серийный номер паспорта / Номер ID карты</td>
                <td>{data?.staff?.passport_number}</td>
              </tr>
              <tr>
                <td>Время выдачи паспорта / ID карты</td>
                <td>{data?.staff?.passport_given_date}</td>
              </tr>
              <tr>
                <td>Срок действия паспорта / ID карты</td>
                <td>{data?.staff?.passport_expire_date}</td>
              </tr>
              <tr>
                <td>Кем выдан паспорт / ID карта</td>
                <td>{data?.staff?.passport_given_by}</td>
              </tr>
              <tr>
                <td>Гражданство</td>
                <td>
                  {
                    initialData?.citizenList?.filter(
                      (status) => status?.value == data?.staff?.citizenship
                    )[0]?.label
                  }
                </td>
              </tr>
              <tr>
                <td>Место рождения</td>
                <td>
                  {
                    initialData?.placeList?.filter(
                      (status) => status.value === data?.staff?.born_address
                    )[0]?.label
                  }
                </td>
              </tr>
              <tr>
                <td>Место проживания (По прописке)</td>
                <td>{data?.staff?.official_address}</td>
              </tr>
              <tr>
                <td>Место проживания (По факту)</td>
                <td>{data?.staff?.live_address}</td>
              </tr>
            </tbody>
          </TableWrapper>
        </Flex>
        <SubTitle>Телефонные номера</SubTitle>
        <Flex>
          <TableWrapper>
            <tbody>
              <tr>
                <td>Own(Main)</td>
                <td>
                  {
                    data?.userPhones?.filter(
                      (phone: any) => phone?.type === MainPhone
                    )[0]?.phone_number
                  }
                </td>
              </tr>
              <tr>
                <td>Own(Extra)</td>
                <td>
                  {
                    data?.userPhones?.filter(
                      (phone: any) => phone?.type === !MainPhone
                    )[0]?.phone_number
                  }
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </Flex>
        <SubTitle>IELTS</SubTitle>
        <Flex>
          <TableWrapper>
            <tbody>
              <tr>
                <td>Score</td>
                <td>{data?.staff?.ielts_score}</td>
              </tr>
            </tbody>
          </TableWrapper>
        </Flex>
        <SubTitle>Образование</SubTitle>
        <Flex>
          <TableWrapper>
            <tbody>
              <tr>
                <td>Степень</td>
                <td>
                  {!!data?.userEducations?.length &&
                    initialData?.educationPlaceList?.filter(
                      (d: any) => d.value === data?.userEducations[0]?.degree
                    )[0]?.label}
                </td>
              </tr>
              <tr>
                <td>Имя</td>
                <td>
                  {!!data?.userEducations?.length &&
                    data?.userEducations[0]?.name}
                </td>
              </tr>
              <tr>
                <td>Специальность</td>
                <td>
                  {!!data?.userEducations?.length &&
                    data?.userEducations[0]?.speciality}
                </td>
              </tr>
              <tr>
                <td>Дата поступления</td>
                <td>
                  {!!data?.userEducations?.length &&
                    data?.userEducations[0]?.enter_date}
                </td>
              </tr>
              <tr>
                <td>Дата окончания</td>
                <td>
                  {!!data?.userEducations?.length &&
                    data?.userEducations[0]?.graduate_date}
                </td>
              </tr>
            </tbody>
          </TableWrapper>
        </Flex>
        <SubTitle>Сведения о близких родственниках</SubTitle>
        <Flex>
          <TableWrapper>
            <tbody>
              {data?.userFamilies?.map((person: any, index: number) => {
                return (
                  <>
                    <tr>
                      <td>Степень родства</td>
                      <td>
                        {
                          initialData?.familyMemberList?.filter(
                            (d: any) => "" + d.value === "" + person?.degree
                          )[0]?.label
                        }
                      </td>
                    </tr>
                    <tr>
                      <td>Полное имя</td>
                      <td>{person?.fio}</td>
                    </tr>
                    <tr>
                      <td>Место работы</td>
                      <td>{person?.work_place}</td>
                    </tr>
                    <tr>
                      <td>Должность</td>
                      <td>{person?.position}</td>
                    </tr>
                    <tr>
                      <td>Телефон номер</td>
                      <td>{person?.phone_number}</td>
                    </tr>
                    {index !== data?.userFamilies?.length - 1 && (
                      <tr>
                        <td>--------- --------- ---------</td>
                        <td>--------- --------- ---------</td>
                      </tr>
                    )}
                  </>
                );
              })}
            </tbody>
          </TableWrapper>
        </Flex>
      </ModalContent>
    </AntdModal>
  );
};
export default GenerateDetailsModal;
