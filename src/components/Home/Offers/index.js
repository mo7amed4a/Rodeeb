import { FormattedMessage, useIntl } from "react-intl";
import styles from "./offers.module.scss";
import Link from "next/link";
import Image from "next/image";
import { handleImage } from "@/src/helpers";
import image from "@/src/assets/images/offers.png";

export default function Offers({ data }) {
  const { locale } = useIntl();
  return (
    <div className={styles.offers}>
      <div className="container">
        <div className="wrapper">
          <div className="info">
            <div>
              <div className="section-tag">
                {data?.heading?.[locale] || (
                  <FormattedMessage id="savingOffer" />
                )}
              </div>
            </div>
            <div
              className="details"
              dangerouslySetInnerHTML={{
                __html: data?.description?.[locale] || "",
              }}
            ></div>
            <div className="button">
              <Link href="/products">
                <a className="btn">
                  <FormattedMessage id="shopNow" />
                </a>
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Image src={image} width="500" height="500" alt="" />
    </div>
  );
}
