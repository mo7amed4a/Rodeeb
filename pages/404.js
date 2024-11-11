import React from "react";
import { NextSeo } from "next-seo";
import BreadCrumb from "@/src/components/Shared/Breadcrumbs";
import { FormattedMessage } from "react-intl";
import Link from "next/link";

const NotFound = () => {
  return (
    <>
      <NextSeo
        title="الصفحة المطلوبة غير موجودة"
        additionalMetaTags={[
          {
            name: "description",
            content: "",
          },
          {
            name: "keywords",
            content: "",
          },
        ]}
      />
      <BreadCrumb
        breads={
          <>
            <span>
              <FormattedMessage id="home" />
            </span>
            <span>/</span>
            <span>
              <FormattedMessage id="404" />
            </span>
          </>
        }
        hideChocklate={true}
        // description={aboutData?.description}
      />
      <div className="errro-wrp d-flex justify-content-center my-4">
        <Link href="/">
          <a className="btn px-3">
            <FormattedMessage id="goHome" />
          </a>
        </Link>
      </div>
    </>
  );
};

export default NotFound;
