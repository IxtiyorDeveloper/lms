import React, {FC, useMemo} from "react";
import {ESABType, TDescriptionBox} from "./type";
import {
    Box,
    ImageWrapper,
    Text,
    Wrapper,
    BoxWrapper,
    Tick,
    Chevron,
    PhoneContainer,
    TickPopover,
} from "./style";
import {
    CakeSvg,
    ChevronDownSvg,
    CirclePhoneSvg,
    CourseTypeSvg,
    GroupSvg,
    LittlePhoneSvg,
    LocationSvg,
    MoneySvg,
    NextLink,
    TickSvg,
} from "components";
import {Popover} from "antd";
import {PhoneWrapper} from "app/groups/[groupId]/components/administrativeTab/style";
import formatPhoneNumber, {formatIpPhone} from "utils/phoneNumberFormatter";
import {toCurrencyFormat} from "utils/toCurrencyFormat";
import {bgColors} from "styles/theme";
import {usePageDataMemo} from "hooks";
import Router from "next/router";
import {toast} from "react-toastify";
import {funcCheckPermission} from "utils/guard";
import {COMPONENTS_VIEWS} from "constants/permissions";
import moment from "moment";
import {DATE_FORMAT_DD_MM_YYYY} from "constants/dates";
import lodash from "lodash";
import BranchBox from "./components/branch";


const DescriptionBox: FC<TDescriptionBox> = ({data}) => {
    const copyToClipboard = (phone: string | 0) => {
        if (!!phone)
            navigator.clipboard
                .writeText(phone)
                .then(() => {
                    toast.info("Copied to clipboard");
                })
                .catch((err) => {
                    toast.error(err.message);
                });
    };


    const boxes = useMemo(() => {


        const bool = funcCheckPermission([COMPONENTS_VIEWS.can_use_red_balance]);

        return [
            {
                id: 1,
                img: <LocationSvg/>,
                text: <BranchBox data={data}/>,
                type: ESABType.full
            },
            {
                id: 2,
                img: <CourseTypeSvg/>,
                text: data?.course?.name,
            },
            {
                id: 3,
                img: <GroupSvg/>,
                text: data?.currentGroupContact?.group?.name || "-",
                secondary: data?.currentGroupContact?.group?.level?.parent?.name
                    ? `${data?.currentGroupContact?.group?.level?.parent?.name} / ${data?.currentGroupContact?.group?.level?.name}`
                    : "-",
                onClick: () => {
                    Router.push(`/groups/${data?.currentGroupContact?.group?.id}`);
                },
                link: `/groups/${data?.currentGroupContact?.group?.id}`,
                disabled: !data?.currentGroupContact?.group?.id,
            },
            // @ts-ignore
            funcCheckPermission([COMPONENTS_VIEWS.can_see_student_payment]) && {
                id: 4,
                img: <MoneySvg/>,
                text: toCurrencyFormat(
                    bool
                        ? data?.user?.balance ?? 0
                        : lodash.sumBy(data?.dividedBalance?.green, "actual_balance") +
                        lodash.sumBy(data?.dividedBalance?.yellow, "actual_balance")
                ),
            },
            {
                id: 5,
                img: <CirclePhoneSvg/>,
                text: formatPhoneNumber(
                    data?.user?.userPhones?.find((i) => !!i.is_confirmed)?.phone_number ??
                    ""
                ),
                onClick: () => {
                    copyToClipboard(
                        formatIpPhone(
                            (data?.user?.userPhones || [])?.find((e, index) => index === 0)!
                                ?.phone_number
                        )
                    );
                },
            },
            {
                id: 6,
                img: <CakeSvg/>,
                text: moment(data?.user?.userProfile?.dob, "YYYY-MM-DD").format(
                    DATE_FORMAT_DD_MM_YYYY
                ),
            },
        ].filter((e) => !!e);
    }, [data]);

    const selects = usePageDataMemo();

    const content = () => {
        return (
            <PhoneContainer>
                {data?.user?.userPhones?.map((item, index) => {
                    return (
                        <PhoneWrapper
                            key={index}
                            onClick={() => copyToClipboard(formatIpPhone(item.phone_number))}
                        >
                            <p className="text">
                                {selects.phone
                                    ? // @ts-ignore
                                    selects?.phone?.find((type) => type.value == item?.type)
                                        ?.label
                                    : ""}
                            </p>
                            <div className="phone">
                                {!!item.is_confirmed ? (
                                    <TickPopover>
                                        <TickSvg color={bgColors.white}/>
                                    </TickPopover>
                                ) : (
                                    <LittlePhoneSvg/>
                                )}
                                {formatPhoneNumber(item.phone_number)}
                            </div>
                        </PhoneWrapper>
                    );
                })}
            </PhoneContainer>
        );
    };
    return (
        <Wrapper>
            <BoxWrapper>
                {boxes?.slice(0, 3)?.map((item, k) => {
                    if (item) {
                        if (item?.type == ESABType.full) {
                            return item.text
                        } else {
                            if (item.id === 3) {
                                return (
                                    <NextLink key={k} href={item.link!} disabled={!!item?.disabled}>
                                        <Box>
                                            <ImageWrapper>{item?.img}</ImageWrapper>
                                            <Text>{item?.text}</Text>
                                            <Text secondary>{item?.secondary}</Text>
                                        </Box>
                                    </NextLink>
                                );
                            } else {
                                return (
                                    <Box key={k} onClick={() => item.onClick && item.onClick()}>
                                        <ImageWrapper>{item?.img}</ImageWrapper>
                                        <Text>{item?.text}</Text>
                                        <Text secondary>{item?.secondary}</Text>
                                    </Box>
                                );
                            }
                        }
                    }
                })}
            </BoxWrapper>
            <BoxWrapper>
                {boxes?.slice(3)?.map((item, k) => {
                    return (
                        item &&
                        (item?.id === 5 ? (
                            <Popover destroyTooltipOnHide key={k} content={content}>
                                <Box key={k} onClick={() => item.onClick && item.onClick()}>
                                    <ImageWrapper>{item?.img}</ImageWrapper>
                                    <Text>{item?.text}</Text>
                                    {item?.id === 5 && (
                                        <Tick>
                                            <TickSvg/>
                                        </Tick>
                                    )}
                                    {item?.id === 5 && (
                                        <Chevron>
                                            <ChevronDownSvg/>
                                        </Chevron>
                                    )}
                                </Box>
                            </Popover>
                        ) : (
                            <Box key={k} onClick={() => item.onClick && item.onClick()}>
                                <ImageWrapper>{item?.img}</ImageWrapper>
                                <Text>{item?.text}</Text>
                                {item?.id === 5 && (
                                    <Tick>
                                        <TickSvg/>
                                    </Tick>
                                )}
                                {item?.id === 5 && (
                                    <Chevron key={k}>
                                        <ChevronDownSvg/>
                                    </Chevron>
                                )}
                            </Box>
                        ))
                    );
                })}
            </BoxWrapper>
        </Wrapper>
    );
};

export default DescriptionBox;
