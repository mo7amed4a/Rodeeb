import React from "react";
// import Contact from "../../src/components/Home/Contact";
import server from "@/src/api/server";
// import About from "@/src/components/Home/About";
// import Clients from "@/src/components/Home/Clients";
// import { Col } from "react-bootstrap";
import Image from "next/future/image";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "@/styles/aboutUs-page.module.scss";

import itemImage from "@/src/assets/images/item.png";
import instaIcon from "@/src/assets/svgs/insta.svg";

import BreadCrumb from "@/src/components/Shared/Breadcrumbs";
import { handleImage } from "@/src/helpers";
import Video from "@/src/components/Home/Video";
import Link from "next/link";

export default function AboutUs({ aboutUsDate }) {
  const { locale, formatMessage } = useIntl();
  const ab = async () => {
    const aboutUsResponse = await server.get("/pages/about/sections/info");
  };
  // ab();
  const renderItems = (
    aboutUsDate?.instaImages || [1, 2, 3, 4, 5, 6, 7, 8]
  )?.map((member, k) => (
    <div className="item" key={k}>
      <Image
        src={handleImage(member?.image) || itemImage?.src}
        width="210"
        height="212"
        alt=""
      />
      <Link href={member?.url || "#"}>
        <a target="_blank">
          <Image {...instaIcon} alt="" />
        </a>
      </Link>
    </div>
  ));

  return (
    <>
      <div className={styles.aboutPage}>
        <BreadCrumb
          breads={
            <>
              <span>
                <FormattedMessage id="home" />
              </span>
              <span>/</span>
              <span>
                <FormattedMessage id="aboutUs" />
              </span>
            </>
          }
          // description={aboutData?.description}
        />
        <div className="container">
          <div className="info-wrapper">
            <div className="info">
              <div>
                <div className="section-tag">
                  {aboutUsDate?.firstHeading?.[locale]}
                </div>
              </div>
              <div
                className="details"
                dangerouslySetInnerHTML={{
                  __html: aboutUsDate?.firstDescription?.[locale],
                }}
              ></div>
            </div>
            <Image
              src={handleImage(aboutUsDate?.firstImage)}
              width="600"
              height="600"
              alt=""
            />
          </div>
        </div>
        <Video data={aboutUsDate} />
        <div className="story">
          <div className="container">
            <div className="info-wrapper">
              <Image
                src={handleImage(aboutUsDate?.secondImage)}
                width="600"
                height="600"
                alt=""
              />
              <div className="info">
                <div>
                  <div className="section-tag">
                    {aboutUsDate?.secondHeading?.[locale] || ""}
                  </div>
                </div>
                <div
                  dangerouslySetInnerHTML={{
                    __html: aboutUsDate?.secondDescription?.[locale],
                  }}
                ></div>
              </div>
            </div>
          </div>
        </div>
        <div className="insta">
          <div className="container">
            <div className="section-tag">
              <FormattedMessage id="insta" />
            </div>
            <div className="insta-items">{renderItems}</div>
          </div>
        </div>
      </div>
    </>
  );
}

export async function getServerSideProps() {
  const aboutUsResponse = await server.get("/pages/about/sections/info");
  return {
    props: {
      aboutUsDate: aboutUsResponse?.data?.data?.section || {},
    },
  };
}