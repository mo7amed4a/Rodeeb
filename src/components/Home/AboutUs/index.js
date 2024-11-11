import { FormattedMessage, useIntl } from "react-intl";
import styles from "./aboutUs.module.scss";
import Link from "next/link";

export default function AboutUs({ data }) {
  const { locale } = useIntl();
  return (
    <div className={styles.aboutUs}>
      <div className="container">
        <div className="wrapper">
          <div className="section-tag">
            {data?.heading?.[locale] || <FormattedMessage id="aboutUs" />}
          </div>
          <p>{data?.description?.[locale]}</p>
          <Link href="/aboutUs">
            <a className="btn">
              <FormattedMessage id="knowUs" />
            </a>
          </Link>
        </div>
      </div>
    </div>
  );
}
