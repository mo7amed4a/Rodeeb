import { FormattedMessage, useIntl } from "react-intl";
import styles from "./video.module.scss";
import Link from "next/link";
import Image from "next/image";
import { getYoutubeId, handleImage } from "@/src/helpers";
import videoIcon from "@/src/assets/svgs/home-video.svg";
import playIcon from "@/src/assets/svgs/play-fill.svg";
import videoPlaceholder from "@/src/assets/images/video-placeholder.png";
import { useState } from "react";

export default function Video({ data }) {
  const { locale } = useIntl();
  const [play, setPlay] = useState(false);
  return (
    <div className={styles.video}>
      <div className="wrapper">
        {!play ? (
          <>
            <div>
              <Image width="210"
            height="212" {...playIcon} alt="" onClick={() => setPlay(!play)} />
              <Image width="210"
            height="212" {...videoIcon} alt="" onClick={() => setPlay(!play)} />
            </div>
            <Image
              className="thumb"
              src={handleImage(data?.videoImage || data?.image || "")}
              width={500}
              height={500}
              alt=""
            />
            {/* <Image
              className="thumb"
              src={"http://img.youtube.com/vi/xPe1jMuX32s/0.jpg"}
              width={100}
              height={100}
              alt=""
            /> */}
          </>
        ) : (
          <iframe
            width="650"
            height="315"
            src={`https://www.youtube.com/embed/${
              getYoutubeId(data?.url) || ""
            }?showinfo=0&controls=0&autohide=1&autoplay=1`}
          ></iframe>
        )}
      </div>
    </div>
  );
}
