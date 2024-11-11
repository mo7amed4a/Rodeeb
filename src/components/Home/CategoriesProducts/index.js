import { useEffect, useState } from "react";
import Image from "next/future/image";
import { Col } from "react-bootstrap";
import { Grid, Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import styles from "./styles/categoriesProducts.module.scss";
import proj1 from "./assets/images/proj-1.png";
import proj2 from "./assets/images/proj-2.png";
import arrow from "./assets/svg/arrow-down.svg";
import { useRouter } from "next/router";
import staticData from "@/src/content/staticData";
import { FormattedMessage } from "react-intl";
import Link from "next/link";
import { handleImage } from "@/src/helpers";
import { useMemo } from "react";

const projectsPage = staticData?.pages?.find((e) => e?.slug == "projects");

export default function CategoriesProjects({
  data,
  page = "",
  swiperProps = {},
}) {
  const [filter, setFilter] = useState("");
  const { locale } = useRouter();
  const [swiper, setSwiper] = useState(null);
  const dir = locale == "ar" ? "rtl" : "ltr";

  const items = data?.items || [];

  // const categories = [...new Set(items?.map((p) => p?.category?.en||p?.category))];

  const categories = useMemo(
    () =>
      [...new Set(items?.map((p) => p?.category?.en || p?.category))]
        ?.map(
          (e) =>
            items?.find((i) => (i?.category?.en || i?.category) == e)?.category
        )
        ?.sort((a, b) => a?.en?.localeCompare(b?.en)),
    items
  );

  const filteredProducts = items?.filter(
    (p) => (p?.category?.en || p?.category) == filter
  );

  const pageCheck = Object.keys(swiperProps)?.length > 0;

  useEffect(() => {
    if (swiper && !pageCheck) {
      swiper.slideTo(filteredProducts?.length > 1 ? 1 : 0);
    }
  }, [filter, filteredProducts]);
  useEffect(() => {
    if (swiper) {
      swiper.rtlTranslate = dir == "rtl";
    }
  }, [dir]);

  useEffect(() => {
    setFilter(categories?.[0]?.en || categories?.[0]);
  }, [categories]);
  const renderCategories = categories?.map((item, k) => (
    <div
      className={`project_item category ${
        filter == (item?.en || item) ? "active" : ""
      }`}
      onClick={() => setFilter(item?.en || item)}
      key={k}
    >
      {item?.[locale] || item}
    </div>
  ));
  console.log("filteredProducts", filteredProducts);
  const renderProjectItems = filteredProducts?.map((item, k) => (
    <SwiperSlide key={k}>
      <Link href={`/products/${item?.slug}`}>
        <a>
          <div>
            <Image
              // src={k % 2 ? proj1 : proj2}
              src={handleImage(item?.image)}
              key={"project" + k}
              // layout="fill"
              width={495}
              height={645}
              alt=""
            />
          </div>
          <h6>{item?.name?.[locale] || ""}</h6>
          <p className="product-desc">{item?.description?.[locale]}</p>
          <h6 className="price">
            {item?.price || 5} <FormattedMessage id="r.s" />
          </h6>
        </a>
      </Link>
    </SwiperSlide>
  ));

  return (
    <div className={styles.projects}>
      <div className="container">
        {(data?.heading || "products") && !pageCheck && (
          <div className="section-tag">
            {data?.heading?.[locale] || <FormattedMessage id="products" />}
          </div>
        )}
        <div className="categories-wrapper">{renderCategories}</div>

        <div className="products-wrapper">
          <Swiper
            onSwiper={setSwiper}
            dir={dir}
            centeredSlides={true}
            // initialSlide={filteredProducts?.length > 1 ? 1 : 1}
            slidesPerView="auto"
            spaceBetween={40}
            className="main-swiper"
            loop={false}
            navigation={{
              nextEl: ".swiper_button_next",
              prevEl: ".swiper_button_prev",
            }}
            modules={[Navigation, Pagination, Grid]}
            pagination={{
              dynamicBullets: true,
              el: `.${styles.projects} .custom-pagination .pagination`,
            }}
            {...swiperProps}
          >
            {renderProjectItems}
          </Swiper>

          <div
            className={`custom-pagination ${
              filteredProducts?.length < 4 ? "d-none" : ""
            }`}
          >
            <div className={`swiper_button_next gradient-btn`}>
              <Image {...arrow} alt="" />
            </div>
            {/* <div> */}
            <div className="pagination"></div>
            {/* </div> */}
            <div className={`swiper_button_prev gradient-btn `}>
              <Image {...arrow} alt="" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
