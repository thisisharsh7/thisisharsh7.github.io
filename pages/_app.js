import Head from 'next/head';
import '../styles/globals.css';

export default function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta charSet="utf-8" />
        <meta name="robots" content="index, follow" />
        <meta name="description" content="Harsh - Open source maintainer and software engineer." />
        <meta property="og:site_name" content="harsh" />
        <meta property="og:locale" content="en_US" />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:site" content="@thisisharsh7" />
        <meta name="twitter:creator" content="@thisisharsh7" />

        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-icon.png" />
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-icon.png" />
        <link rel="icon" type="image/png" href="/icon1.png" sizes="16x16" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}
