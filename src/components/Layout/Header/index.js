import { FormattedMessage, useIntl } from "react-intl";
import styles from "./header.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import logo from "@/src/assets/images/logo.png";

import burgerIcon from "@/src/assets/svgs/burger.svg";
import closeIcon from "@/src/assets/svgs/close.svg";

import nour from "@/src/assets/images/nour-seen.png";
import { useRouter } from "next/router";
import { handleImage } from "@/src/helpers";

export default function Header({ initData }) {
  const { locale, asPath, pathname } = useRouter();
  const dir = locale == "ar" ? "rtl" : "ltr";
  return (
    <header className={styles.header}>
      <div className="container">
        <div className="mobile-header">
          <Link href="/">
            <a>
              <Image
                src={logo?.src}
                width="100"
                height="100"
                alt=""
                className="logo"
              />
            </a>
          </Link>
          <label htmlFor="nav-toggle" className="toggle-handle">
            <Image width="210"
            height="212" {...burgerIcon} alt="" />
          </label>
        </div>
        {/* ------------------------------------------ */}
        <input type="checkbox" className="checkbox-hide-div" id="nav-toggle" />
        {/* ------------------------------------------ */}
        <label htmlFor="nav-toggle" className="wrapper-backdrop">
          <label htmlFor="">
            <div className="wrapper">
              <Link href="/">
                <a
                  onClick={() => document.getElementById("nav-toggle")?.click()}
                >
                  <Image
                    src={logo?.src}
                    width="100"
                    height="100"
                    alt=""
                    className="logo"
                  />
                </a>
              </Link>

              <div className="header-links">{renderNavLinks(pathname)}</div>

              <div className="header-socials">
                <Link
                  href={asPath}
                  locale={locale == "ar" ? "en" : "ar"}
                  passHref
                >
                  <a
                    onClick={() =>
                      document.getElementById("nav-toggle")?.click()
                    }
                  >
                    {locale == "ar" ? "EN" : "ع"}
                  </a>
                </Link>
                {renderSocial(initData)}
              </div>
              <label htmlFor="nav-toggle" className="toggle-handle">
                <Image width="210"
            height="212" {...closeIcon} alt="" />
              </label>
            </div>
          </label>
        </label>
      </div>
    </header>
  );
}

export const renderSocial = (initData) =>
  initData?.socials?.map((social, k) => (
    <Link href={social?.link} key={k}>
      <a
        target={"_blank"}
        title={
          typeof document != "undefined" && document?.dir == "lrt"
            ? social?.name?.ar
            : social?.name?.en
        }
      >
        <Image src={handleImage(social?.image)} width={17} height={17} alt="" />
      </a>
    </Link>
  ));

export const renderNavLinks = (pathname) =>
  [{ id: "home", url: "/" }, "aboutUs", "products", "vendors", "contactUs"].map(
    (link, index) => (
      <Link href={link?.url || `/${link}`} passHref={true} key={index}>
        <a
          className={pathname == (link?.url || `/${link}`) ? "active" : ""}
          onClick={() => document.getElementById("nav-toggle")?.click()}
        >
          <li>
            <FormattedMessage id={link?.id || link} />
          </li>
        </a>
      </Link>
    )
  );
