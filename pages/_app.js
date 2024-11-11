import React, { useEffect, useState } from "react";

import Head from "next/head";
import { IntlProvider } from "react-intl";
import TopBarProgress from "react-topbar-progress-indicator";
import { useRouter } from "next/dist/client/router";
import AOS from "aos";
import SSRProvider from "react-bootstrap/SSRProvider";
import "bootstrap/dist/css/bootstrap.css";
import "bootstrap/dist/css/bootstrap.rtl.min.css";
import "aos/dist/aos.css";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";

import "../styles/globals.scss";

import Loading from "../src/components/Shared/Loading";
import server from "@/src/api/server";
import Clients from "@/src/components/Layout/Clients";
import Footer from "@/src/components/Layout/Footer";
import Header from "@/src/components/Layout/Header";
const languages = {
  ar: require("../src/content/languages/ar.json"),
  en: require("../src/content/languages/en.json"),
};

function MyApp({ Component, pageProps, props }) {
  const [Progress, setProgress] = useState(false);
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  TopBarProgress.config({
    barThickness: 3,
    barColors: {
      0: "#38003C",
      0.5: "#E90052",
      1.0: "#00f",
    },
  });
  useEffect(() => {
    const handleStart = (url) => {
      url !== router.pathname ? setLoading(true) : setLoading(false);
    };
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", () => {
      handleStart();
      setProgress(true);
    });
    router.events.on("routeChangeComplete", () => {
      handleComplete();
      setProgress(false);
    });
    router.events.on("routeChangeError", handleComplete);
  }, [router]);

  const { locale, defaultLocale } = useRouter();
  const messages = languages[locale];
  const dir = locale === "ar" ? "rtl" : "ltr";

  // Direction & AnimationOnScroll
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "mobile",
    });
    document.documentElement.dir = dir;
    document.body.style.direction = dir;
    document.body.setAttribute("dir", dir);
  }, [dir]);

  return (
    <>
      <Head>
        <title>روديب</title>
        <link rel="shortcut icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta
          name="google-site-verification"
          content="SK8aOFvxEgleVK4fIg-lLj_t5NCviyHQUKHAWZd0Vnk"
        />
      </Head>
      {Progress && <TopBarProgress />}
      <Loading loading={loading} />
      <IntlProvider
        messages={messages}
        defaultLocale={defaultLocale}
        locale={locale}
      >
        <SSRProvider>
          <div className="wrap">
            {router?.pathname != "/" && <Header initData={props} />}
            <Component initData={props} {...pageProps} />
            <Clients data={props?.clientsData} />
            <Footer data={props?.footerData} initData={props} />
          </div>
        </SSRProvider>
      </IntlProvider>
    </>
  );
}

MyApp.getInitialProps = async () => {
  const homeResponse = await server.get("/pages/home");
  // const socialsResponse = await server.get("/settings/socials");
  const socialsResponse = await server.get("/pages/socials");
  const siteInfo = await server.get("/settings/siteInfo");
  const clientsResponse = await server.get("/pages/clients");

  // setInitData({
  //   socials: socialsResponse?.data?.data?.socials,
  //   siteInfo: siteInfo?.data?.data?.siteInfo,
  // });

  const sectionData = (r) => r?.data?.data?.page?.sections || [];
  const getData = (section, response) =>
    sectionData(response)?.filter((e) => e?.slug == section)?.[0] || [];

  return {
    props: {
      socials: sectionData(socialsResponse) || [],
      siteInfo: siteInfo?.data?.data?.siteInfo || siteInfo?.data?.data || {},
      clientsData: {
        // heading: getData("clients", homeResponse)?.heading || "",
        // description: "",
        sections: sectionData(clientsResponse) || [],
        ...getData("clients", homeResponse),
      },
    },
  };
};
export default MyApp;
