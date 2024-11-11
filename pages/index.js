import server from "@/src/api/server";
import AboutUs from "@/src/components/Home/AboutUs";
import CategoriesProjects from "@/src/components/Home/CategoriesProducts";
import Hero from "@/src/components/Home/HeroSection";
import Offers from "@/src/components/Home/Offers";
import Vendors from "@/src/components/Home/Vendors";
import Video from "@/src/components/Home/Video";
import { NextSeo } from "next-seo";
// import BannerSection from "../src/themeComponents/banners/banner1/Index";
// import BestSellerSection from "../src/themeComponents/bestSellers/bestSeller1/Index";
// import HeroSection from "../src/themeComponents/heros/hero1/Index";
// import HeroSection2 from "../src/themeComponents/heros/hero2/Index";
// import OffersSection from "../src/themeComponents/offers/offer1/Index";
// import BestSellerSection2 from "../src/themeComponents/bestSellers/bestSeller2/Index";
// import BannerSection2 from "../src/themeComponents/banners/banner3/Index";
// import BestSellerSection3 from "../src/themeComponents/bestSellers/bestSeller3/Index";
// import BannerSection3 from "../src/themeComponents/banners/banner2/Index";
// import ContactSection from "../src/themeComponents/contacts/contact1/Index";
// import NewsLetterSection from "../src/themeComponents/newsLetters/newsLetter1/Index";
// import Header from "../src/themeComponents/headers/header-1/Index";
// import Footer from "../src/themeComponents/footers/footer-1/Index";
export default function Home(props) {
  const {
    heroData,
    // portfolioData,
    aboutData,
    offersData,
    vendorsData,
    videoData,
    // achievementsData,
    productsData,
    initData,
    // clientsData,
    // projectsData,
    // testimonialsData,
    // portfolioData,
  } = props;
  return (
    <>
      <NextSeo
        title=""
        additionalMetaTags={[
          {
            name: "keywords",
            content: "",
          },
          {
            name: "description",
            content: "",
          },
        ]}
      />
      <Hero heroData={heroData} initData={initData} />
      <AboutUs data={aboutData} />

      <CategoriesProjects data={productsData} initData={initData} />
      <Offers data={offersData} />
      <Vendors data={vendorsData} />

      <Video data={videoData} />
      {/* <Header />
      <OffersSection />
      <BestSellerSection
        sectionTitle="شدات ببجي الأكثر مبيعا"
        productsToShow={8}
      />
      <BannerSection />
      <BestSellerSection2 sectionTitle="اشحنها بنفسك" productsToShow={4} />
      <BannerSection2 />
      <BestSellerSection3 sectionTitle="دعم الشعبية" productsToShow={4} />
      <BannerSection3 />
      <ContactSection />
      <NewsLetterSection />
      <Footer /> */}
    </>
  );
}

export async function getServerSideProps() {
  try {
    const homeResponse = await server.get("/pages/home");
    const vendorsResponse = await server.get("/pages/vendors");

    // const systemsResponse = await server.get("/pages/systems");
    // const testimonialsResponse = await server.get("/pages/testimonials");
    const productsResponse = await server.get("/pages/products");

    const sectionData = (r) => r?.data?.data?.page?.sections || [];
    const homeData = (section) =>
      sectionData(homeResponse)?.filter((e) => e?.slug == section)?.[0] || [];

    return {
      props: {
        heroData: {
          ...homeData("intro"),
          // items: homeData("intro")?.sliders || [],
          // background: homeData("intro")?.backgroundImage || "",
        },
        // systemsData: {
        //   heading: homeData("systems")?.heading || "",
        //   description: homeData("systems")?.description || "",
        //   items: sectionData(systemsResponse)?.slice(0, 4),
        // },
        aboutData: {
          ...homeData("about"),
        },
        offersData: {
          ...homeData("offers"),
        },
        videoData: {
          ...homeData("video"),
        },
        vendorsData: vendorsResponse?.data?.data?.page || {},
        productsData: {
          heading: homeData("products")?.heading || "",
          description: "",
          items: sectionData(productsResponse),
        },
      },
    };
  } catch (error) {
    return {
      props: {
        error: JSON.stringify(error),
      },
    };
  }
}
