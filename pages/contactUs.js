import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FormattedMessage, useIntl } from "react-intl";
import styles from "@/styles/contactUs.module.scss";
// import Form from "@/src/components/Shared/Form";

import telIcon from "@/src/assets/svgs/phone.svg";
import locationIcon from "@/src/assets/svgs/location.svg";
import emailIcon from "@/src/assets/svgs/mail.svg";
import clockIcon from "@/src/assets/svgs/clock.svg";
import server from "@/src/api/server";
import { useForm } from "react-hook-form";
import Swal from "sweetalert2";

const ContactPage = ({ initData, error, contactData }) => {
  const { locale, formatMessage } = useIntl();
  error && console.log(JSON.parse(error));
  // console.log("contactData", contactData);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data) => {
    try {
      await server.post("/pages/contactUs/sections", {
        section: { ...data, lastName: " " },
      });
      reset();
      Swal.fire(
        `${formatMessage({
          id: "thanks",
        })}`,
        `${formatMessage({
          id: "thankMsg",
        })}`,
        "success"
      );
    } catch (error) {
      Swal.fire(
        `${formatMessage({
          id: "error",
        })}`,
        "error"
      );
      return;
    }
  };
  return (
    <>
      <div className={`${styles.contact}`}>
        <div
          className="contact-page-map"
          data-aos="fade-up"
          data-aos-duration="300"
          data-aos-delay="400"
          dangerouslySetInnerHTML={{
            __html: initData?.siteInfo?.mapframe ?? "",
          }}
        ></div>

        <div className="container">
          <div className="contacts">
            <div className="links">
              <div className="info">
                <div>
                  <div className="section-tag">
                    {contactData?.heading?.[locale]}
                    <FormattedMessage id="contactUs" />
                  </div>
                </div>
                {/* <p>{contactData?.description?.[locale]}</p> */}
              </div>
              <div className="contact-element">
                <div className="icon">
                  <Image width="210"
            height="212" {...locationIcon} alt="" />
                </div>
                <div className="contact-details">
                  <p>
                    <FormattedMessage id="address" />
                  </p>
                  <p title={initData?.siteInfo?.locationAddress?.[locale]}>
                    {initData?.siteInfo?.locationAddress?.[locale]}
                  </p>
                </div>
              </div>
              <div className="contact-element">
                <div className="icon">
                  <Image width="210"
            height="212" {...telIcon} alt="" />
                </div>
                <div className="contact-details">
                  <p>
                    <FormattedMessage id="phone" />
                  </p>
                  <p className="d-flex">
                    <Link href={`tel:${initData?.siteInfo?.phone}`}>
                      <a className="phone">{initData?.siteInfo?.phone}</a>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="contact-element">
                <div className="icon">
                  <Image  width="210"
            height="212" {...emailIcon} alt="" />
                </div>
                <div className="contact-details">
                  <p>
                    <FormattedMessage id="email" />
                  </p>
                  <p>
                    <Link href={`mailto:${initData?.siteInfo?.email}`}>
                      <a>{initData?.siteInfo?.email}</a>
                    </Link>
                  </p>
                </div>
              </div>
              <div className="contact-element">
                <div className="icon">
                  <Image width="210"
            height="212" {...clockIcon} alt="" />
                </div>
                <div className="contact-details">
                  <p>
                    <FormattedMessage id="workTimes" />
                  </p>
                  <p>
                    {initData?.siteInfo?.locationAddress?.workingTimes?.[
                      locale
                    ] || "اوقات العمل...."}
                  </p>
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="info">
                <div>
                  <div className="section-tag">
                    {/* {contactData?.heading?.[locale] || ( */}
                    <FormattedMessage id="sendMessage" />
                    {/* )} */}
                  </div>
                </div>
              </div>
              <div className="inputs">
                <div className="form-group">
                  <FormattedMessage id="name" />
                  <input
                    className="form-control"
                    {...register("name", {
                      required: true,
                    })}
                  />
                  {errors?.Name?.type === "required" && (
                    <p className="error-hint">
                      <FormattedMessage id="required" />
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <FormattedMessage id="email" />

                  <input
                    type="email"
                    className="form-control"
                    {...register("email", {
                      required: true,
                    })}
                  />
                  {errors?.email?.type === "required" && (
                    <p className="error-hint">
                      <FormattedMessage id="required" />
                    </p>
                  )}
                </div>
                <div className="form-group">
                  <textarea
                    className="form-control"
                    {...register("message", {
                      required: true,
                    })}
                    rows={7}
                  />
                  {errors?.email?.type === "required" && (
                    <p className="error-hint">
                      <FormattedMessage id="required" />
                    </p>
                  )}
                </div>
                <button>
                  <FormattedMessage id="send" />
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export async function getServerSideProps() {
  const homeResponse = await server.get("/pages/home");
  // console.log("homeResponse", homeResponse?.data?.data);
  const clientsResponse = await server.get("/pages/contactUs");
  const sectionData = (r) => r?.data?.data?.page?.sections || [];

  const getData = (section, response) =>
    sectionData(response)?.filter((e) => e?.slug == section)?.[0] || [];

  return {
    props: {
      contactData:
        {
          ...getData("contactUs", homeResponse),
          ...clientsResponse?.data?.data?.page,
        } || {},
    },
  };
}

export default ContactPage;
