import React from "react";
// import Contact from "../../src/components/Home/Contact";
import server from "@/src/api/server";
// import About from "@/src/components/Home/About";
// import Clients from "@/src/components/Home/Clients";
// import { Col } from "react-bootstrap";
import Image from "next/future/image";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "@/styles/products-page.module.scss";

import itemImage from "@/src/assets/images/item.png";
import instaIcon from "@/src/assets/svgs/insta.svg";

import BreadCrumb from "@/src/components/Shared/Breadcrumbs";
import { handleImage } from "@/src/helpers";
import Video from "@/src/components/Home/Video";
import Link from "next/link";
import CategoriesProjects from "@/src/components/Home/CategoriesProducts";
import "swiper/css/grid";


export default function AboutUs({ productsData, initData }) {
  const { locale, formatMessage } = useIntl();

  return (
    <>
      <div className={styles.products}>
        <BreadCrumb
          breads={
            <>
              <span>
                <FormattedMessage id="home" />
              </span>
              <span>/</span>
              <span>
                <FormattedMessage id="products" />
              </span>
            </>
          }
          // description={aboutData?.description}
        />
        <CategoriesProjects
          data={productsData}
          // initData={initData}
          swiperProps={{
            grid: { rows: 8, fill: "row" },
            spaceBetween: 30,
            // slidesPerGroup: 20,
            // centeredSlides: false,
            initialSlide: 0,
            breakpoints: {
              // when window width is >= 1990px
              1990: {
                slidesPerView: 4,
                spaceBetween: 30,
              },
              1190: {
                slidesPerView: 4,
                spaceBetween: 30,
              },

              // when window width is >= 992px
              992: {
                slidesPerView: 3,
                spaceBetween: 30,
                grid: { rows: 4 },
              },
              // when window width is >= 576px
              425: {
                slidesPerView: 2,
                spaceBetween: 20,
                grid: { rows: 1 },
              },

              1: {
                slidesPerView: 1,
                spaceBetween: 10,
                grid: { rows: 1 },
              },
            },
          }}
        />
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const productsResponse = await server.get("/pages/products");
  let items = productsResponse?.data?.data?.page?.sections || [];
  return {
    props: {
      productsData: {
        items,
      },
    },
  };
}
