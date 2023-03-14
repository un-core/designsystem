import Document, { Html, Head, Main, NextScript } from 'next/document';
import Navigation from '../components/Navigation';

require('iframe-resizer/js/iframeResizer.contentWindow');

class MyDocument extends Document {
  static async getInitialProps(ctx) {
    const initialProps = await Document.getInitialProps(ctx);
    return { ...initialProps };
  }

  render() {
    return (
      <Html lang="en">
        <Head>
          <link rel="icon" href="/favicon.ico" />

          <link
            rel="icon"
            sizes="32x32"
            href="/favicons/wfp-favicon-png32.png"
          />

          <link
            rel="icon"
            type="image/png"
            sizes="512x512"
            href="/favicons/wfp-favicon-png512.png"
          />
          {/*
          <link rel="manifest" href="/favicons/manifest.json" />
          <meta name="msapplication-TileColor" content="#ffffff" />
          <meta
            name="msapplication-TileImage"
            content="/favicons/android-chrome-512x512.png"
          />
    <meta name="theme-color" content="#ffffff"></meta>*/}

          <link rel="preconnect" href="https://fonts.googleapis.com" />
          <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin />
          <link
            href="https://fonts.googleapis.com/css2?family=Open+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;0,800;1,300;1,400;1,500;1,600;1,700&display=swap"
            rel="stylesheet"></link>
        </Head>
        <body>
          <Main />

          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
