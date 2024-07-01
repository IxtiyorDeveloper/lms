import React from "react";
import { Card, SwiperWrapper, Wrapper } from "./style";
import { PlusSvg, EditSvg } from "components";
import { bgColors } from "styles/theme";
import { Image, Spin, Tooltip } from "antd";
import AntdBadge from "components/common/antdBadge";
import { toggleModal } from "store";
import { useDispatch } from "react-redux";
import { useStockCategories } from "hooks";
import { useRouter } from "next/router";
import { StockProductType } from "constants/stock";
import { IUIStore } from "store/slices/modals/type";
import Arrival from "./components/actions/arrival";
import Departure from "./components/actions/departure";
import Transfer from "./components/actions/transfer";
import Change from "./components/actions/change";
import { showTopStatus } from "./components/showTopStatus";

const Categories = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { data, isLoading } = useStockCategories({
    query_params: {
      ...router.query,
      location_id:
        router.query?.location_id != "0"
          ? router.query?.location_id
          : undefined,
      expand:
        "imageUrl,image,order,products.count,products.buttonActions,products.units,status,products.properties.options,products.locations,products.isStationary,products.amount_status,buttonActions",
    },
  });
  const openCategoryModal = (type = "create", data = {}) => {
    dispatch(
      toggleModal({
        key: "stockCategory",
        data: {
          data: {
            type,
            data,
          },
          open: true,
        },
      }),
    );
  };

  const openActions = (key: keyof IUIStore, data: any) => {
    dispatch(
      toggleModal({
        key,
        data: {
          data,
          open: true,
        },
      }),
    );
  };

  const openProductModal = (data: any) => {
    dispatch(
      toggleModal({
        key: "stockProduct",
        data: {
          data: data,
          open: true,
        },
      }),
    );
  };
  return (
    <Spin spinning={isLoading}>
      <Wrapper>
        {(data || []).map((e) => {
          return (
            <div className="item">
              <div className="category">
                <div>
                  <Image
                    src={e.imageUrl || "/no-image.png"}
                    height={24}
                    width={24}
                  />
                </div>
                <div className="title">
                  {e.name} ({e.products?.length || 0})
                </div>
                {e?.buttonActions?.canUpdate && (
                  <div
                    className="circle"
                    onClick={() => openCategoryModal("update", e)}
                  >
                    <EditSvg width={16} height={16} />
                  </div>
                )}
                {e?.buttonActions?.canCreateProduct && (
                  <div
                    className="circle"
                    onClick={() => openProductModal({ category: e })}
                  >
                    <PlusSvg color={bgColors.royal} width={16} height={16} />
                  </div>
                )}
              </div>
              <div className="swiper-container">
                <SwiperWrapper
                  navigation={{
                    prevEl: ".swiper-button-prev",
                    nextEl: ".swiper-button-next",
                  }}
                  spaceBetween={20}
                  slidesPerView="auto"
                  mousewheel={{ forceToAxis: true }}
                >
                  {(e.products || []).length > 0 ? (
                    e.products.map((product) => {
                      return (
                        <Card
                          isPc={true}
                          onClick={() => router.push(`/stock/${product.id}`)}
                          className={`amount_status_${product?.amount_status}`}
                        >
                          <div
                            className="img"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Image
                              height={90}
                              width="100%"
                              src={product.cover_photo || "/noimage.png"}
                              onClick={(e) => e.stopPropagation()}
                              style={{ objectFit: "cover" }}
                            />
                            <div className="ant-badge-container">
                              {showTopStatus({
                                amount_status: product.amount_status,
                              })}
                              <AntdBadge
                                content={
                                  <div className="red-alert">
                                    {product.count}
                                  </div>
                                }
                                style={{ borderColor: "transparent" }}
                                showZero
                              />
                            </div>
                            <div
                              className={`type ${
                                product?.type?.toString() !==
                                StockProductType.Company
                                  ? "student"
                                  : ""
                              }`}
                            >
                              {product?.type?.toString() ==
                              StockProductType.Company
                                ? "Company"
                                : "Student"}
                            </div>
                          </div>
                          <div className="hidden">
                            <div className="name">
                              <Tooltip title={product.name}>
                                {product.name}
                              </Tooltip>
                            </div>
                          </div>
                          <div className="counts">
                            <div className="item">
                              <div className="title">
                                <div className="circle" />
                                <div>Active</div>
                              </div>
                              <div className="amount">
                                {product.units?.["100"]}
                              </div>
                            </div>
                            {+StockProductType.Student == product.type &&
                              !product.isStationary && (
                                <div className="item">
                                  <div className="title">
                                    <div className="circle primary" />
                                    <div>Ordered</div>
                                  </div>
                                  <div className="amount">
                                    {product.units?.["400"]}
                                  </div>
                                </div>
                              )}
                            <div className="item">
                              <div className="title">
                                <div className="circle second-circle" />
                                <div>Recovery</div>
                              </div>
                              <div className="amount">
                                {product.units?.["200"]}
                              </div>
                            </div>
                            <div className="item">
                              <div className="title">
                                <div className="circle third-circle" />
                                <div>Broken</div>
                              </div>
                              <div className="amount">
                                {product.units?.["300"]}
                              </div>
                            </div>
                          </div>
                          <div className="actions">
                            {product?.buttonActions?.canArrival && (
                              <Arrival
                                product={product}
                                openActions={openActions}
                                e={e}
                              />
                            )}
                            {product?.buttonActions?.canDeparture && (
                              <Departure
                                product={product}
                                openActions={openActions}
                                e={e}
                              />
                            )}
                            {product?.buttonActions?.canTransfer && (
                              <Transfer
                                product={product}
                                openActions={openActions}
                                e={e}
                              />
                            )}
                            {product?.buttonActions?.canChange && (
                              <Change
                                product={product}
                                openActions={openActions}
                                e={e}
                              />
                            )}
                          </div>
                        </Card>
                      );
                    })
                  ) : (
                    <Card
                      isPc={true}
                      isEmpty
                      onClick={() => openProductModal({ category: e })}
                    >
                      <div>
                        <div>
                          <PlusSvg
                            width={24}
                            height={24}
                            color={bgColors.palomino}
                          />
                        </div>
                        Create product
                      </div>
                    </Card>
                  )}
                  <div className="swiper-button-prev"></div>
                  <div className="swiper-button-next"></div>
                </SwiperWrapper>
              </div>
            </div>
          );
        })}
      </Wrapper>
    </Spin>
  );
};

export default Categories;
