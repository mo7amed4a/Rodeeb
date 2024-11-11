import { FormattedMessage, useIntl } from "react-intl";
import styles from "./footer.module.scss";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/future/image";
import logo from "@/src/assets/svgs/logo-light.svg";

import mailIcon from "@/src/assets/svgs/mail.svg";
import phoneIcon from "@/src/assets/svgs/phone.svg";

import nour from "@/src/assets/images/nour-seen.png";
import { useRouter } from "next/router";
import { handleImage } from "@/src/helpers";

export default function Footer({ data, initData }) {
  const { locale, asPath } = useRouter();
  const dir = locale == "ar" ? "rtl" : "ltr";

  const renderNavLinks = [
    { id: "home", url: "/" },
    "aboutUs",
    "products",
    "vendors",
    "contactUs",
  ].map((link, index) => (
    <Link href={link?.url || `/${link}`} passHref={true} key={index}>
      <a className={asPath == (link?.url || `/${link}`) ? "active" : ""}>
        <li>
          <FormattedMessage id={link?.id || link} />
        </li>
      </a>
    </Link>
  ));
  const renderSocial = initData?.socials?.map((social, k) => (
    <Link href={social?.link} key={k}>
      <a target={"_blank"}>
        <Image src={handleImage(social?.image)} width={17} height={17} alt="" />
      </a>
    </Link>
  ));
  return (
    <div className={styles.footer}>
      <div className="container">
        <div className="wrapper">
          <div className="info">
            {/* <Image src={logo?.src} width="100" height="100" alt="" /> */}
            <span className="badge">
              <FormattedMessage id="aboutUs" />
            </span>
            <div>
              <div className="tag-text">
                {initData?.siteInfo?.appDesc?.[locale] || (
                  <FormattedMessage id="eat" />
                )}
              </div>
              {/* <div className="section-tag"> </div> */}
            </div>
          </div>

          <div className="nav-links">
            <span className="badge">
              <FormattedMessage id="importantLinks" />
            </span>
            <div>{renderNavLinks}</div>
          </div>
          <div className="contacts">
            <span className="badge">
              <FormattedMessage id="contactUs" />
            </span>
            <Link href={`mailto:${initData?.siteInfo?.email || ""}`}>
              <a className="btn mail">
                <Image {...mailIcon} alt="" />
                <FormattedMessage id="to-help" />
              </a>
            </Link>
            <Link href={`tel:${initData?.siteInfo?.phone || ""}`}>
              <a className="btn">
                <Image {...phoneIcon} alt="" />
                <Link href={`tel:${initData?.siteInfo?.phone}`}>
                  <p className="phone">{initData?.siteInfo?.phone || ""}</p>
                </Link>
                {/* <FormattedMessage id="phone" /> */}
              </a>
            </Link>
          </div>
        </div>
      </div>
      <div className="bottom">
        <div className="container">
          <div>
            <FormattedMessage id="rightsReserved" />
          </div>
          <div className="socials">{renderSocial}</div>
          <div className="developed-by">
            <FormattedMessage id="developedBy" />
            <a href="http://nsn.sa/" target="_blank" rel="noreferrer">
              <Image src={nour?.src} width="70" height="54" alt="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
