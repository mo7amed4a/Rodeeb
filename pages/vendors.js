import React from "react";
// import Contact from "../../src/components/Home/Contact";
import server from "@/src/api/server";
// import About from "@/src/components/Home/About";
// import Clients from "@/src/components/Home/Clients";
// import { Col } from "react-bootstrap";
import Image from "next/image";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "@/styles/vendors-page.module.scss";
import arrow from "@/src/assets/svgs/arrow-down.svg";
import itemImage from "@/src/assets/images/item.png";

import locationIcon from "@/src/assets/svgs/location.svg";
import shopIcon from "@/src/assets/svgs/shop.svg";
import starIcon from "@/src/assets/svgs/star.svg";
import phoneIcon from "@/src/assets/svgs/phone.svg";

import BreadCrumb from "@/src/components/Shared/Breadcrumbs";
import { getReducedOptions, handleImage } from "@/src/helpers";
import Video from "@/src/components/Home/Video";
import Link from "next/link";
import Vendors from "@/src/components/Home/Vendors";
import staticData from "@/src/content/staticData";
import { useState } from "react";
import { Grid, Navigation, Pagination } from "swiper";
import { SwiperSlide, Swiper } from "swiper/react";
import "swiper/css/pagination";
import "swiper/css/grid";

const projectsPage = staticData?.pages?.find((e) => e?.slug == "projects");

export default function VendorsPage({ vendorsDate }) {
  const { locale, formatMessage } = useIntl();
  const dir = locale == "ar" ? "rtl" : "ltr";

  const [areasFilter, setAreasFilter] = useState("");
  const [citiesFilter, setCitiesFilter] = useState("");
  const [shopsFilter, setShopsFilter] = useState("");

  let items = vendorsDate?.sections ||
    projectsPage?.sections || [1, 2, 3, 4, 5, 6, 7, 8];
  items = [
    ...items,
    // ...items, ...items, ...items, ...items, ...items
  ];

  // const filteredItems =
  //   areasFilter || citiesFilter || shopsFilter
  //     ? items?.filter(
  //         (e) =>
  //           (e?.area?.en || e?.area) == areasFilter ||
  //           (e?.city?.en || e?.city) == citiesFilter ||
  //           (e?.name?.en || e?.name) == shopsFilter
  //       )
  //     : items;

  const filteredItems =
    areasFilter || citiesFilter || shopsFilter
      ? items?.filter((e) =>
          areasFilter
            ? (e?.area?.en || e?.area) == areasFilter
            : citiesFilter
            ? (e?.city?.en || e?.city) == citiesFilter
            : shopsFilter
            ? (e?.name?.en || e?.name) == shopsFilter
            : true
        )
      : items;

  const renderItems = filteredItems?.map((member, k) => (
    <SwiperSlide key={k}>
      <Image
        src={handleImage(member?.image) || itemImage?.src}
        width="210"
        height="212"
        alt=""
      />
      <div className="details">
        <div>
          <Image width="210"
            height="212" {...locationIcon} alt="" />
          <p
            title={`${member?.area?.[locale] || ""} / ${
              member?.city?.[locale] || ""
            }`}
          >
            {member?.area?.[locale] || ""} / {member?.city?.[locale] || ""}
          </p>
        </div>
        <div>
          <Image width="210"
            height="212" {...shopIcon} alt="" />
          <p title={member?.name?.[locale]}>{member?.name?.[locale] || ""}</p>
          <div className="rate">
            {`${member?.rate || 3}/5`}
            <Image width="210"
            height="212" {...starIcon} alt="" />
          </div>
        </div>
        <div>
          <Image width="210"
            height="212" {...phoneIcon} alt="" />
          <Link href={`tel:${member?.phone}`}>
            <p className="phone">{member?.phone || ""}</p>
          </Link>
        </div>
      </div>
    </SwiperSlide>
  ));

  const areas = getReducedOptions(items, "area");
  const cities = getReducedOptions(items, "city");
  const shops = getReducedOptions(items, "name");

  const renderAreasOptions = areas?.map((area, index) => (
    <option value={area?.en || area} key={index}>
      {area?.[locale] || area}
    </option>
  ));
  const renderCitiesOptions = cities?.map((area, index) => (
    <option value={area?.en || area} key={index}>
      {area?.[locale] || area}
    </option>
  ));
  const renderShopsOptions = shops?.map((area, index) => (
    <option value={area?.en || area} key={index}>
      {area?.[locale] || area}
    </option>
  ));

  return (
    <>
      <div className={styles.vendors}>
        <BreadCrumb
          breads={
            <>
              <span>
                <FormattedMessage id="home" />
              </span>
              <span>/</span>
              <span>
                <FormattedMessage id="vendors" />
              </span>
            </>
          }
          // description={aboutData?.description}
        />
        <Vendors data={vendorsDate} page={true} />

        <div className="shops">
          <div className="container">
            <div className="filters">
              <div>
                <FormattedMessage id="area" />
                <select
                  onClick={({ target: { value } }) => {
                    setAreasFilter(value);
                  }}
                >
                  <option value="">{formatMessage({ id: "all" })}</option>
                  {renderAreasOptions}
                </select>
              </div>
              <div>
                <FormattedMessage id="city" />
                <select
                  onClick={({ target: { value } }) => {
                    setCitiesFilter(value);
                  }}
                >
                  <option value="">{formatMessage({ id: "all" })}</option>
                  {renderCitiesOptions}
                </select>
              </div>
              <div>
                <FormattedMessage id="shop" />
                <select
                  onClick={({ target: { value } }) => {
                    setShopsFilter(value);
                  }}
                >
                  <option value="">{formatMessage({ id: "all" })}</option>
                  {renderShopsOptions}
                </select>
              </div>
            </div>
            <Swiper
              dir={dir}
              slidesPerView="auto"
              className="shops-items"
              loop={false}
              navigation={{
                nextEl: ".swiper_button_next",
                prevEl: ".swiper_button_prev",
              }}
              modules={[Navigation, Pagination, Grid]}
              pagination={{
                // dynamicBullets: true,
                el: `.${styles.vendors} .pagination`,
              }}
              {...{
                grid: { rows: 6, fill: "row" },
                spaceBetween: 30,
                breakpoints: {
                  // when window width is >= 1990px
                  1990: {
                    slidesPerView: 5,
                    spaceBetween: 30,
                  },

                  // when window width is >= 992px
                  1222: {
                    slidesPerView: 4,
                    spaceBetween: 30,
                    grid: { rows: 3 },
                    pagination: { dynamicBullets: true },
                  },
                  768: {
                    slidesPerView: 3,
                  },
                  // when window width is >= 576px
                  576: {
                    slidesPerView: 2,
                  },
                  426: {
                    slidesPerView: 1.5,
                    spaceBetween: 20,
                  },
                  1: {
                    slidesPerView: 1,
                    spaceBetween: 0,
                    grid: { rows: 1 },
                  },
                },
              }}
            >
              {renderItems}
            </Swiper>
            <div
              className={`custom-pagination ${
                filteredItems?.length < 20 ? "d-none" : ""
              }`}
            >
              <div className={`swiper_button_next gradient-btn`}>
                <Image width="210"
            height="212" {...arrow} alt="" />
              </div>
              <div className="pagination"></div>
              <div className={`swiper_button_prev gradient-btn `}>
                <Image width="210"
            height="212" {...arrow} alt="" />
              </div>
            </div>
            {/* <div className="shops-items">{renderItems}</div> */}
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const vendorsResponse = await server.get("/pages/vendors");

  return {
    props: {
      vendorsDate: vendorsResponse?.data?.data?.page || {},
    },
  };
}
