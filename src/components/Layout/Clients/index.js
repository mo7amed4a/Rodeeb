import { FormattedMessage, useIntl } from "react-intl";
import styles from "./clients.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";

export default function Clients({ data }) {
  const { locale } = useIntl();
  const dir = locale == "ar" ? "rtl" : "ltr";
  const [swiper, setSwiper] = useState();
  const renderClientsItems = (data?.sections || ["asdasd", "asdsdwqe23"])?.map(
    (item, k) => (
      <SwiperSlide key={k}>
        <p className="price">{item?.opinion?.[locale] || ""}</p>
        <fieldset>
          <legend>{item?.name?.[locale] || "اسم العميل"}</legend>
        </fieldset>
      </SwiperSlide>
    )
  );
  useEffect(() => {
    if (swiper) {
      swiper.rtlTranslate = dir == "rtl";
    }
  }, [dir]);
  return (
    <div className={styles.clients}>
      <div className="container">
        <div className="wrapper">
          <div className="section-tag">
            {data?.heading?.[locale] || <FormattedMessage id="clients" />}
          </div>
          <Swiper
            onSwiper={setSwiper}
            dir={dir}
            // centeredSlides={true}
            // initialSlide={filteredProducts?.length > 1 ? 1 : 0}
            slidesPerView="auto"
            className="main-swiper"
            loop={false}
            // navigation={{
            //   nextEl: ".swiper_button_next",
            //   prevEl: ".swiper_button_prev",
            // }}
            // modules={[Navigation, Pagination]}
            // pagination={{
            //   // dynamicBullets: true,
            //   el: `.${styles.projects} .pagination`,
            // }}
          >
            {renderClientsItems}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
