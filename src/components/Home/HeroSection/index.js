import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Image from "next/future/image";
import Link from "next/link";
import { FormattedMessage } from "react-intl";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation, Thumbs, Autoplay } from "swiper";
import { Col, Row } from "react-bootstrap";
import arrowIcon from "@/src/assets/svgs/chevron.svg";
import sliderBorder from "@/src/assets/images/slider-border.png";
import logo from "@/src/assets/images/logo.png";
// import "swiper/css/pagination";
import { handleImage } from "@/src/helpers";
import Header, { renderNavLinks, renderSocial } from "../../Layout/Header";

const Hero = ({ heroData, initData }) => {
  const { locale, asPath, pathname } = useRouter();

  const [swiper, setSwiper] = useState(0);
  const [thumbsSwiper, setThumbsSwiper] = useState(0);

  const renderHeroItems = heroData?.sliders?.map((item, index) => (
    <SwiperSlide key={index}>
      <Image
        src={handleImage(item?.image || item)}
        width={1920}
        height={829}
        alt=""
      />
    </SwiperSlide>
  ));
  // useEffect(() => {
  //   if (
  //     swiper
  //   ) {
  //     swiper.rtl = locale == "ar";
  //     swiper.rtlTranslate = locale == "ar";
  //   }
  //   console.log("swiper", swiper);
  // }, [locale, swiper]);

  const renderMiniImages = heroData?.sliders?.map((item, index) => (
    <SwiperSlide key={index}>
      <Image
        src={handleImage(item?.image || item)}
        fill="true"
        alt="miniProductImage"
      />
    </SwiperSlide>
  ));

  return (
    <div className="hero">
      <div className="slider container">
        <div className="hero-slider">
          <div className="hero-wrapper">
            <Header initData={initData} />
            <div className="info">
              <div className="header-links">
                <Image src={logo?.src} width="100" height="100" alt="" />
                {renderNavLinks(pathname)}
              </div>

              <div className="details">
                <h1>{heroData?.heading?.[locale] || "تسوق افضل ما لدينا"}</h1>
                <p>
                  {heroData?.description?.[locale] || "روديب موقع الكتروني"}
                </p>
                <div>
                  <Link href={heroData?.url || "/vendors"}>
                    <a className="btn">
                      <FormattedMessage id="shopNow" />
                    </a>
                  </Link>
                </div>
              </div>

              <Swiper
                // dir={locale == "ar" ? "rtl" : "ltr"}
                loop={false}
                onSwiper={setThumbsSwiper}
                slidesPerView={"auto"}
                navigation={false}
                watchSlidesProgress={true}
                spaceBetween={10}
                centeredSlides={false}
                className="mini-swiper"
                breakpoints={{
                  991: {
                    centeredSlides: false,
                  },
                }}
              >
                {renderMiniImages}
              </Swiper>
            </div>
            {/* ========================================================================= */}
            {/* ========================================================================= */}
            {/* ========================================================================= */}
            <div className="main-swiper-wrapper">
              <div className="header-socials">
                <Link
                  href={asPath}
                  locale={locale == "ar" ? "en" : "ar"}
                  passHref
                >
                  <a>{locale == "ar" ? "EN" : "ع"}</a>
                </Link>
                {renderSocial(initData)}
              </div>
              <Swiper
                key={locale != "ar"}
                dir={locale == "ar" ? "rtl" : "ltr"}
                onSwiper={setSwiper}
                thumbs={{ swiper: thumbsSwiper }}
                // centeredSlides={true}
                slidesPerView={1}
                spaceBetween={40}
                className="main-swiper"
                loop={false}
                autoplay={{
                  delay: 2500,
                  disableOnInteraction: false,
                }}
                navigation={{
                  nextEl: ".swiper_button_next",
                  prevEl: ".swiper_button_prev",
                }}
                modules={[Thumbs, Autoplay, Navigation, Pagination]}
                pagination={{
                  el: ".pagination",
                }}
              >
                {renderHeroItems}
              </Swiper>

              <div className={`custom-pagination `}>
                <div className={`swiper_button_next gradient-btn`}>
                  <Image {...arrowIcon} alt="" />
                </div>
                <div className="pagination"></div>
                <div className={`swiper_button_prev gradient-btn `}>
                  <Image {...arrowIcon} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
