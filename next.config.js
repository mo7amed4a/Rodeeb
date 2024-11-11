module.exports = {
  reactStrictMode: true,
  images: {
    domains: [
      "base.ejjadh.info",
      "rodib.ejjadh.info",
      "img.youtube.com",
      "www.rodib.ejjadh.info",
      "192.168.1.22"
    ],
  },

  i18n: {
    locales: ["ar", "en"],
    defaultLocale: "ar",
    localeDetection: false,
  },
  async rewrites() {
    return [
      {
        source: "/robots.txt",
        destination: "/api/robots",
      },
      {
        source: "/sitemap.xml",
        destination: "/api/sitemap",
      },
    ];
  },
};
