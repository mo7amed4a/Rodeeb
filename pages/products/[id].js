import React, { useEffect, useState } from "react";
import Image from "next/image";

import server from "@/src/api/server";
import {
  FormattedDate,
  FormattedMessage,
  useIntl,
} from "react-intl";
import styles from "@/styles/products-page.module.scss";

import BreadCrumb from "@/src/components/Shared/Breadcrumbs";

import twitterShareIcon from "@/src/assets/svgs/twitter.svg";
import instaShareIcon from "@/src/assets/svgs/instagram.svg";
import snapShareIcon from "@/src/assets/svgs/snapchat.svg";

import { useRouter } from "next/router";
import { handleImage } from "@/src/helpers";
import Link from "next/link";

const SingleProject = ({ projectData, projectsData }) => {
  const { locale, formatMessage } = useIntl();
  const router = useRouter();
  const { id } = router.query;

  const [href, setHref] = useState("");

  const items = projectData?.images;

  const renderImages = items?.map((item, index) => (
    <Image width="210"
            height="212"
      key={index}
      src={handleImage(item)}
      fill="true"
      alt=""
    />
  ));

  useEffect(() => {
    setHref(document.location.href);
  }, []);

  return (
    <>
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
            <span>/</span>
            <span>{projectData?.name?.[locale] || id}</span>
          </>
        }
      />
      <div className={styles.productPage}>
        <div className="container">
          <div className="project-imgs">{renderImages}</div>

          <div className="details">
            <div className="proj-details">
              <h3>{projectData?.title?.[locale] || ""}</h3>
              <div
                dangerouslySetInnerHTML={{
                  __html: projectData?.description?.[locale] || "",
                }}
              ></div>
            </div>
            <div className="sub-details">
              <div>
                <span>
                  <FormattedMessage id="category" /> :
                </span>
                {projectData?.category?.[locale]}
              </div>
              <div>
                <span>
                  <FormattedMessage id="date" /> :
                </span>
                <FormattedDate
                  value={projectData?.date}
                  day="numeric"
                  month="long"
                  year="numeric"
                />
              </div>
              <div className="share-wrapper">
                <span>
                  <FormattedMessage id="share" /> :
                </span>
                <a
                  title="Share"
                  href={`https://www.instagram.com/sharer.php?u=${href}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image width="210"
            height="212" {...instaShareIcon} alt="" />
                </a>
                <a
                  title="Share"
                  href={`http://www.facebook.com/sharer.php?u=${href}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image width="210"
            height="212" {...snapShareIcon} alt="" />
                </a>
                <a
                  title="Share"
                  href={`https://twitter.com/share?url=${href}`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Image width="210"
            height="212" {...twitterShareIcon} alt="" />
                </a>
              </div>
            </div>
          </div>
          {projectsData?.items?.length > 0 && (
            <div className="related">
              {projectsData?.items?.slice(0, 2)?.map((item, index) => (
                <div key={index}>
                  <Link href={`/products/${item?.slug}`}>
                    <a>
                      <div>
                        <Image
                          src={handleImage(item?.image)}
                          width={495}
                          height={645}
                          alt=""
                        />
                      </div>
                      <div className="info">
                        <h6>{item?.name?.[locale] || "اسم المنتج"}</h6>
                        <h6 className="price">
                          {item?.price || 5} <FormattedMessage id="r.s" />
                        </h6>
                      </div>
                    </a>
                  </Link>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;
  const projectResponse = await server.get(`/pages/products/sections/${id}`);
  const projectData = projectResponse?.data?.data?.section || {};

  const projectsResponse = await server.get(`/pages/products`);
  const homeResponse = await server.get("/pages/home");
  const sectionData = (r) => r?.data?.data?.page?.sections || [];
  const homeData = sectionData(homeResponse).find((e) => e?.slug == "intro") || {};

  return {
    props: {
      projectData,
      projectsData: {
        items:
          sectionData(projectsResponse).filter(
            (p) => p?.category?.en == projectData?.category?.en && p?.slug != id
          ) || [],
        breadCurmbImage: homeData?.backgroundImage || "",
      },
    },
  };
}

export default SingleProject;
