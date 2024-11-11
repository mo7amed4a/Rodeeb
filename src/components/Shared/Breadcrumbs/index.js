import React from "react";
import { Container } from "react-bootstrap";
import { useIntl } from "react-intl";
import styles from "./breadcrumbs.module.scss";

const BreadCrumb = ({
  heading,
  breads,
  description = "",
  hideChocklate = false,
}) => {
  const { locale } = useIntl();
  console.log("hideChocklate", hideChocklate, "styles.crumbs", styles.crumbs);
  return (
    <div
      className={styles.crumbs}
      // data-aos="fade-up"
      // data-aos-duration="300"
      // data-aos-delay="100"
    >
      <div className="content">
        {/* <h4 className="breads-footer"> */}
        {breads}
        {/* </h4> */}
      </div>
      {hideChocklate && (
        <style>
          {`
          .${styles.crumbs}:after {
            content:none;
          }
        `}
        </style>
      )}
    </div>
  );
};

export default BreadCrumb;
