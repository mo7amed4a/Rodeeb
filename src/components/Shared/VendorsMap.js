import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";
import image from "@/src/assets/svgs/location (2).svg";
import { handleImage } from "@/src/helpers";

import locationIcon from "@/src/assets/svgs/location.svg";
import shopIcon from "@/src/assets/svgs/shop.svg";
import starIcon from "@/src/assets/svgs/star.svg";
import phoneIcon from "@/src/assets/svgs/phone.svg";
import { useIntl } from "react-intl";
import Image from "next/image";
import Link from "next/link";

export default function VendorsMap({ data }) {
  const { locale } = useIntl();
  const renderMerkers = data?.sections?.map((section, index) => (
    <Marker
      key={index}
      position={section?.position}
      icon={
        new Icon({
          iconUrl: image?.src,
          iconSize: [25, 41],
          iconAnchor: [12, 41],
        })
      }
    >
      <Popup className="shops-items mb-5">
        <div className="swiper-slide bg-transparent p-0">
          <Image
            src={handleImage(section?.image)}
            width="210"
            height="212"
            alt=""
          />
          <div className="details">
            <div>
              <Image {...locationIcon} width="210"
            height="212" alt="" />
              {section?.area?.[locale] || ""} / {section?.city?.[locale] || ""}
            </div>
            <div>
              <Image {...shopIcon} width="210"
            height="212" alt="" />
              {section?.shop?.[locale] || ""}
              <div className="rate">
                {`${section?.rate || 3}/5`}
                <Image {...starIcon} width="210"
            height="212" alt="" />
              </div>
            </div>
            <div>
              <Image width="210"
            height="212" {...phoneIcon} alt="" />
              <Link href={`tel:${section?.phone}`}>
                <p className="phone">{section?.phone || ""}</p>
              </Link>
            </div>
          </div>
        </div>
      </Popup>
    </Marker>
  ));
  return (
    <div className="w-100 shops ">
      <div className="container px-0">
        <MapContainer
          center={data?.sections?.[0]?.position || [25, 45]}
          zoom={7}
          // scrollWheelZoom={false}
          style={{ height: "500px" }}
          // onclick={handleMapClick}
        >
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
          {renderMerkers}
        </MapContainer>
      </div>
    </div>
  );
}
