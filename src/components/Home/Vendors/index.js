import { FormattedMessage, useIntl } from "react-intl";
import styles from "./vendors.module.scss";
import dynamic from "next/dynamic";
const VendorsMap = dynamic(
  () => import("../../Shared/VendorsMap"), // replace '@components/map' with your component's location
  {
    loading: () => <p>A map is loading</p>,
    ssr: false, // This line is important. It's what prevents server-side render
  }
);

export default function Vendors({ data, page = false }) {
  const { locale } = useIntl();

  return (
    <div className={styles.vendors}>
      <div className="container">
        <div className="wrapper vendors-section">
          {!page && (
            <div className="section-tag">
              {data?.heading?.[locale] || <FormattedMessage id="vendors" />}
            </div>
          )}
          <VendorsMap data={data} />
        </div>
      </div>
    </div>
  );
}
