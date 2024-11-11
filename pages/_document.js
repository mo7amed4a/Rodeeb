import Document, { Html, Head, Main, NextScript } from "next/document";

class _document extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    const { locale } = this.props.__NEXT_DATA__;
    const dir = locale === "ar" ? "rtl" : "ltr";

    return (
      <Html lang={locale}>
        <Head>
          <meta charSet="utf-8" />

          <meta name="theme-color" content="#17191a" />
          <meta name="msapplication-navbutton-color" content="#17191a" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="#17191a"
          />

          <meta name="author" content="مؤسسة إجادة الأعمال لتقنية المعلومات" />
          <meta name="keywords" content=""></meta>
        </Head>
        <body dir={dir}>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default _document;
